/* =============================================================================
 * portal-data.js — 多系統共用登入入口：示範資料
 * -----------------------------------------------------------------------------
 * 重要原則（對應需求第 9 點）：
 *  1. 組織名稱、聯絡方式、服務時段等未提供的資料，一律使用 [替換欄位]，不編造。
 *  2. 公告、服務狀態、系統清單皆為「示範資料」，畫面上會明確標示。
 *  3. 沒有可靠依據時，不承諾恢復時間、處理時限或可用率。
 *  4. 未取得狀態資料時顯示「狀態未確認」，不預設「全部正常」。
 * ===========================================================================*/
window.PortalData = (function () {
    'use strict';

    /* ---------------------------------------------------------------------
     * 組織與入口識別
     * ------------------------------------------------------------------ */
    var org = {
        name: '[組織名稱]',
        shortName: '[簡稱]',
        logoAlt: '[組織名稱] Logo（預留位置）',
        logoText: 'LOGO',                       // 尚未提供圖檔，以文字預留位置呈現
        portalName: '共用系統登入入口',
        portalPurpose: '以同一組帳號登入，進入您有權限的業務系統。',
        accountHint: '請使用 [組織名稱] 核發的公務帳號（例如：員工編號或網域帳號）。帳號格式待確認。',
        sharedPcNote: '此入口可能用於共用工作站，請於離開前登出並關閉瀏覽器。'
    };

    /* ---------------------------------------------------------------------
     * 支援與維護單位（全部為替換欄位）
     * ------------------------------------------------------------------ */
    var support = {
        unit: '[資訊室／維護單位]',
        ext: '[資訊室分機]',
        phone: '[外線電話]',
        email: '[服務信箱]',
        serviceHours: '[服務時段]',
        afterHours: '[非服務時段值班聯絡方式]',
        location: '[服務台位置]',
        privacyUrl: '#',
        termsUrl: '#',
        faqUrl: '#',
        reportUrl: '#',
        applyAccountUrl: '#',
        applyPermissionUrl: '#',
        firstUseUrl: '#'
    };

    /* ---------------------------------------------------------------------
     * 服務狀態的四種等級（以文字為主，顏色只是輔助）
     * ------------------------------------------------------------------ */
    var statusLevels = {
        operational: { key: 'operational', label: '服務正常', short: '正常', icon: 'bi-check-circle', tone: 'ok', desc: '目前未接獲異常通報。' },
        degraded: { key: 'degraded', label: '部分功能異常', short: '部分異常', icon: 'bi-exclamation-triangle', tone: 'warn', desc: '部分功能無法使用，其餘功能可正常操作。' },
        maintenance: { key: 'maintenance', label: '維護中', short: '維護中', icon: 'bi-tools', tone: 'info', desc: '系統正在進行維護作業，暫停服務。' },
        unknown: { key: 'unknown', label: '狀態未確認', short: '未確認', icon: 'bi-question-circle', tone: 'muted', desc: '尚未取得此系統的狀態資料，請以實際操作結果為準。' }
    };

    /* ---------------------------------------------------------------------
     * 可公開顯示的系統清單（示範資料）
     *   public   : 登入前是否可公開顯示名稱
     *   demoAccess: 示範用—模擬此帳號是否有權限
     *   status   : 依情境由 core 覆寫，這裡是預設值
     * ------------------------------------------------------------------ */
    var systems = [
        {
            key: 'hr', name: '[人事差勤系統]', code: 'SYS-HR', public: true,
            desc: '差勤申請、簽核與差勤紀錄查詢。', owner: '[人事單位]',
            status: 'operational', statusUpdated: '2026-09-13 08:00', demoAccess: true
        },
        {
            key: 'doc', name: '[公文電子表單系統]', code: 'SYS-DOC', public: true,
            desc: '線上簽核、表單申請與追蹤。', owner: '[文書單位]',
            status: 'operational', statusUpdated: '2026-09-13 08:00', demoAccess: true
        },
        {
            key: 'edu', name: '[教育訓練系統]', code: 'SYS-EDU', public: true,
            desc: '課程報名、時數查詢與線上課程。', owner: '[教學單位]',
            status: 'degraded', statusUpdated: '2026-09-13 09:20', demoAccess: true
        },
        {
            key: 'ast', name: '[財產與請購系統]', code: 'SYS-AST', public: true,
            desc: '請購申請、財產異動與盤點作業。', owner: '[總務單位]',
            status: 'maintenance', statusUpdated: '2026-09-13 07:30', demoAccess: false
        },
        {
            key: 'rpt', name: '[報表查詢平台]', code: 'SYS-RPT', public: true,
            desc: '經營與業務統計報表查詢。', owner: '[企劃單位]',
            status: 'unknown', statusUpdated: '', demoAccess: false
        },
        {
            key: 'int', name: '[內部管理系統]', code: 'SYS-INT', public: false,
            desc: '（登入前不公開顯示，僅具權限者於登入後可見。）', owner: '[待提供]',
            status: 'unknown', statusUpdated: '', demoAccess: false
        }
    ];

    /* ---------------------------------------------------------------------
     * 公告（示範資料）
     *   severity : critical（重大影響）/ important（需注意）/ normal（一般周知）
     *   scope    : all（全入口）/ system（指定系統）
     *   scenarios: 此公告在哪些展示情境下出現
     *   欄位對應需求第 4 點：影響對象、時間、處理狀態、使用者現在能做什麼、
     *                        已確認替代方式、最後更新、下次更新
     * ------------------------------------------------------------------ */
    var notices = [
        {
            id: 'N-DEMO-001',
            severity: 'critical', severityLabel: '重大影響',
            scope: 'system', systems: ['ast'],
            scenarios: ['maintenance', 'degraded'],
            title: '[財產與請購系統] 維護中，暫停服務',
            impact: '影響對象：需使用請購、財產異動與盤點功能的同仁。其他系統不受影響。',
            time: '預定維護時間：[維護起訖時間]（示範資料）',
            progress: '目前狀態：維護作業進行中。',
            userAction: '您現在可以：先於 [公文電子表單系統] 完成其他簽核作業；請購資料請先保留，維護完成後再行送出。',
            workaround: '已確認替代方式：急件請依 [紙本請購作業程序] 辦理，並於系統恢復後補登。',
            publisher: '[總務單位]／[資訊室]',
            published: '2026-09-13 07:30',
            updated: '2026-09-13 09:40',
            nextUpdate: '下次更新：[預計更新時間]',
            expires: '2026-09-20',
            visibility: 'public'
        },
        {
            id: 'N-DEMO-002',
            severity: 'important', severityLabel: '需注意',
            scope: 'system', systems: ['edu'],
            scenarios: ['degraded'],
            title: '[教育訓練系統] 部分功能異常：課程報名暫時無法送出',
            impact: '影響對象：需報名課程的同仁。時數查詢與課程瀏覽不受影響。',
            time: '通報時間：[異常通報時間]（示範資料）',
            progress: '目前狀態：[資訊室／維護單位] 與 [系統廠商] 確認中。',
            userAction: '您現在可以：先查詢時數與課程資訊；報名需求請暫緩送出，避免重複報名。',
            workaround: '已確認替代方式：急需報名者請聯絡 [教學單位] 協助登記。',
            publisher: '[教學單位]',
            published: '2026-09-13 09:20',
            updated: '2026-09-13 09:20',
            nextUpdate: '下次更新：[預計更新時間]',
            expires: '2026-09-15',
            visibility: 'public'
        },
        {
            id: 'N-DEMO-003',
            severity: 'important', severityLabel: '需注意',
            scope: 'all', systems: [],
            scenarios: ['normal', 'degraded', 'maintenance', 'unknown'],
            title: '密碼原則調整（示範公告）',
            impact: '影響對象：全體使用者。',
            time: '預定生效日：[生效日期]',
            progress: '目前狀態：規劃中，實際內容以正式公告為準。',
            userAction: '您現在可以：先確認目前密碼是否符合新原則，並於生效日前自行更換。',
            workaround: '已確認替代方式：不適用。',
            publisher: '[資訊安全單位]',
            published: '2026-09-05',
            updated: '2026-09-05',
            nextUpdate: '',
            expires: '2026-10-31',
            visibility: 'public'
        },
        {
            id: 'N-DEMO-004',
            severity: 'normal', severityLabel: '一般周知',
            scope: 'system', systems: ['hr'],
            scenarios: ['normal', 'degraded', 'maintenance', 'unknown'],
            title: '[人事差勤系統] 新增代理人設定功能（示範公告）',
            impact: '影響對象：需設定代理人的主管與同仁。',
            time: '上線日期：[上線日期]',
            progress: '目前狀態：已上線。',
            userAction: '您現在可以：登入後於 [人事差勤系統] 設定代理人。',
            workaround: '已確認替代方式：不適用。',
            publisher: '[人事單位]',
            published: '2026-09-08',
            updated: '2026-09-08',
            nextUpdate: '',
            expires: '2026-12-31',
            visibility: 'public'
        },
        {
            id: 'N-DEMO-005',
            severity: 'normal', severityLabel: '一般周知',
            scope: 'all', systems: [],
            scenarios: ['normal', 'degraded', 'maintenance', 'unknown'],
            title: '共用工作站使用提醒（示範公告）',
            impact: '影響對象：使用共用工作站或值班電腦的同仁。',
            time: '長期適用',
            progress: '目前狀態：持續宣導。',
            userAction: '您現在可以：離開前務必登出並關閉瀏覽器，避免他人以您的帳號操作。',
            workaround: '已確認替代方式：不適用。',
            publisher: '[資訊室／維護單位]',
            published: '2026-08-20',
            updated: '2026-08-20',
            nextUpdate: '',
            expires: '',
            visibility: 'public'
        },
        {
            id: 'N-DEMO-006',
            severity: 'important', severityLabel: '需注意',
            scope: 'all', systems: [],
            scenarios: ['unknown'],
            title: '服務狀態資料來源尚未介接，狀態顯示為「未確認」',
            impact: '影響對象：全體使用者。此為原型展示情境。',
            time: '—',
            progress: '目前狀態：狀態來源（監控或人工維護）待確認。',
            userAction: '您現在可以：照常嘗試登入；若操作異常，請依下方支援管道通報。',
            workaround: '已確認替代方式：不適用。',
            publisher: '[資訊室／維護單位]',
            published: '—',
            updated: '—',
            nextUpdate: '',
            expires: '',
            visibility: 'public'
        }
    ];

    /* ---------------------------------------------------------------------
     * 常見問題（登入前即可閱讀，不需登入）
     * ------------------------------------------------------------------ */
    var faqs = [
        {
            q: '我該用哪一組帳號登入？',
            a: '請使用 [組織名稱] 核發的公務帳號。實際帳號格式（員工編號或網域帳號）待確認，確認後將於此處明列。'
        },
        {
            q: '忘記密碼怎麼辦？',
            a: '請點選「忘記密碼」依指示辦理。若流程無法完成，請於 [服務時段] 聯絡 [資訊室／維護單位] 分機 [資訊室分機]。'
        },
        {
            q: '登入成功但看不到我要用的系統？',
            a: '代表該系統尚未開通您的使用權限。請點選「權限申請」提出申請，或聯絡該系統的業務單位確認。'
        },
        {
            q: '我還沒有帳號，如何申請？',
            a: '請點選「帳號申請」，依 [帳號申請流程] 辦理。新進同仁的開通時間依實際作業為準，恕無法承諾固定時限。'
        },
        {
            q: '在共用工作站登入要注意什麼？',
            a: '請勿勾選「保持登入」，離開前務必登出並關閉瀏覽器。「記住帳號」僅會記住帳號欄位，不會保留密碼。'
        },
        {
            q: '畫面顯示「狀態未確認」是什麼意思？',
            a: '表示系統尚未取得該服務的狀態資料，不代表服務正常或異常。請照常操作，若遇到問題再通報。'
        }
    ];

    /* ---------------------------------------------------------------------
     * 求助與帳號協助入口（皆不需登入即可使用）
     * ------------------------------------------------------------------ */
    var helpActions = [
        { key: 'forgot', icon: 'bi-key', title: '忘記密碼', desc: '重設密碼流程（驗證方式待確認）', href: '#' },
        { key: 'apply', icon: 'bi-person-plus', title: '帳號申請', desc: '新進或外部合作人員申請公務帳號', href: '#' },
        { key: 'perm', icon: 'bi-shield-check', title: '權限申請', desc: '已有帳號，但需要新增系統使用權限', href: '#' },
        { key: 'first', icon: 'bi-compass', title: '首次使用說明', desc: '第一次登入的設定與注意事項', href: '#' },
        { key: 'faq', icon: 'bi-question-circle', title: '常見問題', desc: '登入、權限與帳號相關問答', href: '#' },
        { key: 'report', icon: 'bi-megaphone', title: '問題回報', desc: '回報登入或系統操作問題', href: '#' }
    ];

    /* ---------------------------------------------------------------------
     * 展示情境定義（提供給展示控制列使用）
     * ------------------------------------------------------------------ */
    var scenarios = {
        entry: [
            { key: 'direct', label: '直接開啟共用入口', desc: '登入後顯示您有權限的系統清單。' },
            { key: 'redirect', label: '由特定系統導向', desc: '登入前顯示目標系統，成功後返回該系統。' }
        ],
        service: [
            { key: 'normal', label: '服務正常' },
            { key: 'degraded', label: '部分異常' },
            { key: 'maintenance', label: '維護中' },
            { key: 'unknown', label: '狀態未確認' }
        ],
        result: [
            { key: 'success', label: '登入成功（有權限）' },
            { key: 'no_access', label: '登入成功（無目標系統權限）' },
            { key: 'bad_credentials', label: '帳號或密碼驗證失敗' },
            { key: 'service_unavailable', label: '登入服務暫時無法使用' },
            { key: 'session_timeout', label: '工作階段逾時（載入時顯示）' }
        ],
        defaultRedirectSystem: 'hr'
    };

    /* ---------------------------------------------------------------------
     * 錯誤與狀態文案（集中管理，十款共用）
     *   原則：不透露帳號是否存在；每一則都附下一步可採取的行動。
     * ------------------------------------------------------------------ */
    var messages = {
        requiredAccount: '請輸入帳號。',
        requiredPassword: '請輸入密碼。',
        requiredBoth: '請輸入帳號與密碼。',
        submitting: '正在驗證，請稍候。請勿重複點選登入。',
        badCredentials: '帳號或密碼不正確，請重新輸入。若連續嘗試失敗，請改用「忘記密碼」，或於 [服務時段] 聯絡 [資訊室／維護單位] 分機 [資訊室分機]。',
        serviceUnavailable: '目前無法連線至登入服務，這通常與您的帳號無關。請稍後再試；若持續發生，請透過「問題回報」告知，或於 [服務時段] 聯絡 [資訊室／維護單位] 分機 [資訊室分機]。',
        sessionTimeout: '您先前的工作階段已逾時，為保護資料已自動登出。請重新登入以繼續作業。',
        noAccess: '登入成功，但您目前沒有此系統的使用權限。這不是帳號或密碼的問題。您可以提出「權限申請」，或聯絡該系統的業務單位確認。',
        successDirect: '登入成功（示範）。以下為依您的權限取得的系統清單。',
        successRedirect: '登入成功（示範）。將返回您原先要使用的系統。',
        demoBanner: '此頁為前端原型，僅供設計比較。登入流程、權限判斷與服務狀態皆為示範，未連接任何真實帳號或系統。',
        noPasswordInReport: '問題回報不會、也請不要填寫密碼、驗證碼或病人／客戶資料。'
    };

    /* ---------------------------------------------------------------------
     * 設計假設與待確認事項（總覽頁使用）
     * ------------------------------------------------------------------ */
    var assumptions = [
        '入口本身只負責「身分輸入」與「導向」，不承擔各系統的業務功能。',
        '尚未確認驗證架構，因此所有畫面均以「共用登入畫面」描述，未宣稱已支援 SSO。',
        '帳號格式以「公務帳號」中性描述，待確認後再改為實際格式（員工編號或網域帳號）。',
        '服務狀態假設由人工維護或監控介接其一提供；未取得資料時一律顯示「狀態未確認」。',
        '公告資料結構假設含發布單位、重要程度、適用系統、發布時間、有效期限與可見範圍。',
        '登入前僅顯示標記為可公開的系統；不可公開者於登入後依權限顯示。',
        '共用工作站為常見使用情境，因此「保持登入」預設不勾選且與「記住帳號」分開。',
        '所有字型使用系統內建字型，圖示與樣式檔皆為本機檔案，不依賴外部服務。'
    ];

    var openQuestions = [
        { topic: '帳號來源', q: '帳號主檔為何（AD／LDAP／HR 系統／自建）？異動與停用如何同步？離職與借調帳號的處理規則？' },
        { topic: '驗證方式', q: '是否採用 SSO？若是，使用哪一種協定（SAML／OIDC／CAS）？是否需要 MFA、對哪些對象啟用？' },
        { topic: '密碼政策', q: '密碼規則、到期與強制變更的處理方式？密碼重設如何驗證身分（本人臨櫃／信箱／簡訊／主管核可）？' },
        { topic: '鎖定與稽核', q: '連續失敗幾次鎖定、鎖定多久、如何解鎖？登入稽核需要保留哪些欄位、保存多久？' },
        { topic: '系統導向', q: '各系統如何帶入目標系統識別（URL 參數／RelayState）？導向白名單由誰維護？' },
        { topic: '權限資料', q: '系統使用權限存放在哪裡？入口如何取得「此人可用哪些系統」？更新頻率與快取策略？' },
        { topic: '公告來源', q: '公告由誰發布與維護？是否需要分眾（部門／職務／系統）？是否需要審核與有效期限自動下架？' },
        { topic: '服務狀態', q: '狀態由監控系統自動介接或人工維護？更新頻率為何？沒有資料時的預設值是否同意採用「狀態未確認」？' },
        { topic: '支援流程', q: '問題回報要進到哪個系統（ITSM／表單／信箱）？非服務時段的值班聯絡方式為何？' },
        { topic: '法遵與隱私', q: '登入頁需揭露哪些隱私與使用條款？是否需要無障礙規範（如 CNS 15024）符合性聲明？' },
        { topic: '內網環境', q: '使用者瀏覽器版本範圍？是否完全無法連外（影響字型、圖示與套件的部署方式）？' },
        { topic: '品牌識別', q: '組織名稱、Logo 檔案、標準色與字型規範由誰提供？入口名稱是否需要正式命名？' }
    ];

    return {
        org: org, support: support, systems: systems, statusLevels: statusLevels,
        notices: notices, faqs: faqs, helpActions: helpActions,
        scenarios: scenarios, messages: messages,
        assumptions: assumptions, openQuestions: openQuestions
    };
})();
