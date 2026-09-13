'use strict';

module.exports = [
  {
    id: '04-garden-courtyard',
    name: '庭院綠境',
    en: 'GARDEN COURTYARD',
    description: '深綠庭院與奶油白表單相映，讓系統入口清楚而從容。',
    colors: { bg: '#f1f2e9', surface: '#fffef8', ink: '#203d2b', muted: '#657365', line: '#d8dfce', accent: '#294f38', onAccent: '#ffffff', soft: '#e5eddf' },
    render: p => `<div class="garden-shell">
      ${p.header}
      <main>
        <div class="row g-4 garden-entry">
          <div class="col-lg-7">
            <section class="garden-greeting">
              <div class="garden-kicker"><span></span> A CALMER WAY TO BEGIN</div>
              ${p.identity}
              <div class="garden-arch" aria-hidden="true"><i class="garden-stem"></i><i class="garden-leaf garden-leaf-one"></i><i class="garden-leaf garden-leaf-two"></i><i class="garden-leaf garden-leaf-three"></i><i class="garden-ground"></i></div>
              <div class="garden-caption"><span>YOUR WORK, IN GOOD ORDER.</span><span>04 / COURTYARD</span></div>
            </section>
          </div>
          <div class="col-lg-5 garden-login-column">${p.login}</div>
        </div>
        <div class="garden-section-label"><span>讓每一次開始，都有清楚的方向</span><span class="muted">INFORMATION & SUPPORT</span></div>
        <div class="row g-4 garden-information">
          <div class="col-lg-7">${p.news}</div>
          <div class="col-lg-5 garden-info-stack">${p.release}${p.support}</div>
        </div>
        <div class="garden-device">${p.device}</div>
      </main>
      ${p.footer}
    </div>`,
    css: `
      .concept-04 .site-shell{max-width:1280px;margin:auto;padding:0 32px}
      .concept-04 .site-header{padding:27px 0 24px;border-bottom:1px solid var(--line);margin-bottom:27px}
      .concept-04 .garden-entry{align-items:stretch}
      .concept-04 .garden-greeting{height:100%;min-height:515px;background:#294f38;color:#fffef1;border-radius:24px;position:relative;overflow:hidden;padding:39px 39px 24px;display:flex;flex-direction:column;isolation:isolate}
      .concept-04 .garden-kicker{display:flex;align-items:center;gap:10px;font-size:10px;letter-spacing:.2em;font-weight:650;color:#c8dbc3;margin-bottom:38px}
      .concept-04 .garden-kicker>span{width:7px;height:7px;border-radius:50%;background:#d2e2a9}
      .concept-04 .garden-greeting .identity{position:relative;z-index:2;max-width:90%;padding:0;background:none;border:0}
      .concept-04 .garden-greeting .identity h1{font-size:clamp(31px,3.35vw,47px);line-height:1.28;letter-spacing:.04em;max-width:440px;color:#fffef1}
      .concept-04 .garden-greeting .identity .eyebrow,.concept-04 .garden-greeting .identity .muted,.concept-04 .garden-greeting .identity p{color:#d4e1ce}
      .concept-04 .garden-greeting .identity .identity-date{color:#d4e1ce}
      .concept-04 .garden-greeting .identity h1 .system-short{color:#d3e5b6}
      .concept-04 .garden-greeting .identity .system-code{color:#eff5dd;border-color:#728c6d;background:#3d6248}
      .concept-04 .garden-greeting .identity .environment-badge{background:#d3e5b6;color:#284c37;border-color:#d3e5b6}
      .concept-04 .garden-arch{position:absolute;width:250px;height:310px;right:25px;bottom:0;border-radius:145px 145px 0 0;background:#365d40;z-index:-1;overflow:hidden}
      .concept-04 .garden-stem{position:absolute;width:2px;height:180px;bottom:0;left:128px;background:#98b48e;transform:rotate(-15deg);transform-origin:bottom}
      .concept-04 .garden-leaf{position:absolute;display:block;background:#9fb88d;width:84px;height:42px;border-radius:100% 0 100% 0;transform-origin:bottom right}
      .concept-04 .garden-leaf-one{left:30px;bottom:142px;transform:rotate(25deg)}
      .concept-04 .garden-leaf-two{left:121px;bottom:111px;transform:rotate(-27deg);background:#73966b}
      .concept-04 .garden-leaf-three{left:49px;bottom:67px;transform:rotate(32deg);background:#64865c}
      .concept-04 .garden-ground{position:absolute;bottom:-135px;left:-100px;width:400px;height:175px;background:#507145;border-radius:50%}
      .concept-04 .garden-caption{margin-top:auto;padding-top:88px;display:flex;justify-content:space-between;gap:14px;font-size:9px;letter-spacing:.12em;position:relative;color:#d6e2ca}
      .concept-04 .login-panel{height:100%;border-radius:24px;padding:35px 34px;background:#fffef8;box-shadow:0 8px 28px #294f3805}
      .concept-04 .login-panel .panel-heading{margin-bottom:26px}
      .concept-04 .form-control{border-radius:10px;background:#fafbf5;min-height:48px}
      .concept-04 .login-submit{min-height:49px;border-radius:10px;letter-spacing:.08em}
      .concept-04 .garden-section-label{display:flex;justify-content:space-between;align-items:center;gap:16px;margin:31px 0 17px;font-size:13px;font-weight:650}
      .concept-04 .garden-section-label .muted{font-size:10px;letter-spacing:.12em;font-weight:500}
      .concept-04 .garden-information .panel{border-radius:19px}
      .concept-04 .garden-information .announcement-panel{height:100%}
      .concept-04 .garden-info-stack{display:flex;flex-direction:column;gap:20px}
      .concept-04 .garden-info-stack .release-panel{background:#e5eddf}
      .concept-04 .garden-info-stack .support-panel{flex:1}
      .concept-04 .news-row{border-color:#dfe5d7}
      .concept-04 .garden-device{margin-top:24px}
      .concept-04 .device-panel{background:#e8ecdf;border-color:transparent;border-radius:18px}
      .concept-04 .site-footer{padding:24px 0 28px}
      @media(max-width:991.98px){
        .concept-04 .site-shell{padding:0 22px}
        .concept-04 .garden-greeting{min-height:400px;padding:30px}
        .concept-04 .garden-greeting .identity h1{font-size:39px}
        .concept-04 .garden-arch{height:260px;width:230px}
        .concept-04 .garden-caption{padding-top:65px}
      }
      @media(max-width:575.98px){
        .concept-04 .site-shell{padding:0 16px}
        .concept-04 .site-header{padding:18px 0;margin-bottom:20px}
        .concept-04 .garden-greeting{min-height:360px;padding:25px 24px 21px;border-radius:20px}
        .concept-04 .garden-greeting .identity{max-width:100%}
        .concept-04 .garden-greeting .identity h1{font-size:30px;letter-spacing:0}
        .concept-04 .garden-kicker{margin-bottom:26px;font-size:8px;letter-spacing:.15em}
        .concept-04 .garden-arch{width:170px;height:213px;right:7px;opacity:.75}
        .concept-04 .garden-caption{font-size:8px;letter-spacing:.05em;gap:8px;padding-top:55px}
        .concept-04 .login-panel{padding:27px 23px;border-radius:20px}
        .concept-04 .garden-section-label{align-items:flex-start;margin-top:28px;flex-direction:column;gap:5px}
        .concept-04 .garden-information .panel{padding:23px}
      }
    `
  },
  {
    id: '05-cobalt-signal',
    name: '鈷藍信號',
    en: 'COBALT SIGNAL',
    description: '鮮明鈷藍側欄搭配黃色情報帶，以強烈秩序辨識系統與登入任務。',
    colors: { bg: '#e8ecf4', surface: '#ffffff', ink: '#101a36', muted: '#65708a', line: '#d4dbea', accent: '#224ce5', onAccent: '#ffffff', soft: '#e8eeff' },
    render: p => `<div class="signal-shell">
      ${p.header}
      <main class="signal-layout">
        <aside class="signal-sidebar">
          <div class="signal-index"><span>ACCESS POINT</span><span>05</span></div>
          ${p.identity}
          <div class="signal-glyph" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="signal-side-caption">清楚辨識。<br>準確進入。</div>
        </aside>
        <div class="signal-workspace">
          <div class="signal-banner"><span class="signal-dot"></span><strong>每次登入，先確認系統</strong><span>START WITH CLARITY ↗</span></div>
          <div class="row g-4 signal-main-row">
            <div class="col-xl-6">${p.login}</div>
            <div class="col-xl-6">${p.news}</div>
          </div>
          <div class="signal-release">${p.release}</div>
          <div class="signal-device">${p.device}</div>
        </div>
        <aside class="signal-support">${p.support}</aside>
      </main>
      ${p.footer}
    </div>`,
    css: `
      .concept-05 .site-shell{max-width:1440px;margin:0 auto;padding:0 32px}
      .concept-05 .site-header{padding:23px 0;border-bottom:2px solid #101a36;margin-bottom:24px}
      .concept-05 .signal-layout{display:grid;grid-template-columns:310px minmax(0,1fr);grid-template-rows:1fr auto;column-gap:24px;row-gap:0}
      .concept-05 .signal-sidebar{grid-column:1;grid-row:1;background:#224ce5;color:white;padding:29px 27px 0;display:flex;flex-direction:column;min-width:0;position:relative;overflow:hidden;border-radius:3px 3px 0 0}
      .concept-05 .signal-index{display:flex;justify-content:space-between;align-items:center;color:#d9e2ff;font-size:10px;letter-spacing:.13em;border-bottom:1px solid #7994fa;padding-bottom:19px;margin-bottom:26px}
      .concept-05 .signal-index span:last-child{font-size:28px;font-weight:800;line-height:1;color:#e9fa77;letter-spacing:-.05em}
      .concept-05 .signal-sidebar .identity{padding:0;background:none;border:0}
      .concept-05 .signal-sidebar .identity h1{font-size:36px;line-height:1.35;letter-spacing:.035em;color:#fff;overflow-wrap:anywhere}
      .concept-05 .signal-sidebar .identity p,.concept-05 .signal-sidebar .identity .eyebrow,.concept-05 .signal-sidebar .identity .muted{color:#dfe6ff}
      .concept-05 .signal-sidebar .identity .identity-date{color:#dfe6ff}
      .concept-05 .signal-sidebar .identity h1 .system-short{color:#e9fa77}
      .concept-05 .signal-sidebar .system-code{color:white;border-color:#8099ef;background:#315aeb}
      .concept-05 .signal-sidebar .identity .environment-badge{background:#e9fa77;color:#17274a;border-color:#e9fa77;border-radius:2px}
      .concept-05 .signal-glyph{margin:40px 0 32px;height:125px;position:relative;overflow:hidden}
      .concept-05 .signal-glyph span{position:absolute;width:132px;height:29px;left:12px;top:49px;background:#e9fa77;transform:rotate(-45deg)}
      .concept-05 .signal-glyph span:nth-child(2){left:76px;top:49px;background:transparent;border:2px solid #8dabff}
      .concept-05 .signal-glyph span:nth-child(3){left:140px;top:49px;background:transparent;border:2px solid #8dabff}
      .concept-05 .signal-side-caption{font-weight:800;font-size:28px;line-height:1.45;letter-spacing:.04em;padding-bottom:36px}
      .concept-05 .signal-support{grid-column:1;grid-row:2;min-width:0;background:#224ce5;padding:0 27px 29px;border-radius:0 0 3px 3px}
      .concept-05 .signal-support .support-panel{background:#163bbd;color:white;border-color:#6984e8;border-radius:3px;padding:22px 18px}
      .concept-05 .signal-support .support-panel h2,.concept-05 .signal-support .support-panel h3{color:white}
      .concept-05 .signal-support .support-panel a{color:#e9fa77}
      .concept-05 .signal-support .support-panel .muted,.concept-05 .signal-support .support-panel p,.concept-05 .signal-support .support-panel .eyebrow{color:#dfe6ff}
      .concept-05 .signal-support .support-panel .contact-grid dt{color:#dfe6ff}
      .concept-05 .signal-support .support-panel .panel-number{color:#e9fa77;border-color:#6984e8}
      .concept-05 .signal-support .support-panel .support-links{border-color:#6984e8}
      .concept-05 .signal-support .support-panel .btn{background:#e9fa77;color:#152452;border-color:#e9fa77;border-radius:3px}
      .concept-05 .signal-banner{background:#e9fa77;min-height:62px;padding:17px 22px;display:flex;align-items:center;gap:11px;border:1px solid #d1df6c;margin-bottom:24px;border-radius:3px}
      .concept-05 .signal-banner strong{font-size:14px;color:#14224b}
      .concept-05 .signal-banner>span:last-child{margin-left:auto;font-size:9px;letter-spacing:.12em;font-weight:750;color:#334013}
      .concept-05 .signal-dot{height:9px;width:9px;background:#224ce5;border-radius:50%;flex-shrink:0}
      .concept-05 .signal-workspace{min-width:0;grid-column:2;grid-row:1 / span 2}
      .concept-05 .panel{border-radius:3px;border-color:#c8d2e7;box-shadow:3px 3px 0 #d8dfec}
      .concept-05 .signal-main-row .panel{height:100%;padding:25px 23px}
      .concept-05 .login-panel .panel-heading{border-bottom:2px solid #224ce5;padding-bottom:17px}
      .concept-05 .form-control{border-radius:3px;min-height:48px;background:#f7f9fc;border-color:#b8c6e0}
      .concept-05 .login-submit{border-radius:3px;min-height:49px;font-weight:750;box-shadow:3px 3px 0 #b6c7ff}
      .concept-05 .announcement-panel .panel-heading{padding-bottom:17px;border-bottom:2px solid #e9fa77}
      .concept-05 .news-row{padding-top:16px;padding-bottom:16px}
      .concept-05 .signal-release{margin-top:24px}
      .concept-05 .signal-release .release-panel{border-left:5px solid #224ce5;background:#f8faff}
      .concept-05 .signal-device{margin-top:24px}
      .concept-05 .device-panel{background:#dde5f5;border-color:#c4d0e6;box-shadow:none}
      .concept-05 .site-footer{padding:24px 0}
      @media(min-width:1600px){.concept-05 .signal-layout{grid-template-columns:325px minmax(0,1fr)}}
      @media(max-width:1199.98px){
        .concept-05 .signal-layout{grid-template-columns:290px minmax(0,1fr)}
        .concept-05 .signal-glyph{margin-top:35px}
        .concept-05 .signal-main-row .panel{height:auto}
      }
      @media(max-width:991.98px){
        .concept-05 .site-shell{padding:0 22px}
        .concept-05 .signal-layout{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;gap:24px}
        .concept-05 .signal-sidebar{grid-column:1;grid-row:1;display:block;padding:27px;border-radius:3px}
        .concept-05 .signal-workspace{grid-column:1;grid-row:2}
        .concept-05 .signal-support{grid-column:1;grid-row:3;padding:24px 27px;border-radius:3px}
        .concept-05 .signal-index{margin-bottom:22px}
        .concept-05 .signal-sidebar .identity h1{font-size:37px}
        .concept-05 .signal-glyph,.concept-05 .signal-side-caption{display:none}
      }
      @media(max-width:575.98px){
        .concept-05 .site-shell{padding:0 16px}
        .concept-05 .site-header{padding:18px 0;margin-bottom:20px}
        .concept-05 .signal-layout{gap:20px}
        .concept-05 .signal-sidebar{display:flex;padding:25px 23px}
        .concept-05 .signal-sidebar .identity h1{font-size:31px;letter-spacing:.02em}
        .concept-05 .signal-support{padding:23px}
        .concept-05 .signal-banner{padding:16px;margin-bottom:20px;gap:9px;flex-wrap:wrap}
        .concept-05 .signal-banner strong{font-size:13px}
        .concept-05 .signal-banner>span:last-child{font-size:8px;width:100%;margin-left:18px}
        .concept-05 .signal-main-row .panel{padding:24px 22px}
        .concept-05 .signal-release,.concept-05 .signal-device{margin-top:20px}
      }
    `
  },
  {
    id: '06-wisteria-journal',
    name: '紫藤雅緻',
    en: 'WISTERIA JOURNAL',
    description: '淡紫柔光、置中系統標題與雜誌三欄，平衡登入、公告與服務資訊。',
    colors: { bg: '#f3f0f6', surface: '#ffffff', ink: '#382e49', muted: '#777080', line: '#e2dce9', accent: '#795aa3', onAccent: '#ffffff', soft: '#eee6f6' },
    render: p => `<div class="wisteria-shell">
      ${p.header}
      <main>
        <section class="wisteria-intro">
          <span class="wisteria-orb wisteria-orb-left" aria-hidden="true"></span>
          <span class="wisteria-orb wisteria-orb-right" aria-hidden="true"></span>
          <div class="wisteria-volume">THE WORKPLACE JOURNAL <span>VOL. 06</span></div>
          ${p.identity}
          <div class="wisteria-rule"><span>為專注而設計的工作入口</span></div>
        </section>
        <div class="wisteria-columns">
          <aside class="wisteria-notes">
            <div class="wisteria-column-title"><span>01</span> 更新與協助</div>
            ${p.release}
            ${p.support}
          </aside>
          <div class="wisteria-access">
            <div class="wisteria-column-title"><span>02</span> 登入工作空間</div>
            ${p.login}
          </div>
          <div class="wisteria-bulletin">
            <div class="wisteria-column-title"><span>03</span> 最新消息</div>
            ${p.news}
          </div>
        </div>
        <div class="wisteria-device">${p.device}</div>
      </main>
      ${p.footer}
    </div>`,
    css: `
      .concept-06{background:radial-gradient(ellipse at 48% 5%,#faf6ff 0%,#f3f0f6 52%,#efedf4 100%)}
      .concept-06 .site-shell{max-width:1330px;margin:auto;padding:0 35px}
      .concept-06 .site-header{padding:24px 0;border-bottom:1px solid #d9d2e2;margin-bottom:0}
      .concept-06 .wisteria-intro{text-align:center;padding:34px 110px 27px;position:relative;overflow:hidden;isolation:isolate}
      .concept-06 .wisteria-volume{font-size:9px;font-weight:650;letter-spacing:.23em;color:#88749c;margin-bottom:20px}
      .concept-06 .wisteria-volume span{margin-left:15px;padding-left:15px;border-left:1px solid #c6b9d5;letter-spacing:.13em}
      .concept-06 .wisteria-intro .identity{padding:0;border:0;background:none;margin:auto;max-width:780px;position:relative}
      .concept-06 .wisteria-intro .identity h1{font-size:clamp(32px,3.6vw,49px);font-weight:750;line-height:1.3;letter-spacing:.1em;color:#473256}
      .concept-06 .wisteria-intro .identity>div{justify-content:center}
      .concept-06 .wisteria-intro .identity p{margin-left:auto;margin-right:auto}
      .concept-06 .wisteria-intro .identity .system-code{background:#ede6f3;color:#68497f;border:1px solid #d4c6df}
      .concept-06 .wisteria-intro .identity .eyebrow{color:#8a749d}
      .concept-06 .wisteria-orb{display:block;position:absolute;z-index:-1;width:180px;height:180px;border-radius:50%;border:1px solid #dcd1e6;top:35px}
      .concept-06 .wisteria-orb:after{content:'';position:absolute;inset:22px;border-radius:50%;border:1px solid #e5dceb}
      .concept-06 .wisteria-orb-left{left:-59px;background:linear-gradient(140deg,#e3d5efaa,#eee9f100);transform:rotate(30deg)}
      .concept-06 .wisteria-orb-right{right:-52px;top:90px;width:220px;height:220px;background:linear-gradient(220deg,#e3d5ef88,#eee9f100)}
      .concept-06 .wisteria-rule{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:23px;font-size:11px;color:#82718f;letter-spacing:.07em}
      .concept-06 .wisteria-rule:before,.concept-06 .wisteria-rule:after{content:'';display:block;width:72px;height:1px;background:#d9cee2}
      .concept-06 .wisteria-columns{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.16fr) minmax(0,1fr);gap:22px;align-items:stretch;border-top:1px solid #d9d2e2;padding-top:21px}
      .concept-06 .wisteria-column-title{font-size:12px;font-weight:650;color:#6f577f;display:flex;gap:11px;align-items:center;margin-bottom:15px}
      .concept-06 .wisteria-column-title span{font-size:10px;color:#9c89aa;letter-spacing:.1em}
      .concept-06 .wisteria-notes{display:flex;flex-direction:column;min-width:0}
      .concept-06 .wisteria-notes .release-panel{border-radius:12px;background:#eae1f1;border-color:#dcd0e5;padding:23px 21px;box-shadow:none}
      .concept-06 .wisteria-notes .support-panel{border-radius:12px;background:#f8f5fb;padding:23px 21px;flex:1;margin-top:18px}
      .concept-06 .wisteria-access,.concept-06 .wisteria-bulletin{display:flex;flex-direction:column;min-width:0}
      .concept-06 .login-panel{flex:1;border-radius:18px;border:1px solid #d8c8e3;padding:30px 28px;box-shadow:0 11px 32px #6541850a;position:relative;overflow:hidden}
      .concept-06 .login-panel:before{content:'';position:absolute;top:0;height:5px;left:0;right:0;background:linear-gradient(90deg,#b8a0cf,#745099,#d3c6df)}
      .concept-06 .login-panel .panel-heading{margin-bottom:26px}
      .concept-06 .form-control{background:#faf8fc;border-color:#ddd2e5;border-radius:8px;min-height:48px}
      .concept-06 .login-submit{border-radius:8px;min-height:49px;background:#795aa3;border-color:#795aa3;letter-spacing:.1em;box-shadow:0 6px 13px #795aa31a}
      .concept-06 .announcement-panel{flex:1;border-radius:12px;padding:25px 23px;background:#fcfaff}
      .concept-06 .announcement-panel .panel-heading{padding-bottom:18px;border-bottom:1px solid #e2d9e9}
      .concept-06 .news-row{padding-top:17px;padding-bottom:17px;border-bottom-style:dashed}
      .concept-06 .wisteria-device{margin-top:23px}
      .concept-06 .device-panel{background:#ece7f1;border-radius:12px;border-color:#ded5e7;box-shadow:none}
      .concept-06 .site-footer{padding:24px 0 28px}
      @media(max-width:1199.98px){
        .concept-06 .wisteria-columns{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px}
        .concept-06 .wisteria-notes{grid-column:1/-1;grid-row:2;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:22px;align-items:stretch}
        .concept-06 .wisteria-notes .wisteria-column-title{grid-column:1/-1}
        .concept-06 .wisteria-notes .support-panel{margin-top:0}
        .concept-06 .wisteria-intro{padding-right:60px;padding-left:60px}
      }
      @media(max-width:767.98px){
        .concept-06 .site-shell{padding:0 22px}
        .concept-06 .wisteria-intro{padding:28px 20px 25px}
        .concept-06 .wisteria-intro .identity h1{font-size:34px;letter-spacing:.035em}
        .concept-06 .wisteria-columns{grid-template-columns:minmax(0,1fr);gap:23px}
        .concept-06 .wisteria-access{grid-row:1}
        .concept-06 .wisteria-bulletin{grid-row:2}
        .concept-06 .wisteria-notes{grid-row:3;display:flex}
        .concept-06 .wisteria-notes .support-panel{margin-top:18px}
        .concept-06 .wisteria-volume{font-size:8px;letter-spacing:.15em}
      }
      @media(max-width:575.98px){
        .concept-06 .site-shell{padding:0 16px}
        .concept-06 .site-header{padding:18px 0}
        .concept-06 .wisteria-intro{padding:28px 7px 24px}
        .concept-06 .wisteria-intro .identity h1{font-size:29px;letter-spacing:.015em}
        .concept-06 .wisteria-orb-left{left:-135px}
        .concept-06 .wisteria-orb-right{right:-160px}
        .concept-06 .wisteria-rule{font-size:10px;gap:12px;letter-spacing:.015em}
        .concept-06 .wisteria-rule:before,.concept-06 .wisteria-rule:after{width:28px}
        .concept-06 .login-panel{padding:29px 24px}
        .concept-06 .announcement-panel{padding:25px 23px}
      }
    `
  }
];
