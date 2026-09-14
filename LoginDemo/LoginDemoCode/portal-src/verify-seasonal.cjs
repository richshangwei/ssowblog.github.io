const { chromium } = require('C:/Users/richs/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = path.resolve(__dirname, '..');
const allDesigns = JSON.parse(fs.readFileSync(path.join(root, 'portal-designs.json'), 'utf8'));
const screenshotsOnly = process.argv.includes('--screenshots-only');
const selected = process.argv.slice(2).filter(arg => arg !== '--screenshots-only');
const designs = allDesigns.filter(d => !selected.length || selected.includes(d.id.match(/portal-(\d+)/)[1]));
const output = path.join(root, 'seasonal-previews');
const reportPath = path.join(root, 'seasonal-verification.json');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

(async () => {
  assert(designs.length > 0, 'At least one matching design is required');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.setDefaultTimeout(7000);
  const errors = [], requests = [], results = [], sharedChecks = [];
  page.on('pageerror', e => errors.push({ url: page.url(), message: e.message }));
  page.on('request', r => { if (/^https?:/i.test(r.url())) requests.push(r.url()); });
  await context.route(/^https?:\/\//i, route => route.abort());
  const file = d => pathToFileURL(path.join(root, d.id, 'index.html')).href;
  const open = async (d, query = '?theme=spring&layout=immersive') => {
    await page.goto(file(d) + query);
    await page.waitForFunction(() => !!window.PortalSeasonal && document.querySelector('#targetName').textContent.length > 0);
    if (query.includes('layout=immersive')) await page.locator('#holidayStage').waitFor({ state: 'visible' });
  };
  const expand = async id => page.locator(id).evaluate(e => e.open = true);
  const scene = async ({ target = 'direct', status = 'unknown', outcome = 'success' } = {}) => {
    await expand('#demoControls');
    await page.locator('#demoTarget').selectOption(target);
    await page.locator('#demoService').selectOption(status);
    await page.locator('#demoOutcome').selectOption(outcome);
  };
  const season = async (theme, layout) => {
    await expand('#seasonalControls');
    if (theme) await page.locator('#seasonTheme').selectOption(theme);
    if (layout) await page.locator('#seasonLayout').selectOption(layout);
  };
  const modal = async action => {
    await page.locator('[data-action="' + action + '"]').filter({ visible: true }).first().click();
    await page.locator('#portalModal').waitFor({ state: 'visible' });
    await page.waitForFunction(() => !bootstrap.Modal.getInstance(document.getElementById('portalModal'))._isTransitioning);
  };
  const closeModal = async () => {
    await page.locator('.modal-done').click();
    await page.locator('#portalModal').waitFor({ state: 'hidden' });
  };
  const login = async () => {
    await page.locator('[data-action="fill-demo"]').click();
    await page.locator('#loginSubmit').click();
    assert(await page.locator('#loginSubmit').isDisabled(), 'Processing must disable repeated submission');
    assert(await page.locator('#password').inputValue() === '', 'Submitted demo password is cleared immediately');
    await page.locator('#loginForm').evaluate(form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    await page.waitForFunction(() => !document.querySelector('#loginSubmit').disabled);
  };
  const unique = async () => {
    const state = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
      return { duplicates: ids.filter((id, i) => ids.indexOf(id) !== i), core: ['.org-header', '.portal-intro', '#login-section', '#status-section', '#news-section', '#support-section', '.portal-footer', '#account', '#password', '#loginForm'].map(s => ({ selector: s, count: document.querySelectorAll(s).length })) };
    });
    assert(state.duplicates.length === 0, 'No duplicate IDs: ' + state.duplicates.join(', '));
    for (const item of state.core) assert(item.count === 1, 'Exactly one core node: ' + item.selector);
  };
  const noOverflow = async label => assert(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)), 'No horizontal overflow: ' + label);
  const capture = async destination => {
    await page.waitForFunction(() => document.body.dataset.seasonalArtwork === 'ready' && !!document.body.style.getPropertyValue('--season-mobile-image'));
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
    });
    await page.screenshot({ path: destination, fullPage: true });
  };
  const unchangedStatus = async label => {
    assert((await page.locator('.holiday-status .status-label').textContent()).includes(label), 'Compact service state: ' + label);
    assert(await page.locator('.seasonal-updated').textContent() === await page.locator('#statusUpdated').textContent(), 'Compact update timestamp matches full service details');
  };

  // Refresh approved visual assets without replacing the complete interaction report.
  if (screenshotsOnly) {
    try {
      for (const d of selected.length ? designs : designs.slice(0, 1)) {
        for (const theme of ['spring', 'midautumn']) {
          await open(d, '?theme=' + theme + '&layout=immersive');
          await page.waitForFunction(() => document.body.dataset.seasonalArtwork === 'ready');
          for (const [width, height, size] of [[1440, 1050, 'desktop'], [375, 850, 'mobile']]) {
            await page.setViewportSize({ width, height });
            await noOverflow(theme + ' preview ' + size);
            const prefix = d.id === allDesigns[0].id ? '' : d.id + '-';
            await capture(path.join(output, prefix + theme + '-' + size + '.png'));
          }
        }
      }
      assert(errors.length === 0 && requests.length === 0, 'Screenshots have no page errors or remote requests');
      console.log('SEASONAL SCREENSHOTS REFRESHED; interaction report retained');
    } finally { await browser.close(); }
    return;
  }

  try {
    for (const d of designs) {
      const item = { id: d.id, themes: [], passed: false };
      try {
        for (const theme of ['spring', 'midautumn']) {
          await page.setViewportSize({ width: 1440, height: 1050 });
          await open(d, '?theme=' + theme + '&layout=immersive');
          await page.waitForFunction(() => document.body.dataset.seasonalArtwork === 'ready');
          assert(await page.locator('body').getAttribute('data-seasonal-theme') === theme, 'Requested theme applied');
          await unique();
          await unchangedStatus('未確認');
          for (const selector of ['#seasonNews', '#seasonService', '#seasonHelp', '#seasonAccount']) {
            assert(await page.locator(selector).evaluate(e => !e.open), 'Secondary information starts closed: ' + selector);
          }
          for (const selector of ['.org-header', '.portal-intro', '#account', '#password', '#loginSubmit', '.holiday-status', '.holiday-help', '.holiday-top-help', '.portal-footer']) assert(await page.locator(selector).isVisible(), 'Essential remains visible: ' + selector);
          const viewports = [[1440, 1050], [768, 1024], [375, 850], [812, 375]];
          for (const [width, height] of viewports) {
            await page.setViewportSize({ width, height });
            await noOverflow(theme + ' ' + width + 'x' + height);
            if (d.id === allDesigns[0].id && (width === 1440 || width === 375)) {
              await capture(path.join(output, theme + '-' + (width === 1440 ? 'desktop' : 'mobile') + '.png'));
            }
          }
          await page.locator('#seasonNews > summary').click();
          assert(await page.locator('#news-section').isVisible(), 'Public news expands with click');
          await page.locator('#seasonNews > summary').press('Space');
          assert(await page.locator('#seasonNews').evaluate(e => !e.open), 'Disclosure closes with keyboard');
          await page.locator('#seasonNews > summary').press('Enter');
          assert(await page.locator('#news-section').isVisible(), 'Disclosure opens with keyboard');
          await page.locator('.notice-open').first().click();
          await page.locator('#portalModal').waitFor({ state: 'visible' });
          await closeModal();
          await page.locator('#seasonHelp > summary').click();
          await page.locator('.faq-list summary').first().click();
          assert(await page.locator('.faq-list details').first().evaluate(e => e.open), 'FAQ expands');
          await modal('contact');
          assert((await page.locator('#modalContent').textContent()).includes('[資訊室分機]'), 'Unauthenticated contact path');
          await closeModal();
          item.themes.push({ theme, passed: true, viewports });
        }

        await page.setViewportSize({ width: 1440, height: 1050 });
        await open(d);
        await page.locator('#loginSubmit').click();
        assert((await page.locator('#accountError').textContent()).includes('請填寫'), 'Required account feedback');
        assert((await page.locator('#passwordError').textContent()).includes('請填寫'), 'Required password feedback');
        assert(await page.locator('#account').evaluate(e => document.activeElement === e), 'Missing field receives focus');
        await page.locator('[data-action="fill-demo"]').click();
        await page.locator('#togglePassword').click();
        assert(await page.locator('#password').getAttribute('type') === 'text', 'Show password');
        await page.locator('#togglePassword').click();
        assert(await page.locator('#password').getAttribute('type') === 'password', 'Hide password');
        for (const [status, target, label] of [['partial', 'hr', '部分異常'], ['maintenance', 'docs', '維護']]) {
          await scene({ status, target });
          assert(await page.locator('#impactAlert').isVisible(), 'Relevant impact always visible: ' + status);
          assert(await page.locator('#impactAlert').evaluate(e => !e.closest('details') && e.getBoundingClientRect().top < document.querySelector('#loginForm').getBoundingClientRect().top), 'Critical impact is outside disclosures and before form');
          assert((await page.locator('#impactAction').textContent()).length > 0 && (await page.locator('#impactAlternative').textContent()).length > 0, 'Impact includes next action and alternative status');
          await unchangedStatus(label);
          await season('midautumn');
          assert(await page.locator('#impactAlert').isVisible(), 'Theme switch preserves impact');
          await unchangedStatus(label);
        }
        await scene({ status: 'normal' }); await unchangedStatus('正常');
        for (const [outcome, code] of [['credentials', 'DEMO-AUTH'], ['network', 'DEMO-NET']]) {
          await scene({ outcome }); await login();
          assert((await page.locator('#feedbackCode').textContent()).includes(code), 'Failed login remains visible: ' + outcome);
          assert(await page.locator('#formFeedback').isVisible(), 'Failure is not hidden in a disclosure');
          assert(!(await page.locator('#feedbackMessage').textContent()).includes('帳號不存在'), 'Generic error avoids account enumeration');
          await modal('report');
          const report = await page.locator('#reportOutput').inputValue();
          assert(report.includes(code) && report.includes('發生時間') && !report.includes('Demo-only-123'), 'Report contains useful context without password');
          await closeModal();
        }
        await scene(); await login();
        assert(await page.locator('#resultView').isVisible() && await page.locator('.system-option').count() === 2, 'Direct login shows permission-scoped demo list');
        const resultText = await page.locator('#resultHeading').textContent();
        await season('spring', 'standard');
        assert(await page.locator('#resultView').isVisible() && await page.locator('#resultHeading').textContent() === resultText && !(await page.locator('#portalDesign').isVisible()), 'Switching theme/layout retains result view');
        await season('midautumn', 'immersive');
        assert(await page.locator('#resultView').isVisible() && await page.locator('#resultHeading').textContent() === resultText && !(await page.locator('#portalDesign').isVisible()), 'Returning to immersive retains result view');
        await scene({ target: 'supply' }); await login();
        assert((await page.locator('#resultHeading').textContent()).includes('沒有使用權限'), 'Unauthorized target result');
        await modal('permission');
        assert((await page.locator('#modalContent').textContent()).includes('採購申請'), 'Permission request has correct target');
        await closeModal();

        // Preserve the original objects, parent/sibling positions, and demo inputs across both mode transitions.
        await open(d, '');
        await page.evaluate(() => {
          window.__seasonNodes = ['.org-header', '.portal-intro', '#login-section', '#status-section', '#news-section', '#support-section', '.portal-footer', '.account-guide', '.account-actions', '.workstation-note', '#loginForm', '#account', '#password'].map(selector => {
            const node = document.querySelector(selector); return { selector, node, parent: node.parentNode, next: node.nextSibling };
          });
        });
        await page.locator('[data-action="fill-demo"]').click();
        await season('spring', 'immersive');
        await season('midautumn', 'immersive');
        assert(await page.evaluate(() => __seasonNodes.every(item => document.querySelector(item.selector) === item.node)), 'Theme and mode changes reuse actual DOM nodes');
        assert(await page.locator('#account').inputValue() === 'demo.user' && await page.locator('#password').inputValue() === 'Demo-only-123', 'Inputs survive theme and layout changes');
        await page.locator('#account').focus();
        await page.locator('#seasonTheme').evaluate(e => { e.value = 'spring'; e.dispatchEvent(new Event('change', { bubbles: true })); });
        assert(await page.locator('#account').evaluate(e => document.activeElement === e), 'Background application preserves typing focus');
        await season('default', 'standard');
        assert(await page.locator('#holidayStage').count() === 0, 'Original mode removes immersive container');
        assert(await page.evaluate(() => __seasonNodes.every(item => document.querySelector(item.selector) === item.node && item.node.parentNode === item.parent && item.node.nextSibling === item.next)), 'Original DOM positions restored exactly');
        await unique();
        for (const selector of ['.org-header', '.portal-footer']) assert(await page.locator(selector).evaluate(e => e.getClientRects().length > 0 && !e.hidden), 'Original identifying header/footer is visible after restoration: ' + selector);
        assert(await page.locator('#account').inputValue() === 'demo.user' && await page.locator('#password').inputValue() === 'Demo-only-123', 'Restored original retains demo inputs');
        await noOverflow('restored original');
        const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookie: document.cookie }));
        assert(storage.local === 0 && storage.session === 0 && !storage.cookie, 'No credential or theme persistence');
        item.passed = true;
        console.log(d.id + ' seasonal layouts and flows passed');
      } catch (error) {
        item.error = error.message;
        console.error(d.id + ': ' + error.message);
        await page.screenshot({ path: path.join(output, d.id + '-failure.png'), fullPage: true }).catch(() => {});
      }
      results.push(item);
    }

    await open(designs[0]);
    const calendar = await page.evaluate(() => {
      const c = PortalSeasonalConfig;
      const restore = { scheduleEnabled: c.scheduleEnabled, schedules: c.schedules, timeZone: c.timeZone };
      const checks = [];
      const check = (name, actual, expected) => checks.push({ name, actual, expected, passed: actual === expected });
      const rule = { id: 'base', theme: 'spring', start: '2035-01-10', end: '2035-01-12', priority: 1, layout: 'immersive', enabled: true };
      const resolve = day => PortalSeasonal.resolveSchedule(day)?.id || null;
      try {
        c.timeZone = 'Asia/Taipei';
        check('Taipei day before UTC+8 midnight', PortalSeasonal.localDay(new Date('2035-01-09T15:59:59Z')), '2035-01-09');
        check('Taipei day at UTC+8 midnight', PortalSeasonal.localDay(new Date('2035-01-09T16:00:00Z')), '2035-01-10');
        c.scheduleEnabled = false; c.schedules = [rule];
        check('Global schedule disabled', resolve('2035-01-10'), null);
        c.scheduleEnabled = true;
        check('Start is inclusive', resolve('2035-01-10'), 'base');
        check('End is inclusive', resolve('2035-01-12'), 'base');
        check('Before range', resolve('2035-01-09'), null);
        check('After range', resolve('2035-01-13'), null);
        check('Invalid calendar date', resolve('2035-02-30'), null);
        check('Invalid format', resolve('2035-1-10'), null);
        c.schedules = [rule, { ...rule, id: 'high', theme: 'midautumn', priority: 10 }];
        check('Higher priority wins', resolve('2035-01-11'), 'high');
        c.schedules = [{ ...rule, id: 'b' }, { ...rule, id: 'a' }];
        check('Equal priority uses id', resolve('2035-01-11'), 'a');
        c.schedules = [{ ...rule, enabled: false }, { ...rule, id: 'unknown', theme: 'not-configured' }, { ...rule, id: 'reverse', start: '2035-01-15' }, { ...rule, id: 'invalid', end: '2035-02-30' }];
        check('Disabled, unknown, reversed and invalid rules ignored', resolve('2035-01-11'), null);
        c.timeZone = 'Invalid/Timezone';
        check('Invalid timezone is explicit null', PortalSeasonal.localDay(new Date('2035-01-09T16:00:00Z')), null);
      } finally { Object.assign(c, restore); }
      return checks;
    });
    sharedChecks.push(...calendar);
    assert(calendar.every(c => c.passed), 'Calendar resolver: ' + JSON.stringify(calendar.filter(c => !c.passed)));

    // Preview a verified fixture date through the same public control without touching source files.
    await page.evaluate(() => {
      PortalSeasonalConfig.scheduleEnabled = true;
      PortalSeasonalConfig.schedules = [{ id: 'browser-fixture', theme: 'midautumn', start: '2035-06-10', end: '2035-06-12', priority: 1, layout: 'immersive', enabled: true }];
    });
    await season('auto', 'auto');
    await page.locator('#seasonDate').fill('2035-06-10'); await page.locator('#seasonDate').dispatchEvent('change');
    assert(await page.locator('body').getAttribute('data-seasonal-theme') === 'midautumn' && await page.locator('#holidayStage').isVisible(), 'Date preview applies configured theme and layout');
    await page.locator('#seasonDate').fill('2035-06-13'); await page.locator('#seasonDate').dispatchEvent('change');
    assert(await page.locator('body').getAttribute('data-seasonal-theme') === 'default', 'Out-of-range date returns to neutral theme');
    sharedChecks.push({ name: 'Configured fixture date preview and neutral fallback', passed: true });

    await open(designs[0], '?theme=not-configured&layout=not-a-layout');
    assert(await page.locator('body').getAttribute('data-seasonal-theme') === 'default' && await page.locator('body').getAttribute('data-portal-layout') === 'standard', 'Unknown URL selection falls back to neutral original layout');
    sharedChecks.push({ name: 'Unknown URL theme and layout fall back', passed: true });

    await open(designs[0]);
    await expand('#seasonalControls');
    await page.evaluate(() => {
      PortalSeasonalConfig.themes.missing = { ...PortalSeasonalConfig.themes.spring, name: '測試缺圖', background: 'seasonal/assets/fixture-does-not-exist.svg', mobileBackground: 'seasonal/assets/fixture-does-not-exist-mobile.svg' };
      document.querySelector('#seasonTheme').add(new Option('測試缺圖', 'missing'));
    });
    await season('missing', 'immersive');
    await page.waitForFunction(() => document.body.dataset.seasonalArtwork === 'unavailable');
    assert(await page.locator('#account').isVisible() && await page.locator('#loginSubmit').isEnabled(), 'Missing artwork preserves login');
    assert((await page.locator('#seasonPreviewStatus').textContent()).includes('純色備援'), 'Missing artwork has explicit fallback feedback');
    assert(await page.evaluate(() => !document.body.style.getPropertyValue('--season-image')), 'Missing desktop image is not left as an active background');
    await unchangedStatus('未確認');
    await login(); assert(await page.locator('#resultView').isVisible(), 'Missing artwork still allows demo login');
    sharedChecks.push({ name: 'Missing local artwork has usable solid fallback', passed: true });

    await open(designs[0]);
    await page.evaluate(() => {
      PortalSeasonalConfig.themes.remote = { ...PortalSeasonalConfig.themes.spring, name: '測試遠端', background: 'https://example.invalid/fixture.svg', mobileBackground: '../escape.svg' };
      document.querySelector('#seasonTheme').add(new Option('測試遠端', 'remote'));
    });
    await season('remote', 'immersive');
    assert(await page.evaluate(() => !document.body.style.getPropertyValue('--season-image') && !document.body.style.getPropertyValue('--season-mobile-image')), 'External and traversal artwork paths rejected');
    sharedChecks.push({ name: 'Artwork only uses configured local paths', passed: true });
  } catch (error) {
    sharedChecks.push({ name: 'Shared seasonal checks', passed: false, error: error.message });
    console.error(error);
  } finally {
    const report = { results, sharedChecks, pageErrors: errors, remoteRequests: requests, passed: results.length === designs.length && results.every(r => r.passed) && sharedChecks.every(r => r.passed) && errors.length === 0 && requests.length === 0, checks: ['two local seasonal themes across selected designs', '1440/768/375 and 812x375 landscape', 'essential login, compact live status and no-login help', 'secondary disclosures and critical pre-submit impact', 'required fields, visibility, processing and duplicate prevention', 'failed authentication and service failure report', 'direct allowed system list and denied target', 'same DOM nodes, original positions and demo inputs on mode restoration', 'result view survives theme and mode changes', 'timezone, inclusive dates, precedence, invalid rules and preview dates', 'local missing-image fallback and rejected external artwork', 'no credentials persisted and no remote requests'], note: 'Automated frontend prototype checks; fixture dates are not holiday dates. Not user testing or complete accessibility certification.' };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    await browser.close();
    console.log(report.passed ? 'ALL SEASONAL CHECKS PASSED' : 'SEASONAL CHECKS FAILED: ' + reportPath);
    if (!report.passed) process.exitCode = 1;
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
