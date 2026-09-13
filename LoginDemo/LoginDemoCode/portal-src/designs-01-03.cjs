module.exports = [
  {
    id: 'portal-01-service-desk',
    name: '晴白服務台',
    en: 'Service Desk',
    description: '登入、服務消息與資訊室協助各就其位，適合多數同仁每天使用的共用入口。',
    positioning: '穩健通用的組織服務入口',
    structure: '頂部組織列；雙欄主區；底部橫向服務台',
    loginPosition: '左側主欄，與右側狀態及公告並列',
    announcementStyle: '右欄精簡公告列，摘要與詳細內容分層',
    navigation: '頂部文字錨點導覽，底部服務捷徑',
    visualLanguage: '晴白底、海軍藍主操作、柔和細框與清楚的區塊標題',
    fit: '跨部門共用入口、日常行政、首次導入',
    tradeoff: '熟悉且易維護；品牌個性較克制，右欄需嚴格控制公告數量。',
    colors: { bg: '#f3f6fb', surface: '#ffffff', ink: '#182d45', muted: '#526579', line: '#d6e0ed', accent: '#174e83', onAccent: '#ffffff', soft: '#eaf2fb' },
    render: p => `<div class="desk-frame">${p.header}<main id="portalMain" class="desk-main">${p.intro}<div class="desk-primary"><div class="desk-login">${p.login}</div><div class="desk-updates">${p.status}${p.news}</div></div><div class="desk-assistance">${p.support}</div></main>${p.footer}</div>`,
    css: `
      .design-01 .desk-frame { max-width:1320px; margin:0 auto; padding:0 40px; }
      .design-01 .org-header { display:flex; align-items:center; justify-content:space-between; gap:28px; padding:25px 0; border-bottom:1px solid var(--line); }
      .design-01 .org-brand { display:flex; align-items:center; gap:12px; }
      .design-01 .header-nav { display:flex; flex-wrap:wrap; align-items:center; gap:8px 24px; }
      .design-01 .header-nav a { color:var(--ink); text-decoration:none; font-weight:650; }
      .design-01 .header-nav a:hover { color:var(--accent); text-decoration:underline; }
      .design-01 .desk-main { padding:14px 0 30px; }
      .design-01 .portal-intro { max-width:850px; padding:12px 0; margin-bottom:14px; }
      .design-01 .portal-intro h1 { font-size:clamp(28px,3vw,38px); letter-spacing:-.035em; line-height:1.3; margin-bottom:10px; }
      .design-01 .portal-purpose { color:var(--muted); max-width:760px; line-height:1.8; }
      .design-01 .desk-primary { display:grid; grid-template-columns:minmax(0,1.02fr) minmax(0,1fr); align-items:start; gap:24px; }
      .design-01 .desk-login,.design-01 .desk-updates { min-width:0; }
      .design-01 .desk-updates { display:grid; gap:20px; }
      .design-01 .panel { border-radius:16px; border:1px solid var(--line); background:var(--surface); padding:28px; box-shadow:0 6px 22px #183a6310; }
      .design-01 .login-panel { padding:32px; border-top:4px solid var(--accent); }
      .design-01 .context-panel { border-radius:9px; background:var(--soft); }
      .design-01 .login-panel input { border-radius:8px; }
      .design-01 .login-panel .btn-primary { border-radius:8px; }
      .design-01 .status-panel { box-shadow:none; }
      .design-01 .news-panel { box-shadow:none; }
      .design-01 .notice-item { border-bottom:1px solid var(--line); padding:18px 0; }
      .design-01 .notice-item:first-child { padding-top:6px; }
      .design-01 .notice-item:last-child { border-bottom:0; padding-bottom:0; }
      .design-01 .desk-assistance { margin-top:24px; }
      .design-01 .support-panel { display:grid; grid-template-columns:1fr 1fr; column-gap:38px; }
      .design-01 .support-panel > h2,.design-01 .support-panel > .panel-heading,.design-01 .support-panel > .section-heading { grid-column:1/-1; }
      .design-01 .support-panel > .support-links { grid-column:1; }
      .design-01 .support-panel > .contact-lines { grid-column:2; grid-row:2 / span 2; padding:18px 22px; background:var(--soft); border-radius:10px; }
      .design-01 .support-panel > details { grid-column:1; }
      .design-01 .portal-footer { border-top:1px solid var(--line); padding:24px 0 30px; }
      @media(max-width:1000px) {
        .design-01 .desk-frame { padding:0 26px; }
        .design-01 .desk-primary { grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr); gap:18px; }
        .design-01 .panel { padding:22px; }
        .design-01 .support-panel { column-gap:22px; }
      }
      @media(max-width:760px) {
        .design-01 .desk-frame { padding:0 18px; }
        .design-01 .org-header { align-items:flex-start; flex-direction:column; gap:14px; padding:20px 0 12px; }
        .design-01 .header-nav { gap:8px 18px; }
        .design-01 .desk-main { padding-top:25px; }
        .design-01 .portal-intro { margin-bottom:20px; }
        .design-01 .desk-primary { grid-template-columns:minmax(0,1fr); gap:18px; }
        .design-01 .panel { padding:22px; border-radius:12px; }
        .design-01 .support-panel { display:block; }
        .design-01 .support-panel > .contact-lines { margin-top:16px; padding:16px; }
        .design-01 .desk-assistance { margin-top:18px; }
      }
      @media(max-width:390px) { .design-01 .desk-frame { padding:0 14px; } .design-01 .panel { padding:19px; } }
    `
  },
  {
    id: 'portal-02-focus-window',
    name: '靜心單窗',
    en: 'Focus Window',
    description: '把登入放在畫面中央；服務狀態直接可見，公告與完整協助按需要展開。',
    positioning: '減少初次使用者的資訊負擔',
    structure: '窄幅置中單窗；主操作、狀態、可展開資訊依序排列',
    loginPosition: '中央唯一主表單，前後沒有競爭性的卡片',
    announcementStyle: '原生展開區內顯示摘要，首頁維持少量資訊',
    navigation: '中央頁內工具帶，公告與協助以展開標題操作',
    visualLanguage: '石灰白、墨綠操作、極簡字排與大面積留白',
    fit: '不熟悉資訊操作的同仁、手機使用、低頻登入',
    tradeoff: '主要任務清楚；一般公告和完整 FAQ 需主動展開，狀態不可收折。',
    colors: { bg: '#f6f7f2', surface: '#ffffff', ink: '#22372f', muted: '#55685e', line: '#d6dfd5', accent: '#245b45', onAccent: '#ffffff', soft: '#edf3eb' },
    render: p => `<div class="focus-frame">${p.header}<nav class="focus-tools" aria-label="頁內快速工具"><a href="#login-section">登入入口</a><a href="#status-section">服務狀態</a><a href="#focus-help">登入有困難</a></nav><main id="portalMain" class="focus-main">${p.intro}<div class="focus-window">${p.login}</div><div class="focus-status">${p.status}</div><div class="focus-folds"><details class="focus-disclosure" id="focus-notices"><summary><span>重要公告與異動</span><span class="fold-action">展開閱讀</span></summary>${p.news}</details><details class="focus-disclosure" id="focus-help"><summary><span>登入有困難？取得協助</span><span class="fold-action">不需登入</span></summary>${p.support}</details></div></main>${p.footer}</div>`,
    css: `
      .design-02 .focus-frame { max-width:1260px; margin:0 auto; padding:0 40px; }
      .design-02 .org-header { display:flex; align-items:center; justify-content:space-between; gap:24px; padding:26px 0 22px; }
      .design-02 .org-brand { display:flex; align-items:center; gap:12px; }
      .design-02 .header-nav { display:none; }
      .design-02 .header-nav a { color:var(--muted); font-weight:550; }
      .design-02 .focus-tools { display:flex; flex-wrap:wrap; justify-content:center; gap:4px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:5px 0; }
      .design-02 .focus-tools a { display:flex; min-height:44px; padding:9px 25px; align-items:center; justify-content:center; color:var(--ink); text-decoration:none; font-size:14px; font-weight:650; }
      .design-02 .focus-tools a:hover { background:var(--soft); }
      .design-02 .focus-main { width:min(100%,630px); margin:0 auto; padding:14px 0 40px; }
      .design-02 .portal-intro { text-align:center; padding:10px 0; margin-bottom:16px; }
      .design-02 .portal-intro h1 { font-size:clamp(28px,3vw,36px); font-weight:650; letter-spacing:.015em; line-height:1.35; }
      .design-02 .portal-purpose { max-width:540px; margin-left:auto; margin-right:auto; line-height:1.85; color:var(--muted); }
      .design-02 .panel { padding:27px 32px; border:1px solid var(--line); border-radius:4px; background:var(--surface); box-shadow:none; }
      .design-02 .login-panel { padding:34px 42px; border-top:3px solid var(--accent); box-shadow:0 12px 35px #244a3b0b; }
      .design-02 .login-panel input { border-radius:3px; }
      .design-02 .login-panel .btn-primary { border-radius:3px; }
      .design-02 .context-panel { border-radius:3px; border-left:3px solid var(--accent); background:var(--soft); }
      .design-02 .focus-status { margin-top:20px; }
      .design-02 .status-panel { background:transparent; padding:23px 26px; }
      .design-02 .focus-folds { margin-top:20px; border-top:1px solid var(--line); }
      .design-02 .focus-disclosure { border-bottom:1px solid var(--line); }
      .design-02 .focus-disclosure > summary { list-style:none; display:flex; align-items:center; gap:14px; cursor:pointer; min-height:70px; padding:17px 4px; font-weight:650; color:var(--ink); }
      .design-02 .focus-disclosure > summary::-webkit-details-marker { display:none; }
      .design-02 .focus-disclosure > summary::before { content:'+'; width:26px; height:26px; display:flex; align-items:center; justify-content:center; border:1px solid var(--line); font-size:18px; font-weight:400; flex:none; }
      .design-02 .focus-disclosure[open] > summary::before { content:'−'; }
      .design-02 .fold-action { margin-left:auto; font-size:12px; font-weight:450; color:var(--muted); white-space:nowrap; }
      .design-02 .focus-disclosure > .panel { border:0; border-radius:0; margin:0 0 16px; padding:20px 24px; background:var(--surface); }
      .design-02 .focus-disclosure .notice-item { padding:17px 0; border-bottom:1px solid var(--line); }
      .design-02 .focus-disclosure .notice-item:last-child { border-bottom:0; }
      .design-02 .portal-footer { max-width:820px; margin:0 auto; text-align:center; padding:0 0 30px; }
      @media(max-width:760px) {
        .design-02 .focus-frame { padding:0 22px; }
        .design-02 .org-header { flex-direction:column; align-items:flex-start; gap:12px; padding:20px 0 14px; }
        .design-02 .header-nav { gap:6px 18px; }
        .design-02 .focus-main { padding-top:28px; }
        .design-02 .focus-tools a { padding:9px 17px; }
      }
      @media(max-width:480px) {
        .design-02 .focus-frame { padding:0 17px; }
        .design-02 .focus-tools { justify-content:space-between; gap:0; }
        .design-02 .focus-tools a { font-size:13px; padding:9px 8px; }
        .design-02 .portal-intro { text-align:left; margin-bottom:23px; }
        .design-02 .portal-intro h1 { font-size:28px; }
        .design-02 .login-panel { padding:25px 22px; }
        .design-02 .status-panel { padding:22px; }
        .design-02 .focus-disclosure > summary { gap:9px; font-size:14px; }
        .design-02 .fold-action { font-size:12px; }
        .design-02 .focus-disclosure > .panel { padding:17px 18px; }
        .design-02 .portal-footer { text-align:left; }
      }
    `
  },
  {
    id: 'portal-03-night-command',
    name: '夜班指揮',
    en: 'Night Service',
    description: '組織導航留在左側；中央完成登入，右側依序閱讀服務狀態與公告。',
    positioning: '值班環境中清楚、安定的資訊服務窗口',
    structure: '左側服務欄；中央登入工作區；右側消息時間軸',
    loginPosition: '主工作區中央，左側持續保留組織與支援識別',
    announcementStyle: '右侧直向時間軸，以發布資訊和文字嚴重程度引導閱讀',
    navigation: '左側垂直導覽與下方完整服務台；手機轉為上方快捷列',
    visualLanguage: '霧面深藍、薄線框、青綠重點與緊湊分區',
    fit: '輪班與共用工作站、偏好深色畫面的操作環境',
    tradeoff: '多區資訊持續可見；深色版本與窄螢幕重排需額外維護、在明亮場所應測試閱讀性。',
    colors: { bg: '#101e2b', surface: '#192b3b', ink: '#eef4f8', muted: '#b8c8d5', line: '#405668', accent: '#9edbd3', onAccent: '#122c2c', soft: '#243d4b' },
    render: p => `<div class="command-shell"><div class="command-brand">${p.header}</div><main id="portalMain" class="command-main">${p.intro}<div class="command-grid"><div class="command-login">${p.login}</div><div class="command-feed">${p.status}${p.news}</div></div></main><div class="command-support">${p.support}</div><div class="command-bottom">${p.footer}</div></div>`,
    css: `
      .design-03 { color-scheme:dark; }
      .design-03 .command-shell { display:grid; grid-template-columns:260px minmax(0,1fr); grid-template-areas:'brand main' 'support main' 'bottom bottom'; grid-template-rows:auto 1fr auto; min-height:100vh; max-width:1600px; margin:0 auto; }
      .design-03 .command-brand { grid-area:brand; min-width:0; border-right:1px solid var(--line); background:#132433; padding:31px 25px 15px; }
      .design-03 .org-header { display:flex; align-items:flex-start; flex-direction:column; gap:35px; padding:0; border:0; }
      .design-03 .org-brand { display:flex; align-items:flex-start; flex-direction:column; gap:17px; }
      .design-03 .header-nav { display:flex; align-items:stretch; flex-direction:column; width:100%; gap:7px; }
      .design-03 .header-nav a { display:flex; align-items:center; padding:10px 13px; min-height:44px; border-left:2px solid var(--line); text-decoration:none; color:var(--ink); }
      .design-03 .header-nav a:hover { background:var(--soft); border-color:var(--accent); }
      .design-03 .command-main { grid-area:main; min-width:0; padding:36px 32px 34px; }
      .design-03 .portal-intro { max-width:900px; padding-bottom:22px; margin-bottom:24px; border-bottom:1px solid var(--line); }
      .design-03 .portal-intro h1 { font-size:clamp(27px,2.5vw,36px); line-height:1.35; letter-spacing:.025em; }
      .design-03 .portal-purpose { color:var(--muted); line-height:1.8; max-width:800px; }
      .design-03 .command-grid { display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,1fr); align-items:start; gap:22px; }
      .design-03 .command-login,.design-03 .command-feed { min-width:0; }
      .design-03 .command-feed { display:grid; gap:21px; }
      .design-03 .panel { padding:25px; background:var(--surface); border:1px solid var(--line); border-radius:5px; box-shadow:none; }
      .design-03 .login-panel { border-top:3px solid var(--accent); }
      .design-03 .context-panel { background:var(--soft); border:1px solid var(--line); border-radius:3px; }
      .design-03 .login-panel input { background:#102433; color:var(--ink); border-color:#60788a; border-radius:3px; }
      .design-03 .login-panel input::placeholder { color:#b3c3cf; opacity:1; }
      .design-03 .login-panel input:focus { background:#102433; color:var(--ink); }
      .design-03 .login-panel .btn-primary { border-radius:3px; font-weight:750; }
      .design-03 .status-panel { background:transparent; }
      .design-03 .news-panel { border:0; border-top:1px solid var(--line); border-radius:0; padding:23px 1px 12px; background:transparent; }
      .design-03 .news-list { margin-left:7px; border-left:1px solid #668195; padding-left:20px; }
      .design-03 .notice-item { position:relative; padding:4px 0 24px; border:0; }
      .design-03 .notice-item::before { content:''; position:absolute; width:8px; height:8px; background:var(--accent); border:2px solid var(--bg); outline:1px solid #668195; border-radius:50%; left:-25px; top:13px; }
      .design-03 .notice-item:last-child { padding-bottom:2px; }
      .design-03 .command-support { grid-area:support; min-width:0; border-right:1px solid var(--line); padding:15px 25px 25px; background:#132433; }
      .design-03 .support-panel { padding:24px 0 0; border:0; border-top:1px solid var(--line); border-radius:0; background:transparent; }
      .design-03 .support-panel h2 { font-size:19px; }
      .design-03 .support-links { display:flex; flex-direction:column; align-items:stretch; }
      .design-03 .support-links > * { justify-content:flex-start; }
      .design-03 .contact-lines { font-size:13px; line-height:1.8; overflow-wrap:anywhere; }
      .design-03 .command-bottom { grid-area:bottom; padding:21px 32px; border-top:1px solid var(--line); }
      .design-03 .portal-footer { color:var(--muted); }
      .design-03 .portal-footer a { color:var(--accent); }
      .design-03 details { border-color:var(--line); }
      .design-03 .form-text { color:var(--muted); }
      @media(max-width:1200px) {
        .design-03 .command-shell { grid-template-columns:225px minmax(0,1fr); }
        .design-03 .command-main { padding:29px 23px; }
        .design-03 .command-brand,.design-03 .command-support { padding-left:20px; padding-right:20px; }
        .design-03 .command-grid { grid-template-columns:minmax(0,1fr); }
        .design-03 .command-feed { grid-template-columns:minmax(0,1fr); }
        .design-03 .panel { padding:25px; }
        .design-03 .support-panel { padding:22px 0 0; }
        .design-03 .news-panel { padding:24px 1px 8px; }
      }
      @media(max-width:800px) {
        .design-03 .command-shell { display:block; }
        .design-03 .command-brand { padding:23px 24px 15px; border-right:0; border-bottom:1px solid var(--line); }
        .design-03 .org-header { gap:18px; }
        .design-03 .org-brand { flex-direction:row; align-items:center; gap:14px; }
        .design-03 .header-nav { flex-direction:row; flex-wrap:wrap; gap:6px 14px; }
        .design-03 .header-nav a { padding:8px 11px; border-left:0; border-bottom:1px solid var(--line); }
        .design-03 .command-main { padding:27px 24px; }
        .design-03 .command-grid { grid-template-columns:minmax(0,1fr); }
        .design-03 .command-support { border-right:0; border-top:1px solid var(--line); padding:24px; }
        .design-03 .support-panel { border:0; padding:0; }
        .design-03 .support-links { flex-direction:row; flex-wrap:wrap; }
        .design-03 .command-bottom { padding:22px 24px; }
      }
      @media(max-width:480px) {
        .design-03 .command-brand { padding:20px 18px 13px; }
        .design-03 .command-main { padding:24px 18px; }
        .design-03 .panel { padding:23px 20px; }
        .design-03 .news-panel { padding:23px 2px 5px; }
        .design-03 .support-panel { padding:0; }
        .design-03 .command-support,.design-03 .command-bottom { padding:23px 20px; }
        .design-03 .portal-intro h1 { font-size:28px; }
      }
    `
  }
];
