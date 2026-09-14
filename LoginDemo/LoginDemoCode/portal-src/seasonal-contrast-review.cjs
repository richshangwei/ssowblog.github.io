const { chromium } = require('C:/Users/richs/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const designs = JSON.parse(fs.readFileSync(path.join(root, 'portal-designs.json'), 'utf8'));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
  const checks = [];
  for (const design of designs) {
    for (const theme of ['spring', 'midautumn']) {
      for (const layout of ['standard', 'immersive']) {
        const url = pathToFileURL(path.join(root, design.id, 'index.html'));
        url.search = new URLSearchParams({ theme, layout }).toString();
        await page.goto(url.href);
        await page.waitForFunction(() => document.body.dataset.portalLayout && ['ready', 'unavailable'].includes(document.body.dataset.seasonalArtwork));
        await page.evaluate(async () => { await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
        const result = await page.evaluate(async () => {
          for (const details of document.querySelectorAll('#portalDesign details')) details.open = true;
          const rgba = text => { const parts = text.match(/[\d.]+/g)?.map(Number) || [0, 0, 0, 0]; return [...parts.slice(0, 3), parts[3] ?? 1]; };
          const luminance = color => color.map(value => { value /= 255; return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
          function background(element) {
            const layers = [];
            for (let node = element; node; node = node.parentElement) {
              const style = getComputedStyle(node);
              if (Number(style.opacity) < 1) return null;
              if (style.backgroundImage !== 'none') return null;
              const color = rgba(style.backgroundColor);
              layers.push(color);
              if (color[3] === 1) break;
            }
            if (!layers.some(color => color[3] === 1)) return null;
            return layers.reverse().reduce((color, layer) => color.map((value, index) => layer[index] * layer[3] + value * (1 - layer[3])), [255, 255, 255]);
          }
          function selector(element) {
            if (element.id) return '#' + element.id;
            const own = element.tagName.toLowerCase() + [...element.classList].map(name => '.' + name).join('');
            const parent = element.parentElement;
            return parent ? (parent.id ? '#' + parent.id : parent.tagName.toLowerCase() + [...parent.classList].map(name => '.' + name).join('')) + ' > ' + own : own;
          }
          const selectors = '.org-brand strong,.org-brand small,.logo-slot,.portal-intro h1,.portal-purpose,.eyebrow,.header-nav a,.panel h2,.panel-label,.form-label,input,.context-label,.context-name,.context-next,.account-guide,.login-submit,.small-note,.sample-badge,.link-button,.account-actions button,.password-toggle,.status-label,.status-panel p,.status-meta,.notice-open,.notice-summary,.notice-meta,.notice-severity,.notice-filter,#noticeCount,.support-primary,.support-links button,.contact-lines,.contact-lines strong,.faq-list summary,.faq-list p,.workstation-note,.portal-footer span,.footer-tools button,.footer-tools a,.holiday-status-meta,.holiday-help button,.holiday-information summary,.holiday-account summary,#holidayHeadline,#holidayMessage,.holiday-kicker,.holiday-art-note,.holiday-top-help';
          let checked = 0;
          const skipped = [];
          const issues = [];
          function inspect(element, state = 'default') {
            if (!element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return;
            const style = getComputedStyle(element);
            const bg = background(element);
            if (!bg) { skipped.push(selector(element)); return; }
            const fg = rgba(style.color);
            const textColor = fg.slice(0, 3).map((value, index) => value * fg[3] + bg[index] * (1 - fg[3]));
            const foregroundLuminance = luminance(textColor);
            const backgroundLuminance = luminance(bg);
            const ratio = (Math.max(foregroundLuminance, backgroundLuminance) + .05) / (Math.min(foregroundLuminance, backgroundLuminance) + .05);
            const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700);
            const threshold = large ? 3 : 4.5;
            checked++;
            if (ratio < threshold) issues.push({ selector: selector(element), state, text: (element.value || element.textContent).trim().slice(0, 50), foreground: style.color, background: bg.map(Math.round), ratio: +ratio.toFixed(2), threshold });
          }
          for (const element of document.querySelectorAll(selectors)) inspect(element);
          for (const input of document.querySelectorAll('#account, #password')) {
            input.focus();
            await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
            inspect(input, 'focus');
          }
          return { actualTheme: document.body.dataset.seasonalTheme, actualLayout: document.body.dataset.portalLayout, checked, skipped: [...new Set(skipped)], issues };
        });
        checks.push({ id: design.id, theme, layout, ...result });
      }
    }
    console.log(design.id + ': contrast checked');
  }
  const report = { generatedAt: new Date().toISOString(), scope: 'Desktop 1440×1050, both seasonal themes and both layouts across ten designs. Open disclosures and focused account/password fields included. Waits for artwork loading and all CSS transitions to finish before measuring. Ratios use computed text color against opaque solid ancestor backgrounds; image, gradient and opacity-dependent samples are explicitly skipped. Spot checks are not a complete WCAG audit.', checks, issueCount: checks.reduce((sum, item) => sum + item.issues.length, 0) };
  fs.writeFileSync(path.join(root, 'seasonal-contrast-review.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ issueCount: report.issueCount, affected: checks.filter(item => item.issues.length).map(({ id, theme, layout, issues }) => ({ id, theme, layout, issues })) }, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
