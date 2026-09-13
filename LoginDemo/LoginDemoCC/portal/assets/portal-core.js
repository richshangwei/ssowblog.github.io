/* =============================================================================
 * portal-core.js — 多系統共用登入入口：共用區塊產生器與流程控制
 * -----------------------------------------------------------------------------
 * 十款設計共用同一份功能與資料，差別只在「版面怎麼排、用哪一種呈現變體」。
 * 每一款只需要提供插槽（slot）與變體（variant），核心負責產生內容與行為。
 *
 * Portal.mount({
 *   slots:    { identity, alerts, login, status, notices, help, systems, support, footer, result },
 *   variants: { status:'board|table|chips|banner', notices:'list|cards|accordion|table|compact',
 *               help:'cards|links|accordion|actions', systems:'cards|list|table' },
 *   noticeLimit: 2
 * });
 * ===========================================================================*/
window.Portal = (function ($, D) {
    'use strict';

    var S = {};              // 目前展示狀態
    var CFG = {};            // mount 設定
    var submitting = false;

    /* =====================================================================
     * 工具
     * ==================================================================*/
    function esc(t) { return $('<div>').text(t == null ? '' : String(t)).html(); }

    function qs(name, fallback) {
        var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return m ? decodeURIComponent(m[1]) : fallback;
    }

    function systemByKey(k) {
        for (var i = 0; i < D.systems.length; i++) { if (D.systems[i].key === k) { return D.systems[i]; } }
        return null;
    }

    /* 依展示情境取得每個系統的狀態 */
    function systemStatus(sys) {
        if (S.service === 'unknown') { return 'unknown'; }
        if (S.service === 'normal') { return sys.status === 'unknown' ? 'unknown' : 'operational'; }
        return sys.status;   // degraded / maintenance 情境用資料原始值
    }

    /* 整體狀態：取最嚴重者 */
    function overallStatus() {
        var order = ['maintenance', 'degraded', 'unknown', 'operational'];
        var found = {};
        D.systems.filter(function (s) { return s.public; }).forEach(function (s) { found[systemStatus(s)] = true; });
        for (var i = 0; i < order.length; i++) { if (found[order[i]]) { return order[i]; } }
        return 'unknown';
    }

    function activeNotices() {
        return D.notices.filter(function (n) {
            return n.scenarios.indexOf(S.service) >= 0 && n.visibility === 'public';
        }).sort(function (a, b) {
            var w = { critical: 0, important: 1, normal: 2 };
            return (w[a.severity] - w[b.severity]) || String(b.updated).localeCompare(String(a.updated));
        });
    }

    function severityMeta(sev) {
        return {
            critical: { label: '重大影響', cls: 'pt-sev-critical', icon: 'bi-exclamation-octagon' },
            important: { label: '需注意', cls: 'pt-sev-important', icon: 'bi-exclamation-triangle' },
            normal: { label: '一般周知', cls: 'pt-sev-normal', icon: 'bi-info-circle' }
        }[sev] || { label: '一般周知', cls: 'pt-sev-normal', icon: 'bi-info-circle' };
    }

    /* =====================================================================
     * 區塊：組織與入口識別
     * ==================================================================*/
    function blockIdentity() {
        return '' +
            '<div class="pt-identity">' +
            '  <div class="pt-logo" role="img" aria-label="' + esc(D.org.logoAlt) + '">' + esc(D.org.logoText) + '</div>' +
            '  <div class="pt-identity-text">' +
            '    <p class="pt-org">' + esc(D.org.name) + '</p>' +
            '    <h1 class="pt-portal-name">' + esc(D.org.portalName) + '</h1>' +
            '    <p class="pt-purpose">' + esc(D.org.portalPurpose) + '</p>' +
            '  </div>' +
            '</div>';
    }

    /* =====================================================================
     * 區塊：登入表單
     * ==================================================================*/
    function blockLogin() {
        var target = S.entry === 'redirect' ? systemByKey(S.sys) : null;
        var targetBox = target ? '' +
            '<div class="pt-target" role="note">' +
            '  <span class="pt-target-label">您正要進入</span>' +
            '  <strong class="pt-target-name">' + esc(target.name) + '</strong>' +
            '  <span class="pt-target-code">' + esc(target.code) + '</span>' +
            '  <p class="pt-target-desc">' + esc(target.desc) + '　登入成功後將返回此系統。</p>' +
            '</div>'
            : '<div class="pt-target pt-target-direct" role="note">' +
            '  <span class="pt-target-label">您正要進入</span>' +
            '  <strong class="pt-target-name">' + esc(D.org.portalName) + '</strong>' +
            '  <p class="pt-target-desc">登入成功後，會顯示您有權限的系統清單，再選擇要使用的系統。</p>' +
            '</div>';

        return '' +
            targetBox +
            '<form class="pt-form" id="ptForm" novalidate>' +
            '  <p class="pt-account-hint" id="ptAccountHint">' + esc(D.org.accountHint) + '</p>' +

            '  <div class="pt-field">' +
            '    <label class="pt-label" for="ptAccount">帳號</label>' +
            '    <input class="pt-input" type="text" id="ptAccount" name="account" autocomplete="username"' +
            '           aria-describedby="ptAccountHint ptAccountErr" />' +
            '    <p class="pt-err" id="ptAccountErr" role="alert"></p>' +
            '  </div>' +

            '  <div class="pt-field">' +
            '    <label class="pt-label" for="ptPassword">密碼</label>' +
            '    <div class="pt-input-wrap">' +
            '      <input class="pt-input" type="password" id="ptPassword" name="password" autocomplete="current-password"' +
            '             aria-describedby="ptPasswordErr" />' +
            '      <button class="pt-toggle" type="button" id="ptToggle" aria-pressed="false">' +
            '        <i class="bi bi-eye" id="ptToggleIcon" aria-hidden="true"></i><span id="ptToggleText">顯示密碼</span>' +
            '      </button>' +
            '    </div>' +
            '    <p class="pt-err" id="ptPasswordErr" role="alert"></p>' +
            '  </div>' +

            '  <div class="pt-checks">' +
            '    <label class="pt-check"><input type="checkbox" id="ptRemember" /> <span>記住帳號<small>只記住帳號欄位，不會保留密碼。</small></span></label>' +
            '    <label class="pt-check"><input type="checkbox" id="ptKeep" /> <span>保持登入<small>共用工作站請勿勾選。是否開放此選項待確認。</small></span></label>' +
            '  </div>' +

            '  <p class="pt-form-msg" id="ptFormMsg" role="alert" aria-live="assertive"></p>' +

            '  <button class="pt-submit" type="submit" id="ptSubmit">' +
            '    <span class="pt-spinner" id="ptSpinner" aria-hidden="true"></span>' +
            '    <span id="ptSubmitText">登入</span>' +
            '  </button>' +

            '  <p class="pt-demo-note"><i class="bi bi-info-circle" aria-hidden="true"></i> 示範用：帳號密碼可任意輸入，不會送出至任何伺服器。</p>' +

            '  <ul class="pt-form-links">' +
            '    <li><a href="#" data-pt-help="forgot">忘記密碼</a></li>' +
            '    <li><a href="#" data-pt-help="apply">帳號申請</a></li>' +
            '    <li><a href="#" data-pt-help="perm">權限申請</a></li>' +
            '    <li><a href="#" data-pt-help="first">首次使用說明</a></li>' +
            '  </ul>' +
            '</form>';
    }

    /* =====================================================================
     * 區塊：服務狀態
     * ==================================================================*/
    function statusPill(key) {
        var L = D.statusLevels[key];
        return '<span class="pt-status pt-status-' + L.tone + '">' +
            '<i class="bi ' + L.icon + '" aria-hidden="true"></i>' + esc(L.label) + '</span>';
    }

    function blockStatus(variant) {
        var pub = D.systems.filter(function (s) { return s.public; });
        var ov = overallStatus();
        var L = D.statusLevels[ov];
        var head = '' +
            '<div class="pt-status-head">' +
            '  <div>' +
            '    <p class="pt-block-title">服務狀態</p>' +
            '    <p class="pt-status-overall">' + statusPill(ov) + '<span class="pt-status-desc">' + esc(L.desc) + '</span></p>' +
            '  </div>' +
            '  <p class="pt-status-updated">狀態更新時間：' + esc(S.service === 'unknown' ? '尚未取得' : '[狀態更新時間]（示範）') + '</p>' +
            '</div>';

        var body;
        if (variant === 'table') {
            body = '<table class="pt-table"><caption class="pt-sr">各系統服務狀態（示範資料）</caption>' +
                '<thead><tr><th scope="col">系統</th><th scope="col">狀態</th><th scope="col">狀態更新</th></tr></thead><tbody>' +
                pub.map(function (s) {
                    var k = systemStatus(s);
                    return '<tr><th scope="row">' + esc(s.name) + '</th><td>' + statusPill(k) + '</td>' +
                        '<td>' + esc(k === 'unknown' ? '尚未取得' : (s.statusUpdated || '[更新時間]')) + '</td></tr>';
                }).join('') + '</tbody></table>';
        } else if (variant === 'chips') {
            body = '<ul class="pt-status-chips">' + pub.map(function (s) {
                var k = systemStatus(s);
                return '<li class="pt-chip pt-chip-' + D.statusLevels[k].tone + '">' +
                    '<i class="bi ' + D.statusLevels[k].icon + '" aria-hidden="true"></i>' +
                    '<span class="pt-chip-name">' + esc(s.name) + '</span>' +
                    '<span class="pt-chip-state">' + esc(D.statusLevels[k].short) + '</span></li>';
            }).join('') + '</ul>';
        } else if (variant === 'banner') {
            body = '<ul class="pt-status-lines">' + pub.map(function (s) {
                var k = systemStatus(s);
                return '<li><span class="pt-sl-name">' + esc(s.name) + '</span>' + statusPill(k) + '</li>';
            }).join('') + '</ul>';
        } else { /* board */
            body = '<ul class="pt-status-board">' + pub.map(function (s) {
                var k = systemStatus(s), SL = D.statusLevels[k];
                return '<li class="pt-sb pt-sb-' + SL.tone + '">' +
                    '<p class="pt-sb-name">' + esc(s.name) + '</p>' +
                    '<p class="pt-sb-state"><i class="bi ' + SL.icon + '" aria-hidden="true"></i>' + esc(SL.label) + '</p>' +
                    '<p class="pt-sb-desc">' + esc(SL.desc) + '</p>' +
                    '<p class="pt-sb-time">更新：' + esc(k === 'unknown' ? '尚未取得' : (s.statusUpdated || '[更新時間]')) + '</p>' +
                    '</li>';
            }).join('') + '</ul>';
        }

        return '<div class="pt-block pt-block-status">' + head + body +
            '<p class="pt-note">以上為示範資料。狀態來源（監控介接或人工維護）待確認；未取得資料時顯示「狀態未確認」，不代表服務正常。</p></div>';
    }

    /* =====================================================================
     * 區塊：公告
     * ==================================================================*/
    function noticeDetailHtml(n) {
        var rows = [
            ['影響', n.impact], ['時間', n.time], ['處理狀態', n.progress],
            ['您現在可以', n.userAction], ['替代方式', n.workaround]
        ].filter(function (r) { return r[1]; });
        return '<dl class="pt-notice-dl">' + rows.map(function (r) {
            return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
        }).join('') + '</dl>' +
            '<p class="pt-notice-meta">發布單位：' + esc(n.publisher) + '　·　發布：' + esc(n.published) +
            '　·　最後更新：' + esc(n.updated) + (n.nextUpdate ? '　·　' + esc(n.nextUpdate) : '') +
            (n.expires ? '　·　有效期限：' + esc(n.expires) : '') + '　·　編號 ' + esc(n.id) + '</p>';
    }

    function noticeScopeText(n) {
        if (n.scope === 'all') { return '適用：全部系統'; }
        return '適用：' + n.systems.map(function (k) {
            var s = systemByKey(k); return s ? s.name : k;
        }).join('、');
    }

    function blockNotices(variant, limit) {
        var list = activeNotices();
        var shown = limit ? list.slice(0, limit) : list;
        var head = '' +
            '<div class="pt-block-head">' +
            '  <p class="pt-block-title">重要公告</p>' +
            '  <button class="pt-link-btn" type="button" data-pt-open="notices">查看全部公告（' + list.length + '）</button>' +
            '</div>';

        var body;
        if (variant === 'cards') {
            body = '<ul class="pt-notice-cards">' + shown.map(function (n) {
                var M = severityMeta(n.severity);
                return '<li class="pt-notice-card ' + M.cls + '">' +
                    '<p class="pt-notice-tags"><span class="pt-sev"><i class="bi ' + M.icon + '" aria-hidden="true"></i>' + esc(M.label) + '</span>' +
                    '<span class="pt-scope">' + esc(noticeScopeText(n)) + '</span></p>' +
                    '<h3 class="pt-notice-title">' + esc(n.title) + '</h3>' +
                    '<p class="pt-notice-action">' + esc(n.userAction) + '</p>' +
                    '<p class="pt-notice-updated">最後更新：' + esc(n.updated) + '</p>' +
                    '<button class="pt-link-btn" type="button" data-pt-notice="' + esc(n.id) + '">查看完整說明</button></li>';
            }).join('') + '</ul>';
        } else if (variant === 'accordion') {
            body = '<div class="pt-acc">' + shown.map(function (n, i) {
                var M = severityMeta(n.severity);
                return '<div class="pt-acc-item ' + M.cls + '">' +
                    '<h3><button class="pt-acc-btn" type="button" aria-expanded="' + (i === 0 ? 'true' : 'false') + '" data-pt-acc="' + esc(n.id) + '">' +
                    '<span class="pt-sev"><i class="bi ' + M.icon + '" aria-hidden="true"></i>' + esc(M.label) + '</span>' +
                    '<span class="pt-acc-title">' + esc(n.title) + '</span>' +
                    '<i class="bi bi-chevron-down pt-acc-caret" aria-hidden="true"></i></button></h3>' +
                    '<div class="pt-acc-body" id="acc-' + esc(n.id) + '"' + (i === 0 ? '' : ' hidden') + '>' +
                    '<p class="pt-scope">' + esc(noticeScopeText(n)) + '</p>' + noticeDetailHtml(n) + '</div></div>';
            }).join('') + '</div>';
        } else if (variant === 'table') {
            body = '<table class="pt-table"><caption class="pt-sr">重要公告（示範資料）</caption>' +
                '<thead><tr><th scope="col">程度</th><th scope="col">公告</th><th scope="col">適用</th><th scope="col">最後更新</th></tr></thead><tbody>' +
                shown.map(function (n) {
                    var M = severityMeta(n.severity);
                    return '<tr class="' + M.cls + '"><td><span class="pt-sev">' + esc(M.label) + '</span></td>' +
                        '<th scope="row"><button class="pt-link-btn pt-link-strong" type="button" data-pt-notice="' + esc(n.id) + '">' + esc(n.title) + '</button>' +
                        '<span class="pt-notice-action">' + esc(n.userAction) + '</span></th>' +
                        '<td>' + esc(noticeScopeText(n).replace('適用：', '')) + '</td><td>' + esc(n.updated) + '</td></tr>';
                }).join('') + '</tbody></table>';
        } else if (variant === 'compact') {
            body = '<ul class="pt-notice-compact">' + shown.map(function (n) {
                var M = severityMeta(n.severity);
                return '<li class="' + M.cls + '"><span class="pt-sev">' + esc(M.label) + '</span>' +
                    '<button class="pt-link-btn pt-link-strong" type="button" data-pt-notice="' + esc(n.id) + '">' + esc(n.title) + '</button>' +
                    '<span class="pt-notice-updated">' + esc(n.updated) + '</span></li>';
            }).join('') + '</ul>';
        } else { /* list */
            body = '<ul class="pt-notice-list">' + shown.map(function (n) {
                var M = severityMeta(n.severity);
                return '<li class="pt-notice-item ' + M.cls + '">' +
                    '<p class="pt-notice-tags"><span class="pt-sev"><i class="bi ' + M.icon + '" aria-hidden="true"></i>' + esc(M.label) + '</span>' +
                    '<span class="pt-scope">' + esc(noticeScopeText(n)) + '</span></p>' +
                    '<h3 class="pt-notice-title">' + esc(n.title) + '</h3>' +
                    '<p class="pt-notice-action">' + esc(n.userAction) + '</p>' +
                    '<p class="pt-notice-updated">最後更新：' + esc(n.updated) +
                    ' <button class="pt-link-btn" type="button" data-pt-notice="' + esc(n.id) + '">完整說明</button></p></li>';
            }).join('') + '</ul>';
        }

        if (!shown.length) {
            body = '<p class="pt-empty">目前沒有需要注意的公告（示範資料）。</p>';
        }
        return '<div class="pt-block pt-block-notices">' + head + body + '</div>';
    }

    /* 重大公告置頂橫幅：送出登入前就看得到 */
    function blockCriticalBanner() {
        var crit = activeNotices().filter(function (n) { return n.severity === 'critical'; });
        if (!crit.length) { return ''; }
        return crit.map(function (n) {
            return '<div class="pt-banner pt-banner-critical" role="region" aria-label="重大影響公告">' +
                '<p class="pt-banner-tag"><i class="bi bi-exclamation-octagon" aria-hidden="true"></i>重大影響</p>' +
                '<div class="pt-banner-body">' +
                '<h2 class="pt-banner-title">' + esc(n.title) + '</h2>' +
                '<p class="pt-banner-line">' + esc(n.impact) + '</p>' +
                '<p class="pt-banner-line"><strong>您現在可以：</strong>' + esc(n.userAction.replace('您現在可以：', '')) + '</p>' +
                '<p class="pt-banner-line">' + esc(n.workaround) + '</p>' +
                '<p class="pt-banner-meta">最後更新：' + esc(n.updated) + (n.nextUpdate ? '　·　' + esc(n.nextUpdate) : '') +
                ' <button class="pt-link-btn" type="button" data-pt-notice="' + esc(n.id) + '">完整說明</button></p>' +
                '</div></div>';
        }).join('');
    }

    /* =====================================================================
     * 區塊：支援與帳號協助
     * ==================================================================*/
    function blockHelp(variant) {
        var items = D.helpActions;
        var body;
        if (variant === 'links') {
            body = '<ul class="pt-help-links">' + items.map(function (h) {
                return '<li><a href="' + esc(h.href) + '" data-pt-help="' + h.key + '">' +
                    '<i class="bi ' + h.icon + '" aria-hidden="true"></i>' + esc(h.title) +
                    '<span class="pt-help-desc">' + esc(h.desc) + '</span></a></li>';
            }).join('') + '</ul>';
        } else if (variant === 'accordion') {
            body = '<ul class="pt-help-links pt-help-plain">' + items.map(function (h) {
                return '<li><a href="' + esc(h.href) + '" data-pt-help="' + h.key + '"><i class="bi ' + h.icon + '" aria-hidden="true"></i>' + esc(h.title) + '</a></li>';
            }).join('') + '</ul>';
        } else if (variant === 'actions') {
            body = '<div class="pt-help-actions">' + items.map(function (h) {
                return '<a class="pt-help-action" href="' + esc(h.href) + '" data-pt-help="' + h.key + '">' +
                    '<i class="bi ' + h.icon + '" aria-hidden="true"></i><span>' + esc(h.title) + '</span></a>';
            }).join('') + '</div>';
        } else { /* cards */
            body = '<ul class="pt-help-cards">' + items.map(function (h) {
                return '<li><a href="' + esc(h.href) + '" data-pt-help="' + h.key + '">' +
                    '<i class="bi ' + h.icon + '" aria-hidden="true"></i>' +
                    '<span class="pt-help-title">' + esc(h.title) + '</span>' +
                    '<span class="pt-help-desc">' + esc(h.desc) + '</span></a></li>';
            }).join('') + '</ul>';
        }
        return '<div class="pt-block pt-block-help">' +
            '<p class="pt-block-title">需要協助</p>' + body +
            '<p class="pt-note">以上入口都不需要先登入即可使用。' + esc(D.messages.noPasswordInReport) + '</p></div>';
    }

    /* =====================================================================
     * 區塊：可公開的系統清單
     * ==================================================================*/
    function blockSystems(variant) {
        var pub = D.systems.filter(function (s) { return s.public; });
        var body;
        if (variant === 'list') {
            body = '<ul class="pt-sys-list">' + pub.map(function (s) {
                return '<li><strong>' + esc(s.name) + '</strong>' + statusPill(systemStatus(s)) +
                    '<span class="pt-sys-desc">' + esc(s.desc) + '</span></li>';
            }).join('') + '</ul>';
        } else if (variant === 'table') {
            body = '<table class="pt-table"><caption class="pt-sr">可公開顯示的系統（示範資料）</caption>' +
                '<thead><tr><th scope="col">系統</th><th scope="col">服務說明</th><th scope="col">狀態</th></tr></thead><tbody>' +
                pub.map(function (s) {
                    return '<tr><th scope="row">' + esc(s.name) + '</th><td>' + esc(s.desc) + '</td><td>' + statusPill(systemStatus(s)) + '</td></tr>';
                }).join('') + '</tbody></table>';
        } else { /* cards */
            body = '<ul class="pt-sys-cards">' + pub.map(function (s) {
                return '<li><p class="pt-sys-name">' + esc(s.name) + '</p>' +
                    '<p class="pt-sys-desc">' + esc(s.desc) + '</p>' + statusPill(systemStatus(s)) + '</li>';
            }).join('') + '</ul>';
        }
        return '<div class="pt-block pt-block-systems">' +
            '<p class="pt-block-title">此入口可進入的系統</p>' + body +
            '<p class="pt-note">僅顯示可公開的系統名稱與服務說明；其餘系統於登入後依權限顯示。實際清單以權限資料為準（來源待確認）。</p></div>';
    }

    /* =====================================================================
     * 區塊：基本資訊 / 頁尾
     * ==================================================================*/
    function blockFooter() {
        var sp = D.support;
        return '<div class="pt-footer-inner">' +
            '<div class="pt-footer-col">' +
            '  <p class="pt-footer-title">維護單位</p>' +
            '  <p>' + esc(sp.unit) + '</p>' +
            '  <p>分機 ' + esc(sp.ext) + '　外線 ' + esc(sp.phone) + '</p>' +
            '  <p>' + esc(sp.email) + '</p>' +
            '</div>' +
            '<div class="pt-footer-col">' +
            '  <p class="pt-footer-title">服務時段</p>' +
            '  <p>' + esc(sp.serviceHours) + '</p>' +
            '  <p>非服務時段：' + esc(sp.afterHours) + '</p>' +
            '  <p>服務台：' + esc(sp.location) + '</p>' +
            '</div>' +
            '<div class="pt-footer-col">' +
            '  <p class="pt-footer-title">使用說明</p>' +
            '  <p><a href="' + esc(sp.privacyUrl) + '">隱私權與個資使用說明</a></p>' +
            '  <p><a href="' + esc(sp.termsUrl) + '">系統使用規範</a></p>' +
            '  <p>' + esc(D.org.sharedPcNote) + '</p>' +
            '</div>' +
            '<p class="pt-footer-demo">' + esc(D.messages.demoBanner) + '</p>' +
            '</div>';
    }

    /* =====================================================================
     * 登入流程
     * ==================================================================*/
    function clearErrors() {
        $('#ptAccountErr, #ptPasswordErr').text('').removeClass('is-on');
        $('#ptAccount, #ptPassword').removeClass('is-invalid').removeAttr('aria-invalid');
        $('#ptFormMsg').text('').removeClass('is-error is-info is-ok');
    }

    function setSubmitting(on) {
        submitting = on;
        $('#ptSubmit').prop('disabled', on).attr('aria-busy', on ? 'true' : 'false');
        $('#ptSpinner').toggleClass('is-on', on);
        $('#ptSubmitText').text(on ? '驗證中…' : '登入');
        if (on) { formMsg(D.messages.submitting, 'info'); }
    }

    function formMsg(text, kind) {
        $('#ptFormMsg').text(text)
            .removeClass('is-error is-info is-ok')
            .addClass(kind === 'error' ? 'is-error' : kind === 'ok' ? 'is-ok' : 'is-info');
    }

    function renderResult(kind) {
        var target = systemByKey(S.sys);
        var granted = D.systems.filter(function (s) { return s.demoAccess; });
        var html;

        if (kind === 'no_access') {
            html = '<div class="pt-result pt-result-warn" tabindex="-1" id="ptResultPanel">' +
                '<p class="pt-result-tag"><i class="bi bi-shield-exclamation" aria-hidden="true"></i>登入成功，但沒有使用權限</p>' +
                '<h2 class="pt-result-title">' + esc(S.entry === 'redirect' && target ? target.name : '目標系統') + '</h2>' +
                '<p>' + esc(D.messages.noAccess) + '</p>' +
                '<div class="pt-result-actions">' +
                '  <a class="pt-btn" href="#" data-pt-help="perm">申請此系統權限</a>' +
                '  <a class="pt-btn pt-btn-ghost" href="#" data-pt-help="report">回報問題</a>' +
                '  <button class="pt-btn pt-btn-ghost" type="button" data-pt-reset="1">回到登入畫面</button>' +
                '</div>' +
                '<p class="pt-note">示範畫面：實際權限判斷需由權限資料來源提供（待確認）。</p></div>';
        } else if (S.entry === 'redirect' && target) {
            html = '<div class="pt-result pt-result-ok" tabindex="-1" id="ptResultPanel">' +
                '<p class="pt-result-tag"><i class="bi bi-check-circle" aria-hidden="true"></i>登入成功（示範）</p>' +
                '<h2 class="pt-result-title">將返回 ' + esc(target.name) + '</h2>' +
                '<p>' + esc(D.messages.successRedirect) + '</p>' +
                '<div class="pt-result-actions">' +
                '  <a class="pt-btn" href="#" onclick="return false;">前往 ' + esc(target.name) + '</a>' +
                '  <button class="pt-btn pt-btn-ghost" type="button" data-pt-reset="1">回到登入畫面</button>' +
                '</div>' +
                '<p class="pt-note">示範畫面：實際導向方式（RelayState 或回傳網址白名單）待確認。</p></div>';
        } else {
            html = '<div class="pt-result pt-result-ok" tabindex="-1" id="ptResultPanel">' +
                '<p class="pt-result-tag"><i class="bi bi-check-circle" aria-hidden="true"></i>登入成功（示範）</p>' +
                '<h2 class="pt-result-title">請選擇要使用的系統</h2>' +
                '<p>' + esc(D.messages.successDirect) + '</p>' +
                '<ul class="pt-granted">' + granted.map(function (s) {
                    var k = systemStatus(s);
                    return '<li><a href="#" onclick="return false;"><span class="pt-granted-name">' + esc(s.name) + '</span>' +
                        '<span class="pt-granted-desc">' + esc(s.desc) + '</span>' + statusPill(k) + '</a></li>';
                }).join('') + '</ul>' +
                '<p class="pt-note">未列出的系統代表尚未開通權限，可透過「權限申請」提出。此清單為示範資料。</p>' +
                '<div class="pt-result-actions">' +
                '  <a class="pt-btn pt-btn-ghost" href="#" data-pt-help="perm">權限申請</a>' +
                '  <button class="pt-btn pt-btn-ghost" type="button" data-pt-reset="1">回到登入畫面</button>' +
                '</div></div>';
        }

        var $slot = CFG.slots.result ? $(CFG.slots.result) : $(CFG.slots.login);
        if (CFG.slots.result && CFG.slots.login) { $(CFG.slots.login).hide(); }
        $slot.html(html);
        var el = document.getElementById('ptResultPanel');
        if (el) { el.focus(); }
    }

    function bindForm() {
        $('#ptToggle').on('click', function () {
            var $p = $('#ptPassword'), show = $p.attr('type') === 'password';
            $p.attr('type', show ? 'text' : 'password');
            $(this).attr('aria-pressed', show ? 'true' : 'false');
            $('#ptToggleIcon').toggleClass('bi-eye', !show).toggleClass('bi-eye-slash', show);
            $('#ptToggleText').text(show ? '隱藏密碼' : '顯示密碼');
        });

        $('#ptAccount, #ptPassword').on('input', function () {
            $(this).removeClass('is-invalid').removeAttr('aria-invalid');
            $('#' + this.id.replace('pt', 'pt') + 'Err').text('').removeClass('is-on');
            if (!$('#ptFormMsg').hasClass('is-error')) { return; }
            $('#ptFormMsg').text('').removeClass('is-error');
        });

        $('#ptForm').on('submit', function (e) {
            e.preventDefault();
            if (submitting) { return; }
            clearErrors();

            var acc = $.trim($('#ptAccount').val());
            var pwd = $('#ptPassword').val();
            var bad = null;

            if (!acc) {
                $('#ptAccountErr').text(D.messages.requiredAccount).addClass('is-on');
                $('#ptAccount').addClass('is-invalid').attr('aria-invalid', 'true');
                bad = bad || '#ptAccount';
            }
            if (!pwd) {
                $('#ptPasswordErr').text(D.messages.requiredPassword).addClass('is-on');
                $('#ptPassword').addClass('is-invalid').attr('aria-invalid', 'true');
                bad = bad || '#ptPassword';
            }
            if (bad) {
                formMsg(D.messages.requiredBoth, 'error');
                $(bad).trigger('focus');
                return;
            }

            setSubmitting(true);
            window.setTimeout(function () {
                setSubmitting(false);
                if (S.result === 'bad_credentials') {
                    formMsg(D.messages.badCredentials, 'error');
                    $('#ptPassword').val('').trigger('focus');
                } else if (S.result === 'service_unavailable') {
                    formMsg(D.messages.serviceUnavailable, 'error');
                } else if (S.result === 'no_access') {
                    renderResult('no_access');
                } else {
                    renderResult('success');
                }
            }, 900);
        });
    }

    /* =====================================================================
     * 對話框：全部公告 / 單一公告 / 常見問題 / 問題回報 / 一般說明
     * ==================================================================*/
    function dialogShell() {
        return '' +
            '<div class="pt-dialog" id="ptDialog" hidden>' +
            '  <div class="pt-dialog-backdrop" data-pt-close="1"></div>' +
            '  <div class="pt-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="ptDialogTitle" tabindex="-1">' +
            '    <div class="pt-dialog-head">' +
            '      <h2 id="ptDialogTitle">標題</h2>' +
            '      <button class="pt-dialog-close" type="button" data-pt-close="1">' +
            '        <i class="bi bi-x-lg" aria-hidden="true"></i><span class="pt-sr">關閉</span></button>' +
            '    </div>' +
            '    <div class="pt-dialog-body" id="ptDialogBody"></div>' +
            '  </div>' +
            '</div>';
    }

    var lastFocus = null;
    function openDialog(title, html) {
        lastFocus = document.activeElement;
        $('#ptDialogTitle').text(title);
        $('#ptDialogBody').html(html);
        $('#ptDialog').prop('hidden', false);
        $('.pt-dialog-panel')[0].focus();
        $(document).on('keydown.ptDialog', function (e) { if (e.key === 'Escape') { closeDialog(); } });
    }
    function closeDialog() {
        $('#ptDialog').prop('hidden', true);
        $(document).off('keydown.ptDialog');
        if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    }

    function allNoticesHtml() {
        var list = activeNotices();
        return '<p class="pt-note">以下為示範公告。實際公告應含發布單位、重要程度、適用系統、發布時間、有效期限與可見範圍。</p>' +
            list.map(function (n) {
                var M = severityMeta(n.severity);
                return '<article class="pt-notice-full ' + M.cls + '">' +
                    '<p class="pt-notice-tags"><span class="pt-sev"><i class="bi ' + M.icon + '" aria-hidden="true"></i>' + esc(M.label) + '</span>' +
                    '<span class="pt-scope">' + esc(noticeScopeText(n)) + '</span></p>' +
                    '<h3>' + esc(n.title) + '</h3>' + noticeDetailHtml(n) + '</article>';
            }).join('');
    }

    function faqHtml() {
        return '<dl class="pt-faq">' + D.faqs.map(function (f) {
            return '<div><dt>' + esc(f.q) + '</dt><dd>' + esc(f.a) + '</dd></div>';
        }).join('') + '</dl>' +
            '<p class="pt-note">仍無法解決時，請於 ' + esc(D.support.serviceHours) + ' 聯絡 ' + esc(D.support.unit) +
            ' 分機 ' + esc(D.support.ext) + '；非服務時段請依 ' + esc(D.support.afterHours) + ' 處理。</p>';
    }

    function reportHtml() {
        var target = systemByKey(S.sys);
        return '<form class="pt-form pt-form-compact" onsubmit="return false;">' +
            '<p class="pt-note pt-note-strong">' + esc(D.messages.noPasswordInReport) + '</p>' +
            '<div class="pt-field"><label class="pt-label" for="rpSys">發生問題的系統</label>' +
            '<select class="pt-input" id="rpSys">' +
            D.systems.filter(function (s) { return s.public; }).map(function (s) {
                return '<option value="' + esc(s.key) + '"' + (target && target.key === s.key ? ' selected' : '') + '>' + esc(s.name) + '</option>';
            }).join('') + '<option value="portal">共用登入入口</option></select></div>' +
            '<div class="pt-field"><label class="pt-label" for="rpTime">發生時間</label>' +
            '<input class="pt-input" id="rpTime" type="text" value="' + esc(nowText()) + '" /></div>' +
            '<div class="pt-field"><label class="pt-label" for="rpCode">錯誤代碼或畫面訊息（若有）</label>' +
            '<input class="pt-input" id="rpCode" type="text" placeholder="例如：AUTH-503" /></div>' +
            '<div class="pt-field"><label class="pt-label" for="rpDesc">問題描述</label>' +
            '<textarea class="pt-input" id="rpDesc" rows="4" placeholder="請描述您的操作步驟與看到的畫面。"></textarea></div>' +
            '<div class="pt-field"><label class="pt-label" for="rpContact">回覆方式（分機或信箱）</label>' +
            '<input class="pt-input" id="rpContact" type="text" placeholder="[分機或信箱]" /></div>' +
            '<button class="pt-submit" type="button" data-pt-report-send="1">送出回報（示範）</button>' +
            '<p class="pt-note">此回報入口不需登入即可使用。實際要送往哪個系統（ITSM／表單／信箱）待確認。</p>' +
            '<p class="pt-form-msg" id="rpMsg" role="alert"></p>' +
            '</form>';
    }

    function helpTopicHtml(key) {
        var sp = D.support;
        var common = '<p class="pt-note">此為原型示範，實際流程待確認後補上。若需立即協助，請於 ' + esc(sp.serviceHours) +
            ' 聯絡 ' + esc(sp.unit) + ' 分機 ' + esc(sp.ext) + '；非服務時段請依 ' + esc(sp.afterHours) + ' 處理。</p>';
        var map = {
            forgot: '<p>「忘記密碼」會引導您重設密碼。實際驗證身分的方式（本人臨櫃、公務信箱、簡訊或主管核可）待確認，確認後會在此頁明列步驟與所需資料。</p>' +
                '<p>若您是在共用工作站操作，重設完成後請立即登出並關閉瀏覽器。</p>',
            apply: '<p>尚未有公務帳號者請依 [帳號申請流程] 提出申請，通常需要 [申請表單] 與 [單位主管核章]。</p>' +
                '<p>開通時間依實際作業而定，此處不預設固定時限。</p>',
            perm: '<p>已有帳號但看不到某個系統，代表尚未開通該系統的使用權限。請依 [權限申請流程] 提出，並註明需要的系統與用途。</p>' +
                '<p>權限由各系統的業務單位核定，入口只負責顯示您已取得的系統。</p>',
            first: '<p>第一次登入建議先確認：帳號格式、密碼原則、以及您需要使用哪些系統。</p>' +
                '<p>若使用共用工作站，請勿勾選「保持登入」，並於離開前登出。</p>',
            faq: null,
            report: null
        };
        if (key === 'faq') { return faqHtml(); }
        if (key === 'report') { return reportHtml(); }
        return (map[key] || '<p>說明待提供。</p>') + common;
    }

    function nowText() {
        var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
        return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    }

    var HELP_TITLE = {
        forgot: '忘記密碼', apply: '帳號申請', perm: '權限申請',
        first: '首次使用說明', faq: '常見問題', report: '問題回報'
    };

    /* =====================================================================
     * 展示控制列（與正式畫面明確區隔）
     * ==================================================================*/
    function demoBar() {
        function opts(list, cur) {
            return list.map(function (o) {
                return '<option value="' + esc(o.key) + '"' + (o.key === cur ? ' selected' : '') + '>' + esc(o.label) + '</option>';
            }).join('');
        }
        return '' +
            '<div class="pt-demo" role="region" aria-label="展示控制（非正式畫面）">' +
            '  <p class="pt-demo-title"><i class="bi bi-sliders" aria-hidden="true"></i>展示控制<span>非正式畫面，僅供切換情境</span></p>' +
            '  <div class="pt-demo-controls">' +
            '    <label>入口情境<select id="ptDemoEntry">' + opts(D.scenarios.entry, S.entry) + '</select></label>' +
            '    <label>目標系統<select id="ptDemoSys">' +
            D.systems.filter(function (s) { return s.public; }).map(function (s) {
                return '<option value="' + esc(s.key) + '"' + (s.key === S.sys ? ' selected' : '') + '>' + esc(s.name) + '</option>';
            }).join('') + '</select></label>' +
            '    <label>服務狀態<select id="ptDemoService">' + opts(D.scenarios.service, S.service) + '</select></label>' +
            '    <label>登入結果<select id="ptDemoResult">' + opts(D.scenarios.result, S.result) + '</select></label>' +
            '    <button class="pt-demo-btn" type="button" data-pt-reset="1">重設畫面</button>' +
            '  </div>' +
            '</div>';
    }

    function pushState() {
        var q = '?entry=' + S.entry + '&sys=' + S.sys + '&service=' + S.service + '&result=' + S.result;
        window.history.replaceState(null, '', window.location.pathname + q);
    }

    /* =====================================================================
     * 掛載
     * ==================================================================*/
    function render() {
        var V = CFG.variants || {};
        var slots = CFG.slots || {};

        if (slots.identity) { $(slots.identity).html(blockIdentity()); }
        if (slots.alerts) {
            var alerts = '';
            if (S.result === 'session_timeout') {
                alerts += '<div class="pt-banner pt-banner-timeout" role="status">' +
                    '<p class="pt-banner-tag"><i class="bi bi-clock-history" aria-hidden="true"></i>工作階段逾時</p>' +
                    '<div class="pt-banner-body"><p class="pt-banner-line">' + esc(D.messages.sessionTimeout) + '</p></div></div>';
            }
            alerts += blockCriticalBanner();
            $(slots.alerts).html(alerts);
        }
        if (slots.login) { $(slots.login).show().html(blockLogin()); }
        if (slots.result) { $(slots.result).empty(); }
        if (slots.status) { $(slots.status).html(blockStatus(V.status || 'board')); }
        if (slots.notices) { $(slots.notices).html(blockNotices(V.notices || 'list', CFG.noticeLimit || 2)); }
        if (slots.help) { $(slots.help).html(blockHelp(V.help || 'cards')); }
        if (slots.systems) { $(slots.systems).html(blockSystems(V.systems || 'cards')); }
        if (slots.footer) { $(slots.footer).html(blockFooter()); }

        bindForm();
        if (typeof CFG.afterRender === 'function') { CFG.afterRender(S); }
    }

    function mount(cfg) {
        CFG = cfg || {};
        S = {
            entry: qs('entry', 'direct'),
            sys: qs('sys', D.scenarios.defaultRedirectSystem),
            service: qs('service', 'degraded'),
            result: qs('result', 'success')
        };
        if (['direct', 'redirect'].indexOf(S.entry) < 0) { S.entry = 'direct'; }
        if (!systemByKey(S.sys)) { S.sys = D.scenarios.defaultRedirectSystem; }

        $('body').append(dialogShell());
        $('body').append(demoBar());
        $('body').addClass('pt-has-demo');

        render();

        /* 展示控制 */
        $('#ptDemoEntry').on('change', function () { S.entry = this.value; pushState(); render(); });
        $('#ptDemoSys').on('change', function () { S.sys = this.value; pushState(); render(); });
        $('#ptDemoService').on('change', function () { S.service = this.value; pushState(); render(); });
        $('#ptDemoResult').on('change', function () { S.result = this.value; pushState(); render(); });

        /* 全域事件 */
        $(document)
            .on('click', '[data-pt-reset]', function (e) { e.preventDefault(); render(); })
            .on('click', '[data-pt-close]', function (e) { e.preventDefault(); closeDialog(); })
            .on('click', '[data-pt-open="notices"]', function (e) {
                e.preventDefault(); openDialog('全部公告（示範資料）', allNoticesHtml());
            })
            .on('click', '[data-pt-notice]', function (e) {
                e.preventDefault();
                var id = $(this).data('pt-notice');
                var n = D.notices.filter(function (x) { return x.id === id; })[0];
                if (n) { openDialog(n.title, '<p class="pt-scope">' + esc(noticeScopeText(n)) + '</p>' + noticeDetailHtml(n)); }
            })
            .on('click', '[data-pt-help]', function (e) {
                e.preventDefault();
                var k = $(this).data('pt-help');
                openDialog(HELP_TITLE[k] || '說明', helpTopicHtml(k));
            })
            .on('click', '[data-pt-report-send]', function () {
                $('#rpMsg').text('示範模式：回報內容未送出。實際送出目的地待確認。').addClass('is-ok');
            })
            .on('click', '[data-pt-acc]', function () {
                var id = 'acc-' + $(this).data('pt-acc');
                var el = document.getElementById(id);
                if (!el) { return; }
                var open = !el.hidden;
                el.hidden = open;
                $(this).attr('aria-expanded', open ? 'false' : 'true');
            });

        return { state: S, render: render };
    }

    return {
        mount: mount,
        data: D,
        statusPill: statusPill,
        blocks: {
            identity: blockIdentity, login: blockLogin, status: blockStatus,
            notices: blockNotices, help: blockHelp, systems: blockSystems, footer: blockFooter
        }
    };
})(jQuery, window.PortalData);
