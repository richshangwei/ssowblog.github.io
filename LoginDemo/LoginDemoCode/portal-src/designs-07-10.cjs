'use strict';

// These designs share the same trusted components and demo behaviour.
// Design-only navigation points to the same public, local page sections.
module.exports = [
  {
    id: 'portal-07-index',
    name: '資訊索引',
    en: 'SERVICE INDEX',
    description: '以書冊索引整理入口：左側導覽、右側登入，編號公告讓資訊有明確的閱讀順序。',
    positioning: '重視內容查找與公告閱讀的組織服務索引。',
    structure: '左側組織與直式導覽；主區左列入口說明、狀態與公告，右列登入；下方支援橫列。',
    loginPosition: '桌機右上固定閱讀欄；手機移至入口說明之後、狀態與公告之前。',
    announcementStyle: '黑白編號摘要，細分隔線與閱讀序號形成書冊索引。',
    navigation: '桌機左側文字索引；手機改為可換行的上方導覽。',
    visualLanguage: '黑白、編輯字級、書冊邊線與數字索引，避免裝飾圖像。',
    fit: '公告資訊較多、同仁需要有系統地查找說明的行政或大型組織。',
    tradeoff: '閱讀層次清楚，但桌機側欄佔用寬度；需要維持精簡導覽名稱。',
    colors: { bg: '#f0efec', surface: '#ffffff', ink: '#20201e', muted: '#605e59', line: '#ccc9c1', accent: '#252522', onAccent: '#ffffff', soft: '#f4f3ef' },
    render: p => `<div class="index-layout"><aside class="index-sidebar"><div class="index-edition" aria-hidden="true"><span>07</span><span>SERVICE<br>INDEX</span></div>${p.header}<p class="index-side-note">資訊服務入口<br>登入・狀態・協助</p></aside><main id="portalMain" class="index-main"><div class="index-columns"><div class="index-intro">${p.intro}</div>${p.login}${p.status}${p.news}${p.support}</div></main></div>${p.footer}`,
    css: `
.design-07 .site-shell { max-width: 1400px; padding: 0 36px; }
.design-07 .index-layout { display: grid; grid-template-columns: 220px minmax(0,1fr); min-height: 800px; border-left: 1px solid var(--line); border-right: 1px solid var(--line); background: var(--surface); }
.design-07 .index-sidebar { padding: 32px 23px; border-right: 1px solid var(--ink); background: var(--soft); }
.design-07 .index-edition { display: flex; align-items: center; gap: 13px; padding-bottom: 25px; margin-bottom: 27px; border-bottom: 2px solid var(--ink); font: 700 12px/1.4 Arial,sans-serif; letter-spacing: .12em; }
.design-07 .index-edition > span:first-child { font-size: 58px; font-weight: 400; line-height: 1; letter-spacing: -.08em; }
.design-07 .org-header { display: flex; align-items: stretch; flex-direction: column; gap: 32px; padding: 0; border: 0; background: transparent; }
.design-07 .org-brand { align-items: flex-start; flex-wrap: wrap; }
.design-07 .header-nav { display: flex; flex-direction: column; align-items: stretch; gap: 0; width: 100%; counter-reset: index-nav; }
.design-07 .header-nav a, .design-07 .header-nav button { display: flex; align-items: center; justify-content: flex-start; gap: 12px; min-height: 50px; padding: 12px 0; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; text-align: left; background: transparent; }
.design-07 .header-nav a::before, .design-07 .header-nav button::before { counter-increment: index-nav; content: '0' counter(index-nav); font: 12px/1.4 Arial,sans-serif; color: var(--muted); }
.design-07 .index-side-note { margin-top: 45px; font-size: 12px; color: var(--muted); line-height: 1.9; }
.design-07 .index-main { padding: 36px 34px; min-width: 0; }
.design-07 .index-columns { display: grid; grid-template-columns: minmax(0,1fr) minmax(335px, .96fr); grid-template-areas: 'intro login' 'status login' 'news login' 'support support'; align-items: start; column-gap: 30px; row-gap: 24px; }
.design-07 .index-intro { grid-area: intro; }
.design-07 .portal-intro { padding: 0; margin: 0; }
.design-07 .portal-intro h1 { font-family: 'PMingLiU','Songti TC',serif; font-size: clamp(30px,3.3vw,44px); line-height: 1.3; letter-spacing: .02em; }
.design-07 .portal-purpose { max-width: 30em; }
.design-07 .panel { border-radius: 0; box-shadow: none; }
.design-07 .login-panel { grid-area: login; border: 2px solid var(--ink); padding: 26px; background: #fff; }
.design-07 .login-panel h2 { font-size: 26px; }
.design-07 .form-control, .design-07 .btn, .design-07 .context-panel { border-radius: 0; }
.design-07 .status-panel { grid-area: status; border: 0; border-top: 2px solid var(--ink); padding: 20px 0 0; }
.design-07 .news-panel { grid-area: news; border: 0; border-top: 1px solid var(--ink); padding: 22px 0 0; }
.design-07 .news-list { counter-reset: notices; }
.design-07 .notice-item { position: relative; padding: 18px 0 18px 36px; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; }
.design-07 .notice-item::before { counter-increment: notices; content: '0' counter(notices); position: absolute; left: 0; top: 20px; font: 500 14px/1.4 Arial,sans-serif; color: var(--muted); }
.design-07 .support-panel { grid-area: support; border: 0; border-top: 2px solid var(--ink); padding: 24px 0 0; }
.design-07 .support-links { display: flex; flex-wrap: wrap; gap: 8px 18px; }
.design-07 .contact-lines { margin-top: 16px; }
.design-07 .portal-footer { border-top: 1px solid var(--ink); padding: 24px 0; }
@media (max-width: 1100px) {
 .design-07 .site-shell { padding: 0 20px; }
 .design-07 .index-layout { grid-template-columns: 180px minmax(0,1fr); }
 .design-07 .index-sidebar { padding: 26px 16px; }
 .design-07 .index-main { padding: 28px 24px; }
 .design-07 .index-columns { grid-template-columns: minmax(0,1fr); grid-template-areas: 'intro' 'login' 'status' 'news' 'support'; }
 .design-07 .login-panel { max-width: none; }
}
@media (max-width: 600px) {
 .design-07 .site-shell { padding: 0 14px; }
 .design-07 .index-layout { display: block; border: 0; }
 .design-07 .index-sidebar { border-right: 0; border-bottom: 2px solid var(--ink); padding: 18px; }
 .design-07 .index-edition, .design-07 .index-side-note { display: none; }
 .design-07 .org-header { gap: 16px; }
 .design-07 .org-brand { flex-wrap: nowrap; }
 .design-07 .header-nav { flex-direction: row; flex-wrap: wrap; gap: 0 14px; }
 .design-07 .header-nav a, .design-07 .header-nav button { min-height: 44px; font-size: 14px; }
 .design-07 .header-nav a::before, .design-07 .header-nav button::before { display: none; }
 .design-07 .index-main { padding: 25px 18px; }
 .design-07 .index-columns { gap: 23px; }
 .design-07 .login-panel { padding: 20px 17px; }
 .design-07 .portal-intro h1 { font-size: 30px; }
}`
  },
  {
    id: 'portal-08-workstation',
    name: '高效工作站',
    en: 'SERVICE WORKSTATION',
    description: '登入、狀態公告與支援三欄並置，值班或共用工作站可以直接找到下一步。',
    positioning: '重視快速登入與直接求助的日常工作入口。',
    structure: '上方品牌與工具列；左欄登入、中欄狀態及公告、右欄支援；平板與手機依任務重排。',
    loginPosition: '桌機左側主欄；平板維持左側，手機排在狀態與公告前。',
    announcementStyle: '中欄獨立訊息方框，標題、適用系統及摘要保持分組。',
    navigation: '品牌下方四格工具列，直接連至登入、狀態、公告與支援。',
    visualLanguage: '深青綠標題帶、方正白卡與清楚分隔，降低長時間閱讀的視覺負擔。',
    fit: '桌機比重高的醫院值班區、服務櫃檯與共用工作站。',
    tradeoff: '三個任務區同時可見，但橫向資訊較密；手機必須先登入後閱讀，不宜增加額外卡片。',
    colors: { bg: '#edf3f2', surface: '#ffffff', ink: '#193c39', muted: '#536966', line: '#c5d6d2', accent: '#17675e', onAccent: '#ffffff', soft: '#e6f3ef' },
    render: p => `${p.header}<nav class="workstation-toolbar" aria-label="入口快速工具"><a href="#login-section"><span aria-hidden="true">01</span>帳號登入</a><a href="#status-section"><span aria-hidden="true">02</span>服務狀態</a><a href="#news-section"><span aria-hidden="true">03</span>重要公告</a><a href="#support-section"><span aria-hidden="true">04</span>取得協助</a></nav><main id="portalMain"><div class="workstation-intro">${p.intro}<span class="workstation-caption">資訊室服務入口</span></div><div class="workstation-columns">${p.login}<div class="workstation-updates">${p.status}${p.news}</div>${p.support}</div></main>${p.footer}`,
    css: `
.design-08 .site-shell { max-width: 1400px; padding: 0 32px; }
.design-08 .org-header { padding: 23px 0; border-bottom: 0; }
.design-08 .org-header .header-nav { display: none; }
.design-08 .workstation-toolbar { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); border: 1px solid var(--line); background: #fff; }
.design-08 .workstation-toolbar a { min-height: 55px; display: flex; align-items: center; justify-content: center; gap: 14px; padding: 10px 14px; color: var(--ink); text-decoration: none; border-right: 1px solid var(--line); font-weight: 700; }
.design-08 .workstation-toolbar a:last-child { border-right: 0; }
.design-08 .workstation-toolbar a:first-child { color: #fff; background: var(--accent); }
.design-08 .workstation-toolbar a span { font: 12px/1.4 Arial,sans-serif; opacity: .85; }
.design-08 .workstation-toolbar a:hover { box-shadow: inset 0 -3px 0 currentColor; }
.design-08 .workstation-intro { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 28px 0 22px; }
.design-08 .portal-intro { margin: 0; padding: 0; }
.design-08 .portal-intro h1 { font-size: clamp(28px,3vw,38px); line-height: 1.3; }
.design-08 .portal-purpose { margin-bottom: 0; max-width: 52em; }
.design-08 .workstation-caption { flex-shrink: 0; color: var(--accent); border-left: 3px solid var(--accent); padding-left: 12px; font-size: 13px; }
.design-08 .workstation-columns { display: grid; grid-template-columns: minmax(350px,1.18fr) minmax(290px,1fr) minmax(255px,.85fr); gap: 20px; align-items: start; }
.design-08 .workstation-updates { min-width: 0; display: grid; gap: 20px; }
.design-08 .panel { border: 1px solid var(--line); border-radius: 3px; box-shadow: none; padding: 23px; }
.design-08 .login-panel { border-top: 5px solid var(--accent); }
.design-08 .login-panel h2 { font-size: 25px; }
.design-08 .status-panel { background: #f8fcfa; }
.design-08 .news-panel { padding: 23px 18px; }
.design-08 .notice-item { padding: 16px; border: 1px solid var(--line); border-radius: 2px; background: #f5f9f7; margin-top: 13px; }
.design-08 .support-panel { border-top: 5px solid var(--ink); }
.design-08 .support-links { display: grid; grid-template-columns: minmax(0,1fr); gap: 7px; }
.design-08 .support-links a, .design-08 .support-links button { min-height: 44px; text-align: left; justify-content: flex-start; }
.design-08 .form-control, .design-08 .btn, .design-08 .context-panel { border-radius: 3px; }
.design-08 .portal-footer { margin-top: 26px; padding: 22px 0; border-top: 1px solid var(--line); }
@media (max-width: 1180px) {
 .design-08 .workstation-columns { grid-template-columns: minmax(330px,1.06fr) minmax(270px,1fr); }
 .design-08 .workstation-columns > .support-panel { grid-column: 1 / -1; }
 .design-08 .support-links { grid-template-columns: repeat(3,minmax(0,1fr)); }
 .design-08 .workstation-caption { display: none; }
}
@media (max-width: 700px) {
 .design-08 .site-shell { padding: 0 16px; }
 .design-08 .org-header { padding: 18px 0; }
 .design-08 .workstation-toolbar { grid-template-columns: repeat(2,minmax(0,1fr)); }
 .design-08 .workstation-toolbar a { min-height: 48px; font-size: 14px; justify-content: flex-start; gap: 9px; }
 .design-08 .workstation-toolbar a:nth-child(2) { border-right: 0; }
 .design-08 .workstation-toolbar a:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
 .design-08 .workstation-intro { padding: 24px 0 20px; }
 .design-08 .workstation-columns { display: flex; flex-direction: column; gap: 18px; }
 .design-08 .workstation-columns > *, .design-08 .workstation-updates > * { width: 100%; }
 .design-08 .workstation-updates { gap: 18px; }
 .design-08 .panel { padding: 21px 18px; }
 .design-08 .support-links { grid-template-columns: minmax(0,1fr); }
}`
  },
  {
    id: 'portal-09-mobile',
    name: '隨行服務',
    en: 'SERVICE WITH YOU',
    description: '把登入、可見狀態與精簡公告索引收在易讀的單欄入口，底部三個固定導覽讓手機使用者隨時回到主要任務。',
    positioning: '手機優先、閱讀負擔較低的共用入口。',
    structure: '桌機與手機共用窄幅單欄捲動區；登入後依序呈現服務狀態、精簡公告索引與支援；底部導覽獨立佔位。',
    loginPosition: '入口標題下方的置中主卡；桌機不拉寬表單，手機維持原閱讀順序。',
    announcementStyle: '直接可見的精簡文字索引，每列保留嚴重程度、適用系統、標題與短摘要；點選標題閱讀完整內容。',
    navigation: '底部常駐登入、狀態、求助三個文字入口，與內容捲動區分開佔位，不覆蓋表單。',
    visualLanguage: '奶油底、暖橘重點、柔和分區與大行距，用適量留白引導閱讀。',
    fit: '手機與平板使用比例較高、需要簡短清楚操作的跨部門入口。',
    tradeoff: '小螢幕操作直接、公告不需先展開；桌機留白較多，單欄完整資訊需要向下捲動，因此首頁公告限少量摘要。',
    colors: { bg: '#f7f2e8', surface: '#ffffff', ink: '#3c342b', muted: '#716352', line: '#dacfc0', accent: '#a74b22', onAccent: '#ffffff', soft: '#fbede1' },
    render: p => `<div class="mobile-portal">${p.header}<main id="portalMain">${p.intro}${p.login}${p.status}<div class="mobile-news-index">${p.news}</div>${p.support}</main>${p.footer}</div><nav class="mobile-task-dock" aria-label="主要任務"><a href="#login-section"><span class="dock-line" aria-hidden="true"></span>登入</a><a href="#status-section"><span class="dock-line" aria-hidden="true"></span>狀態</a><a href="#support-section"><span class="dock-line" aria-hidden="true"></span>求助</a></nav>`,
    css: `
.design-09 { height: 100dvh; display: flex; flex-direction: column; overflow: hidden; }
.design-09 .demo-bar { flex: none; max-height: 45dvh; overflow-y: auto; }
.design-09 .site-shell { width: 100%; max-width: none; margin: 0; padding: 0; flex: 1; min-height: 0; display: grid; grid-template-rows: minmax(0,1fr) auto; }
.design-09 .mobile-portal { width: 100%; min-width: 0; min-height: 0; margin: 0; padding: 0 max(22px,calc((100% - 620px)/2)) 24px; overflow-y: auto; overscroll-behavior-y: contain; scroll-padding: 20px; }
.design-09 #resultView { width: 100%; min-height: 0; overflow-y: auto; flex: 1; }
.design-09 .org-header { padding: 27px 0 24px; border-bottom: 1px solid var(--line); }
.design-09 .org-header .header-nav { display: none; }
.design-09 .portal-intro { margin: 0; padding: 29px 4px 25px; }
.design-09 .portal-intro h1 { font-size: 35px; line-height: 1.35; letter-spacing: -.02em; }
.design-09 .portal-purpose { margin-bottom: 0; max-width: 36em; line-height: 1.8; }
.design-09 .panel { border: 1px solid var(--line); border-radius: 18px; padding: 27px 30px; box-shadow: none; margin-bottom: 20px; }
.design-09 .login-panel { border-top: 5px solid var(--accent); box-shadow: 0 8px 30px rgba(62,47,28,.045); }
.design-09 .login-panel h2 { font-size: 27px; }
.design-09 .form-control, .design-09 .btn, .design-09 .context-panel { border-radius: 10px; }
.design-09 .form-control { min-height: 49px; font-size: 16px; }
.design-09 .status-panel { background: #fffcf6; }
.design-09 .mobile-news-index .news-panel { border: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); border-radius: 0; background: transparent; }
.design-09 .mobile-news-index .panel-heading { margin-bottom: 12px; }
.design-09 .mobile-news-index .notice-filters { padding-bottom: 8px; }
.design-09 .notice-item { padding: 12px 0; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; }
.design-09 .notice-item h3 { margin: 0; }
.design-09 .notice-item .notice-open { min-height: 44px; padding: 5px 0; }
.design-09 .notice-item .notice-summary { margin: 0; line-height: 1.7; font-size: 13px; }
.design-09 .notice-item .notice-meta { gap: 6px; }
.design-09 .notice-item:last-child { border-bottom: 0; }
.design-09 .support-panel { background: #f2e9da; }
.design-09 .support-links { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
.design-09 .support-links a, .design-09 .support-links button { min-height: 46px; justify-content: flex-start; }
.design-09 .portal-footer { padding: 12px 4px 16px; font-size: 13px; }
.design-09 .mobile-task-dock { position: relative; z-index: 1; width: min(520px,calc(100% - 32px)); display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); padding: 7px; margin: 12px auto max(12px,env(safe-area-inset-bottom)); background: var(--ink); border-radius: 16px; box-shadow: 0 6px 26px rgba(50,38,27,.12); }
.design-09 .mobile-task-dock a { display: flex; flex-direction: column; gap: 5px; align-items: center; justify-content: center; padding: 8px 10px; min-height: 48px; color: #fff; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 700; }
.design-09 .mobile-task-dock a:hover { background: #564435; }
.design-09 .dock-line { display: block; width: 15px; height: 2px; background: #e6aa83; }
.design-09 .mobile-task-dock a:focus-visible { outline: 3px solid #f0c3a4; outline-offset: -3px; }
@media (max-width: 600px) {
 .design-09 .mobile-portal { padding: 0 16px 24px; }
 .design-09 .org-header { padding: 21px 3px; }
 .design-09 .portal-intro { padding: 25px 3px 21px; }
 .design-09 .portal-intro h1 { font-size: 30px; }
 .design-09 .panel { padding: 23px 20px; border-radius: 14px; }
 .design-09 .mobile-news-index .news-panel { padding: 22px 7px; }
 .design-09 .mobile-task-dock { margin-top: 9px; margin-bottom: max(10px,env(safe-area-inset-bottom)); }
 .design-09 .support-links { grid-template-columns: minmax(0,1fr); }
}`
  },
  {
    id: 'portal-10-layered',
    name: '分層服務',
    en: 'SERVICE LAYERS',
    description: '先完成登入，再按需查看狀態、公告與支援；橫式主表單與下方三個資訊欄形成兩個清楚層次。',
    positioning: '以登入優先、資訊次序清楚為核心的組織門戶。',
    structure: '上方品牌與展開導覽；全幅登入主區；下方狀態、公告、支援三欄。',
    loginPosition: '桌機頂部橫式主面板，帳號與密碼並排；手機重排為縱向單欄表單。',
    announcementStyle: '下層中央分隔摘要，與狀態、支援以等寬欄位並列。',
    navigation: '右上原生展開式「入口導覽」，避免與主要登入操作爭奪注意力。',
    visualLanguage: '石墨文字、米色底、橫向線條與大留白，表單區具有最明確的邊界。',
    fit: '以直接登入為主要任務、仍需要公開狀態與支援資訊的綜合組織入口。',
    tradeoff: '登入焦點突出；低高度螢幕的完整公告與支援位於首屏下方，需保留表單附近的求助入口。',
    colors: { bg: '#eeece5', surface: '#ffffff', ink: '#32372f', muted: '#636a60', line: '#cbd0c3', accent: '#495947', onAccent: '#ffffff', soft: '#eef1e8' },
    render: p => `<div class="layered-masthead">${p.header}<details class="layered-navigation"><summary>入口導覽</summary><nav aria-label="入口導覽"><a href="#login-section">帳號登入</a><a href="#status-section">服務狀態</a><a href="#news-section">重要公告</a><a href="#support-section">取得協助</a></nav></details></div><main id="portalMain">${p.intro}<div class="layered-primary">${p.login}</div><div class="layered-information">${p.status}${p.news}${p.support}</div></main>${p.footer}`,
    css: `
.design-10 .site-shell { max-width: 1300px; padding: 0 40px; }
.design-10 .layered-masthead { display: flex; align-items: center; justify-content: space-between; gap: 22px; position: relative; border-bottom: 1px solid var(--line); }
.design-10 .org-header { flex: 1; padding: 28px 0; border: 0; }
.design-10 .org-header .header-nav { display: none; }
.design-10 .layered-navigation { flex-shrink: 0; position: relative; align-self: center; z-index: 5; }
.design-10 .layered-navigation > summary { display: flex; gap: 18px; align-items: center; justify-content: center; min-height: 46px; border: 1px solid var(--ink); border-radius: 3px; padding: 9px 17px; background: var(--surface); cursor: pointer; font-size: 14px; font-weight: 700; list-style: none; }
.design-10 .layered-navigation > summary::-webkit-details-marker { display: none; }
.design-10 .layered-navigation > summary::after { content: '+'; font-size: 20px; font-weight: 400; }
.design-10 .layered-navigation[open] > summary::after { content: '−'; }
.design-10 .layered-navigation nav { position: absolute; top: calc(100% + 8px); right: 0; display: flex; flex-direction: column; min-width: 210px; padding: 8px; border: 1px solid var(--line); background: #fff; box-shadow: 0 10px 24px rgba(37,42,32,.1); border-radius: 3px; }
.design-10 .layered-navigation nav a { display: flex; align-items: center; min-height: 46px; padding: 10px 13px; color: var(--ink); text-decoration: none; }
.design-10 .layered-navigation nav a:hover { background: var(--soft); }
.design-10 .portal-intro { padding: 32px 0 26px; margin: 0; }
.design-10 .portal-intro h1 { font-family: 'PMingLiU','Songti TC',serif; font-size: clamp(34px,3.5vw,46px); line-height: 1.3; }
.design-10 .portal-purpose { margin-bottom: 0; max-width: 60em; }
.design-10 .layered-primary { border-top: 5px solid var(--accent); background: #fff; }
.design-10 .panel { border-radius: 3px; box-shadow: none; }
.design-10 .login-panel { padding: 29px 36px 26px; border: 1px solid var(--line); border-top: 0; background: #fff; }
.design-10 .login-panel h2 { font-size: 26px; }
.design-10 .login-panel .context-panel { margin-top: 15px; }
.design-10 #loginForm { max-width: none; }
.design-10 #loginForm .field-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 24px; align-items: start; }
.design-10 #loginForm .field-grid > * { min-width: 0; }
.design-10 #loginForm > .btn-primary, .design-10 #loginForm > button[type='submit'] { width: min(100%,360px) !important; min-height: 48px; margin-top: 12px; }
.design-10 .form-control, .design-10 .btn, .design-10 .context-panel { border-radius: 3px; }
.design-10 .layered-information { display: grid; grid-template-columns: minmax(0,.9fr) minmax(0,1.12fr) minmax(0,1fr); gap: 0; margin-top: 32px; border-top: 1px solid var(--ink); }
.design-10 .layered-information > .panel { padding: 25px 26px; border: 0; border-right: 1px solid var(--line); background: transparent; border-radius: 0; }
.design-10 .layered-information > .panel:first-child { padding-left: 0; }
.design-10 .layered-information > .panel:last-child { padding-right: 0; border-right: 0; }
.design-10 .layered-information h2 { font-size: 20px; }
.design-10 .notice-item { padding: 17px 0; margin: 0; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; background: transparent; }
.design-10 .support-links { display: flex; flex-wrap: wrap; gap: 7px 12px; }
.design-10 .support-links a, .design-10 .support-links button { min-height: 44px; }
.design-10 .portal-footer { padding: 24px 0; margin-top: 20px; border-top: 1px solid var(--line); }
@media (max-width: 950px) {
 .design-10 .site-shell { padding: 0 28px; }
 .design-10 .layered-information { grid-template-columns: repeat(2,minmax(0,1fr)); }
 .design-10 .layered-information > .news-panel { border-right: 0; padding-right: 0; }
 .design-10 .layered-information > .support-panel { grid-column: 1 / -1; border-top: 1px solid var(--line); padding: 25px 0; }
}
@media (max-width: 600px) {
 .design-10 .site-shell { padding: 0 16px; }
 .design-10 .layered-masthead { gap: 10px; align-items: flex-start; flex-wrap: wrap; padding-bottom: 14px; }
 .design-10 .org-header { flex-basis: 100%; padding: 20px 0 4px; }
 .design-10 .layered-navigation { margin-left: auto; }
 .design-10 .layered-navigation > summary { min-height: 44px; padding: 8px 13px; }
 .design-10 .portal-intro { padding: 26px 1px 23px; }
 .design-10 .portal-intro h1 { font-size: 32px; }
 .design-10 .login-panel { padding: 23px 19px; }
 .design-10 #loginForm .field-grid { display: block; }
 .design-10 #loginForm .field-grid > .field + .field { margin-top: 18px; }
 .design-10 #loginForm > .btn-primary, .design-10 #loginForm > button[type='submit'] { width: 100% !important; }
 .design-10 .layered-information { grid-template-columns: minmax(0,1fr); margin-top: 25px; }
 .design-10 .layered-information > .panel { padding: 24px 3px; border: 0; border-bottom: 1px solid var(--line); }
 .design-10 .layered-information > .panel:first-child, .design-10 .layered-information > .panel:last-child { padding-left: 3px; padding-right: 3px; }
 .design-10 .layered-information > .support-panel { grid-column: auto; border-top: 0; }
}`
  }
];
