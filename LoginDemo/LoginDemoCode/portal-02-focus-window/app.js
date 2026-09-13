(function ($) {
  'use strict';
  $(function () {
    const D = window.PortalData;
    const allowed = D.systems.filter(s => s.public);
    const params = new URLSearchParams(location.search);
    const initialTarget = params.get('target');
    const knownTarget = allowed.some(s => s.id === initialTarget) ? initialTarget : 'direct';
    const state = { target: knownTarget, resultSystem: null, status: 'unknown', outcome: 'success', filter: 'all', phase: 'login', error: null, occurredAt: null, busy: false, timer: null };
    const modalNode = document.getElementById('portalModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalNode);
    let restoreFocus = null;
    function target() { return allowed.find(s => s.id === state.target); }
    function service() { return D.serviceStates[state.status]; }
    function titleOfTarget() { const current = state.phase === 'result' ? allowed.find(s => s.id === state.resultSystem) || target() : target(); return current ? current.name + '（示範）' : '共用入口（登入後選擇系統）'; }
    function setText(key, value) { $('[data-text="' + key + '"]').text(value); }
    setText('organization', D.organization); setText('logo', D.logo); setText('portal', D.portal); setText('accountHint', D.accountHint);
    Object.entries(D.support).forEach(([key, value]) => setText(key, value));
    $('#demoTarget').empty().append($('<option value="direct">').text('直接開啟共用入口'));
    allowed.forEach(s => $('#demoTarget').append($('<option>').val(s.id).text('由 ' + s.name + ' 導入（示範）')));
    $('#demoTarget').val(state.target);
    function reveal(el) { $(el).filter('details').add($(el).parents('details')).prop('open', true); }
    function scrollFocus(el) { reveal(el); el.focus({ preventScroll: true }); el.scrollIntoView({ block: 'center', behavior: 'auto' }); }
    function showModal(title, content, trigger) {
      restoreFocus = trigger || document.activeElement;
      $('#modalHeading').text(title); $('#modalContent').empty().append(typeof content === 'string' ? $('<div class="modal-prose">').text(content) : content); modal.show();
    }
    modalNode.addEventListener('hidden.bs.modal', () => { if (restoreFocus?.isConnected) restoreFocus.focus(); });
    function noticeTime(value) { const date = new Date(value); return '示範日 ' + new Intl.DateTimeFormat('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Taipei' }).format(date); }
    function notices() {
      const now = Date.parse(D.demo.referenceTime);
      return D.announcements.filter(n => n.visibility === 'public' && Date.parse(n.publishedAt) <= now && (!n.validUntil || Date.parse(n.validUntil) >= now) && (n.scenarios.includes('all') || n.scenarios.includes(state.status)) && (!target() || n.systems.includes('*') || n.systems.includes(state.target)))
        .filter(n => state.filter === 'all' || (state.filter === 'org' ? n.systems.includes('*') : !n.systems.includes('*')))
        .sort((a, b) => b.rank - a.rank || Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    }
    function noticeDetail(n) {
      const lines = ['示範公告，非真實服務資訊', '發布單位：' + n.publisher, '重要程度：' + n.severity, '適用系統：' + (n.systems.includes('*') ? '所有使用者' : n.systems.map(id => allowed.find(s => s.id === id)?.name || id).join('、')), '發布時間：' + noticeTime(n.publishedAt), '有效期限：' + (n.validUntil ? noticeTime(n.validUntil) : '未設定；正式上線須有到期檢核'), '可見範圍：公開', ''];
      if (n.impact) lines.push('影響：' + n.impact, '時間：' + n.period, '處理狀態：' + n.processing, '現在可做：' + n.action, '替代方式：' + n.alternative, '最後更新：' + n.updatedAt);
      if (n.nextUpdate) lines.push('下次更新：' + n.nextUpdate); if (n.body) lines.push(n.body); return lines.join('\n');
    }
    function renderNotices() {
      const items = notices(); $('.news-list').empty();
      items.slice(0, 2).forEach(n => {
        const article = $('<article class="notice-item">'); const meta = $('<div class="notice-meta">');
        meta.append($('<span class="notice-severity">').text(n.severity), $('<span>').text(n.systems.includes('*') ? '組織通知' : '系統通知'), $('<time>').text(noticeTime(n.publishedAt)));
        article.append(meta, $('<h3>').append($('<button type="button" class="notice-open">').attr('data-notice', n.id).text(n.title + ' ↗')), $('<p class="notice-summary">').text(n.summary)); $('.news-list').append(article);
      });
      if (!items.length) $('.news-list').append($('<p class="empty-note">').text('此情境與分類目前沒有適用的公開示範公告。'));
      $('#noticeCount').text('顯示 ' + Math.min(items.length, 2) + ' / ' + items.length + ' 則');
    }
    function affected(id) { return service().affected.includes(id); }
    function renderContext() {
      const s = target(); $('#targetLabel').text(s ? '本次準備前往' : '您正直接開啟'); $('#targetName').text(s ? s.name + '（示範）' : D.portal);
      $('#targetNext').text(s ? '示範登入後，確認權限與服務狀態，再示範返回此系統。' : '示範登入後，顯示依示範權限取得的可用系統清單。');
      $('#submitLabel').text(s ? '示範登入，前往' + s.name : '示範登入，選擇系統');
      document.title = D.organization + '｜' + D.portal + (s ? ' → ' + s.name + '（示範）' : '') + ' · ' + document.body.dataset.designName;
      $('#invalidTarget').prop('hidden', !(initialTarget && knownTarget === 'direct' && state.target === 'direct'));
    }
    function renderStatus() {
      const s = service(); $('.status-label').text(s.label); $('.status-tone').attr('data-severity', s.severity);
      $('#statusSummary').text(s.summary); $('#statusAction').text(s.action); $('#statusUpdated').text(s.updatedAt || '尚未取得');
      const impacting = s.affected.length > 0 && (!target() || affected(state.target));
      $('#impactAlert').prop('hidden', !impacting).attr('data-severity', s.severity);
      $('#impactTitle').text(s.label + ' · ' + (target() ? target().name : '部分示範系統受影響'));
      $('#impactSummary').text(s.summary); $('#impactWhen').text(s.when || ''); $('#impactProcessing').text(s.processing || ''); $('#impactAction').text(s.action); $('#impactAlternative').text(s.alternative || ''); $('#impactUpdated').text(s.updatedAt || '尚未取得');
      $('#demoStatusText').text(s.label); renderNotices();
    }
    function feedback(kind, message, code) {
      state.error = code; state.occurredAt = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });
      $('#formFeedback').prop('hidden', false).attr('data-kind', kind); $('#feedbackMessage').text(message); $('#feedbackCode').text('示範代碼：' + code);
    }
    function resetLogin() {
      if (state.timer) window.clearTimeout(state.timer); state.timer = null; state.busy = false; state.phase = 'login'; state.resultSystem = null; state.error = null; state.occurredAt = null;
      $('#portalDesign').prop('hidden', false); $('#resultView').prop('hidden', true); $('#loginSubmit').prop('disabled', false).attr('aria-busy', 'false'); $('.form-control').removeClass('is-invalid').removeAttr('aria-invalid'); $('.field-error').text('');
      $('#formFeedback').prop('hidden', true); $('#loginStatus').text('僅使用示範帳密；本頁不連接真實驗證服務。'); $('#password').val('').attr('type', 'password'); $('#togglePassword').attr('aria-pressed', 'false').attr('aria-label', '顯示密碼');
      renderContext(); renderStatus();
      if (state.outcome === 'timeout') feedback('warning', '工作階段已逾時（示範）。為保護資料，請重新登入；本次仍會保留目標系統。', 'DEMO-SESSION-01');
    }
    function resultBase(heading, description) {
      state.phase = 'result'; $('#portalDesign').prop('hidden', true); $('#resultView').prop('hidden', false); $('#resultHeading').text(heading); $('#resultDescription').text(description); $('#resultContent').empty();
      window.setTimeout(() => { const h = document.getElementById('resultHeading'); h.focus(); h.scrollIntoView({ block: 'start' }); }, 0);
    }
    function button(text, action, id) { const b = $('<button type="button" class="btn action-button">').attr('data-action', action).text(text); if (id) b.attr('data-system', id); return b; }
    function systemList(empty) {
      state.resultSystem = null; resultBase('示範登入完成，請選擇系統', '下列清單來自固定的示範權限資料，沒有進行真實身分驗證或權限查詢。');
      const systems = empty ? [] : allowed.filter(s => D.demo.permittedSystems.includes(s.id));
      if (!systems.length) $('#resultContent').append($('<div class="result-notice">').text('目前沒有可用的示範系統權限。請查閱權限申請方式，或聯絡權限審核窗口。'), button('權限申請', 'permission'));
      else { const grid = $('<div class="system-grid">'); systems.forEach(s => { const card = $('<article class="system-option">'); card.append($('<h3>').text(s.name + '（示範）'), $('<p>').text(s.description), $('<span class="system-service">').text(affected(s.id) ? service().label : state.status === 'unknown' ? '狀態未確認' : '可用（示範）'), button('示範前往 ' + s.name, 'destination', s.id)); grid.append(card); }); $('#resultContent').append(grid); }
    }
    function denied() {
      resultBase('示範登入完成，但沒有使用權限', target() ? '示範權限資料未授予「' + target().name + '」的存取權限。這不代表帳號或密碼錯誤。' : '此展示情境沒有提供任何系統權限。請依業務需求申請。');
      state.error = 'DEMO-PERM-01'; state.occurredAt = new Date().toLocaleString('zh-TW');
      $('#resultContent').append($('<p>').text('尚未進入目標系統，沒有執行任何業務操作。'), button('查看權限申請方式', 'permission'), button('查看可用示範系統', 'system-list'));
    }
    function destination(id) {
      const s = allowed.find(x => x.id === id); state.resultSystem = s ? id : null; if (!s || !D.demo.permittedSystems.includes(id)) { denied(); return; }
      if (affected(id)) {
        resultBase('已完成示範登入，目標服務目前受影響', s.name + '：' + service().label);
        $('#resultContent').append($('<div class="result-notice">').text(service().summary + '\n' + service().processing + '\n現在可做：' + service().action + '\n替代方式：' + service().alternative + '\n最後更新：' + service().updatedAt), button('選擇其他示範系統', 'system-list'), button('免登入支援／問題回報', 'report')); return;
      }
      resultBase('示範導向結果', '您選擇了「' + s.name + '」。正式整合時才會依允許清單返回目標系統。');
      $('#resultContent').append($('<div class="destination-receipt">').append($('<span class="eyebrow">').text('DEMONSTRATION ONLY'), $('<h3>').text(s.name), $('<p>').text('示範目標：' + s.destination), $('<p>').text('此頁僅呈現導向結果，沒有開啟外部網站，也沒有製作該系統的完整功能。')));
      if (state.status === 'unknown') $('#resultContent').append($('<p class="result-notice">').text('服務狀態尚未確認；此結果不代表真實系統可用。'));
      $('#resultContent').append(button('返回示範系統清單', 'system-list'));
    }
    $('#togglePassword').on('click', function () { const visible = $('#password').attr('type') === 'password'; $('#password').attr('type', visible ? 'text' : 'password'); $(this).attr('aria-pressed', String(visible)).attr('aria-label', visible ? '隱藏密碼' : '顯示密碼'); });
    $('#account,#password').on('input', function () { $(this).removeClass('is-invalid').removeAttr('aria-invalid'); $('#' + this.id + 'Error').text(''); });
    $('#loginForm').on('submit', function (event) {
      event.preventDefault(); if (state.busy) return;
      let first = null; $('#account,#password').each(function () { const valid = this.id === 'account' ? !!this.value.trim() : !!this.value; $(this).toggleClass('is-invalid', !valid).attr('aria-invalid', String(!valid)); $('#' + this.id + 'Error').text(valid ? '' : '請填寫' + (this.id === 'account' ? '示範帳號。' : '示範密碼。')); if (!valid && !first) first = this; });
      if (first) { scrollFocus(first); return; }
      const isDemo = $('#account').val() === D.demo.username && $('#password').val() === D.demo.password;
      $('#password').val('').attr('type', 'password'); $('#togglePassword').attr('aria-pressed', 'false').attr('aria-label', '顯示密碼');
      if (!isDemo) { $('#account').val(''); feedback('error', '本原型只接受示範帳密。輸入已清除，請按「填入示範資料」再操作；沒有送出任何驗證請求。', 'DEMO-INPUT-01'); scrollFocus(document.getElementById('formFeedback')); return; }
      state.busy = true; $('#formFeedback').prop('hidden', true); $('#loginSubmit').prop('disabled', true).attr('aria-busy', 'true'); $('#submitLabel').text('示範登入處理中…'); $('#loginStatus').text('正在展示處理狀態，請稍候；不會送出驗證請求。');
      state.timer = window.setTimeout(function () {
        state.busy = false; state.timer = null; $('#loginSubmit').prop('disabled', false).attr('aria-busy', 'false'); renderContext(); $('#loginStatus').text('示範處理已完成，未進行真實驗證。');
        if (state.outcome === 'credentials') { feedback('error', '無法驗證帳號或密碼（示範）。請檢查輸入與鍵盤狀態後重試；仍無法登入時，可重設密碼或聯絡資訊室。', 'DEMO-AUTH-01'); scrollFocus(document.getElementById('formFeedback')); }
        else if (state.outcome === 'network') { feedback('error', '目前無法連接登入服務（示範）。請確認網路後再試；若持續發生，可產生報修摘要並聯絡免登入支援管道。', 'DEMO-NET-01'); scrollFocus(document.getElementById('formFeedback')); }
        else { state.error = null; state.occurredAt = null; if (state.outcome === 'denied' || (target() && !D.demo.permittedSystems.includes(state.target))) denied(); else if (target()) destination(state.target); else systemList(false); }
      }, 850);
    });
    $('#demoTarget,#demoService,#demoOutcome').on('change', function () { state.target = $('#demoTarget').val(); state.status = $('#demoService').val(); state.outcome = $('#demoOutcome').val(); resetLogin(); });
    $('.notice-filter').on('click', function () { $('.notice-filter').removeClass('active').attr('aria-pressed', 'false'); $(this).addClass('active').attr('aria-pressed', 'true'); state.filter = this.dataset.filter; renderNotices(); });
    $(document).on('click', '[data-notice]', function () { const n = notices().find(x => x.id === this.dataset.notice); if (n) showModal(n.title, noticeDetail(n), this); });
    const help = {
      forgot: ['忘記密碼', '請依 [密碼重設方式] 進行身分確認，或聯絡 ' + D.support.accountOffice + '。\n\n電話：' + D.support.phone + '\n服務時段：' + D.support.hours + '\n非服務時段：' + D.support.offHours + '\n\n此為流程說明，未送出重設申請；請勿提供密碼或驗證碼。'],
      account: ['帳號申請', '首次使用請向 ' + D.support.accountOffice + ' 確認 [帳號申請方式]。\n需提供的身分資料與審核流程待組織確認。\n\n本原型不收集身分資料，也沒有建立帳號。無法登入也可撥打 ' + D.support.phone + ' 取得協助。'],
      permission: ['權限申請', '目標：' + titleOfTarget() + '\n請洽 ' + D.support.permissionOffice + '，依 [權限申請方式] 說明需要的系統與業務用途。\n\n帳號與系統權限分別管理，實際核准條件待確認。此原型沒有送出申請。'],
      first: ['首次使用與帳號說明', '1. 確認組織名稱與「資訊服務共用入口」。\n2. 由業務系統導入時，核對「本次準備前往」的名稱。直接開啟時，登入後再選擇系統。\n3. 使用組織配發的工作帳號；具體格式、來源與密碼規則待資訊室提供。\n4. 送出前確認影響本次操作的服務通知。\n5. 共用工作站使用完畢後登出。\n\n本原型請按「填入示範資料」。共用畫面不代表已完成 SSO；AD／LDAP、MFA 等尚待確認。'],
      contact: ['免登入支援服務', '維護單位：' + D.support.unit + '\n電話／分機：' + D.support.phone + '\n電子郵件：' + D.support.email + '\n服務時段：' + D.support.hours + '\n非服務時段：' + D.support.offHours + '\n\n請透過組織正式通訊錄核對資訊。這些是待提供的替換欄位。可先使用本頁「問題回報」產生摘要，不會自動寄出。'],
      privacy: ['隱私、使用與展示說明', '此頁只接受示範帳密，不會透過網路送出登入資料，也不寫入 cookie、localStorage 或 sessionStorage。重新整理即重置展示狀態。\n\n公告、服務狀態與系統名稱皆為明示的示範資料；組織品牌與聯絡方式為替換欄位。\n\n登入前僅呈現適合公開的資訊。正式系統的個人權限、登入紀錄與敏感公告須由後端依驗證與授權結果提供，不能只靠前端隱藏。'],
      workstation: ['共用工作站與登入紀錄', '共用電腦不預設保持登入。本原型也不記住帳號；記住帳號與保持登入應依不同設備政策分開評估。\n\n電腦名稱需由院內裝置服務提供。最後登入時間、地點與電腦屬個人紀錄，需驗證後再由後端取得。\n\n值班與非服務時段的支援方式：' + D.support.offHours],
      integration: ['整合條件待確認', '目前僅完成共用入口的前端原型。\n\n帳號來源、SSO、AD／LDAP、MFA、帳號同步、密碼政策與工作階段規則尚未整合。\n\n正式導向須由後端驗證允許的系統與返回位置；權限、公告、服務狀態與支援流程需指定可靠資料來源。']
    };
    function report(trigger) {
      const when = state.occurredAt || new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });
      const box = $('<div class="report-form">'); box.append($('<p>').text('免登入即可產生摘要，請自行交給正式支援窗口。本頁不送出報修。請勿填入密碼、驗證碼或敏感業務資料。'));
      box.append($('<label for="reportDescription" class="form-label">').text('問題現象（選填）'), $('<textarea id="reportDescription" class="form-control" rows="2" maxlength="400">').attr('placeholder', '例如：按下登入後出現服務無法使用。'));
      const output = $('<textarea id="reportOutput" class="form-control report-output" rows="7" readonly>');
      function update() { output.val('【前端原型報修摘要／未送出】\n目標：' + titleOfTarget() + '\n發生時間：' + when + '\n示範錯誤代碼：' + (state.error || '未提供') + '\n展示服務狀態：' + service().label + '\n問題現象：' + ($('#reportDescription').val() || '待補充') + '\n支援管道：' + D.support.phone + ' / ' + D.support.email); }
      box.append($('<label for="reportOutput" class="form-label mt-3">').text('可複製摘要'), output, $('<button type="button" class="btn primary-button mt-3" id="copyReport">').text('複製摘要'), $('<p id="copyStatus" role="status" class="small-note">'));
      showModal('問題回報｜產生摘要，不送出', box, trigger); update(); $('#reportDescription').on('input', update);
      $('#copyReport').on('click', async function () { try { await navigator.clipboard.writeText(output.val()); $('#copyStatus').text('已複製摘要，請交給正式支援窗口。'); } catch { output[0].focus(); output[0].select(); $('#copyStatus').text('無法自動複製，已選取摘要。請使用 Ctrl+C 或裝置的複製功能。'); } });
    }
    $(document).on('click', '[data-action]', function (event) {
      event.preventDefault(); const action = this.dataset.action;
      if (action === 'fill-demo') { if (state.phase !== 'login') resetLogin(); $('#account').val(D.demo.username).trigger('input'); $('#password').val(D.demo.password).trigger('input'); scrollFocus(document.getElementById('account')); }
      else if (action === 'reset-demo') { state.target = 'direct'; state.status = 'unknown'; state.outcome = 'success'; state.filter = 'all'; $('#demoTarget').val('direct'); $('#demoService').val('unknown'); $('#demoOutcome').val('success'); $('#account').val(''); $('.notice-filter').removeClass('active').attr('aria-pressed', 'false').filter('[data-filter="all"]').addClass('active').attr('aria-pressed', 'true'); resetLogin(); }
      else if (action === 'back-login') { $('#account').val(''); resetLogin(); scrollFocus(document.getElementById('account')); }
      else if (action === 'system-list') systemList(state.outcome === 'denied' && !target());
      else if (action === 'destination') destination(this.dataset.system);
      else if (action === 'report') report(this);
      else if (action === 'all-notices') { const content = $('<div>'); notices().forEach(n => content.append($('<details class="notice-detail">').append($('<summary>').text(n.title), $('<div class="modal-prose">').text(noticeDetail(n))))); if (!notices().length) content.text('此分類沒有適用的公開示範公告。'); showModal('全部公告（公開示範資料）', content, this); }
      else if (action === 'service-detail') { showModal('各服務狀態（示範）', ['狀態資料更新：' + (service().updatedAt || '尚未取得'), ...allowed.map(s => s.name + '：' + (affected(s.id) ? service().label : state.status === 'unknown' ? '狀態未確認' : '可用（示範）')), '', service().processing || service().summary, '現在可做：' + service().action, service().alternative ? '替代方式：' + service().alternative : ''].join('\n'), this); }
      else if (help[action]) { const url = D.links[action]; if (url && /^https:\/\//i.test(url)) { location.assign(url); return; } const text = action === 'permission' ? '目標：' + titleOfTarget() + '\n請洽 ' + D.support.permissionOffice + '，依 [權限申請方式] 說明需要的系統與業務用途。\n\n帳號與系統權限分別管理，實際核准條件待確認。此原型沒有送出申請。' : help[action][1]; showModal(help[action][0], text, this); }
    });
    // Anchor navigation opens any containing disclosure before moving focus.
    $(document).on('click', 'a[href^="#"]:not([data-action])', function (event) { const id = this.getAttribute('href').slice(1); const element = document.getElementById(id); if (element) { event.preventDefault(); reveal(element); if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1'); scrollFocus(element); } });
    resetLogin();
  });
})(jQuery);

