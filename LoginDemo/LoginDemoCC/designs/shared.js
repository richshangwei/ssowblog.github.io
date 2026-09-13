/* =============================================================================
 * concepts/shared.js — 四款設計概念共用的資料整理與工具
 * 資料一律來自 ../assets/js/data.js 的 LoginDemoConfig，
 * 各概念只負責「怎麼排版」，不重複寫資料處理。
 * ===========================================================================*/
window.LD = (function ($) {
    'use strict';

    var CFG = window.LoginDemoConfig || {};

    function esc(t) {
        return $('<div>').text(t == null ? '' : String(t)).html();
    }

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function detectOs() {
        var ua = navigator.userAgent;
        if (/Windows NT 10\.0/.test(ua)) { return 'Windows 10 / 11'; }
        if (/Windows NT 6\.3/.test(ua)) { return 'Windows 8.1'; }
        if (/Windows/.test(ua)) { return 'Windows'; }
        if (/Mac OS X/.test(ua)) { return 'macOS'; }
        if (/Android/.test(ua)) { return 'Android'; }
        if (/iPhone|iPad|iPod/.test(ua)) { return 'iOS / iPadOS'; }
        if (/Linux/.test(ua)) { return 'Linux'; }
        return '未知作業系統';
    }

    function detectBrowser() {
        var ua = navigator.userAgent, m;
        if ((m = ua.match(/Edg\/([\d.]+)/))) { return 'Microsoft Edge ' + m[1].split('.')[0]; }
        if ((m = ua.match(/OPR\/([\d.]+)/))) { return 'Opera ' + m[1].split('.')[0]; }
        if ((m = ua.match(/Chrome\/([\d.]+)/))) { return 'Google Chrome ' + m[1].split('.')[0]; }
        if ((m = ua.match(/Firefox\/([\d.]+)/))) { return 'Mozilla Firefox ' + m[1].split('.')[0]; }
        if ((m = ua.match(/Version\/([\d.]+).*Safari/))) { return 'Safari ' + m[1].split('.')[0]; }
        return '未知瀏覽器';
    }

    /* 時鐘：每秒回呼 { time, date } */
    function startClock(cb) {
        var w = ['日', '一', '二', '三', '四', '五', '六'];
        function tick() {
            var d = new Date();
            cb({
                time: pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()),
                date: d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()) +
                      '（' + w[d.getDay()] + '）'
            });
        }
        tick();
        setInterval(tick, 1000);
    }

    /* ---- 資料列 ---------------------------------------------------------- */
    function systemRows() {
        var s = CFG.system || {}, v = CFG.version || {};
        return [
            ['系統名稱', s.name], ['系統代碼', s.code],
            ['執行環境', (s.env || '') + '（' + (s.envLabel || '') + '）'],
            ['系統網址', s.url], ['目前版本', v.current], ['建置編號', v.buildNo],
            ['發佈日期', v.releaseDate], ['前端框架', v.framework],
            ['應用伺服器', v.serverName], ['資料庫', v.dbVersion]
        ];
    }

    function maintainerRows() {
        var m = CFG.maintainer || {};
        return [
            ['維護單位', esc(m.unit || '-')],
            ['系統負責人', esc((m.owner || '-') + (m.title ? '（' + m.title + '）' : ''))],
            ['聯絡電話', (m.phone ? '<a href="tel:' + esc((m.phone || '').replace(/[^\d+]/g, '')) + '">' +
                esc(m.phone) + '</a>' + (m.ext ? '　分機 <strong>' + esc(m.ext) + '</strong>' : '') : '-')],
            ['緊急聯絡', esc(m.mobile || '-')],
            ['電子郵件', (m.email ? '<a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>' : '-')],
            ['服務時間', esc(m.serviceHours || '-')],
            ['委外廠商', esc(m.vendor || '-')]
        ];
    }

    function clientItems() {
        var c = CFG.client || {};
        return [
            { label: '電腦名稱', value: c.computerName || '（需由後端提供）', icon: 'bi-pc' },
            { label: '網域', value: c.domain || '-', icon: 'bi-diagram-3' },
            { label: '作業系統', value: c.os || detectOs(), icon: 'bi-windows' },
            { label: '瀏覽器', value: c.browser || detectBrowser(), icon: 'bi-browser-edge' },
            { label: 'IP 位址', value: c.ip || '（需由後端提供）', icon: 'bi-hdd-network' },
            { label: '螢幕解析度', value: (window.screen ? screen.width + ' × ' + screen.height : '-'), icon: 'bi-display' },
            { label: '財產編號', value: c.assetNo || '-', icon: 'bi-upc-scan' },
            { label: '瀏覽器語系', value: navigator.language || '-', icon: 'bi-translate' }
        ];
    }

    function lastLoginRows() {
        var l = (CFG.client || {}).lastLogin || {};
        return [
            ['登入時間', l.time], ['登入地點', l.location], ['電腦名稱', l.computerName],
            ['IP 位址', l.ip], ['作業系統', l.os], ['瀏覽器', l.browser],
            ['結果', l.result === 'success' ? '成功' : '失敗']
        ];
    }

    function lastLoginText() {
        var l = (CFG.client || {}).lastLogin || {};
        return (l.time || '-') + (l.location ? '　' + l.location : '') +
               (l.computerName ? '（' + l.computerName + '）' : '');
    }

    function failedLoginText() {
        var f = (CFG.client || {}).lastFailedLogin;
        if (!f || !f.time) { return ''; }
        return '前次登入失敗：' + f.time + '　' + (f.location || '') +
               '（' + (f.computerName || '') + ' / ' + (f.ip || '') + '）原因：' + (f.reason || '-') +
               '。若非本人操作請立即聯絡維護單位。';
    }

    function notices(scope) {
        var list = (CFG.announcements || []).filter(function (n) {
            return !scope || scope === 'ALL' || n.scope === scope;
        });
        return list.sort(function (a, b) {
            var p = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
            return p !== 0 ? p : (b.date || '').localeCompare(a.date || '');
        });
    }

    var TYPE_NAME = { feature: '新功能', fix: '修正', security: '資安', change: '調整' };

    /* ---- 共用行為 -------------------------------------------------------- */
    /* 密碼顯示切換：傳入 input 與觸發元素的選擇器 */
    function bindPasswordToggle(inputSel, toggleSel, iconSel) {
        function t() {
            var $p = $(inputSel), show = $p.attr('type') === 'password';
            $p.attr('type', show ? 'text' : 'password');
            $(iconSel).toggleClass('bi-eye', !show).toggleClass('bi-eye-slash', show);
            $(toggleSel).attr('aria-label', show ? '隱藏密碼' : '顯示密碼');
        }
        $(toggleSel).on('click', t).on('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); }
        });
    }

    /* DEMO 登入流程：驗證欄位後回呼訊息 */
    function bindDemoLogin(formSel, accSel, pwdSel, onMessage) {
        $(formSel).on('submit', function (e) {
            e.preventDefault();
            var acc = $.trim($(accSel).val()), pwd = $(pwdSel).val();
            if (!acc) { onMessage('請輸入帳號（員工編號）。', 'warning'); $(accSel).trigger('focus'); return; }
            if (!pwd) { onMessage('請輸入密碼。', 'warning'); $(pwdSel).trigger('focus'); return; }
            onMessage('DEMO 模式：已送出「' + acc + '」的登入請求至「' +
                ((CFG.system || {}).name || '') + '」。', 'info');
        });
    }

    /* 依環境套用頁面標題與非正式環境警示 */
    function applyEnv() {
        var s = CFG.system || {};
        document.title = '登入｜' + (s.name || '') + '（' + (s.code || '') + '）' +
            (s.env && s.env !== 'PROD' ? ' - ' + s.env : '');
        if (s.env && s.env !== 'PROD') { $('body').addClass('is-nonprod'); }
    }


    /* ---- 版面產生器（十款版面共用，減少重複）------------------------------ */

    /* 依 {selector: text} 批次塞文字 */
    function fill(map) {
        $.each(map, function (sel, txt) { $(sel).text(txt == null ? '' : txt); });
    }

    /* 系統識別的常用字串 */
    function identity() {
        var s = CFG.system || {}, v = CFG.version || {}, m = CFG.maintainer || {};
        return {
            org: s.orgName || '', orgSub: s.orgSubName || '',
            name: s.name || '', short: s.shortName || '', code: s.code || '',
            env: s.env || '', envLabel: s.envLabel || '',
            envText: (s.env || '') + '　' + (s.envLabel || ''),
            url: s.url || '', tagline: s.tagline || '',
            version: v.current || '', build: v.buildNo || '',
            maintainer: (m.unit || '') + '　' + (m.phone || '') + (m.ext ? ' 分機 ' + m.ext : ''),
            footer: (s.orgName || '') + '　' + (s.name || '') + '　' + (s.code || '') +
                    '　·　' + (v.current || '') + '　·　' + (m.unit || '')
        };
    }

    /* <tr><th>k</th><td>v</td></tr> */
    function tableRows(rows, raw) {
        return rows.map(function (r) {
            return '<tr><th>' + esc(r[0]) + '</th><td>' + (raw ? (r[1] || '-') : esc(r[1] || '-')) + '</td></tr>';
        }).join('');
    }

    /* 兩欄式 key/value（可自訂外層 class） */
    function kvHtml(rows, cls, raw) {
        cls = cls || 'kv';
        return rows.map(function (r) {
            return '<div class="' + cls + '"><span class="k">' + esc(r[0]) + '</span><span class="v">' +
                (raw ? (r[1] || '-') : esc(r[1] || '-')) + '</span></div>';
        }).join('');
    }

    /* 更版資訊：opts.tagCls(type) 可自訂標籤 class，opts.wrap 包裝每個版本 */
    function releaseHtml(opts) {
        opts = opts || {};
        var tagCls = opts.tagCls || function (t) { return 'rel-tag t-' + t; };
        return (CFG.releases || []).map(function (r) {
            var items = (r.items || []).map(function (i) {
                return '<li class="rel-item"><span class="' + tagCls(i.type) + '">' +
                    esc(TYPE_NAME[i.type] || i.type) + '</span><span>' + esc(i.text) + '</span></li>';
            }).join('');
            var head = '<div class="rel-head"><span class="rel-ver">' + esc(r.version) + '</span>' +
                (r.current ? '<span class="rel-now">目前版本</span>' : '') +
                '<span class="rel-date">' + esc(r.date) + '</span>' +
                '<span class="rel-sum">' + esc(r.summary || '') + '</span></div>';
            var body = '<ul class="rel-list">' + items + '</ul>';
            return opts.wrap ? opts.wrap(head + body, r) : '<div class="rel-block">' + head + body + '</div>';
        }).join(opts.sep || '');
    }

    /* 教學連結：opts.render(item) 可完全自訂 */
    function helpHtml(render) {
        return (CFG.helpItems || []).map(function (h) {
            return render ? render(h) :
                '<a class="help-item" href="' + esc(h.href) + '"><i class="bi ' + esc(h.icon) + '"></i>' +
                '<span><strong>' + esc(h.title) + '</strong><small>' + esc(h.desc) + '</small></span></a>';
        }).join('');
    }

    /* 公告：render(n) 自訂每則的 HTML；empty 為無資料時的內容 */
    function noticeHtml(scope, render, empty) {
        var list = notices(scope);
        if (!list.length) { return empty || '<p class="text-secondary small mb-0">沒有符合條件的公告。</p>'; }
        return list.map(render).join('');
    }

    /* 綁定 scope 切換：radio(name) 或 button(selector)，回呼 scope */
    function bindScope(sel, cb) {
        $(document).on('change', sel, function () { cb($(this).val()); });
        $(document).on('click', sel + '[data-scope]', function () {
            $(sel + '[data-scope]').removeClass('active');
            $(this).addClass('active');
            cb($(this).data('scope'));
        });
    }

    return {
        cfg: CFG, esc: esc, pad: pad,
        detectOs: detectOs, detectBrowser: detectBrowser, startClock: startClock,
        systemRows: systemRows, maintainerRows: maintainerRows,
        clientItems: clientItems, lastLoginRows: lastLoginRows,
        lastLoginText: lastLoginText, failedLoginText: failedLoginText,
        notices: notices, TYPE_NAME: TYPE_NAME,
        bindPasswordToggle: bindPasswordToggle, bindDemoLogin: bindDemoLogin,
        applyEnv: applyEnv,
        fill: fill, identity: identity, tableRows: tableRows, kvHtml: kvHtml,
        releaseHtml: releaseHtml, helpHtml: helpHtml, noticeHtml: noticeHtml, bindScope: bindScope
    };
})(jQuery);
