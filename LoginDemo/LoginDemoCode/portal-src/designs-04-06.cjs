'use strict';

module.exports = [
  {
    id: 'portal-04-bulletin',
    name: '資訊公報',
    en: 'SERVICE BULLETIN',
    description: '像一份清楚編排的組織公報：左側閱讀重要訊息，右側專心登入。',
    positioning: '重視公告可讀性與正式組織溝通的共用入口。',
    structure: '橫式刊頭；左側標題、服務狀態與公告，右側獨立登入欄，頁底整合支援。',
    loginPosition: '桌機右側固定主欄；手機組織識別之後優先呈現。',
    announcementStyle: '刊物式標題與橫線分隔，公告摘要保持可見，完整內容另行展開。',
    navigation: '橫式章節索引，依登入、服務與協助分流。',
    visualLanguage: '暖紙色、酒紅重點、襯線大標與精細分隔線。',
    fit: '行政體系、教育醫院或需要清楚閱讀維護訊息的組織。',
    tradeoff: '訊息的閱讀感較強；應持續限制首頁公告數量，避免搶走登入焦點。',
    colors: { bg: '#f6f3ec', surface: '#fffcf6', ink: '#292a2b', muted: '#625d56', line: '#d4cec2', accent: '#8a333d', onAccent: '#ffffff', soft: '#eee5df' },
    render: p => `
      <div class="bulletin-wrap">
        ${p.header}
        <main id="portalMain" class="bulletin-grid">
          <div class="bulletin-intro"><div class="bulletin-edition">資訊服務 · 共用入口</div>${p.intro}</div>
          <div class="bulletin-login">${p.login}</div>
          <div class="bulletin-status">${p.status}</div>
          <div class="bulletin-news"><div class="bulletin-section-label"><span>服務消息</span><span aria-hidden="true">INFORMATION DESK</span></div>${p.news}</div>
          <div class="bulletin-support">${p.support}</div>
        </main>
        ${p.footer}
      </div>`,
    css: `
      .design-04 { background:var(--bg); }
      .design-04 .site-shell { max-width:1300px; margin:auto; padding:0 42px; }
      .design-04 .org-header { padding:26px 0 21px; border-bottom:3px double var(--ink); border-radius:0; background:transparent; }
      .design-04 .org-brand { letter-spacing:.035em; }
      .design-04 .header-nav { gap:4px; }
      .design-04 .header-nav a { border-radius:0; padding:10px 13px; border-left:1px solid var(--line); font-size:13px; }
      .design-04 .bulletin-grid { display:grid; grid-template-columns:minmax(0,1.12fr) minmax(360px,.88fr); grid-template-areas:'intro login' 'status login' 'news login' 'support support'; gap:23px 44px; padding:34px 0 20px; align-items:start; }
      .design-04 .bulletin-intro { grid-area:intro; }
      .design-04 .bulletin-edition { display:flex; align-items:center; gap:12px; font-size:12px; font-weight:700; letter-spacing:.15em; color:var(--accent); margin-bottom:18px; }
      .design-04 .bulletin-edition:before { content:''; width:30px; height:2px; background:currentColor; }
      .design-04 .portal-intro { padding:0; margin:0; }
      .design-04 .portal-intro h1 { font-family:Georgia,'Noto Serif TC','PMingLiU',serif; font-size:clamp(32px,3.5vw,47px); letter-spacing:.035em; line-height:1.3; font-weight:700; max-width:650px; margin-bottom:12px; }
      .design-04 .portal-purpose { max-width:540px; line-height:1.85; }
      .design-04 .bulletin-login { grid-area:login; }
      .design-04 .login-panel { border:1px solid var(--line); border-top:6px solid var(--accent); border-radius:0; background:var(--surface); box-shadow:8px 8px 0 #eae4d9; padding:30px; }
      .design-04 .login-panel h2 { font-family:Georgia,'Noto Serif TC','PMingLiU',serif; font-size:25px; }
      .design-04 .login-panel .form-control,.design-04 .login-panel .btn { border-radius:2px; }
      .design-04 .context-panel { border-radius:0; border-left:3px solid var(--accent); }
      .design-04 .bulletin-status { grid-area:status; }
      .design-04 .status-panel { padding:17px 0; border:0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); border-radius:0; background:transparent; box-shadow:none; }
      .design-04 .status-panel h2 { font-size:17px; }
      .design-04 .bulletin-news { grid-area:news; min-width:0; }
      .design-04 .bulletin-section-label { display:flex; justify-content:space-between; gap:16px; padding-bottom:12px; color:var(--accent); font-size:12px; font-weight:700; letter-spacing:.12em; }
      .design-04 .bulletin-section-label span:last-child { color:var(--muted); font-weight:500; letter-spacing:.08em; }
      .design-04 .news-panel { padding:0; border:0; border-radius:0; background:transparent; box-shadow:none; }
      .design-04 .news-panel h2 { font-family:Georgia,'Noto Serif TC','PMingLiU',serif; font-size:24px; }
      .design-04 .news-list { display:block; }
      .design-04 .notice-item { padding:17px 0; border:0; border-bottom:1px solid var(--line); border-radius:0; background:transparent; }
      .design-04 .notice-item h3 { font-family:Georgia,'Noto Serif TC','PMingLiU',serif; font-size:20px; line-height:1.55; }
      .design-04 .notice-item p { line-height:1.8; }
      .design-04 .notice-item summary { line-height:1.65; }
      .design-04 .bulletin-support { grid-area:support; margin-top:14px; }
      .design-04 .support-panel { display:grid; grid-template-columns:1fr 1fr; grid-template-areas:'heading faq' 'primary faq' 'links faq' 'contact faq'; column-gap:44px; border:0; border-top:3px double var(--ink); border-bottom:1px solid var(--line); border-radius:0; padding:25px 0; box-shadow:none; background:transparent; }
      .design-04 .support-panel>.panel-heading { grid-area:heading; }
      .design-04 .support-panel>.support-primary { grid-area:primary; }
      .design-04 .support-panel>.support-links { grid-area:links; }
      .design-04 .support-panel>.contact-lines { grid-area:contact; }
      .design-04 .support-panel>.faq-list { grid-area:faq; align-self:start; margin-top:0; }
      .design-04 .support-panel h2 { font-family:Georgia,'Noto Serif TC','PMingLiU',serif; }
      .design-04 .support-links { display:flex; flex-wrap:wrap; gap:12px; }
      .design-04 .contact-lines { padding:15px 0; }
      .design-04 .portal-footer { border:0; padding:23px 0 30px; }
      @media (max-width:1000px) {
        .design-04 .site-shell { padding:0 26px; }
        .design-04 .bulletin-grid { grid-template-columns:minmax(0,1fr) minmax(335px,1fr); column-gap:25px; }
        .design-04 .login-panel { padding:24px; }
        .design-04 .bulletin-section-label span:last-child { display:none; }
      }
      @media (max-width:760px) {
        .design-04 .site-shell { padding:0 18px; }
        .design-04 .org-header { padding:19px 0 15px; }
        .design-04 .header-nav { gap:0; }
        .design-04 .header-nav a { padding:10px; border-left:0; max-width:none; white-space:nowrap; }
        .design-04 .bulletin-grid { grid-template-columns:minmax(0,1fr); grid-template-areas:'intro' 'login' 'status' 'news' 'support'; gap:26px; padding-top:24px; }
        .design-04 .bulletin-edition { margin-bottom:10px; }
        .design-04 .portal-intro h1 { font-size:32px; }
        .design-04 .login-panel { padding:24px 21px; box-shadow:5px 5px 0 #eae4d9; }
        .design-04 .bulletin-support { margin-top:0; }
        .design-04 .support-panel { display:block; }
        .design-04 .support-panel>.faq-list { margin-top:18px; }
        .design-04 .bulletin-section-label span:last-child { display:inline; font-size:12px; }
      }
    `
  },
  {
    id: 'portal-05-guided',
    name: '清楚三步',
    en: 'GUIDED ACCESS',
    description: '先辨識入口、完成登入，再前往系統；將共用入口的下一步直接呈現在操作路徑上。',
    positioning: '為第一次使用及需要明確導引的同仁設計。',
    structure: '上方三步驟流程帶，下方服務狀態、中央登入、右側支援三欄；公告橫向排列。',
    loginPosition: '桌機中央主欄，以實色欄首和較寬欄位強調；手機緊接流程說明。',
    announcementStyle: '登入區之後的橫向摘要卡，適合快速比較影響範圍。',
    navigation: '流程工具列搭配章節捷徑，顯示登入後將進行系統選擇或導向。',
    visualLanguage: '鈷藍與白色、明確步驟數字、直角邊界與高對比按鈕。',
    fit: '新同仁比例較高、共用多套業務系統或常需解釋操作次序的組織。',
    tradeoff: '桌機三欄需要足夠寬度；平板應轉成兩欄，步驟帶需保持短句。',
    colors: { bg: '#eef2fa', surface: '#ffffff', ink: '#17233b', muted: '#55627a', line: '#cbd5e6', accent: '#204fbd', onAccent: '#ffffff', soft: '#e9efff' },
    render: p => `
      <div class="guided-wrap">
        ${p.header}
        <main id="portalMain" class="guided-main">
          <div class="guided-intro">${p.intro}</div>
          <ol class="guided-steps" aria-label="入口使用流程">
            <li><span class="guided-step-number" aria-hidden="true">01</span><div><strong>確認入口</strong><span>查看組織與目標系統</span></div></li>
            <li class="guided-step-current"><span class="guided-step-number" aria-hidden="true">02</span><div><strong>完成登入</strong><span>使用組織提供的帳號</span></div></li>
            <li><span class="guided-step-number" aria-hidden="true">03</span><div><strong>前往系統</strong><span>選擇可用系統或返回目標</span></div></li>
          </ol>
          <div class="guided-workspace">
            <div class="guided-status"><div class="guided-rail-label">登入前確認</div>${p.status}</div>
            <div class="guided-login">${p.login}</div>
            <div class="guided-support"><div class="guided-rail-label">隨時取得協助</div>${p.support}</div>
            <div class="guided-news">${p.news}</div>
          </div>
        </main>
        ${p.footer}
      </div>`,
    css: `
      .design-05 { background:var(--bg); }
      .design-05 .site-shell { max-width:1440px; margin:auto; padding:0 38px; }
      .design-05 .org-header { padding:23px 0; border:0; border-bottom:1px solid var(--line); border-radius:0; background:transparent; }
      .design-05 .header-nav { gap:5px; }
      .design-05 .header-nav a { border:1px solid transparent; border-radius:3px; padding:11px 13px; font-size:13px; }
      .design-05 .header-nav a:hover { border-color:var(--line); background:var(--surface); }
      .design-05 .guided-main { padding-top:26px; }
      .design-05 .portal-intro { padding:0; margin:0; }
      .design-05 .portal-intro h1 { font-size:clamp(29px,3vw,39px); letter-spacing:-.035em; line-height:1.3; font-weight:800; margin-bottom:10px; }
      .design-05 .portal-purpose { max-width:900px; }
      @media (min-width:1151px) {
        .design-05 .guided-intro .portal-intro { display:grid; grid-template-columns:1fr 1fr; column-gap:30px; align-items:end; }
        .design-05 .guided-intro .eyebrow { grid-column:1; }
        .design-05 .guided-intro .portal-intro h1 { grid-column:1; margin-bottom:0; }
        .design-05 .guided-intro .portal-purpose { grid-column:2; grid-row:1 / span 2; justify-self:end; padding-bottom:4px; }
      }
      .design-05 .guided-steps { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); padding:0; margin:24px 0 28px; list-style:none; border:1px solid var(--line); background:var(--surface); border-radius:4px; overflow:hidden; }
      .design-05 .guided-steps li { display:flex; align-items:center; gap:17px; padding:18px 24px; position:relative; border-right:1px solid var(--line); }
      .design-05 .guided-steps li:last-child { border-right:0; }
      .design-05 .guided-steps .guided-step-current { background:var(--accent); color:var(--on-accent); }
      .design-05 .guided-step-number { font-size:29px; font-weight:800; line-height:1; letter-spacing:-.05em; color:var(--accent); }
      .design-05 .guided-step-current .guided-step-number { color:var(--on-accent); }
      .design-05 .guided-steps strong { display:block; font-size:16px; letter-spacing:.025em; }
      .design-05 .guided-steps div>span { display:block; font-size:12px; color:var(--muted); margin-top:4px; line-height:1.5; }
      .design-05 .guided-step-current div>span { color:#e5edff; }
      .design-05 .guided-workspace { display:grid; grid-template-columns:minmax(205px,.73fr) minmax(365px,1.28fr) minmax(270px,.92fr); grid-template-areas:'status login support' 'news news news'; gap:26px 24px; align-items:start; }
      .design-05 .guided-status { grid-area:status; }
      .design-05 .guided-login { grid-area:login; }
      .design-05 .guided-support { grid-area:support; }
      .design-05 .guided-news { grid-area:news; }
      .design-05 .guided-rail-label { color:var(--muted); font-size:12px; font-weight:700; letter-spacing:.08em; margin:0 0 11px 1px; }
      .design-05 .panel { border-radius:4px; box-shadow:none; }
      .design-05 .login-panel { border:1px solid var(--accent); border-top:7px solid var(--accent); padding:29px; background:var(--surface); box-shadow:0 8px 24px #204fbd0d; }
      .design-05 .login-panel h2 { font-size:25px; font-weight:800; }
      .design-05 .login-panel .form-control { border-radius:3px; border-color:#a9b8d0; }
      .design-05 .login-panel .btn { border-radius:3px; font-weight:700; }
      .design-05 .context-panel { border-radius:3px; }
      .design-05 .status-panel { padding:20px; background:#e4eaf5; border:1px solid #c9d4e6; }
      .design-05 .status-panel h2 { font-size:17px; }
      .design-05 .status-panel p { font-size:13px; }
      .design-05 .support-panel { padding:22px; border:1px solid var(--line); background:var(--surface); }
      .design-05 .support-panel h2 { font-size:19px; }
      .design-05 .support-links { display:grid; grid-template-columns:1fr; gap:8px; }
      .design-05 .support-links a,.design-05 .support-links button { text-align:left; justify-content:flex-start; }
      .design-05 .contact-lines { border-top:1px solid var(--line); padding-top:17px; margin-top:17px; }
      .design-05 .news-panel { border:0; border-top:2px solid var(--line); border-radius:0; padding:25px 0 0; background:transparent; }
      .design-05 .news-list { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
      .design-05 .notice-item { padding:20px 22px; background:var(--surface); border:1px solid var(--line); border-left:4px solid var(--accent); border-radius:3px; }
      .design-05 .notice-item h3 { font-size:17px; }
      .design-05 .portal-footer { margin-top:25px; padding:23px 0; border-top:1px solid var(--line); }
      @media (max-width:1150px) {
        .design-05 .site-shell { padding:0 25px; }
        .design-05 .guided-workspace { grid-template-columns:minmax(340px,1.3fr) minmax(260px,1fr); grid-template-areas:'login status' 'login support' 'news news'; gap:20px; }
        .design-05 .guided-steps li { padding:17px 16px; gap:12px; }
        .design-05 .guided-step-number { font-size:24px; }
        .design-05 .guided-rail-label { margin-bottom:8px; }
      }
      @media (max-width:690px) {
        .design-05 .site-shell { padding:0 17px; }
        .design-05 .org-header { padding:19px 0 14px; }
        .design-05 .header-nav a { padding:10px; max-width:none; white-space:nowrap; }
        .design-05 .guided-main { padding-top:23px; }
        .design-05 .portal-intro h1 { font-size:31px; }
        .design-05 .guided-steps { margin:19px 0 23px; }
        .design-05 .guided-steps li { flex-direction:column; align-items:flex-start; padding:13px 10px; gap:10px; }
        .design-05 .guided-step-number { font-size:21px; }
        .design-05 .guided-steps strong { font-size:14px; }
        .design-05 .guided-steps div>span { font-size:12px; }
        .design-05 .guided-workspace { grid-template-columns:minmax(0,1fr); grid-template-areas:'login' 'status' 'support' 'news'; gap:24px; }
        .design-05 .login-panel { padding:25px 21px; }
        .design-05 .news-list { grid-template-columns:minmax(0,1fr); gap:13px; }
        .design-05 .news-panel { padding-top:22px; }
      }
    `
  },
  {
    id: 'portal-06-conversation',
    name: '親切接待',
    en: 'A HELPFUL WELCOME',
    description: '以資訊服務櫃台的語氣迎接同仁，左側提供說明與協助，右側保留乾淨的登入空間。',
    positioning: '將可直接取得的協助與登入並列，降低不熟悉操作同仁的疑慮。',
    structure: '左側組織與垂直導覽，主區左側歡迎、支援與服務狀態，右側登入及折疊公告。',
    loginPosition: '桌機主區右上，與左側協助內容形成兩個閱讀面；手機排列在歡迎說明之後。',
    announcementStyle: '可用鍵盤展開的原生公告折疊區；重大影響另於登入前清楚提示。',
    navigation: '垂直側欄索引與說明式協助入口，手機轉成橫向可換行導覽。',
    visualLanguage: '紫灰雙色閱讀面、柔和圓形章節標記、寬鬆字距與對話式短句。',
    fit: '跨職類組織、第一次使用者與需要容易找到人工協助的情境。',
    tradeoff: '側欄與支援說明占用較多空間；需精簡歡迎文案，公告折疊入口要保持明確。',
    colors: { bg: '#f4f1f7', surface: '#ffffff', ink: '#30283d', muted: '#655b71', line: '#d9d1e2', accent: '#6a4586', onAccent: '#ffffff', soft: '#eee5f4' },
    render: p => `
      <div class="conversation-frame">
        <aside class="conversation-sidebar" aria-label="組織與入口導覽">
          ${p.header}
          <div class="conversation-sidebar-note"><span class="conversation-note-mark" aria-hidden="true">i</span><strong>需要幫忙嗎？</strong><p>即使無法登入，也能從「取得協助」找到聯絡方式。</p><a href="#support-section">取得協助 <span aria-hidden="true">↗</span></a></div>
        </aside>
        <main id="portalMain" class="conversation-main">
          <div class="conversation-welcome"><div class="conversation-greeting">歡迎使用資訊服務</div>${p.intro}</div>
          <div class="conversation-login">${p.login}</div>
          <div class="conversation-support">${p.support}</div>
          <div class="conversation-status">${p.status}</div>
          <details class="conversation-news"><summary><span><strong>有哪些需要留意的消息？</strong><small>展開重要公告、維護與功能異動</small></span><span class="conversation-expand" aria-hidden="true">＋</span></summary><div class="conversation-news-content">${p.news}</div></details>
        </main>
      </div>
      ${p.footer}`,
    css: `
      .design-06 { background:var(--bg); }
      .design-06 .site-shell { max-width:1450px; margin:auto; padding:0 30px; }
      .design-06 .conversation-frame { display:grid; grid-template-columns:220px minmax(0,1fr); gap:38px; }
      .design-06 .conversation-sidebar { padding:32px 23px 30px 0; border-right:1px solid var(--line); min-width:0; }
      .design-06 .org-header { display:flex; flex-direction:column; align-items:stretch; gap:33px; padding:0; margin:0; border:0; border-radius:0; background:transparent; }
      .design-06 .org-brand { display:flex; flex-direction:column; align-items:flex-start; gap:15px; }
      .design-06 .org-brand>div { min-width:0; }
      .design-06 .header-nav { display:flex; flex-direction:column; align-items:stretch; gap:8px; }
      .design-06 .header-nav a { border-radius:8px; padding:13px 14px; background:#ebe5f0; color:var(--ink); font-size:14px; font-weight:600; min-height:46px; }
      .design-06 .header-nav a:hover { background:#ded2e8; }
      .design-06 .conversation-sidebar-note { margin-top:45px; padding-top:24px; border-top:1px solid var(--line); }
      .design-06 .conversation-note-mark { display:grid; place-items:center; width:30px; height:30px; border:1px solid var(--accent); border-radius:50%; color:var(--accent); font-family:Georgia,serif; font-size:18px; margin-bottom:15px; }
      .design-06 .conversation-sidebar-note strong { display:block; font-size:16px; margin-bottom:8px; }
      .design-06 .conversation-sidebar-note p { font-size:13px; color:var(--muted); line-height:1.8; }
      .design-06 .conversation-sidebar-note a { display:flex; justify-content:space-between; align-items:center; min-height:44px; font-size:14px; color:var(--accent); font-weight:700; text-decoration:none; }
      .design-06 .conversation-main { display:grid; grid-template-columns:minmax(260px,.92fr) minmax(350px,1.08fr); grid-template-areas:'welcome login' 'support login' 'status news'; gap:25px 30px; align-items:start; padding:38px 0 25px; min-width:0; }
      .design-06 .conversation-welcome { grid-area:welcome; }
      .design-06 .conversation-greeting { color:var(--accent); font-size:13px; font-weight:700; letter-spacing:.08em; margin-bottom:18px; }
      .design-06 .portal-intro { margin:0; padding:0; }
      .design-06 .portal-intro h1 { font-size:clamp(30px,3vw,39px); line-height:1.45; font-weight:700; letter-spacing:.025em; margin-bottom:15px; }
      .design-06 .portal-purpose { line-height:1.9; }
      .design-06 .conversation-login { grid-area:login; }
      .design-06 .login-panel { background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:30px; box-shadow:0 12px 38px #4732530b; }
      .design-06 .login-panel h2 { font-size:25px; }
      .design-06 .login-panel .form-control,.design-06 .login-panel .btn { border-radius:9px; }
      .design-06 .context-panel { background:var(--soft); border-radius:10px; }
      .design-06 .conversation-support { grid-area:support; }
      .design-06 .support-panel { border:0; border-radius:0; padding:4px 0 0; box-shadow:none; background:transparent; }
      .design-06 .support-panel h2 { font-size:22px; }
      .design-06 .support-links { display:grid; grid-template-columns:1fr; gap:8px; }
      .design-06 .support-links a,.design-06 .support-links button { border:1px solid var(--line); background:#fcfaff; border-radius:10px; min-height:46px; justify-content:flex-start; text-align:left; }
      .design-06 .contact-lines { border-left:3px solid #b49cc7; margin:20px 0; padding:1px 0 1px 16px; }
      .design-06 .support-panel details { border-color:var(--line); border-radius:9px; background:transparent; }
      .design-06 .conversation-status { grid-area:status; }
      .design-06 .status-panel { background:#eae4ef; border:1px solid #d7cbe2; border-radius:13px; box-shadow:none; padding:21px 23px; }
      .design-06 .status-panel h2 { font-size:18px; }
      .design-06 .conversation-news { grid-area:news; background:#faf8fc; border:1px solid var(--line); border-radius:12px; margin-top:6px; overflow:hidden; min-width:0; }
      .design-06 .conversation-news>summary { display:flex; justify-content:space-between; align-items:center; gap:20px; min-height:80px; padding:21px 25px; cursor:pointer; list-style:none; }
      .design-06 .conversation-news>summary::-webkit-details-marker { display:none; }
      .design-06 .conversation-news>summary strong { display:block; font-size:18px; font-weight:700; }
      .design-06 .conversation-news>summary small { display:block; color:var(--muted); font-size:12px; margin-top:5px; }
      .design-06 .conversation-expand { display:grid; place-items:center; flex:0 0 34px; width:34px; height:34px; border:1px solid var(--line); border-radius:50%; font-size:21px; color:var(--accent); }
      .design-06 .conversation-news[open] .conversation-expand { transform:rotate(45deg); }
      .design-06 .conversation-news[open]>summary { border-bottom:1px solid var(--line); }
      .design-06 .conversation-news-content { padding:0 25px 12px; }
      .design-06 .news-panel { padding:22px 0 0; border:0; border-radius:0; background:transparent; box-shadow:none; }
      .design-06 .news-list { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
      .design-06 .notice-item { padding:18px; background:var(--surface); border:1px solid var(--line); border-radius:8px; }
      .design-06 .notice-item h3 { font-size:16px; }
      .design-06 .portal-footer { border-top:1px solid var(--line); padding:23px 0; margin-left:258px; }
      @media (max-width:1150px) {
        .design-06 .site-shell { padding:0 24px; }
        .design-06 .conversation-frame { grid-template-columns:180px minmax(0,1fr); gap:25px; }
        .design-06 .conversation-sidebar { padding-right:18px; }
        .design-06 .conversation-main { grid-template-columns:minmax(220px,.85fr) minmax(320px,1.15fr); gap:22px; }
        .design-06 .login-panel { padding:25px 22px; }
        .design-06 .portal-footer { margin-left:205px; }
      }
      @media (max-width:960px) {
        .design-06 .conversation-frame { display:block; }
        .design-06 .conversation-sidebar { padding:22px 0 18px; border-right:0; border-bottom:1px solid var(--line); }
        .design-06 .org-header { flex-direction:row; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap; }
        .design-06 .org-brand { flex-direction:row; align-items:center; gap:12px; }
        .design-06 .header-nav { flex-direction:row; flex-wrap:wrap; gap:6px; }
        .design-06 .header-nav a { padding:11px 12px; min-height:44px; max-width:none; white-space:nowrap; }
        .design-06 .conversation-sidebar-note { display:none; }
        .design-06 .conversation-main { grid-template-columns:minmax(250px,.92fr) minmax(330px,1.08fr); padding-top:27px; }
        .design-06 .portal-footer { margin-left:0; }
      }
      @media (max-width:690px) {
        .design-06 .site-shell { padding:0 17px; }
        .design-06 .conversation-main { grid-template-columns:minmax(0,1fr); grid-template-areas:'welcome' 'login' 'status' 'support' 'news'; gap:25px; padding-top:25px; }
        .design-06 .conversation-greeting { margin-bottom:10px; }
        .design-06 .portal-intro h1 { font-size:31px; margin-bottom:11px; }
        .design-06 .login-panel { padding:26px 22px; border-radius:15px; }
        .design-06 .support-panel { padding:4px 0 0; }
        .design-06 .conversation-news>summary { padding:20px; gap:12px; }
        .design-06 .conversation-news>summary strong { font-size:17px; }
        .design-06 .conversation-news-content { padding:0 17px 10px; }
        .design-06 .news-list { grid-template-columns:minmax(0,1fr); }
        .design-06 .notice-item { padding:17px; }
      }
    `
  }
];
