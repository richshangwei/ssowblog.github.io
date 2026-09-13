/* =============================================================================
 * data.js — 登入頁所有「可設定資料」集中在這裡
 * -----------------------------------------------------------------------------
 * 目前為前端假資料（mock）。要接後端時，把 LoginDemoConfig.api.enabled 改成 true，
 * 並填好各 endpoint；app.js 會改用 $.ajax 取得同樣結構的 JSON。
 * 後端只要回傳與下方相同的欄位結構，畫面不需要改。
 * ===========================================================================*/
window.LoginDemoConfig = (function () {
    'use strict';

    /* ---------------------------------------------------------------------
     * 1) 系統識別（稽核時最重要：讓 user 一眼看出現在開的是哪一個系統）
     * ------------------------------------------------------------------ */
    var system = {
        orgName: '振興醫院',                    // 機構名稱
        orgSubName: '員工資訊整合入口',           // 機構副標
        name: '人事差勤管理系統',                 // ★ 系統全名（大字顯示）
        shortName: 'HRM',                       // 系統簡稱（LOGO 方塊）
        code: 'CHGH-HRM',                       // ★ 系統代碼（稽核用）
        env: 'PROD',                            // PROD / UAT / SIT / DEV
        envLabel: '正式環境',                     // 環境中文名
        url: 'https://hrm.chgh.org.tw',          // 系統網址（顯示用）
        tagline: '請使用員工帳號登入，系統會依權限開啟差勤簽核與人事作業。',
        themeColor: '#073b66'                    // 系統代表色，可用於區分不同系統
    };

    /* ---------------------------------------------------------------------
     * 2) 版本資訊
     * ------------------------------------------------------------------ */
    var version = {
        current: 'v3.8.2',
        buildNo: '20260908.1143',
        releaseDate: '2026-09-08',
        framework: 'Bootstrap 5.3.3 / jQuery 3.7.1',
        serverName: 'CHGH-AP-HRM-01',
        dbVersion: 'SQL Server 2022 (Schema 3.8)'
    };

    /* ---------------------------------------------------------------------
     * 3) 維護者資訊與聯絡方式
     * ------------------------------------------------------------------ */
    var maintainer = {
        unit: '資訊室 — 行政應用組',
        owner: '王維修',
        title: '系統管理師',
        phone: '(02) 2826-4400',
        ext: '5821',
        mobile: '0912-345-678',
        email: 'hrm-support@chgh.org.tw',
        serviceHours: '週一至週五 08:00–17:30（例假日與夜間請改撥值班分機 5800）',
        vendor: '委外廠商：昶昕資訊股份有限公司 / 服務窗口 02-2345-6789'
    };

    /* ---------------------------------------------------------------------
     * 4) 系統功能教學與說明連結
     * ------------------------------------------------------------------ */
    var links = {
        forgotPassword: '#',        // 忘記密碼流程頁
        changePassword: '#',        // 變更密碼頁
        manual: '#',                // 操作手冊
        quickStart: '#',            // 新人快速上手
        videos: '#',                // 教學影片
        faq: '#',                   // 常見問題
        itsm: '#',                  // IT 服務台 / 報修
        security: '#'               // 資安宣導
    };

    var helpItems = [
        { icon: 'bi-book', title: '系統操作手冊', desc: '完整功能說明與畫面導覽（PDF）', href: links.manual },
        { icon: 'bi-play-btn', title: '教學影片', desc: '差勤申請、簽核、報表匯出實作示範', href: links.videos },
        { icon: 'bi-rocket-takeoff', title: '新人快速上手', desc: '首次登入、雙因素驗證與密碼規則', href: links.quickStart },
        { icon: 'bi-question-circle', title: '常見問題 FAQ', desc: '帳號鎖定、忘記密碼、權限申請', href: links.faq },
        { icon: 'bi-headset', title: 'IT 服務台', desc: '線上報修、帳號解鎖與權限申請', href: links.itsm },
        { icon: 'bi-shield-check', title: '資安宣導', desc: '釣魚信辨識、密碼規範與遠端連線規則', href: links.security }
    ];

    /* ---------------------------------------------------------------------
     * 5) 公告
     *    scope: 'GLOBAL' = 全系統公告（所有系統共用）
     *           'SYSTEM' = 單一系統公告（只跟本系統有關）
     *    level: 'danger' | 'warning' | 'info' | 'success'
     * ------------------------------------------------------------------ */
    var announcements = [
        {
            id: 'A-2026-0912',
            scope: 'GLOBAL',
            scopeName: '全院系統',
            level: 'danger',
            levelName: '重要',
            title: '9/20 (日) 02:00–06:00 全院網路核心設備更換',
            content: '期間所有院內資訊系統（含 HIS、差勤、電子表單）將無法連線，請避免安排夜間作業。異地備援系統同步暫停。',
            publisher: '資訊室 — 網路組',
            date: '2026-09-12',
            pinned: true
        },
        {
            id: 'A-2026-0910',
            scope: 'SYSTEM',
            scopeName: '人事差勤系統',
            level: 'warning',
            levelName: '維護',
            title: '9/15 (一) 22:00–24:00 差勤系統例行維護',
            content: '維護期間暫停簽核、補卡與加班申請，請提前完成待辦事項。維護完成後將自動恢復服務。',
            publisher: '資訊室 — 行政應用組',
            date: '2026-09-10',
            pinned: false
        },
        {
            id: 'A-2026-0908',
            scope: 'SYSTEM',
            scopeName: '人事差勤系統',
            level: 'info',
            levelName: '新功能',
            title: 'v3.8.2 上線：支援代理人多段授權',
            content: '主管出差可設定多位代理人並指定生效期間，簽核紀錄會完整保留原簽核人與代理人。',
            publisher: '資訊室 — 行政應用組',
            date: '2026-09-08',
            pinned: false
        },
        {
            id: 'A-2026-0901',
            scope: 'GLOBAL',
            scopeName: '全院系統',
            level: 'warning',
            levelName: '資安',
            title: '密碼政策調整：10/01 起最短長度改為 12 碼',
            content: '新政策要求英文大小寫、數字與符號至少三類，且 90 天需更換一次。請於期限前自行變更密碼，逾期將於登入時強制更換。',
            publisher: '資安室',
            date: '2026-09-01',
            pinned: false
        },
        {
            id: 'A-2026-0826',
            scope: 'SYSTEM',
            scopeName: '人事差勤系統',
            level: 'success',
            levelName: '公告',
            title: '114 年度特休結轉作業已完成',
            content: '未休完之特休時數已依規定結轉至新年度，請至「我的差勤 → 假別餘額」確認。如有疑義請洽人事室。',
            publisher: '人事室',
            date: '2026-08-26',
            pinned: false
        }
    ];

    /* ---------------------------------------------------------------------
     * 6) 更版資訊（Release Notes）
     *    type: 'feature' | 'fix' | 'security' | 'change'
     * ------------------------------------------------------------------ */
    var releases = [
        {
            version: 'v3.8.2',
            date: '2026-09-08',
            current: true,
            summary: '代理人授權強化與簽核效能調整',
            items: [
                { type: 'feature', text: '新增代理人多段授權，可指定多位代理人與各自生效期間。' },
                { type: 'feature', text: '簽核清單新增「待我簽核／我已簽核／我送出的」快速切換。' },
                { type: 'change', text: '加班申請單改為自動帶入前一次部門與專案代號。' },
                { type: 'fix', text: '修正補卡單在跨月時起訖日期顯示錯誤的問題。' },
                { type: 'security', text: '登入失敗 5 次鎖定 15 分鐘，並寫入稽核紀錄。' }
            ]
        },
        {
            version: 'v3.8.0',
            date: '2026-07-21',
            current: false,
            summary: '差勤報表改版與行動裝置支援',
            items: [
                { type: 'feature', text: '新版差勤月報表支援 Excel／PDF 匯出與自訂欄位。' },
                { type: 'feature', text: '手機版簽核介面上線，支援指紋／臉部解鎖快速登入。' },
                { type: 'change', text: '登入頁改版，統一顯示系統代碼與環境標示。' },
                { type: 'fix', text: '修正夜班跨日出勤時數計算誤差。' }
            ]
        },
        {
            version: 'v3.7.4',
            date: '2026-05-06',
            current: false,
            summary: '穩定性修正',
            items: [
                { type: 'fix', text: '修正大量匯入員工資料時逾時的問題。' },
                { type: 'security', text: '升級相依套件，修補已知弱點（CVE-2026-1183）。' }
            ]
        }
    ];

    /* ---------------------------------------------------------------------
     * 7) 登入端電腦資訊
     *    瀏覽器只能取得 UA 相關資訊；電腦名稱／IP／最後登入地點
     *    需由後端（AD／網域服務／登入紀錄表）提供。
     *    ↓ 下面是後端應回傳的欄位範例。
     * ------------------------------------------------------------------ */
    var client = {
        computerName: 'CHGH-NB-0912',        // ← 後端由 AD / DHCP / Agent 取得
        domain: 'CHGH',                       // 網域
        ip: '10.21.34.118',                   // 內網 IP（後端 RemoteAddr）
        assetNo: 'IT-2024-00871',             // 財產編號（選填）
        os: '',                               // 留空 → 由前端 UA 推測
        browser: '',                          // 留空 → 由前端 UA 推測
        screen: '',                           // 由前端填入
        lastLogin: {
            time: '2026-09-12 17:42:05',
            location: '院本部 B 棟 3F 人事室',   // 由電腦資產／IP 網段對照表推得
            ip: '10.21.34.118',
            computerName: 'CHGH-NB-0912',
            os: 'Windows 11 Pro 23H2',
            browser: 'Microsoft Edge 128',
            result: 'success'                  // success | fail
        },
        lastFailedLogin: {
            time: '2026-09-11 08:13:27',
            location: '門診大樓 1F 服務台',
            ip: '10.21.40.77',
            computerName: 'CHGH-PC-1140',
            reason: '密碼錯誤'
        }
    };

    /* ---------------------------------------------------------------------
     * 8) API 介接設定
     *    enabled = false → 使用上面的假資料
     *    enabled = true  → app.js 用 $.ajax 向下列 endpoint 取資料
     * ------------------------------------------------------------------ */
    var api = {
        enabled: false,
        baseUrl: '/api',
        timeout: 8000,
        endpoints: {
            systemInfo: '/login/system-info',      // GET  → { system, version, maintainer }
            announcements: '/login/announcements', // GET  → [ announcement... ]
            releases: '/login/releases',           // GET  → [ release... ]
            clientInfo: '/login/client-info',      // GET  → client（電腦名稱／IP／最後登入）
            login: '/auth/login'                   // POST → { success, message, redirectUrl }
        }
    };

    return {
        system: system,
        version: version,
        maintainer: maintainer,
        links: links,
        helpItems: helpItems,
        announcements: announcements,
        releases: releases,
        client: client,
        api: api
    };
})();
