'use strict';

// Layout definitions only. Shared, accessible components and interactions are
// supplied by the main builder through `p`.
module.exports = [
  {
    id: '07-nordic-space',
    name: '北歐留白',
    en: 'NORDIC SPACE',
    description: '霧白、松綠與大幅留白，將系統識別與工作資訊安放在清楚的秩序中。',
    colors: { bg: '#f5f7f4', surface: '#ffffff', ink: '#243c33', muted: '#68786f', line: '#dce4dc', accent: '#355c49', onAccent: '#ffffff', soft: '#eaf0e9' },
    render: p => `${p.header}
      <main class="nordic-main">
        <section class="nordic-welcome" aria-label="目前登入系統">
          <div class="nordic-welcome-copy">${p.identity}</div>
          <div class="nordic-symbol" aria-hidden="true"><span class="nordic-disc"></span><span class="nordic-stem"></span><span class="nordic-leaf leaf-one"></span><span class="nordic-leaf leaf-two"></span><span class="nordic-ground"></span><small>SPACE FOR YOUR DAY</small></div>
        </section>
        <div class="nordic-rule"><span>YOUR WORKSPACE</span><span>登入 · 資訊 · 支援</span></div>
        <div class="row g-4 nordic-access-row">
          <div class="col-lg-5 nordic-login-column">${p.login}</div>
          <div class="col-lg-7 nordic-news-column">${p.news}</div>
        </div>
        <div class="row g-4 nordic-resource-row">
          <div class="col-lg-6">${p.release}</div>
          <div class="col-lg-6">${p.support}</div>
        </div>
        <div class="nordic-device">${p.device}</div>
      </main>${p.footer}`,
    css: `
.concept-07 .site-shell{max-width:1280px;padding-left:48px;padding-right:48px}
.concept-07 .site-header{padding-top:29px;padding-bottom:25px;border-bottom:1px solid var(--line)}
.concept-07 .nordic-welcome{display:grid;grid-template-columns:minmax(0,1fr) 290px;align-items:center;min-height:278px;gap:30px;padding:37px 0 28px}
.concept-07 .identity{margin:0;padding:0;position:relative}
.concept-07 .identity h1{font-weight:500;font-size:clamp(36px,3.9vw,52px);letter-spacing:.02em;line-height:1.24;margin:17px 0 14px;max-width:850px}
.concept-07 .identity p{max-width:610px;line-height:1.9;font-size:14px}
.concept-07 .eyebrow{font-size:10px;font-weight:600;letter-spacing:.18em}
.concept-07 .system-code{letter-spacing:.12em}
.concept-07 .nordic-symbol{height:218px;position:relative;isolation:isolate}
.concept-07 .nordic-disc{position:absolute;width:148px;height:148px;border-radius:50%;background:#e1e8da;top:9px;right:29px}
.concept-07 .nordic-stem{height:163px;width:1px;background:#5c7764;position:absolute;left:128px;top:37px;transform:rotate(18deg);transform-origin:bottom}
.concept-07 .nordic-leaf{position:absolute;border:1px solid #5c7764;border-radius:100% 0 100% 0;transform:rotate(-13deg)}
.concept-07 .leaf-one{width:69px;height:108px;left:143px;top:34px;background:#b8c8ad}
.concept-07 .leaf-two{width:49px;height:88px;left:85px;top:102px;transform:rotate(-68deg);background:#d9e2d1}
.concept-07 .nordic-ground{height:1px;background:#aaba9d;width:180px;position:absolute;left:59px;bottom:18px}
.concept-07 .nordic-symbol small{position:absolute;font-size:8px;letter-spacing:.2em;bottom:0;left:59px;color:#68786f}
.concept-07 .nordic-rule{display:flex;align-items:center;justify-content:space-between;gap:20px;border-top:1px solid var(--line);padding:19px 0 24px;color:var(--muted);font-size:10px;letter-spacing:.12em}
.concept-07 .panel{border-radius:5px;padding:28px;box-shadow:none}
.concept-07 .nordic-access-row>div>.panel{height:100%}
.concept-07 .login-panel{border-top:3px solid var(--accent);background:#fff}
.concept-07 .announcement-panel{background:transparent;border-color:transparent;padding-left:31px;padding-right:0}
.concept-07 .panel-heading{margin-bottom:23px}
.concept-07 .panel-heading h2{font-size:22px;font-weight:500;letter-spacing:.04em}
.concept-07 .form-control{border-radius:3px;background:#fcfdfb;border-color:#cdd9ce;min-height:49px}
.concept-07 .login-submit{border-radius:3px;min-height:49px;letter-spacing:.08em}
.concept-07 .news-row{padding-top:20px;padding-bottom:20px}
.concept-07 .nordic-resource-row{margin-top:8px}
.concept-07 .nordic-resource-row>div>.panel{height:100%;background:#edf2eb;border-color:#e0e7dc}
.concept-07 .nordic-resource-row .panel-heading h2{font-size:17px;font-weight:600}
.concept-07 .nordic-device{margin-top:26px}
.concept-07 .device-panel{background:transparent;border-width:1px 0;border-radius:0;padding-left:0;padding-right:0;margin-top:0}
.concept-07 .site-footer{padding-top:24px;padding-bottom:29px}
@media(max-width:991.98px){.concept-07 .site-shell{padding-left:28px;padding-right:28px}.concept-07 .nordic-welcome{grid-template-columns:minmax(0,1fr) 210px}.concept-07 .nordic-symbol{transform:scale(.85);transform-origin:right center}.concept-07 .announcement-panel{padding:26px;border-color:var(--line);background:var(--surface)}.concept-07 .nordic-resource-row{margin-top:0}}
@media(max-width:575.98px){.concept-07 .site-shell{padding-left:18px;padding-right:18px}.concept-07 .site-header{padding-top:20px;padding-bottom:19px}.concept-07 .nordic-welcome{display:block;min-height:0;padding:31px 0 24px;position:relative;isolation:isolate}.concept-07 .identity h1{font-size:32px;letter-spacing:0;line-height:1.4;margin-top:13px}.concept-07 .identity p{font-size:13px}.concept-07 .nordic-symbol{display:none}.concept-07 .nordic-rule{font-size:9px;padding:15px 0 20px;gap:10px}.concept-07 .panel{padding:22px 20px}.concept-07 .panel-heading h2{font-size:20px}.concept-07 .nordic-device{margin-top:22px}.concept-07 .device-panel{padding-left:0;padding-right:0}.concept-07 .site-footer{padding-bottom:22px}}
`
  },
  {
    id: '08-urban-tiles',
    name: '都會磁磚',
    en: 'URBAN TILES',
    description: '青綠主視覺、杏橘功能磁磚與俐落模組，將每日入口變成鮮明的工作桌面。',
    colors: { bg: '#eaece6', surface: '#ffffff', ink: '#123e39', muted: '#63736b', line: '#d4ddd3', accent: '#13665c', onAccent: '#ffffff', soft: '#e7f1e9' },
    render: p => `${p.header}
      <main class="urban-board">
        <section class="urban-identity" aria-label="目前登入系統">${p.identity}<div class="urban-motif" aria-hidden="true"><span></span><span></span><span></span><span></span></div><span class="urban-hero-note">ONE PLACE. EVERY WORKDAY.</span></section>
        <div class="urban-login">${p.login}</div>
        <div class="urban-news">${p.news}</div>
        <div class="urban-release">${p.release}</div>
        <div class="urban-support">${p.support}</div>
        <div class="urban-device">${p.device}</div>
      </main>${p.footer}`,
    css: `
.concept-08 .site-shell{max-width:1380px;padding-left:42px;padding-right:42px}
.concept-08 .site-header{border-bottom:0;padding-top:27px;padding-bottom:27px}
.concept-08 .urban-board{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-template-rows:auto auto auto auto;gap:18px}
.concept-08 .urban-board>div{min-width:0}
.concept-08 .urban-identity{grid-column:1/8;grid-row:1;background:#0e6359;border-radius:25px;padding:34px 36px 32px;position:relative;overflow:hidden;min-height:246px;isolation:isolate;color:#fff}
.concept-08 .identity{padding:0;margin:0;position:relative;z-index:2;max-width:520px}
.concept-08 .identity h1{font-size:clamp(31px,3.5vw,44px);font-weight:750;letter-spacing:-.04em;line-height:1.32;max-width:510px;margin:17px 0 14px;color:#fff}
.concept-08 .urban-identity .eyebrow,.concept-08 .urban-identity .muted,.concept-08 .urban-identity .identity p{color:#d5ede5}
.concept-08 .urban-identity .system-code{color:#e1f7ed;background:#ffffff12;border-color:#ffffff50}
.concept-08 .urban-identity .system-short{color:#dfedb8}
.concept-08 .urban-identity .identity-date{color:#c6e1d7}
.concept-08 .urban-identity .identity p{font-size:13px;max-width:380px;line-height:1.8}
.concept-08 .urban-hero-note{display:block;margin-top:23px;font-size:9px;font-weight:600;letter-spacing:.15em;color:#b1d4bd;position:relative;z-index:2}
.concept-08 .urban-motif{position:absolute;right:-30px;bottom:-15px;width:220px;height:220px;display:grid;grid-template-columns:1fr 1fr;gap:7px;opacity:.24;transform:rotate(-14deg);z-index:-1}
.concept-08 .urban-motif span:nth-child(1){border-radius:100% 0 0 0;background:#e5ed8b}.concept-08 .urban-motif span:nth-child(2){border-radius:100%;background:#e5ed8b}.concept-08 .urban-motif span:nth-child(3){border-radius:0 0 0 100%;background:#e5ed8b}.concept-08 .urban-motif span:nth-child(4){border-radius:0 0 100% 0;border:23px solid #e5ed8b}
.concept-08 .urban-login{grid-column:8/13;grid-row:1/3}
.concept-08 .urban-news{grid-column:1/8;grid-row:2/4}
.concept-08 .urban-release{grid-column:8/13;grid-row:3}
.concept-08 .urban-support{grid-column:1/5;grid-row:4}
.concept-08 .urban-device{grid-column:5/13;grid-row:4}
.concept-08 .panel{border:0;border-radius:25px;padding:28px;height:100%;box-shadow:none}
.concept-08 .panel-heading h2{font-size:22px;font-weight:700;letter-spacing:-.02em}
.concept-08 .login-panel{padding:32px;background:#fff;display:flex;flex-direction:column}
.concept-08 .login-panel form{flex:1}
.concept-08 .form-control{border-radius:10px;background:#f5f7f2;border-color:#dfe6dc;min-height:51px}
.concept-08 .login-submit{border-radius:12px;min-height:52px;font-weight:650;background:#153f37}
.concept-08 .announcement-panel{background:#f8f9f4}
.concept-08 .news-row{padding-top:19px;padding-bottom:19px;border-color:#dfe5d8}
.concept-08 .urban-release .release-panel{background:#f4b586;color:#472c1d;--ink:#472c1d;--muted:#79523b;--line:#dfa378;--soft:#f8c9a7;--accent:#743e20;--on-accent:#fff}
.concept-08 .urban-release .panel-heading h2{font-size:19px}
.concept-08 .urban-support .support-panel{background:#dbe6a3;--ink:#304222;--muted:#5b6741;--line:#bbc68c;--soft:#e9efc6;--accent:#405522;color:#304222}
.concept-08 .urban-support .panel-heading h2{font-size:19px}
.concept-08 .urban-device .device-panel{background:#dae6dd;--line:#b9cdbf;margin-top:0}
.concept-08 .device-panel .panel-heading h2{font-size:19px}
.concept-08 .urban-device .device-grid{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:20px}
.concept-08 .site-footer{padding-top:23px;padding-bottom:27px}
@media(max-width:1199.98px){.concept-08 .site-shell{padding-left:28px;padding-right:28px}.concept-08 .urban-identity{padding:28px}.concept-08 .identity h1{font-size:34px}.concept-08 .panel{padding:24px}.concept-08 .login-panel{padding:28px}.concept-08 .urban-support{grid-column:1/6}.concept-08 .urban-device{grid-column:6/13}}
@media(max-width:991.98px){.concept-08 .urban-board{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.concept-08 .urban-identity{grid-column:1/-1;grid-row:1;min-height:230px}.concept-08 .identity{max-width:600px}.concept-08 .identity h1{font-size:39px;max-width:none}.concept-08 .urban-motif{opacity:.28;right:45px;bottom:-35px}.concept-08 .urban-login{grid-column:1;grid-row:2/4}.concept-08 .urban-news{grid-column:2;grid-row:2/4}.concept-08 .urban-release{grid-column:1;grid-row:4}.concept-08 .urban-support{grid-column:2;grid-row:4}.concept-08 .urban-device{grid-column:1/-1;grid-row:5}.concept-08 .urban-device .device-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media(max-width:767.98px){.concept-08 .site-shell{padding-left:17px;padding-right:17px}.concept-08 .site-header{padding-top:19px;padding-bottom:21px}.concept-08 .urban-board{display:flex;flex-direction:column;gap:15px}.concept-08 .urban-identity{min-height:0;padding:26px 23px;border-radius:22px}.concept-08 .identity h1{font-size:32px;line-height:1.42;letter-spacing:-.04em;max-width:340px}.concept-08 .identity p{max-width:290px}.concept-08 .urban-motif{width:175px;height:175px;right:-50px;bottom:-30px;opacity:.12}.concept-08 .urban-hero-note{font-size:8px;margin-top:24px}.concept-08 .panel{padding:24px 22px;border-radius:22px}.concept-08 .panel-heading h2{font-size:21px}.concept-08 .urban-device .device-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.concept-08 .site-footer{padding-top:20px}}
`
  },
  {
    id: '09-precision-blueprint',
    name: '精密藍圖',
    en: 'PRECISION BLUEPRINT',
    description: '深藍製圖底紋、細線框與技術字距，建立具秩序感的資訊工作台。',
    colors: { bg: '#0c2f60', surface: '#123b70', ink: '#f2f7ff', muted: '#bed0e8', line: '#40618d', accent: '#b8ddff', onAccent: '#082a50', soft: '#234b7e' },
    render: p => `${p.header}
      <main class="blueprint-main">
        <section class="blueprint-title" aria-label="目前登入系統">${p.identity}<svg class="blueprint-drawing" viewBox="0 0 320 210" fill="none" aria-hidden="true"><path d="M16 28H304M16 182H304M48 10V200M270 10V200" stroke="currentColor" opacity=".4"/><path d="M64 41H255V169H64Z" stroke="currentColor"/><path d="M79 56H240V141H79Z" stroke="currentColor"/><path d="M142 169V182H179V169M121 183H201" stroke="currentColor"/><path d="M100 102H218M159 69V130" stroke="currentColor" stroke-dasharray="3 5" opacity=".65"/><circle cx="159" cy="101" r="26" stroke="currentColor"/><circle cx="159" cy="101" r="37" stroke="currentColor" opacity=".4"/><path d="M42 28L54 28M48 22V34M264 28H276M270 22V34M42 182H54M48 176V188M264 182H276M270 176V188" stroke="currentColor"/><path d="M67 20L62 25L67 30M249 20L254 25L249 30M67 25H254" stroke="currentColor" opacity=".7"/></svg></section>
        <div class="blueprint-caption"><span>WORKSPACE / ACCESS PLAN</span><span>請確認系統名稱後登入</span></div>
        <div class="blueprint-plan">
          <div class="blueprint-login"><span class="blueprint-mark" aria-hidden="true">01 / ACCESS</span>${p.login}</div>
          <div class="blueprint-news"><span class="blueprint-mark" aria-hidden="true">02 / BULLETIN</span>${p.news}</div>
          <div class="blueprint-support"><span class="blueprint-mark" aria-hidden="true">03 / ASSISTANCE</span>${p.support}</div>
          <div class="blueprint-release"><span class="blueprint-mark" aria-hidden="true">04 / CHANGELOG</span>${p.release}</div>
        </div>
        <div class="blueprint-device">${p.device}</div>
      </main>${p.footer}`,
    css: `
.concept-09{--error:#ffb7a9;background-color:var(--bg);background-image:linear-gradient(#b7d8ff07 1px,transparent 1px),linear-gradient(90deg,#b7d8ff07 1px,transparent 1px);background-size:32px 32px}
.concept-09 .site-shell{max-width:1340px;padding-left:48px;padding-right:48px}
.concept-09 .site-header{border-bottom:1px solid #8baed75c;padding-top:26px;padding-bottom:23px}
.concept-09 .blueprint-title{display:flex;justify-content:space-between;align-items:center;gap:32px;padding:39px 0 32px;min-height:247px}
.concept-09 .identity{padding:0;margin:0;max-width:810px;min-width:0}
.concept-09 .identity h1{color:#f7faff;font-size:clamp(34px,3.9vw,49px);font-weight:700;letter-spacing:.035em;line-height:1.33;margin:17px 0 15px}
.concept-09 .identity p{font-size:13px;line-height:1.85;color:#bed0e8}
.concept-09 .eyebrow,.concept-09 .system-code{font-family:ui-monospace,SFMono-Regular,Consolas,"Microsoft JhengHei",monospace;letter-spacing:.12em}
.concept-09 .blueprint-drawing{width:275px;height:192px;flex:0 0 275px;color:#91b8e8;stroke-width:1.15}
.concept-09 .blueprint-caption{display:flex;justify-content:space-between;gap:20px;padding:11px 0 22px;border-top:1px solid #8baed75c;color:#a2c2e7;font:10px/1.8 ui-monospace,Consolas,"Microsoft JhengHei",monospace;letter-spacing:.1em}
.concept-09 .blueprint-plan{display:grid;grid-template-columns:minmax(340px,.84fr) minmax(0,1.16fr);grid-template-areas:"login news" "support release";gap:28px 24px}
.concept-09 .blueprint-plan>div{position:relative;min-width:0;padding-top:19px}
.concept-09 .blueprint-login{grid-area:login}.concept-09 .blueprint-news{grid-area:news}.concept-09 .blueprint-support{grid-area:support}.concept-09 .blueprint-release{grid-area:release}
.concept-09 .blueprint-mark{position:absolute;left:0;top:0;color:#a7c9ed;font:9px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em}
.concept-09 .panel{border-radius:0;border:1px solid #5877a0;padding:27px;box-shadow:none;height:100%;position:relative;background:#123b70ed}
.concept-09 .panel::before,.concept-09 .panel::after{content:"";position:absolute;width:9px;height:9px;pointer-events:none}
.concept-09 .panel::before{top:-1px;left:-1px;border-left:2px solid #cbe4ff;border-top:2px solid #cbe4ff}
.concept-09 .panel::after{right:-1px;bottom:-1px;border-right:2px solid #cbe4ff;border-bottom:2px solid #cbe4ff}
.concept-09 .panel-heading h2{font-size:21px;letter-spacing:.06em;font-weight:600}
.concept-09 .panel-heading{border-bottom:1px solid #51729b;padding-bottom:19px;margin-bottom:21px}
.concept-09 .login-panel{background:#173f73}
.concept-09 .form-control{border-radius:0;background:#0d2e59;border-color:#6c8db5;color:#f3f8ff;min-height:49px}
.concept-09 .form-control::placeholder{color:#a1bddc}
.concept-09 .form-control:focus{background:#0b2a52;color:#fff;border-color:#b8ddff;box-shadow:0 0 0 .2rem #b8ddff24}
.concept-09 .input-group .btn{border-radius:0;color:#b8ddff;border-color:#6c8db5}
.concept-09 .login-submit{border-radius:0;min-height:49px;background:#b8ddff;color:#082a50;letter-spacing:.13em;font-weight:700}
.concept-09 .news-row{border-color:#3e608e;padding-top:18px;padding-bottom:18px}
.concept-09 .release-panel,.concept-09 .support-panel{background:#0f3567}
.concept-09 .blueprint-device{margin-top:28px}
.concept-09 .device-panel{background:#0b2a55dc;margin-top:0}
.concept-09 .device-panel .panel-heading{border-bottom:0;padding-bottom:0;margin-bottom:18px}
.concept-09 .device-panel .panel-heading h2{font-size:17px}
.concept-09 .site-footer{padding-top:24px;padding-bottom:28px}
.concept-09 .nav-pills .nav-link{border-radius:0}
.concept-09 .badge{border-radius:2px}
@media(max-width:1199.98px){.concept-09 .site-shell{padding-left:30px;padding-right:30px}.concept-09 .blueprint-drawing{width:225px;flex-basis:225px}.concept-09 .identity h1{font-size:39px}}
@media(max-width:991.98px){.concept-09 .blueprint-plan{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px 18px}.concept-09 .blueprint-drawing{width:180px;flex-basis:180px}.concept-09 .identity h1{font-size:34px}.concept-09 .panel{padding:23px}}
@media(max-width:767.98px){.concept-09 .site-shell{padding-left:18px;padding-right:18px}.concept-09 .site-header{padding-top:20px;padding-bottom:20px}.concept-09 .blueprint-title{padding:31px 0 25px;min-height:0;position:relative}.concept-09 .identity h1{font-size:31px;letter-spacing:.01em;margin-top:14px;line-height:1.45}.concept-09 .blueprint-drawing{display:none}.concept-09 .blueprint-caption{font-size:8px;letter-spacing:.035em;gap:10px;padding-bottom:21px}.concept-09 .blueprint-plan{grid-template-columns:minmax(0,1fr);grid-template-areas:"login" "news" "release" "support";gap:23px}.concept-09 .panel{padding:24px 21px}.concept-09 .panel-heading h2{font-size:20px}.concept-09 .blueprint-device{margin-top:23px}.concept-09 .site-footer{padding-bottom:24px}}
`
  },
  {
    id: '10-terracotta-light',
    name: '陶土日光',
    en: 'TERRACOTTA LIGHT',
    description: '暖陶土、細緻拱廊與奶油紙色，讓登入頁呈現安定、從容的接待空間。',
    colors: { bg: '#f4eee5', surface: '#fffdf8', ink: '#49392d', muted: '#7b6b5c', line: '#dfd3c2', accent: '#944c35', onAccent: '#ffffff', soft: '#efe0d0' },
    render: p => `${p.header}
      <main class="terracotta-main">
        <section class="terracotta-welcome" aria-label="目前登入系統"><div class="terracotta-welcome-copy"><span class="terracotta-kicker">A CONSIDERED START</span>${p.identity}<div class="terracotta-hero-bottom"><span>每一天，由此開始。</span><span aria-hidden="true">✳</span></div></div><div class="terracotta-architecture" aria-hidden="true"><span class="terra-arch arch-back"></span><span class="terra-arch arch-middle"></span><span class="terra-arch arch-front"></span><span class="terra-shadow"></span><span class="terra-sun"></span><span class="terra-caption">LIGHT / SPACE / CONNECTION</span></div></section>
        <div class="terracotta-body">
          <aside class="terracotta-access">${p.login}<div class="terracotta-support">${p.support}</div></aside>
          <div class="terracotta-information">${p.news}<div class="terracotta-release">${p.release}</div></div>
        </div>
        <div class="terracotta-device">${p.device}</div>
      </main>${p.footer}`,
    css: `
.concept-10 .site-shell{max-width:1340px;padding-left:48px;padding-right:48px}
.concept-10 .site-header{border-bottom:1px solid #d5c5b2;padding-top:28px;padding-bottom:25px}
.concept-10 .terracotta-welcome{margin-top:27px;display:grid;grid-template-columns:minmax(0,1fr) 310px;min-height:299px;background:#e9d7c5;overflow:hidden;position:relative}
.concept-10 .terracotta-welcome-copy{padding:34px 38px 24px;position:relative;z-index:2;display:flex;flex-direction:column;justify-content:center}
.concept-10 .terracotta-kicker{font-size:9px;letter-spacing:.22em;color:#845a45;display:block;margin-bottom:16px}
.concept-10 .identity{padding:0;margin:0}
.concept-10 .identity h1{font-size:clamp(34px,3.6vw,46px);font-weight:500;line-height:1.36;letter-spacing:.045em;margin:14px 0 14px;color:#49392d}
.concept-10 .identity p{font-size:13px;line-height:1.85;color:#705a49;max-width:640px}
.concept-10 .identity .eyebrow{font-size:10px;color:#745341}
.concept-10 .system-code{border-color:#b99e88;background:#efe0d2;color:#6c4a37;letter-spacing:.1em}
.concept-10 .terracotta-hero-bottom{display:flex;justify-content:space-between;align-items:center;gap:20px;border-top:1px solid #cbb39e;padding-top:13px;margin-top:18px;color:#745541;font-size:11px;letter-spacing:.07em}
.concept-10 .terracotta-hero-bottom>span:last-child{font-size:21px;font-weight:300;line-height:1}
.concept-10 .terracotta-architecture{background:#c69172;position:relative;overflow:hidden;isolation:isolate}
.concept-10 .terra-arch{position:absolute;border-radius:150px 150px 0 0;bottom:-25px}
.concept-10 .arch-back{height:295px;width:238px;left:35px;background:#b4775b;box-shadow:inset 8px 1px 0 #d5a386}
.concept-10 .arch-middle{height:249px;width:173px;left:68px;background:#dfb793;box-shadow:inset 10px 0 0 #8e5a43}
.concept-10 .arch-front{height:214px;width:119px;left:95px;background:#f1d7b3;box-shadow:inset -7px 0 0 #eac6a1}
.concept-10 .terra-shadow{position:absolute;width:154px;height:220px;left:165px;bottom:-155px;background:#9c654a66;transform:rotate(-37deg);transform-origin:top left}
.concept-10 .terra-sun{position:absolute;width:50px;height:50px;background:#f4dcad;border-radius:50%;top:47px;right:23px;z-index:-1;opacity:.6}
.concept-10 .terra-caption{position:absolute;bottom:17px;left:20px;font-size:7px;letter-spacing:.18em;color:#f9e6d5}
.concept-10 .terracotta-body{display:grid;grid-template-columns:minmax(340px,.86fr) minmax(0,1.14fr);gap:36px;margin-top:32px;align-items:start}
.concept-10 .terracotta-access,.concept-10 .terracotta-information{min-width:0}
.concept-10 .panel{border-radius:0;padding:28px;box-shadow:none}
.concept-10 .login-panel{background:#fffdf8;border:1px solid #cbb8a2;box-shadow:0 11px 24px #67503508}
.concept-10 .panel-heading h2{font-weight:500;font-size:23px;letter-spacing:.065em}
.concept-10 .form-control{border-radius:1px;background:#fbf7f0;border-color:#cfc0ae;min-height:49px}
.concept-10 .login-submit{border-radius:1px;min-height:50px;letter-spacing:.12em;background:#944c35}
.concept-10 .announcement-panel{padding:10px 0 0 1px;border:0;background:transparent}
.concept-10 .announcement-panel .panel-heading{margin-bottom:21px}
.concept-10 .news-row{padding-top:21px;padding-bottom:21px;border-color:#d8c7b2}
.concept-10 .terracotta-support{margin-top:21px}
.concept-10 .support-panel{background:#e9dfd0;border-color:#ddcebb}
.concept-10 .support-panel .panel-heading h2{font-size:18px}
.concept-10 .terracotta-release{margin-top:26px}
.concept-10 .release-panel{border-width:1px 0 0;background:transparent;padding:24px 0 0}
.concept-10 .release-panel .panel-heading h2{font-size:19px}
.concept-10 .terracotta-device{margin-top:31px}
.concept-10 .device-panel{background:transparent;border-width:1px 0;border-color:#cbbba8;padding:25px 0;margin-top:0}
.concept-10 .device-panel .panel-heading h2{font-size:17px}
.concept-10 .site-footer{padding-top:23px;padding-bottom:29px}
@media(max-width:1199.98px){.concept-10 .site-shell{padding-left:32px;padding-right:32px}.concept-10 .terracotta-welcome{grid-template-columns:minmax(0,1fr) 240px}.concept-10 .terracotta-welcome-copy{padding-left:30px;padding-right:30px}.concept-10 .terracotta-architecture .terra-arch{margin-left:-34px}.concept-10 .terra-sun{right:10px}.concept-10 .identity h1{font-size:36px}.concept-10 .terracotta-body{gap:27px}}
@media(max-width:991.98px){.concept-10 .terracotta-welcome{grid-template-columns:minmax(0,1fr) 200px}.concept-10 .terracotta-welcome-copy{padding:30px 25px 23px}.concept-10 .identity h1{font-size:33px}.concept-10 .terracotta-architecture .terra-arch{margin-left:-51px}.concept-10 .terracotta-body{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px}.concept-10 .panel{padding:23px}.concept-10 .announcement-panel{padding:10px 0 0}.concept-10 .release-panel{padding:22px 0 0}.concept-10 .device-panel{padding:23px 0}}
@media(max-width:767.98px){.concept-10 .site-shell{padding-left:18px;padding-right:18px}.concept-10 .site-header{padding-top:20px;padding-bottom:20px}.concept-10 .terracotta-welcome{display:block;margin-top:20px;min-height:0}.concept-10 .terracotta-welcome-copy{padding:25px 22px 21px}.concept-10 .terracotta-kicker{font-size:8px;margin-bottom:12px}.concept-10 .identity h1{font-size:31px;letter-spacing:.01em;line-height:1.45}.concept-10 .identity p{font-size:12px}.concept-10 .terracotta-hero-bottom{font-size:10px;margin-top:18px;padding-top:12px}.concept-10 .terracotta-architecture{height:88px}.concept-10 .terra-arch{bottom:-157px;transform:scale(.72);transform-origin:bottom left}.concept-10 .terracotta-architecture .terra-arch{margin-left:75px}.concept-10 .terra-sun{height:38px;width:38px;top:20px;right:45px}.concept-10 .terra-caption{bottom:17px;left:18px;max-width:100px;font-size:7px;line-height:1.8}.concept-10 .terracotta-body{display:flex;flex-direction:column;gap:26px;margin-top:23px}.concept-10 .terracotta-access{display:contents}.concept-10 .terracotta-access>.login-panel{order:1;width:100%}.concept-10 .terracotta-information{order:2;width:100%}.concept-10 .terracotta-support{order:3;width:100%;margin:0}.concept-10 .panel{padding:24px 21px}.concept-10 .panel-heading h2{font-size:21px}.concept-10 .announcement-panel{padding:0}.concept-10 .release-panel{padding:23px 0 0}.concept-10 .terracotta-release{margin-top:22px}.concept-10 .terracotta-device{margin-top:25px}.concept-10 .device-panel{padding:23px 0}.concept-10 .site-footer{padding-bottom:23px}}
`
  }
];
