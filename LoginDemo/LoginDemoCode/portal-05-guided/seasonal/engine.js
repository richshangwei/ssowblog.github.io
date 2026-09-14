(function ($) {
  'use strict';
  $(function () {
    const config = window.PortalSeasonalConfig;
    if (!config || !config.themes) return;
    const themes = config.themes;
    const body = document.body;
    const root = document.getElementById('portalDesign');
    const params = new URLSearchParams(location.search);
    const hasTheme = id => Object.prototype.hasOwnProperty.call(themes, id);
    const validLayout = value => value === 'standard' || value === 'immersive';
    let selectedTheme = hasTheme(params.get('theme')) ? params.get('theme') : 'auto';
    let selectedLayout = validLayout(params.get('layout')) ? params.get('layout') : 'auto';
    let previewDate = '';
    let lastDay = '';
    let mounted = null;
    let imageVersion = 0;
    let themeKey = '';
    const paletteKeys = ['bg', 'surface', 'ink', 'muted', 'line', 'accent', 'onAccent', 'soft'];
    const paletteName = key => '--' + (key === 'onAccent' ? 'on-accent' : key);
    const dateValid = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(Date.parse(value + 'T12:00:00Z')) && new Date(value + 'T12:00:00Z').toISOString().slice(0, 10) === value;
    function localDay(now = new Date()) {
      try {
        const parts = new Intl.DateTimeFormat('en', { timeZone: config.timeZone || 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
        return ['year', 'month', 'day'].map(type => parts.find(p => p.type === type).value).join('-');
      } catch (_) { return null; }
    }
    function resolveSchedule(day) {
      if (!config.scheduleEnabled || !dateValid(day)) return null;
      return (config.schedules || []).filter(item => item.enabled === true && hasTheme(item.theme) && dateValid(item.start) && dateValid(item.end) && item.start <= item.end && item.start <= day && day <= item.end)
        .sort((a, b) => (Number(b.priority) || 0) - (Number(a.priority) || 0) || String(a.id).localeCompare(String(b.id)))[0] || null;
    }
    // Assets are local and explicit. Query parameters can only select a configured theme.
    function localAsset(value) {
      if (typeof value !== 'string' || !/^seasonal\/assets\/[a-zA-Z0-9_./-]+\.(svg|png|jpe?g|webp)$/i.test(value) || value.split('/').includes('..')) return null;
      return value;
    }
    const controls = document.createElement('details');
    controls.id = 'seasonalControls';
    controls.innerHTML = '<summary>節慶展示：背景、配色與資訊收合</summary><div class="seasonal-controls-grid"><div><label for="seasonTheme">外觀模組</label><select id="seasonTheme"><option value="auto">依設定日期自動套用</option></select></div><div><label for="seasonLayout">資訊呈現</label><select id="seasonLayout"><option value="auto">依外觀預設</option><option value="standard">保留原版配置</option><option value="immersive">背景主視覺・資訊收合</option></select></div><div><label for="seasonDate">排程預覽日期（僅展示）</label><input type="date" id="seasonDate"><small>留白以設定時區的今日判定</small></div><button type="button" id="seasonReset">回到日期自動套用</button></div><p id="seasonPreviewStatus" class="demo-footnote" role="status"></p><p class="demo-footnote">節慶僅改變外觀；不改變服務狀態、登入結果或權限。背景為設計示範，排程預設停用。<a href="../SEASONAL-GUIDE.md">模組維護說明 ↗</a></p>';
    document.querySelector('.demo-bar').append(controls);
    Object.entries(themes).forEach(([id, theme]) => $('#seasonTheme').append($('<option>').val(id).text(theme.name || id)));
    $('#seasonTheme').val(selectedTheme); $('#seasonLayout').val(selectedLayout);
    function move(node, parent, records) {
      const marker = document.createComment('seasonal restore');
      node.before(marker); records.push({ node, marker }); parent.append(node);
    }
    function mount() {
      if (mounted) return;
      const records = [];
      const oldChildren = Array.from(root.children).map(node => ({ node, hidden: node.hidden }));
      const stage = document.createElement('div'); stage.id = 'holidayStage';
      stage.innerHTML = '<div class="holiday-top"></div><main class="holiday-main"><div class="holiday-story"><div class="holiday-identity"></div><div class="holiday-greeting"><span class="holiday-kicker">SEASONAL EDITION <span>節慶外觀示範</span></span><h2 id="holidayHeadline"></h2><p id="holidayMessage"></p></div><span class="holiday-art-note">節慶背景設計示範</span></div><div class="holiday-task"><div class="holiday-login"></div><div class="holiday-information"><details id="seasonNews"><summary>公告與功能異動 <span>點選展開</span></summary><div class="season-news-content"></div></details><details id="seasonService"><summary>完整服務狀態 <span>點選展開</span></summary><div class="season-service-content"></div></details><details id="seasonHelp"><summary>常見問題與支援資訊 <span>點選展開</span></summary><div class="season-help-content"></div></details></div></div></main><div class="holiday-bottom"></div>';
      root.append(stage);
      for (const [selector, slot] of [['.org-header','.holiday-top'],['.portal-intro','.holiday-identity'],['#login-section','.holiday-login'],['#news-section','.season-news-content'],['#status-section','.season-service-content'],['#support-section','.season-help-content'],['.portal-footer','.holiday-bottom']]) move(root.querySelector(selector), stage.querySelector(slot), records);
      const topHelp = document.createElement('button'); topHelp.type = 'button'; topHelp.className = 'holiday-top-help'; topHelp.dataset.action = 'contact'; topHelp.textContent = '免登入求助 ↗'; stage.querySelector('.org-header').append(topHelp);
      const login = stage.querySelector('#login-section');
      const compact = document.createElement('div'); compact.className = 'holiday-status'; compact.setAttribute('aria-label', '目前服務狀態');
      compact.innerHTML = '<div class="status-headline status-tone"><span class="status-dot" aria-hidden="true"></span><span class="status-label"></span></div><div class="holiday-status-meta">資料更新：<span class="seasonal-updated"></span><button type="button" class="link-button" data-action="service-detail">查看詳情</button></div>';
      compact.querySelector('.status-label').textContent = document.querySelector('#status-section .status-label').textContent;
      compact.querySelector('.status-tone').dataset.severity = document.querySelector('#status-section .status-tone').dataset.severity;
      compact.querySelector('.seasonal-updated').textContent = document.getElementById('statusUpdated').textContent;
      login.querySelector('#impactAlert').before(compact);
      const more = document.createElement('details'); more.id = 'seasonAccount'; more.className = 'holiday-account'; more.innerHTML = '<summary>帳號申請、首次使用與電腦說明</summary><div class="holiday-account-content"></div>';
      login.append(more);
      for (const selector of ['.account-guide','.account-actions','.workstation-note']) move(login.querySelector(selector), more.querySelector('div'), records);
      const help = document.createElement('nav'); help.className = 'holiday-help'; help.setAttribute('aria-label', '免登入支援'); help.innerHTML = '<button type="button" data-action="contact">聯絡資訊室 ↗</button><button type="button" data-action="report">免登入問題回報</button>';
      login.append(help);
      oldChildren.forEach(({ node }) => { if (node.parentElement === root) node.hidden = true; });
      mounted = { stage, records, oldChildren, additions: [topHelp, compact, more, help] };
    }
    function unmount() {
      if (!mounted) return;
      [...mounted.records].reverse().forEach(({ node, marker }) => { marker.replaceWith(node); });
      mounted.additions.forEach(node => node.remove());
      mounted.oldChildren.forEach(({ node, hidden }) => { node.hidden = hidden; });
      mounted.stage.remove(); mounted = null;
    }
    function setPalette(theme) {
      paletteKeys.forEach(key => {
        const value = theme.palette?.[key]; const css = paletteName(key);
        if (typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)) body.style.setProperty(css, value); else body.style.removeProperty(css);
      });
      for (const [field, property] of [['artInk','--season-art-ink'],['artMuted','--season-art-muted']]) {
        const value = theme[field]; if (/^#[0-9a-f]{6}$/i.test(value || '')) body.style.setProperty(property, value); else body.style.removeProperty(property);
      }
    }
    function setArtwork(theme) {
      const version = ++imageVersion;
      body.style.removeProperty('--season-image'); body.style.removeProperty('--season-mobile-image');
      body.dataset.seasonalArtwork = 'none';
      const desktop = localAsset(theme.background); const mobile = localAsset(theme.mobileBackground) || desktop;
      function preload(asset, property, primary) {
        if (!asset) return;
        const img = new Image();
        img.onload = () => { if (version !== imageVersion) return; body.style.setProperty(property, 'url("' + new URL(asset, document.baseURI).href + '")'); if (primary) body.dataset.seasonalArtwork = 'ready'; };
        img.onerror = () => { if (version === imageVersion && primary) { body.dataset.seasonalArtwork = 'unavailable'; $('#seasonPreviewStatus').append(' 背景檔案無法載入，已使用純色備援；登入仍可操作。'); } };
        img.src = asset;
      }
      preload(desktop, '--season-image', true); preload(mobile, '--season-mobile-image', false);
      for (const [field, css] of [['backgroundPosition','--season-position'],['mobileBackgroundPosition','--season-mobile-position']]) {
        const value = theme[field]; if (typeof value === 'string' && /^[a-z\d%. -]+$/i.test(value)) body.style.setProperty(css, value); else body.style.removeProperty(css);
      }
    }
    function apply() {
      const day = previewDate || localDay(); lastDay = localDay();
      const rule = resolveSchedule(day);
      const fallback = hasTheme(config.defaultTheme) ? config.defaultTheme : 'default';
      const id = selectedTheme === 'auto' ? (rule?.theme || fallback) : selectedTheme;
      const theme = themes[id] || {};
      const layout = selectedLayout !== 'auto' ? selectedLayout : (selectedTheme === 'auto' && validLayout(rule?.layout) ? rule.layout : (validLayout(theme.preferredLayout) ? theme.preferredLayout : (validLayout(config.defaultLayout) ? config.defaultLayout : 'standard')));
      const focused = document.activeElement;
      body.dataset.portalLayout = layout;
      body.dataset.seasonalTheme = id;
      body.dataset.seasonalActive = id !== 'default' ? 'true' : 'false';
      if (layout === 'immersive') mount(); else unmount();
      setPalette(theme);
      if (mounted) {
        $('#holidayHeadline').text(theme.headline || '清楚登入，安心工作。');
        $('#holidayMessage').text(theme.message || '需要的資訊，一點即開。登入與支援，始終就在身邊。');
      }
      const source = selectedTheme !== 'auto' ? '手動展示' : (rule ? '依日期排程：' + rule.id : (config.scheduleEnabled ? '今日無適用排程' : '日期排程尚未啟用'));
      $('#seasonPreviewStatus').text(source + ' · ' + (theme.name || id) + ' · ' + (layout === 'immersive' ? '背景主視覺' : '原版配置') + ' · 判定日期：' + (day || '時區設定無效，使用預設外觀') + (previewDate ? '（模擬日期）' : '（' + (config.timeZone || 'Asia/Taipei') + '）'));
      if (themeKey !== id) { themeKey = id; setArtwork(theme); }
      else if (body.dataset.seasonalArtwork === 'unavailable') $('#seasonPreviewStatus').append(' 背景檔案無法載入，已使用純色備援；登入仍可操作。');
      if (focused && focused !== body && focused.isConnected) {
        if (focused.getClientRects().length) focused.focus({ preventScroll: true });
        else if (focused.closest('#portalDesign')) { const account = document.getElementById('account'); if (account.getClientRects().length) account.focus({ preventScroll: true }); }
      }
    }
    $('#seasonTheme').on('change', function () { selectedTheme = this.value; apply(); });
    $('#seasonLayout').on('change', function () { selectedLayout = this.value; apply(); });
    $('#seasonDate').on('change', function () { previewDate = dateValid(this.value) ? this.value : ''; apply(); });
    $('#seasonReset').on('click', () => { selectedTheme = selectedLayout = 'auto'; previewDate = ''; $('#seasonTheme,#seasonLayout').val('auto'); $('#seasonDate').val(''); apply(); });
    function onDateChange() { if (!previewDate && localDay() !== lastDay) apply(); }
    document.addEventListener('visibilitychange', () => { if (!document.hidden) onDateChange(); });
    window.setInterval(onDateChange, 60000);
    // The read-only resolver also lets maintainers verify calendar boundaries without logging in.
    window.PortalSeasonal = Object.freeze({ resolveSchedule, localDay });
    apply();
  });
})(jQuery);
