/* =============================================================================
 * app.js — 登入頁 jQuery 邏輯
 * 依 data.js 的 LoginDemoConfig 渲染畫面；api.enabled = true 時改走 $.ajax。
 * ===========================================================================*/
(function ($, window, document) {
    'use strict';

    var CFG = window.LoginDemoConfig || {};

    /* =========================================================================
     * 0) CDN 備援檢查：若 Bootstrap CSS 未載入成功，改用本機檔案
     * ======================================================================*/
    function ensureBootstrapCss() {
        var $probe = $('<div class="d-none"></div>').appendTo('body');
        var loaded = $probe.css('display') === 'none';
        $probe.remove();
        if (!loaded && !$('#bsLocalCss').length) {
            $('<link id="bsLocalCss" rel="stylesheet" href="assets/libs/bootstrap/bootstrap.min.css">')
                .prependTo('head');
        }
        // Bootstrap Icons CSS 是否載入（檢查 ::before 是否有 content）
        if (!$('#biLocalCss').length && window.getComputedStyle) {
            var $i = $('<i class="bi bi-hospital" style="position:absolute;visibility:hidden"></i>').appendTo('body');
            var content = window.getComputedStyle($i[0], '::before').content;
            if (!content || content === 'none' || content === 'normal') {
                $('<link id="biLocalCss" rel="stylesheet" href="assets/libs/bootstrap-icons/bootstrap-icons.css">')
                    .appendTo('head');
            }
            $i.remove();
        }
    }

    /* =========================================================================
     * 1) 小工具
     * ======================================================================*/
    function esc(text) {
        return $('<div>').text(text == null ? '' : String(text)).html();
    }

    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }

    function detectOs() {
        var ua = navigator.userAgent;
        if (/Windows NT 10\.0/.test(ua)) { return /Windows NT 10\.0.*rv:/.test(ua) ? 'Windows 10 / 11' : 'Windows 10 / 11'; }
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

    /* =========================================================================
     * 2) 資料來源：mock 或 API
     *    後端回傳結構請對齊 data.js 的欄位。
     * ======================================================================*/
    var DataSource = {
        _get: function (key, endpointKey, fallback) {
            var api = CFG.api || {};
            if (!api.enabled) {
                return $.Deferred().resolve(fallback).promise();
            }
            return $.ajax({
                url: api.baseUrl + api.endpoints[endpointKey],
                type: 'GET',
                dataType: 'json',
                timeout: api.timeout || 8000
            }).then(function (res) {
                return res;
            }, function () {
                // API 失敗時退回本地假資料，避免登入頁整個空白
                return $.Deferred().resolve(fallback).promise();
            });
        },
        announcements: function () { return this._get('announcements', 'announcements', CFG.announcements || []); },
        releases: function () { return this._get('releases', 'releases', CFG.releases || []); },
        clientInfo: function () { return this._get('client', 'clientInfo', CFG.client || {}); }
    };

    /* =========================================================================
     * 3) 系統識別與靜態資訊
     * ======================================================================*/
    function renderIdentity() {
        var s = CFG.system || {}, v = CFG.version || {}, m = CFG.maintainer || {};

        document.title = '登入｜' + (s.name || '') + '（' + (s.code || '') + '）'
            + (s.env && s.env !== 'PROD' ? ' - ' + s.env : '');

        $('#topbarSystemName').text(s.name || '');
        $('#topbarOrgName').text(s.orgName || '');
        $('#topbarSystemCode').text(s.code || '');
        $('#topbarEnvBadge')
            .text((s.env || '') + '　' + (s.envLabel || ''))
            .addClass('sys-env-' + (s.env || 'PROD'));

        if (s.env && s.env !== 'PROD') {
            $('body').addClass('is-nonprod');
        }

        $('#brandMark').text(s.shortName || '');
        $('#brandOrgName').text(s.orgName || '');
        $('#brandOrgSub').text(s.orgSubName || '');
        $('#loginSystemName').text(s.name || '');
        $('#loginTagline').text(s.tagline || '');
        $('#loginBtnSystem').text(s.shortName ? '（' + s.shortName + '）' : '');

        $('#sideVersion').text('版本 ' + (v.current || '-'));
        $('#sideMaintainer').text('維護：' + (m.unit || '-'));

        $('#footerSystem').text((s.orgName || '') + '　' + (s.name || '') + '　' + (s.code || ''));
        $('#footerVersion').text((v.current || '') + '（build ' + (v.buildNo || '-') + '）');
        $('#footerMaintainer').text((m.unit || '') + '　' + (m.phone || '') + (m.ext ? ' 分機 ' + m.ext : ''));

        // 主色可依系統代表色調整
        if (s.themeColor) {
            document.documentElement.style.setProperty('--sys-primary', s.themeColor);
        }

        // 忘記密碼 / 變更密碼連結
        var l = CFG.links || {};
        if (l.forgotPassword && l.forgotPassword !== '#') {
            $('#linkForgotPassword').attr('href', l.forgotPassword).removeAttr('data-bs-toggle data-bs-target');
        }
        if (l.changePassword && l.changePassword !== '#') {
            $('#linkChangePassword').attr('href', l.changePassword).removeAttr('data-bs-toggle data-bs-target');
        }
        $('#modalChangePwdLink').attr('href', l.changePassword || '#');
        $('#modalContact').text((m.unit || '維護單位') + '　' + (m.phone || '') + (m.ext ? ' 分機 ' + m.ext : ''));
    }

    function renderSystemTables() {
        var s = CFG.system || {}, v = CFG.version || {}, m = CFG.maintainer || {};

        var sysRows = [
            ['系統名稱', s.name],
            ['系統代碼', s.code],
            ['執行環境', (s.env || '') + '（' + (s.envLabel || '') + '）'],
            ['系統網址', s.url],
            ['目前版本', v.current],
            ['建置編號', v.buildNo],
            ['發佈日期', v.releaseDate],
            ['前端框架', v.framework],
            ['應用伺服器', v.serverName],
            ['資料庫', v.dbVersion]
        ];
        $('#systemInfoTable').html(sysRows.map(function (r) {
            return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1] || '-') + '</td></tr>';
        }).join(''));

        var mailLink = m.email
            ? '<a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>'
            : '-';
        var telLink = m.phone
            ? '<a href="tel:' + esc((m.phone || '').replace(/[^\d+]/g, '')) + '">' + esc(m.phone) + '</a>'
              + (m.ext ? '　分機 <strong>' + esc(m.ext) + '</strong>' : '')
            : '-';

        var mRows = [
            ['維護單位', esc(m.unit || '-')],
            ['系統負責人', esc((m.owner || '-') + (m.title ? '（' + m.title + '）' : ''))],
            ['聯絡電話', telLink],
            ['緊急聯絡', esc(m.mobile || '-')],
            ['電子郵件', mailLink],
            ['服務時間', esc(m.serviceHours || '-')],
            ['委外廠商', esc(m.vendor || '-')]
        ];
        $('#maintainerTable').html(mRows.map(function (r) {
            return '<tr><th>' + esc(r[0]) + '</th><td>' + r[1] + '</td></tr>';
        }).join(''));
    }

    function renderHelpLinks() {
        var items = CFG.helpItems || [];
        $('#helpList').html(items.map(function (it) {
            return '' +
                '<div class="col-12 col-md-6">' +
                '  <a class="help-link" href="' + esc(it.href || '#') + '" target="_blank" rel="noopener">' +
                '    <i class="bi ' + esc(it.icon) + '"></i>' +
                '    <span class="lh-sm">' +
                '      <span class="fw-semibold d-block">' + esc(it.title) + '</span>' +
                '      <small>' + esc(it.desc) + '</small>' +
                '    </span>' +
                '  </a>' +
                '</div>';
        }).join(''));
    }

    /* =========================================================================
     * 4) 公告（可區分全系統 / 單一系統）
     * ======================================================================*/
    var allNotices = [];

    function renderNotices(scope) {
        var list = allNotices.filter(function (n) {
            return scope === 'ALL' || n.scope === scope;
        });

        // 置頂優先，其次日期新到舊
        list.sort(function (a, b) {
            var byPinned = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
            if (byPinned !== 0) { return byPinned; }
            return (b.date || '').localeCompare(a.date || '');
        });

        if (!list.length) {
            $('#noticeList').html('<div class="text-secondary small py-3">目前沒有符合條件的公告。</div>');
        } else {
            $('#noticeList').html(list.map(function (n) {
                var scopeBadge = '<span class="badge badge-scope-' + esc(n.scope) + ' rounded-pill">' +
                    '<i class="bi ' + (n.scope === 'GLOBAL' ? 'bi-globe2' : 'bi-app-indicator') + ' me-1"></i>' +
                    esc(n.scopeName || (n.scope === 'GLOBAL' ? '全系統' : '本系統')) + '</span>';
                return '' +
                    '<article class="notice-item lv-' + esc(n.level) + '">' +
                    '  <div class="d-flex flex-wrap align-items-center gap-2 mb-1">' +
                    (n.pinned ? '<i class="bi bi-pin-angle-fill text-danger" title="置頂"></i>' : '') +
                    '    <span class="badge text-bg-' + esc(n.level) + '">' + esc(n.levelName) + '</span>' +
                    scopeBadge +
                    '    <span class="notice-title flex-grow-1">' + esc(n.title) + '</span>' +
                    '  </div>' +
                    '  <p class="mb-1 small">' + esc(n.content) + '</p>' +
                    '  <div class="notice-meta">' +
                    '    <i class="bi bi-calendar3 me-1"></i>' + esc(n.date) +
                    '    <span class="mx-2">·</span><i class="bi bi-building me-1"></i>' + esc(n.publisher) +
                    '    <span class="mx-2">·</span>編號 ' + esc(n.id) +
                    '  </div>' +
                    '</article>';
            }).join(''));
        }

        var g = allNotices.filter(function (n) { return n.scope === 'GLOBAL'; }).length;
        var s = allNotices.length - g;
        $('#noticeSummary').text('全系統 ' + g + ' 則　本系統 ' + s + ' 則　共 ' + allNotices.length + ' 則');
        $('#noticeCount').text(list.length);
    }

    /* =========================================================================
     * 5) 更版資訊
     * ======================================================================*/
    var TYPE_NAME = { feature: '新功能', fix: '修正', security: '資安', change: '調整' };

    function renderReleases(releases) {
        var current = releases.filter(function (r) { return r.current; })[0] || releases[0] || {};
        $('#releaseCurrentVersion').text(current.version || '-');
        $('#releaseCurrentDate').text(current.date || '-');

        $('#releaseList').html(releases.map(function (r) {
            var items = (r.items || []).map(function (it) {
                return '<li><span class="tag-type tag-' + esc(it.type) + '">' +
                    esc(TYPE_NAME[it.type] || it.type) + '</span><span>' + esc(it.text) + '</span></li>';
            }).join('');
            return '' +
                '<div class="release-block">' +
                '  <div class="release-head">' +
                '    <span class="release-version">' + esc(r.version) + '</span>' +
                (r.current ? '<span class="badge text-bg-success">目前版本</span>' : '') +
                '    <span class="text-secondary small"><i class="bi bi-calendar3 me-1"></i>' + esc(r.date) + '</span>' +
                '    <span class="text-secondary small">｜' + esc(r.summary || '') + '</span>' +
                '  </div>' +
                '  <ul class="release-list">' + items + '</ul>' +
                '</div>';
        }).join('<hr class="my-3">'));
    }

    /* =========================================================================
     * 6) 登入端電腦資訊
     * ======================================================================*/
    function renderClient(c) {
        var os = c.os || detectOs();
        var browser = c.browser || detectBrowser();
        var screenInfo = window.screen ? (screen.width + ' × ' + screen.height) : '-';

        var tiles = [
            { label: '電腦名稱', value: c.computerName || '（需由後端提供）', icon: 'bi-pc' },
            { label: '網域', value: c.domain || '-', icon: 'bi-diagram-3' },
            { label: '作業系統', value: os, icon: 'bi-windows' },
            { label: '瀏覽器', value: browser, icon: 'bi-browser-edge' },
            { label: 'IP 位址', value: c.ip || '（需由後端提供）', icon: 'bi-hdd-network' },
            { label: '螢幕解析度', value: screenInfo, icon: 'bi-display' },
            { label: '財產編號', value: c.assetNo || '-', icon: 'bi-upc-scan' },
            { label: '瀏覽器語系', value: navigator.language || '-', icon: 'bi-translate' }
        ];

        $('#clientTiles').html(tiles.map(function (t) {
            return '' +
                '<div class="col-6 col-xl-3">' +
                '  <div class="client-tile">' +
                '    <span class="label"><i class="bi ' + esc(t.icon) + ' me-1"></i>' + esc(t.label) + '</span>' +
                '    <span class="value">' + esc(t.value) + '</span>' +
                '  </div>' +
                '</div>';
        }).join(''));

        var ll = c.lastLogin || {};
        var rows = [
            ['登入時間', ll.time],
            ['登入地點', ll.location],
            ['電腦名稱', ll.computerName],
            ['IP 位址', ll.ip],
            ['作業系統', ll.os],
            ['瀏覽器', ll.browser],
            ['結果', ll.result === 'success' ? '成功' : '失敗']
        ];
        $('#lastLoginTable').html(rows.map(function (r) {
            return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1] || '-') + '</td></tr>';
        }).join(''));

        // 左側摘要
        $('#sideComputerName').text(c.computerName || '-');
        $('#sideOs').text(os);
        $('#sideLastLogin').text(
            (ll.time || '-') + (ll.location ? '　' + ll.location : '')
        );

        // 前次失敗登入（資安提醒）
        var lf = c.lastFailedLogin;
        if (lf && lf.time) {
            $('#lastFailedText').text(
                '前次登入失敗：' + lf.time + '　' + (lf.location || '') +
                '（' + (lf.computerName || '') + ' / ' + (lf.ip || '') + '）原因：' + (lf.reason || '-') +
                '。若非本人操作請立即聯絡維護單位。'
            );
            $('#lastFailedBox').removeClass('d-none');
        }
    }

    /* =========================================================================
     * 6.5) 可捲動區域提示（內容超出時，底部顯示淡出與提示）
     * ======================================================================*/
    function refreshScrollHints() {
        $('.tab-scroll').each(function () {
            var el = this;
            var $pane = $(el).closest('.tab-pane');
            if (!$pane.children('.scroll-hint').length) {
                $pane.append('<span class="scroll-hint"><i class="bi bi-chevron-down me-1"></i>向下捲動查看更多</span>');
            }
            var more = el.scrollHeight - el.clientHeight - el.scrollTop > 8;
            $pane.toggleClass('has-more', more);
        });
    }

    function initScrollHints() {
        $(document).on('scroll', '.tab-scroll', refreshScrollHints);
        $('#infoTab button').on('shown.bs.tab', refreshScrollHints);
        $(window).on('resize', refreshScrollHints);
        refreshScrollHints();
    }

    /* =========================================================================
     * 7) 時鐘
     * ======================================================================*/
    function startClock() {
        var weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        function tick() {
            var d = new Date();
            $('#topbarClock').text(pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()));
            $('#topbarDate').text(
                d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()) +
                '（' + weekdays[d.getDay()] + '）'
            );
        }
        tick();
        setInterval(tick, 1000);
    }

    /* =========================================================================
     * 8) 登入表單
     * ======================================================================*/
    function showLoginAlert(msg, type) {
        $('#loginAlert')
            .removeClass('d-none alert-warning alert-danger alert-success alert-info')
            .addClass('alert-' + (type || 'warning'))
            .text(msg);
    }

    function clearFieldErrors() {
        $('#accountFeedback, #passwordFeedback').text('');
        $('#account, #password').removeClass('is-invalid');
        $('#loginAlert').addClass('d-none');
    }

    function bindLoginForm() {
        // 顯示／隱藏密碼
        function togglePwd() {
            var $p = $('#password');
            var show = $p.attr('type') === 'password';
            $p.attr('type', show ? 'text' : 'password');
            $('#togglePasswordIcon').toggleClass('bi-eye', !show).toggleClass('bi-eye-slash', show);
            $('#togglePassword').attr('aria-label', show ? '隱藏密碼' : '顯示密碼');
        }
        $('#togglePassword').on('click', togglePwd).on('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePwd(); }
        });

        $('#account, #password').on('input', clearFieldErrors);

        $('#loginForm').on('submit', function (e) {
            e.preventDefault();
            clearFieldErrors();

            var account = $.trim($('#account').val());
            var password = $('#password').val();
            var ok = true;

            if (!account) {
                $('#account').addClass('is-invalid');
                $('#accountFeedback').text('請輸入帳號（員工編號）。');
                ok = false;
            }
            if (!password) {
                $('#password').addClass('is-invalid');
                $('#passwordFeedback').text('請輸入密碼。');
                ok = false;
            }
            if (!ok) {
                $(account ? '#password' : '#account').trigger('focus');
                return;
            }

            setLoading(true);

            var api = CFG.api || {};
            if (api.enabled) {
                /* --- 實際介接後端 --------------------------------------- */
                $.ajax({
                    url: api.baseUrl + api.endpoints.login,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    timeout: api.timeout || 8000,
                    data: JSON.stringify({
                        account: account,
                        password: password,
                        rememberDevice: $('#rememberDevice').is(':checked'),
                        systemCode: (CFG.system || {}).code,
                        clientComputerName: (CFG.client || {}).computerName
                    })
                }).done(function (res) {
                    if (res && res.success) {
                        showLoginAlert('登入成功，正在導向系統…', 'success');
                        if (res.redirectUrl) { window.location.href = res.redirectUrl; }
                    } else {
                        showLoginAlert((res && res.message) || '帳號或密碼錯誤。', 'danger');
                    }
                }).fail(function () {
                    showLoginAlert('無法連線至驗證服務，請稍後再試或聯絡維護單位。', 'danger');
                }).always(function () {
                    setLoading(false);
                });
            } else {
                /* --- DEMO 模式：僅示範流程，不做真正驗證 ----------------- */
                setTimeout(function () {
                    setLoading(false);
                    showLoginAlert(
                        'DEMO 模式：已送出「' + account + '」的登入請求至「' +
                        ((CFG.system || {}).name || '') + '」。實際驗證請設定 data.js 的 api.enabled = true。',
                        'info'
                    );
                }, 700);
            }
        });
    }

    function setLoading(loading) {
        $('#btnLogin').prop('disabled', loading);
        $('#loginSpinner').toggleClass('d-none', !loading);
        $('#loginIcon').toggleClass('d-none', loading);
    }

    /* =========================================================================
     * 9) 忘記密碼 Modal
     * ======================================================================*/
    function bindPwdModal() {
        $('#pwdSubmit').on('click', function () {
            var acc = $.trim($('#pwdAccount').val());
            var mail = $.trim($('#pwdEmail').val());
            var $alert = $('#pwdAlert').removeClass('d-none alert-danger alert-success');

            if (!acc || !mail) {
                $alert.addClass('alert-danger').text('請完整輸入員工編號與院內信箱。');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
                $alert.addClass('alert-danger').text('信箱格式不正確。');
                return;
            }
            // TODO: 接後端 → $.ajax({ url: '/api/auth/forgot-password', type: 'POST', data: {...} })
            $alert.addClass('alert-success')
                .text('DEMO 模式：密碼重設連結已寄送至 ' + mail + '（30 分鐘內有效）。');
        });

        $('#pwdModal').on('hidden.bs.modal', function () {
            $('#pwdForm')[0].reset();
            $('#pwdAlert').addClass('d-none');
        });
    }

    /* =========================================================================
     * 10) 啟動
     * ======================================================================*/
    $(function () {
        ensureBootstrapCss();
        renderIdentity();
        renderSystemTables();
        renderHelpLinks();
        startClock();
        bindLoginForm();
        bindPwdModal();
        initScrollHints();

        DataSource.announcements().done(function (list) {
            allNotices = list || [];
            renderNotices('ALL');
            refreshScrollHints();
        });

        DataSource.releases().done(function (list) {
            renderReleases(list || []);
            refreshScrollHints();
        });

        DataSource.clientInfo().done(function (c) {
            renderClient(c || {});
            refreshScrollHints();
        });

        $('input[name="noticeScope"]').on('change', function () {
            renderNotices($(this).val());
            refreshScrollHints();
        });

        $('#account').trigger('focus');
    });

})(jQuery, window, document);
