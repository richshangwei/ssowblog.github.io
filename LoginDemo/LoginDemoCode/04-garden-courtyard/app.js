(function ($) {
  'use strict';
  $(function () {
    const config = window.LoginPageConfig;
    const system = config.system;
    const modalElement = document.getElementById('serviceModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    let modalTrigger = null;
    function show(title, body, trigger) {
      modalTrigger = trigger || document.activeElement;
      $('#serviceTitle').text(title); $('#serviceBody').text(body); modal.show();
    }
    modalElement.addEventListener('hidden.bs.modal', function () { if (modalTrigger && modalTrigger.isConnected) modalTrigger.focus(); });
    const values = { org: system.organization, name: system.name, short: system.shortName, code: system.code, environment: system.environment, tagline: system.tagline, version: config.version.number, releaseDate: config.version.date, maintainer: config.maintainer.unit, contact: config.maintainer.contact || '待維護單位提供', phone: config.maintainer.phone || '待提供，請查詢院內通訊錄', email: config.maintainer.email || '待維護單位提供', hours: config.maintainer.hours || '請洽院內資訊室', computer: config.client.computerName || '尚未取得', lastTime: config.client.lastLogin?.time || '登入後可查看', lastPlace: config.client.lastLogin?.location || '登入後可查看', lastComputer: config.client.lastLogin?.computerName || '驗證後提供前次使用電腦' };
    $('[data-value]').each(function () { $(this).text(values[this.dataset.value] ?? ''); });
    document.title = system.name + ' [' + system.code + '] · ' + system.environment + '｜' + document.body.dataset.concept;
    $('#loginButtonText').text('登入' + system.name);
    $('#currentDate').text(new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', timeZone: 'Asia/Taipei' }).format(new Date()));
    $('#currentYear').text(new Date().getFullYear());
    const ua = navigator.userAgent;
    const os = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'iOS / iPadOS' : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows' : /Mac/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : '無法辨識';
    const browser = /Edg\//.test(ua) ? 'Microsoft Edge' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Google Chrome' : /Safari\//.test(ua) ? 'Safari' : '無法辨識瀏覽器';
    $('#clientOs').text(config.client.os || os + '（推測）'); $('#clientBrowser').text(browser + '（推測）');
    if (config.client.computerName) $('#computerHint').text('由院內裝置服務提供');
    if (config.maintainer.phone) $('#phoneValue').empty().append($('<a>').attr('href', 'tel:' + config.maintainer.phone.replace(/[^+\d,;]/g, '')).text(config.maintainer.phone));
    if (config.maintainer.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.maintainer.email)) $('#emailValue').empty().append($('<a>').attr('href', 'mailto:' + config.maintainer.email).text(config.maintainer.email));
    config.version.changes.forEach(item => $('#releaseChanges').append($('<li>').text(item)));
    function relevantNews() { return config.announcements.filter(n => n.scope === 'GLOBAL' || (n.scope === 'SYSTEM' && n.systemCode === system.code)); }
    function renderNews(scope) {
      const items = relevantNews().filter(n => scope === 'ALL' || n.scope === scope); $('#newsList').empty();
      items.forEach(n => {
        const row = $('<button type="button" class="news-row">').attr('data-news', n.id);
        const text = $('<span class="news-copy">'); const meta = $('<span class="news-meta">');
        meta.append($('<span class="scope-badge">').toggleClass('global', n.scope === 'GLOBAL').text(n.scope === 'GLOBAL' ? '全系統' : '本系統 · ' + system.shortName));
        meta.append($('<time>').text(n.date)); if (n.pinned) meta.append($('<span class="pin-note">').text('置頂'));
        text.append(meta, $('<strong>').text(n.title)); row.append(text, $('<span class="news-arrow" aria-hidden="true">').text('↗')); $('#newsList').append(row);
      });
      if (!items.length) $('#newsList').append($('<p class="empty-message">').text('此分類目前沒有公告。'));
      $('#newsCount').text(items.length + ' 則公告');
    }
    renderNews('ALL');
    $('.filter-button').on('click', function () { $('.filter-button').removeClass('active').attr('aria-pressed', 'false'); $(this).addClass('active').attr('aria-pressed', 'true'); renderNews(this.dataset.filter); });
    $('#newsList').on('click', '[data-news]', function () { const n = relevantNews().find(x => x.id === this.dataset.news); if (n) show(n.title, n.date + ' · ' + (n.scope === 'GLOBAL' ? '全系統' : system.name) + '\n\n' + n.body, this); });
    const details = {
      forgot: ['忘記密碼', '請透過院內通訊錄聯絡資訊室，完成身分確認後申請密碼重設。\n\n此展示頁尚未連接帳號服務，未送出密碼重設申請。'],
      change: ['更改密碼', '正式系統的密碼變更需由院內帳號服務進行身分驗證。請使用資訊室提供的帳號服務入口。\n\n此展示頁尚未連接密碼變更服務。'],
      guide: ['快速上手', '1. 確認頁面系統名稱為「' + system.name + '」、代碼為 ' + system.code + '，並核對環境標示。\n2. 輸入院內帳號與密碼；眼睛按鈕可切換密碼顯示。\n3. 查看全系統與本系統公告，留意維護時段。\n4. 正式登入後依個人權限使用功能，結束時請登出。\n\n目前為介面原型，請使用測試文字體驗。'],
      manual: ['系統功能與操作說明', '員工入口提供常用服務入口、全院與本系統公告、版本資訊及帳號使用說明。\n\n正式操作手冊與教學影片連結待資訊室提供。可先參考本頁「快速上手」了解操作流程。'],
      support: ['維護者與聯絡方式', '維護單位：' + config.maintainer.unit + '\n聯絡窗口：' + values.contact + '\n電話／分機：' + values.phone + '\n電子郵件：' + values.email + '\n服務時間：' + values.hours + '\n\n報修請提供系統名稱 ' + system.name + '、代碼 ' + system.code + '、問題發生時間與錯誤訊息。'],
      release: ['版本資訊 · ' + config.version.number, '【示範更版資料】\n系統：' + system.name + ' (' + system.code + ')\n版本：' + config.version.number + '\n日期：' + config.version.date + '\n\n' + config.version.changes.map(s => '• ' + s).join('\n')],
      all: ['全部公告（示範）', relevantNews().map(n => n.date + ' · ' + (n.scope === 'GLOBAL' ? '全系統' : '本系統') + '\n' + n.title + '\n' + n.body).join('\n\n')],
      device: ['登入裝置與紀錄說明', '電腦名稱需要院內裝置服務或後端提供，瀏覽器無法直接取得。\n\n作業系統與瀏覽器依目前瀏覽器資訊推測。最後登入時間、地點與電腦需完成身分驗證後，由後端登入紀錄與院內電腦資料對照提供。'],
      privacy: ['資訊安全說明', '此頁為前端設計原型，不會儲存或傳送輸入的帳號密碼。公告、更版資料均為示範內容。\n\n正式驗證、電腦資訊、個人登入紀錄及聯絡資料需由院內系統提供。共用電腦使用完畢後，請記得登出。']
    };
    $('[data-content]').on('click', function (event) {
      event.preventDefault(); const key = this.dataset.content; const url = config.links[key];
      if (url && (/^https:\/\//i.test(url) || /^\/(?!\/)/.test(url))) { window.location.assign(url); return; }
      if (details[key]) show(details[key][0], details[key][1], this);
    });
    $('#togglePassword').on('click', function () { const visible = $('#password').attr('type') === 'password'; $('#password').attr('type', visible ? 'text' : 'password'); $(this).attr('aria-pressed', String(visible)).attr('aria-label', visible ? '隱藏密碼' : '顯示密碼'); });
    $('#account, #password').on('input', function () { $(this).removeClass('is-invalid').removeAttr('aria-invalid'); $('#' + this.id + 'Error').text(''); $('#loginStatus').text('介面展示，不會傳送帳號密碼。'); });
    $('#loginForm').on('submit', function (event) {
      event.preventDefault(); if ($('#loginSubmit').prop('disabled')) return;
      let first = null; $('#account, #password').each(function () { const valid = !!(this.id === 'account' ? this.value.trim() : this.value); $(this).toggleClass('is-invalid', !valid).attr('aria-invalid', String(!valid)); $('#' + this.id + 'Error').text(valid ? '' : '請輸入' + (this.id === 'account' ? '員工帳號。' : '密碼。')); if (!valid && !first) first = this; });
      if (first) { first.focus(); return; }
      $('#loginSubmit').prop('disabled', true).attr('aria-busy', 'true'); $('#loginButtonText').text('檢查欄位中…');
      window.setTimeout(function () { $('#password').val('').attr('type', 'password'); $('#togglePassword').attr('aria-label', '顯示密碼').attr('aria-pressed', 'false'); $('#loginStatus').text('欄位檢查完成。尚未連接登入服務，未進行身分驗證。'); $('#loginSubmit').prop('disabled', false).attr('aria-busy', 'false'); $('#loginButtonText').text('登入' + system.name); }, 350);
    });
  });
})(jQuery);
