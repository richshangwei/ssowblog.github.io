/* ============================================================================
 * theme-engine.js — 節日主題引擎
 * ----------------------------------------------------------------------------
 * 載入順序：home.css → theme.css，然後 home.js → theme-config.js → theme-engine.js
 *
 * 做三件事：
 *   1. 依今天的日期挑出該套用的主題（theme-config.js 的 when 規則）
 *   2. 把主題的色票與背景寫進 <html>，並注入背景舞台層
 *   3. 提供 full / focus 兩種版型：focus 只留登入所需資訊，其餘收進抽屜
 *
 * 對外 API（可在 Console 或其他程式呼叫）：
 *   ThemeEngine.list()                 列出所有主題
 *   ThemeEngine.current()              目前主題與版型
 *   ThemeEngine.apply('mid-autumn')    手動套用主題
 *   ThemeEngine.setLayout('focus')     切換版型
 *   ThemeEngine.resolve('2026-09-25')  查某一天會套到哪個主題
 * ==========================================================================*/
(function () {
  'use strict';

  var CFG = window.THEME_CONFIG;
  if (!CFG) { console.warn('[theme] 找不到 THEME_CONFIG，主題未啟用。'); return; }

  var OPT = CFG.options || {};
  var root = document.documentElement;
  var STORAGE_KEY = 'ess-theme-preview';

  /* ---------------------------------------------------------------- 小工具 */

  var ICONS = {
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    book: '<path d="M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
  };

  function svgIcon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.grid) + '</svg>';
  }

  // 把設定檔裡的 SVG 片段包成可平鋪的 data URI
  function motifToUrl(fragment) {
    if (!fragment) return 'none';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">' + fragment + '</svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22') + '")';
  }

  // 依設定的時區取得今天（YYYY-MM-DD）
  function today() {
    try {
      return new Intl.DateTimeFormat('en-CA', {
        timeZone: OPT.timeZone || 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit'
      }).format(new Date());
    } catch (e) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  /* ------------------------------------------------------------ 日期規則 */

  function matches(when, dateStr) {
    if (!when) return false;
    var md = dateStr.slice(5);            // 'MM-DD'
    switch (when.type) {
      case 'always':
        return true;
      case 'never':
        return false;
      case 'annual':
        // 支援跨年，例如 12-18 → 01-03
        return when.from <= when.to
          ? (md >= when.from && md <= when.to)
          : (md >= when.from || md <= when.to);
      case 'ranges':
        return (when.list || []).some(function (r) { return dateStr >= r[0] && dateStr <= r[1]; });
      default:
        return false;
    }
  }

  function resolve(dateStr) {
    var d = dateStr || today();
    var hit = null;
    CFG.themes.forEach(function (t) {
      if (!matches(t.when, d)) return;
      if (!hit || (t.priority || 0) >= (hit.priority || 0)) hit = t;
    });
    return hit || CFG.themes[0];
  }

  function byId(id) {
    return CFG.themes.filter(function (t) { return t.id === id; })[0] || null;
  }

  /* ---------------------------------------------------------- 背景舞台層 */

  var stage = document.createElement('div');
  stage.className = 'theme-stage';
  stage.setAttribute('aria-hidden', 'true');
  stage.innerHTML = '<span class="theme-stage__image"></span>' +
    '<span class="theme-stage__motif"></span>' +
    '<span class="theme-stage__scrim"></span>';
  document.body.insertBefore(stage, document.body.firstChild);

  /* -------------------------------------------------------------- 套用主題 */

  var appliedTokens = [];
  var originalGreeting = null;
  var state = { theme: null, layout: null };

  function captureGreeting() {
    if (originalGreeting) return;
    var box = document.querySelector('.welcome');
    if (!box) return;
    originalGreeting = {
      eyebrow: box.querySelector('.eyebrow'),
      title: box.querySelector('h1'),
      text: box.querySelector('p')
    };
    Object.keys(originalGreeting).forEach(function (k) {
      if (originalGreeting[k]) originalGreeting[k].dataset.themeOriginal = originalGreeting[k].textContent;
    });
  }

  function applyGreeting(theme) {
    captureGreeting();
    if (!originalGreeting) return;
    var g = (OPT.applyGreeting === false) ? null : theme.greeting;
    ['eyebrow', 'title', 'text'].forEach(function (k) {
      var el = originalGreeting[k];
      if (!el) return;
      el.textContent = (g && g[k]) ? g[k] : el.dataset.themeOriginal;
    });
  }

  function applyBadge(theme) {
    var box = document.querySelector('.welcome > div') || document.querySelector('.welcome');
    if (!box) return;
    var badge = box.querySelector('.theme-badge');
    if (!theme.badge) { if (badge) badge.remove(); return; }
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'theme-badge';
      box.insertBefore(badge, box.firstChild);
    }
    badge.textContent = theme.badge;
  }

  function apply(id, opts) {
    var theme = byId(id) || resolve();
    var stageCfg = theme.stage || {};

    // 清掉上一個主題寫進去的變數
    appliedTokens.forEach(function (k) { root.style.removeProperty(k); });
    appliedTokens = [];

    Object.keys(theme.tokens || {}).forEach(function (k) {
      root.style.setProperty(k, theme.tokens[k]);
      appliedTokens.push(k);
    });

    var vars = {
      '--theme-bg-gradient': stageCfg.gradient || 'none',
      '--theme-bg-image': stageCfg.image ? 'url("' + stageCfg.image + '")' : 'none',
      '--theme-motif': motifToUrl(stageCfg.motif),
      '--theme-motif-size': stageCfg.motifSize || '320px',
      '--theme-motif-opacity': String(stageCfg.motifOpacity != null ? stageCfg.motifOpacity : 0.25),
      '--theme-scrim': stageCfg.scrim || 'none',
      '--theme-full-opacity': String(stageCfg.fullOpacity != null ? stageCfg.fullOpacity : 0.3),
      '--theme-focus-opacity': String(stageCfg.focusOpacity != null ? stageCfg.focusOpacity : 1)
    };
    Object.keys(vars).forEach(function (k) {
      root.style.setProperty(k, vars[k]);
      appliedTokens.push(k);
    });

    root.dataset.theme = theme.id;
    root.dataset.stageTone = (theme.tokens && theme.tokens['--theme-stage-tone']) || 'light';
    state.theme = theme.id;

    applyGreeting(theme);
    applyBadge(theme);

    if (!opts || opts.remember !== false) {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    }
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme.id, layout: state.layout } }));
    return theme;
  }

  /* ------------------------------------------- focus 版型：收合與抽屜 */

  var dockItems = (OPT.dock || []).map(function (item) {
    return { cfg: item, nodes: [], chip: null, panel: null };
  });
  var dock = null, drawer = null, drawerTitle = null, openChip = null;

  function buildDrawer() {
    if (drawer) return;
    drawer = document.createElement('div');
    drawer.className = 'theme-drawer';
    drawer.hidden = true;
    drawer.innerHTML =
      '<div class="theme-drawer__scrim" data-close></div>' +
      '<aside class="theme-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="theme-drawer-title">' +
        '<div class="theme-drawer__head">' +
          '<h2 id="theme-drawer-title"></h2>' +
          '<button type="button" class="theme-drawer__close" data-close aria-label="關閉">×</button>' +
        '</div>' +
        '<div class="theme-drawer__body"></div>' +
      '</aside>';
    document.body.appendChild(drawer);
    drawerTitle = drawer.querySelector('#theme-drawer-title');
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) closeDrawer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && !drawer.hidden) closeDrawer();
    });
  }

  function openDrawer(item) {
    buildDrawer();
    if (openChip && openChip !== item.chip) openChip.setAttribute('aria-expanded', 'false');
    drawer.querySelectorAll('.theme-panel').forEach(function (p) { p.hidden = p !== item.panel; });
    drawerTitle.textContent = item.cfg.label;
    drawer.hidden = false;
    item.chip.setAttribute('aria-expanded', 'true');
    openChip = item.chip;
    drawer.querySelector('.theme-drawer__close').focus();
  }

  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    if (openChip) { openChip.setAttribute('aria-expanded', 'false'); openChip.focus(); openChip = null; }
  }

  function enterFocus() {
    buildDrawer();
    var body = drawer.querySelector('.theme-drawer__body');

    dock = document.createElement('div');
    dock.className = 'theme-dock';
    dock.setAttribute('role', 'group');
    dock.setAttribute('aria-label', '展開更多資訊');

    // 第一輪：先把所有區塊的原始位置與數量記下來（一定要在任何搬動之前）
    dockItems.forEach(function (item) {
      item.nodes = [];
      (item.cfg.selectors || []).forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (node) {
          if (node.closest('.theme-drawer')) return;
          var parent = node.parentNode;
          item.nodes.push({ node: node, parent: parent, index: Array.prototype.indexOf.call(parent.children, node) });
        });
      });
      item.count = item.cfg.countSelector ? document.querySelectorAll(item.cfg.countSelector).length : 0;
    });

    // 第二輪：建立面板、把區塊整塊搬進抽屜（保留原本的互動與內容）、產生 chip
    dockItems.forEach(function (item) {
      if (!item.nodes.length) return;          // 這一頁沒有這個區塊就不做 chip

      var panel = document.createElement('div');
      panel.className = 'theme-panel';
      panel.id = 'theme-panel-' + item.cfg.id;
      panel.hidden = true;
      item.nodes.forEach(function (rec) { panel.appendChild(rec.node); });
      body.appendChild(panel);
      item.panel = panel;

      var count = item.count;
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'theme-chip';
      chip.setAttribute('aria-expanded', 'false');
      chip.setAttribute('aria-controls', panel.id);
      chip.innerHTML = svgIcon(item.cfg.icon) + '<span>' + item.cfg.label + '</span>' +
        (count ? '<span class="count">' + count + '</span>' : '');
      chip.addEventListener('click', function () {
        if (chip.getAttribute('aria-expanded') === 'true') closeDrawer(); else openDrawer(item);
      });
      dock.appendChild(chip);
      item.chip = chip;
    });

    var anchor = document.querySelector('.workspace');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(dock, anchor.nextSibling);
  }

  function exitFocus() {
    closeDrawer();
    // 依原本的位置把區塊放回頁面
    dockItems.forEach(function (item) {
      item.nodes.slice().sort(function (a, b) { return a.index - b.index; }).forEach(function (rec) {
        var ref = rec.parent.children[rec.index] || null;
        rec.parent.insertBefore(rec.node, ref);
      });
      item.nodes = [];
      if (item.panel) { item.panel.remove(); item.panel = null; }
      item.chip = null;
    });
    if (dock) { dock.remove(); dock = null; }
  }

  function setLayout(layout, opts) {
    var next = layout === 'focus' ? 'focus' : 'full';
    if (state.layout === next) return next;
    if (state.layout === 'focus') exitFocus();
    if (next === 'focus') enterFocus();
    root.dataset.layout = next;
    state.layout = next;
    if (!opts || opts.remember !== false) {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    }
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: state.theme, layout: next } }));
    return next;
  }

  /* --------------------------------------------------------- 預覽切換器 */

  function buildSwitcher() {
    if (OPT.showSwitcher === false) return;
    var box = document.createElement('div');
    box.className = 'theme-switch';
    box.innerHTML = '<label for="theme-pick">主題預覽</label>' +
      '<select id="theme-pick"></select>' +
      '<button type="button" class="theme-switch__layout" aria-pressed="false">背景版</button>';

    var select = box.querySelector('select');
    CFG.themes.forEach(function (t) {
      var o = document.createElement('option');
      o.value = t.id;
      o.textContent = t.name + (matches(t.when, today()) && t.id !== 'default' ? '（今天）' : '');
      select.appendChild(o);
    });
    select.value = state.theme;
    select.addEventListener('change', function () { apply(select.value); });

    var btn = box.querySelector('button');
    function syncBtn() {
      var focused = state.layout === 'focus';
      btn.setAttribute('aria-pressed', String(focused));
      btn.textContent = focused ? '完整版' : '背景版';
    }
    btn.addEventListener('click', function () { setLayout(state.layout === 'focus' ? 'full' : 'focus'); syncBtn(); });
    document.addEventListener('themechange', function () { select.value = state.theme; syncBtn(); });
    syncBtn();
    document.body.appendChild(box);
  }

  /* -------------------------------------------------------------- 啟動 */

  var params = new URLSearchParams(location.search);
  var saved = {};
  try { saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}

  var auto = resolve();
  var themeId = params.get(OPT.themeParam || 'theme') || saved.theme || auto.id;
  if (!byId(themeId)) themeId = auto.id;

  var isFestival = auto.id !== 'default';
  var layout = params.get(OPT.layoutParam || 'layout') || saved.layout ||
    (OPT.autoFocusOnFestival && isFestival ? 'focus' : (OPT.defaultLayout || 'full'));

  apply(themeId, { remember: false });
  setLayout(layout, { remember: false });
  buildSwitcher();

  window.ThemeEngine = {
    list: function () { return CFG.themes.map(function (t) { return { id: t.id, name: t.name }; }); },
    current: function () { return { theme: state.theme, layout: state.layout, autoToday: auto.id, date: today() }; },
    apply: apply,
    setLayout: setLayout,
    resolve: function (d) { return resolve(d).id; }
  };
})();
