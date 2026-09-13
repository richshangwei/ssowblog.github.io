/**
 * LoginDemoAgy - Common Interactive Engine for Multi-System Shared Portal
 * 包含完整情境展示器、表單驗證、雙登入情境處理、無登入報修、以及防探測錯誤機制
 */
(function ($) {
    'use strict';

    // 全域當前展示狀態
    window.CurrentDemoState = {
        scenario: 'NORMAL',          // NORMAL | INCIDENT | AUTH_FAIL | SERVICE_DOWN | TIMEOUT
        entryMode: 'DIRECT',         // DIRECT (直接開啟入口) | TARGET_REDIRECT (由特定系統導向)
        targetSystem: 'CHGH-HRM',    // 目標系統代碼 (CHGH-HRM / CHGH-HIS / CHGH-ERP)
        userHasPermission: true      // 模擬使用者是否具備目標系統授權
    };

    $(function () {
        var data = window.LoginPortalData;
        if (!data) return;

        // 1. 密碼眼睛顯示/隱藏切換
        $(document).on('click', '.btn-toggle-pwd', function () {
            var $btn = $(this);
            var $input = $($btn.data('target') || '#password');
            var $icon = $btn.find('i');
            if ($input.attr('type') === 'password') {
                $input.attr('type', 'text');
                $icon.removeClass('bi-eye').addClass('bi-eye-slash');
                $btn.attr('aria-label', '隱藏密碼');
            } else {
                $input.attr('type', 'password');
                $icon.removeClass('bi-eye-slash').addClass('bi-eye');
                $btn.attr('aria-label', '顯示密碼');
            }
        });

        // 2. 表單提交模擬與驗證
        $(document).on('submit', 'form.portal-login-form', function (e) {
            e.preventDefault();
            var $form = $(this);
            var $acc = $form.find('#account, input[name="account"]');
            var $pwd = $form.find('#password, input[name="password"]');
            var $btn = $form.find('button[type="submit"]');
            var $feedback = $form.find('.login-feedback-area');

            var accVal = $.trim($acc.val());
            var pwdVal = $.trim($pwd.val());

            // 必填檢查
            if (!accVal) {
                $acc.addClass('is-invalid').focus();
                $feedback.html(
                    '<div class="alert alert-danger py-2 small mb-0 animate__animated animate__shakeX">' +
                    '<i class="bi bi-exclamation-circle-fill me-1"></i> 請輸入員工編號或帳號。' +
                    '</div>'
                ).show();
                return;
            } else {
                $acc.removeClass('is-invalid');
            }

            if (!pwdVal) {
                $pwd.addClass('is-invalid').focus();
                $feedback.html(
                    '<div class="alert alert-danger py-2 small mb-0 animate__animated animate__shakeX">' +
                    '<i class="bi bi-exclamation-circle-fill me-1"></i> 請輸入密碼。' +
                    '</div>'
                ).show();
                return;
            } else {
                $pwd.removeClass('is-invalid');
            }

            // 按鈕 Loading 防止重複送出
            var originalBtnHtml = $btn.html();
            $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>驗證中，請稍候...');
            $feedback.hide();

            setTimeout(function () {
                $btn.prop('disabled', false).html(originalBtnHtml);

                // 依據目前展示情境給予回饋
                if (window.CurrentDemoState.scenario === 'AUTH_FAIL') {
                    // 防帳號探測安全錯誤訊息：不可透露帳號是否存在
                    $feedback.html(
                        '<div class="alert alert-danger py-2 small mb-0">' +
                        '<div class="fw-bold"><i class="bi bi-shield-x me-1"></i> 帳號或密碼驗證未通過</div>' +
                        '<div class="text-secondary mt-1">請確認您的員工編號、密碼大小寫無誤。若連續錯誤達 5 次，系統將啟動安全鎖定。</div>' +
                        '<div class="mt-2 pt-1 border-top border-danger border-opacity-25 d-flex justify-content-between align-items-center">' +
                        '<a href="#modal-forgot" data-bs-toggle="modal" class="text-danger fw-bold text-decoration-underline">忘記密碼？</a>' +
                        '<a href="#modal-ticket" data-bs-toggle="modal" class="text-muted small">致電資訊室分機 5888</a>' +
                        '</div>' +
                        '</div>'
                    ).fadeIn();
                } else if (window.CurrentDemoState.scenario === 'SERVICE_DOWN') {
                    $feedback.html(
                        '<div class="alert alert-warning py-2 small mb-0">' +
                        '<div class="fw-bold"><i class="bi bi-wifi-off me-1"></i> 認證服務連線逾時</div>' +
                        '<div class="text-secondary mt-1">目前院內身分驗證伺服器回應逾時，資訊室工程師已在處理中。若有急診急迫作業，請依照離線應變手冊執行。</div>' +
                        '<div class="mt-2 text-end">' +
                        '<button type="button" class="btn btn-outline-dark btn-sm py-0" data-bs-toggle="modal" data-bs-target="#modal-ticket">報修通報 (代碼: ERR-AUTH-504)</button>' +
                        '</div>' +
                        '</div>'
                    ).fadeIn();
                } else {
                    // 登入成功情境
                    if (window.CurrentDemoState.entryMode === 'TARGET_REDIRECT') {
                        // 情境 B: 由特定系統導向過來
                        var targetSys = data.systems.find(function(s) { return s.code === window.CurrentDemoState.targetSystem; }) || data.systems[0];
                        if (window.CurrentDemoState.userHasPermission) {
                            $('#modalSuccessTargetName').text(targetSys.name + ' (' + targetSys.code + ')');
                            var modal = new bootstrap.Modal(document.getElementById('modal-login-redirect-success'));
                            modal.show();
                        } else {
                            $('#modalNoPermTargetName').text(targetSys.name + ' (' + targetSys.code + ')');
                            var modal = new bootstrap.Modal(document.getElementById('modal-no-permission'));
                            modal.show();
                        }
                    } else {
                        // 情境 A: 直接開啟共用入口 -> 顯示個人授權之系統選單
                        var modal = new bootstrap.Modal(document.getElementById('modal-portal-menu'));
                        modal.show();
                    }
                }
            }, 600);
        });

        // 3. 情境展示控制條切換邏輯
        $(document).on('click', '.btn-scenario-switch', function (e) {
            e.preventDefault();
            var $btn = $(this);
            var scenario = $btn.data('scenario');
            window.CurrentDemoState.scenario = scenario;

            $('.btn-scenario-switch').removeClass('active btn-light text-dark').addClass('btn-outline-light');
            $btn.addClass('active btn-light text-dark').removeClass('btn-outline-light');

            applyDemoScenario();
        });

        $(document).on('click', '.btn-entry-mode-switch', function (e) {
            e.preventDefault();
            var $btn = $(this);
            var mode = $btn.data('entry-mode');
            window.CurrentDemoState.entryMode = mode;

            $('.btn-entry-mode-switch').removeClass('active btn-warning text-dark').addClass('btn-outline-warning');
            $btn.addClass('active btn-warning text-dark').removeClass('btn-outline-warning');

            applyDemoScenario();
        });

        $(document).on('click', '.btn-perm-toggle', function (e) {
            e.preventDefault();
            var $btn = $(this);
            window.CurrentDemoState.userHasPermission = !window.CurrentDemoState.userHasPermission;
            $btn.text(window.CurrentDemoState.userHasPermission ? '權限狀態：有權限' : '權限狀態：無權限(示範)');
            $btn.toggleClass('btn-outline-success btn-outline-danger');
        });

        function applyDemoScenario() {
            var st = window.CurrentDemoState;
            var $majorAlert = $('.portal-major-incident-alert');
            var $targetBadge = $('.portal-target-sys-hint');

            // 1) 異常/維護狀態切換
            if (st.scenario === 'INCIDENT') {
                $majorAlert.slideDown();
                $('.status-badge-overall').html('<span class="badge bg-danger"><i class="bi bi-exclamation-triangle-fill me-1"></i>重大異常通報中</span>');
            } else {
                $majorAlert.slideUp();
                $('.status-badge-overall').html('<span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i>服務運作正常</span>');
            }

            // 2) 導向模式切換
            if (st.entryMode === 'TARGET_REDIRECT') {
                var sys = data.systems.find(function(s) { return s.code === st.targetSystem; }) || data.systems[0];
                $targetBadge.html(
                    '<div class="alert alert-info py-2 px-3 mb-3 small border-info d-flex align-items-center justify-content-between">' +
                    '<div><i class="bi bi-box-arrow-in-right text-primary me-2 fs-5"></i><b>登入目標系統：</b>【' + sys.name + ' (' + sys.code + ')】</div>' +
                    '<span class="badge bg-primary">驗證後自動導回</span>' +
                    '</div>'
                ).slideDown();
                $('.login-btn-action-text').text('登入並前往【' + sys.name + '】');
            } else {
                $targetBadge.slideUp();
                $('.login-btn-action-text').text('登入資訊共用服務平台');
            }
        }

        // 初始化套用情境
        applyDemoScenario();
    });
})(jQuery);
