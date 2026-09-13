module.exports = [
  {
    id: '01-clinical-blue',
    name: '澄藍秩序',
    en: 'CLINICAL CLARITY',
    description: '以澄藍識別橫幅、明確資訊分區與充裕留白，建立安心而有效率的系統入口。',
    colors: { bg: '#eef4fa', surface: '#ffffff', ink: '#142c45', muted: '#587087', line: '#d9e4ef', accent: '#175db0', onAccent: '#ffffff', soft: '#e8f1fc' },
    render: p => `<div class="clinical-shell">
      ${p.header}
      <main id="main-content">
        <section class="clinical-hero" aria-label="目前開啟的系統">
          <div class="clinical-hero-content"><div class="clinical-kicker"><span></span> 您的工作，從清楚的入口開始</div>${p.identity}<p class="clinical-hero-note">確認系統名稱與環境，即可安心展開今天的工作。</p></div>
          <div class="clinical-mark" aria-hidden="true"><div class="clinical-mark-grid"><i></i><i></i><i></i><i></i></div><span>SYSTEM<br>ACCESS</span><b>01</b></div>
        </section>
        <div class="row g-4 clinical-primary"><div class="col-lg-5">${p.login}</div><div class="col-lg-7">${p.news}</div></div>
        <div class="row g-4 clinical-secondary"><div class="col-lg-6">${p.release}</div><div class="col-lg-6">${p.support}</div></div>
        <div class="clinical-device">${p.device}</div>
      </main>
      ${p.footer}
    </div>`,
    css: `
.concept-01 { background: var(--bg); }
.concept-01 .site-shell { max-width: 1312px; margin: auto; padding: 0 40px; }
.concept-01 .site-header { min-height: 92px; border-bottom: 0; }
.concept-01 .clinical-hero { position: relative; display: flex; align-items: center; justify-content: space-between; min-height: 280px; padding: 36px 44px; margin: 6px 0 28px; overflow: hidden; border: 1px solid #c7dbf1; border-radius: 24px; background: #ddebf9; }
.concept-01 .clinical-hero::after { content: ''; position: absolute; height: 400px; width: 400px; right: -170px; top: -210px; border: 64px solid #cfE1f5; border-radius: 50%; pointer-events: none; }
.concept-01 .clinical-hero-content { position: relative; z-index: 1; }
.concept-01 .clinical-hero .identity { padding: 0; }
.concept-01 .clinical-kicker { display: flex; align-items: center; gap: 9px; margin-bottom: 20px; color: #31597e; font-size: 13px; font-weight: 650; letter-spacing: .09em; }
.concept-01 .clinical-kicker > span { width: 7px; height: 7px; border-radius: 50%; background: #2767af; }
.concept-01 .identity h1 { font-size: clamp(30px,3.1vw,45px); letter-spacing: -.04em; color: #143e69; margin-bottom: 16px; }
.concept-01 .clinical-hero-note { margin: 20px 0 0; color: #406180; font-size: 14px; }
.concept-01 .clinical-mark { position: relative; display: grid; grid-template-columns: 88px 1fr; gap: 14px 18px; align-items: center; flex: 0 0 205px; margin-left: 30px; color: #2861a0; z-index: 1; }
.concept-01 .clinical-mark-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 6px; transform: rotate(-8deg); }
.concept-01 .clinical-mark-grid i { display: block; aspect-ratio: 1; background: #397bbb; border-radius: 8px; }
.concept-01 .clinical-mark-grid i:nth-child(2) { background: #80abd3; border-radius: 8px 24px 8px 8px; }
.concept-01 .clinical-mark-grid i:nth-child(3) { background: #9fc0df; }
.concept-01 .clinical-mark > span { font: 650 12px/1.65 ui-monospace,monospace; letter-spacing: .1em; }
.concept-01 .clinical-mark > b { grid-column: 2; font: 400 40px/1 ui-monospace,monospace; color: #628db8; }
.concept-01 .panel { border-radius: 18px; box-shadow: 0 5px 16px #1b456a04; }
.concept-01 .clinical-primary > div > .panel { height: 100%; }
.concept-01 .login-panel { border-top: 4px solid var(--accent); padding: 28px 30px 30px; }
.concept-01 .announcement-panel { padding: 30px; }
.concept-01 .panel-heading h2 { letter-spacing: -.03em; }
.concept-01 .login-submit { border-radius: 10px; min-height: 49px; box-shadow: 0 5px 10px #175db015; }
.concept-01 .form-control { background: #f9fbfe; border-color: #ccdbe9; border-radius: 9px; }
.concept-01 .clinical-secondary { margin-top: 2px; }
.concept-01 .clinical-secondary > div > .panel { height: 100%; }
.concept-01 .clinical-device { margin-top: 24px; }
.concept-01 .device-panel { background: #e4edf6; border-color: #d4e0ec; margin-top: 0; }
.concept-01 .site-footer { margin-top: 4px; }
@media(max-width: 991.98px) { .concept-01 .site-shell { padding: 0 24px; } .concept-01 .clinical-hero { padding: 32px; } .concept-01 .clinical-mark { flex-basis: 160px; grid-template-columns: 65px 1fr; gap: 12px; } }
@media(max-width: 575.98px) { .concept-01 .site-shell { padding: 0 16px; } .concept-01 .site-header { min-height: 82px; } .concept-01 .clinical-hero { display: block; min-height: 0; padding: 26px 22px; margin-top: 0; border-radius: 18px; } .concept-01 .clinical-kicker { font-size: 11px; letter-spacing: .015em; margin-bottom: 18px; } .concept-01 .identity h1 { font-size: 30px; } .concept-01 .clinical-hero-note { font-size: 13px; max-width: 24em; } .concept-01 .clinical-mark { display: none; } .concept-01 .login-panel,.concept-01 .announcement-panel { padding: 24px 22px; } .concept-01 .panel { border-radius: 14px; } }
`
  },
  {
    id: '02-midnight-command',
    name: '午夜指揮所',
    en: 'MIDNIGHT COMMAND',
    description: '深海藍與訊號青綠，搭配固定識別側欄和儀表式資訊分區，帶出專注的控制台氛圍。',
    colors: { bg: '#101a29', surface: '#172539', ink: '#edf5ff', muted: '#a3b4ca', line: '#32445c', accent: '#70e1ce', onAccent: '#102b2b', soft: '#223d46' },
    render: p => `<div class="command-shell">
      ${p.header}
      <main id="main-content" class="command-layout">
        <aside class="command-rail"><div class="command-rail-top"><div class="command-orbit" aria-hidden="true"><span></span><i></i><b></b></div><p class="command-label">WORKSPACE / ACCESS</p>${p.identity}<p class="command-intro">每次存取，都清楚知道<br>自己所在的工作系統。</p><div class="command-coordinate" aria-hidden="true"><span>ENTRY POINT</span><span>02 / 10</span></div></div></aside>
        <div class="command-content"><div class="command-section-heading"><span>IDENTITY & INFORMATION</span><span class="command-section-line"></span><span>登入工作區</span></div><div class="row g-4"><div class="col-xl-6">${p.login}</div><div class="col-xl-6">${p.news}</div></div><div class="command-release">${p.release}</div><div class="command-device">${p.device}</div></div>
        <aside class="command-help">${p.support}</aside>
      </main>
      ${p.footer}
    </div>`,
    css: `
.concept-02 { background: var(--bg); color: var(--ink); color-scheme: dark; --error: #ffad9e; }
.concept-02 .site-shell { max-width: 1536px; padding: 0 40px; margin: auto; }
.concept-02 .site-header { border-bottom: 1px solid var(--line); min-height: 92px; }
.concept-02 .command-layout { display: grid; grid-template-columns: 285px minmax(0,1fr); grid-template-areas: 'identity content' 'help content'; grid-template-rows: auto 1fr; column-gap: 36px; padding-top: 34px; }
.concept-02 .command-rail { grid-area: identity; display: flex; flex-direction: column; gap: 26px; border-right: 1px solid var(--line); padding-right: 30px; }
.concept-02 .command-content { grid-area: content; min-width: 0; }
.concept-02 .command-rail-top { padding-top: 14px; }
.concept-02 .command-orbit { position: relative; width: 122px; height: 122px; margin: 0 0 34px; border: 1px solid #3e6870; border-radius: 50%; }
.concept-02 .command-orbit::before { position: absolute; content: ''; inset: 16px; border: 1px solid #375361; border-radius: 50%; }
.concept-02 .command-orbit::after { position: absolute; content: ''; inset: 41px; border: 1px solid #70e1ce; background: #24464b; border-radius: 8px; transform: rotate(45deg); box-shadow: 0 0 35px #70e1ce15; }
.concept-02 .command-orbit > span { position: absolute; width: 14px; height: 14px; top: 13px; right: 12px; border: 3px solid var(--bg); background: #70e1ce; border-radius: 50%; z-index: 1; }
.concept-02 .command-orbit > i { position: absolute; top: 60px; left: -12px; width: 144px; height: 1px; background: #36515d; }
.concept-02 .command-orbit > b { position: absolute; left: 60px; top: -12px; width: 1px; height: 144px; background: #36515d; }
.concept-02 .command-label { font: 11px/1.7 ui-monospace,monospace; letter-spacing: .12em; color: #70e1ce; margin-bottom: 17px; }
.concept-02 .command-rail .identity { padding: 0; }
.concept-02 .identity h1 { font-size: 34px; line-height: 1.35; font-weight: 750; letter-spacing: -.035em; margin-bottom: 18px; }
.concept-02 .system-code { color: #b6cbdc; }
.concept-02 .command-intro { font-size: 14px; line-height: 1.9; color: var(--muted); margin: 26px 0 30px; }
.concept-02 .command-coordinate { display: flex; justify-content: space-between; gap: 10px; padding: 12px 0; border-top: 1px solid #32445c; border-bottom: 1px solid #32445c; color: #92a8c1; font: 11px/1.6 ui-monospace,monospace; letter-spacing: .07em; }
.concept-02 .command-help { grid-area: help; display: flex; align-items: flex-end; padding: 26px 30px 0 0; border-right: 1px solid var(--line); }
.concept-02 .command-help .support-panel { width: 100%; }
.concept-02 .command-help .support-panel { padding: 21px 0; background: transparent; border: 0; box-shadow: none; }
.concept-02 .command-help .support-panel .panel-heading { margin-bottom: 17px; }
.concept-02 .command-section-heading { display: flex; gap: 13px; align-items: center; margin: 4px 0 20px; color: #a3b4ca; font-size: 11px; letter-spacing: .08em; }
.concept-02 .command-section-heading > span:first-child { color: #70e1ce; font-family: ui-monospace,monospace; }
.concept-02 .command-section-line { height: 1px; background: #32445c; flex: 1; }
.concept-02 .panel { border-radius: 12px; background: var(--surface); box-shadow: none; border-color: var(--line); }
.concept-02 .command-content .row > div > .panel { height: 100%; }
.concept-02 .login-panel { position: relative; border-top: 2px solid #70e1ce; }
.concept-02 .announcement-panel { background: #152235; }
.concept-02 .login-panel::before { content: ''; position: absolute; width: 44px; height: 4px; border-radius: 2px; background: #70e1ce; right: 26px; top: -3px; }
.concept-02 .form-control { background: #101c2d; color: #edf5ff; border-color: #41536c; border-radius: 7px; }
.concept-02 .form-control::placeholder { color: #8a9bb0; }
.concept-02 .form-control:focus { background: #101c2d; color: #edf5ff; border-color: #70e1ce; box-shadow: 0 0 0 .22rem #70e1ce20; }
.concept-02 .login-submit { border-radius: 7px; font-weight: 750; }
.concept-02 .command-release,.concept-02 .command-device { margin-top: 24px; }
.concept-02 .release-panel { background: #182c40; }
.concept-02 .device-panel { background: transparent; margin-top: 0; }
.concept-02 .news-row { border-color: #32445c; }
.concept-02 .site-footer { margin-top: 26px; border-color: #32445c; }
.concept-02 .modal-content { color: var(--ink); background: #172539; border-color: #32445c; }
.concept-02 .btn-close { filter: invert(1) grayscale(1); }
@media(max-width:1199.98px) { .concept-02 .site-shell { padding: 0 28px; } .concept-02 .command-layout { grid-template-columns: 245px minmax(0,1fr); column-gap: 28px; } .concept-02 .command-rail,.concept-02 .command-help { padding-right: 26px; } .concept-02 .identity h1 { font-size: 30px; } }
@media(max-width:991.98px) { .concept-02 .command-layout { grid-template-columns: 1fr; grid-template-areas: 'identity' 'content' 'help'; grid-template-rows: auto; gap: 26px; padding-top: 26px; } .concept-02 .command-rail { border-right: 0; padding-right: 0; gap: 0; } .concept-02 .command-rail-top { position: relative; padding: 10px 170px 24px 0; border-bottom: 1px solid var(--line); } .concept-02 .command-orbit { position: absolute; right: 24px; top: 22px; width: 122px; } .concept-02 .command-intro { margin: 18px 0 0; } .concept-02 .command-intro br { display: none; } .concept-02 .command-coordinate { display: none; } .concept-02 .command-help { margin-top: 4px; padding: 0; border-right: 0; border-top: 1px solid var(--line); } .concept-02 .command-help .support-panel { padding: 22px 0 0; } .concept-02 .command-section-heading { margin-top: 0; } }
@media(max-width:575.98px) { .concept-02 .site-shell { padding: 0 17px; } .concept-02 .site-header { min-height: 82px; } .concept-02 .command-layout { gap: 24px; padding-top: 15px; } .concept-02 .command-rail-top { padding: 12px 0 24px; } .concept-02 .command-orbit { width: 58px; height: 58px; top: 4px; right: 4px; opacity: .65; } .concept-02 .command-orbit::before { inset: 8px; } .concept-02 .command-orbit::after { inset: 20px; border-radius: 3px; } .concept-02 .command-orbit > span { width: 10px; height: 10px; top: 3px; right: 2px; } .concept-02 .command-orbit > i { top: 28px; left: -6px; width: 68px; } .concept-02 .command-orbit > b { left: 28px; top: -6px; height: 68px; } .concept-02 .command-label { max-width: 220px; font-size: 10px; letter-spacing: .06em; margin-bottom: 22px; } .concept-02 .identity h1 { font-size: 31px; } .concept-02 .command-section-heading { letter-spacing: .015em; font-size: 10px; gap: 8px; } .concept-02 .panel { padding: 23px 21px; } }
`
  },
  {
    id: '03-paper-journal',
    name: '紙感院刊',
    en: 'THE SYSTEM JOURNAL',
    description: '以院刊編輯版型、米白紙色與酒紅色標記，讓系統名稱成為醒目刊頭，登入與消息井然排列。',
    colors: { bg: '#f3eee5', surface: '#fcf9f3', ink: '#342c28', muted: '#77695e', line: '#d4c8b8', accent: '#8b3436', onAccent: '#ffffff', soft: '#efe0d8' },
    render: p => `<div class="journal-shell">
      ${p.header}
      <main id="main-content">
        <section class="journal-masthead" aria-label="目前開啟的系統"><div class="journal-edition"><span>THE SYSTEM JOURNAL</span><span>工作日常・由此展開</span><span>ACCESS EDITION / 03</span></div><div class="journal-title">${p.identity}</div><div class="journal-deck"><span>熟悉的工作，更清楚的入口。</span><span>請核對系統名稱與使用環境後登入</span></div></section>
        <div class="row g-0 journal-columns"><div class="col-lg-5 order-lg-2 journal-login-column"><div class="journal-column-label"><span>01 / ACCOUNT ACCESS</span><i></i></div>${p.login}</div><div class="col-lg-4 order-lg-3 journal-news-column"><div class="journal-column-label"><span>02 / NOTICE BOARD</span><i></i></div>${p.news}</div><div class="col-lg-3 order-lg-1 journal-release-column"><div class="journal-column-label"><span>IN THIS EDITION</span><i></i></div><p class="journal-feature-title">每一次更新，<br>都是更好的<br><em>工作日常。</em></p>${p.release}<div class="journal-seal" aria-hidden="true"><span>DAILY<br>WORKSPACE</span><b>J</b></div></div></div>
        <div class="row g-4 journal-bottom"><div class="col-lg-5">${p.support}</div><div class="col-lg-7">${p.device}</div></div>
      </main>
      ${p.footer}
    </div>`,
    css: `
.concept-03 { background-color: var(--bg); background-image: radial-gradient(#6c4b2810 .5px,transparent .5px); background-size: 5px 5px; }
.concept-03 .site-shell { max-width: 1376px; margin: auto; padding: 0 44px; }
.concept-03 .site-header { border: 0; min-height: 88px; }
.concept-03 .journal-masthead { border-top: 4px solid #342c28; margin-top: 2px; }
.concept-03 .journal-edition { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid #342c28; font-size: 11px; letter-spacing: .12em; }
.concept-03 .journal-edition > span:first-child,.concept-03 .journal-edition > span:last-child { font-family: Georgia,'Times New Roman',serif; letter-spacing: .08em; }
.concept-03 .journal-title { text-align: center; padding: 30px 12px 24px; }
.concept-03 .journal-title .identity > .eyebrow { color: #77695e; letter-spacing: .2em; }
.concept-03 .journal-title .identity h1 { font-family: 'Noto Serif TC','PMingLiU','Microsoft JhengHei',serif; font-size: clamp(36px,4.1vw,59px); font-weight: 800; letter-spacing: .065em; line-height: 1.25; margin: 8px 0 17px; }
.concept-03 .journal-title .identity { display: flex; flex-direction: column; align-items: center; padding: 0; }
.concept-03 .journal-title .identity-meta { justify-content: center; }
.concept-03 .journal-title .system-code { border-radius: 0; }
.concept-03 .journal-deck { display: flex; justify-content: space-between; padding: 13px 0; gap: 16px; border-top: 1px solid #342c28; border-bottom: 3px double #342c28; font-size: 13px; }
.concept-03 .journal-deck > span:last-child { color: var(--muted); }
.concept-03 .journal-columns { padding: 30px 0; }
.concept-03 .journal-release-column { padding-right: 28px; }
.concept-03 .journal-login-column { padding: 0 29px; border-left: 1px solid #c8baa8; border-right: 1px solid #c8baa8; }
.concept-03 .journal-news-column { padding-left: 29px; }
.concept-03 .journal-column-label { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; font: 10px/1.5 ui-monospace,monospace; letter-spacing: .085em; color: #665749; }
.concept-03 .journal-column-label > i { flex: 1; border-top: 1px solid #c8baa8; }
.concept-03 .panel { background: transparent; border-radius: 0; box-shadow: none; }
.concept-03 .login-panel { padding: 25px; background: #fcf9f3; border: 1px solid #c5b29e; border-top: 4px solid #8b3436; }
.concept-03 .announcement-panel { padding: 0; border: 0; }
.concept-03 .panel-heading h2 { font-family: 'Noto Serif TC','PMingLiU','Microsoft JhengHei',serif; font-weight: 750; letter-spacing: .035em; }
.concept-03 .form-control,.concept-03 .login-submit { border-radius: 2px; }
.concept-03 .form-control { background: #fffcf6; border-color: #c8b7a5; }
.concept-03 .login-submit { letter-spacing: .075em; }
.concept-03 .news-row { padding-top: 20px; padding-bottom: 20px; border-bottom-color: #cbbfad; }
.concept-03 .journal-feature-title { font-family: 'Noto Serif TC','PMingLiU','Microsoft JhengHei',serif; font-size: 29px; line-height: 1.5; font-weight: 600; letter-spacing: .015em; margin-bottom: 25px; }
.concept-03 .journal-feature-title > em { color: var(--accent); font-style: normal; }
.concept-03 .release-panel { border: 0; border-top: 1px solid #bda992; padding: 23px 0 0; }
.concept-03 .journal-seal { display: flex; align-items: center; gap: 15px; margin-top: 32px; color: #957e68; }
.concept-03 .journal-seal > span { font: 10px/1.7 Georgia,serif; letter-spacing: .14em; }
.concept-03 .journal-seal > b { display: grid; place-items: center; width: 45px; height: 45px; border: 1px solid #aa927a; outline: 1px solid #aa927a; outline-offset: -5px; font: italic 27px/1 Georgia,serif; }
.concept-03 .journal-bottom { border-top: 3px double #342c28; padding-top: 4px; padding-bottom: 14px; margin-top: 0; }
.concept-03 .journal-bottom > div > .panel { height: 100%; padding: 24px 0 10px; border: 0; }
.concept-03 .journal-bottom > div:last-child > .panel { padding-left: 24px; border-left: 1px solid #c8baa8; }
.concept-03 .journal-bottom .device-panel { margin-top: 0; }
.concept-03 .journal-bottom .device-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
.concept-03 .journal-bottom .device-item:nth-child(3) { padding-left: 0; border-left: 0; }
.concept-03 .site-footer { border-top: 1px solid #342c28; }
@media(max-width:1199.98px) { .concept-03 .site-shell { padding: 0 30px; } .concept-03 .journal-login-column { padding: 0 22px; } .concept-03 .journal-news-column { padding-left: 22px; } .concept-03 .journal-release-column { padding-right: 22px; } .concept-03 .journal-feature-title { font-size: 25px; } }
@media(max-width:991.98px) { .concept-03 .journal-login-column,.concept-03 .journal-news-column,.concept-03 .journal-release-column { padding: 0; border: 0; } .concept-03 .journal-columns { gap: 30px; } .concept-03 .journal-login-column .login-panel { max-width: 600px; margin: auto; } .concept-03 .journal-feature-title { font-size: 25px; } .concept-03 .journal-feature-title br { display: none; } .concept-03 .journal-seal { display: none; } .concept-03 .journal-bottom > div:last-child > .panel { padding-left: 0; border-left: 0; border-top: 1px solid #c8baa8; } .concept-03 .journal-release-column .release-panel { padding-top: 20px; } }
@media(max-width:575.98px) { .concept-03 .site-shell { padding: 0 19px; } .concept-03 .site-header { min-height: 82px; } .concept-03 .journal-edition { font-size: 10px; letter-spacing: .02em; padding: 10px 0; gap: 8px; } .concept-03 .journal-edition > span:nth-child(2) { display: none; } .concept-03 .journal-title { padding: 27px 0 22px; } .concept-03 .journal-title .identity h1 { font-size: 32px; letter-spacing: .025em; } .concept-03 .journal-deck { display: block; padding: 12px 0; font-size: 12px; } .concept-03 .journal-deck > span { display: block; } .concept-03 .journal-deck > span:last-child { margin-top: 5px; } .concept-03 .journal-columns { padding-top: 24px; gap: 28px; } .concept-03 .journal-column-label { margin-bottom: 17px; } .concept-03 .login-panel { padding: 23px 20px; } .concept-03 .journal-feature-title { font-size: 25px; line-height: 1.6; } }
`
  }
];
