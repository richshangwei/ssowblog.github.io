/**
 * LoginDemoAgy - Multi-System Shared Portal Data & Scenario Store
 * 具備醫院與大型組織資訊管理規格之共用入口資料模型
 */
window.LoginPortalData = (function () {
    'use strict';

    // 1. 組織識別與共用入口基本資訊
    var org = {
        name: '振興醫療財團法人振興醫院',
        shortName: '振興醫院',
        portalName: '全院資訊服務共用登入入口',
        portalSubName: 'Hospital Enterprise Unified Login Portal',
        portalDesc: '本入口為全院各業務系統之統一身分驗證窗口，登入後將依個人授權配置系統存取權限。',
        logoText: 'CHGH',
        badge: '多系統共用入口'
    };

    // 2. 登入身分與帳號規則指引（降低使用者的疑惑）
    var accountGuide = {
        title: '帳號登入指引',
        employeeTip: '全院專職同仁請使用「員工編號」（例：E10492）登入。',
        doctorTip: '主治醫師、兼任醫師及醫事人員請輸入專屬醫事代碼或院內員工編號。',
        contractorTip: '委外協力廠商、駐點人員或實習醫護，請使用經資訊室審核核發之臨時帳號（例：V-xxxxxx）。',
        passwordRule: '密碼長度須滿 12 碼，包含英文大小寫、數字與特殊符號，90 天需定期更換。'
    };

    // 3. 業務系統清單（示範共用入口登入後之系統清單與特定導向）
    var systems = [
        {
            code: 'CHGH-HRM',
            name: '人事差勤暨智慧簽核系統',
            dept: '人事室 / 資訊室',
            desc: '考勤打卡、請假排班、加班審核與代理人指派',
            status: 'OPERATIONAL',
            statusText: '服務正常',
            icon: 'bi-person-badge',
            directUrl: '#sys-hrm',
            isCore: false
        },
        {
            code: 'CHGH-HIS',
            name: '門急住臨床醫療資訊系統',
            dept: '醫療部 / 護理部 / 資訊室',
            desc: '門診醫囑、急診檢傷、住院病歷紀錄與電子處方簽核',
            status: 'OPERATIONAL',
            statusText: '服務正常',
            icon: 'bi-hospital',
            directUrl: '#sys-his',
            isCore: true
        },
        {
            code: 'CHGH-NIS',
            name: '智慧護理照護作業歷程系統',
            dept: '護理部 / 資訊室',
            desc: '給藥三讀五對、護理給藥排程、生命徵象量測與床邊照護',
            status: 'PARTIAL_OUTAGE',
            statusText: '部分功能維護',
            icon: 'bi-heart-pulse',
            directUrl: '#sys-nis',
            isCore: true
        },
        {
            code: 'CHGH-PACS',
            name: '醫療影像儲存與傳輸系統 (PACS)',
            dept: '放射科 / 影像醫學部',
            desc: 'X光、CT、MRI 等高解析度醫學影像即時調閱診斷',
            status: 'OPERATIONAL',
            statusText: '服務正常',
            icon: 'bi-file-earmark-medical',
            directUrl: '#sys-pacs',
            isCore: true
        },
        {
            code: 'CHGH-ERP',
            name: '衛材資產與醫療採購供應系統',
            dept: '資材室 / 採購室 / 工務室',
            desc: '手術衛材請領、全院物料庫存、高價耗材追溯與設備報修',
            status: 'MAINTENANCE',
            statusText: '排定維護中',
            icon: 'bi-box-seam',
            directUrl: '#sys-erp',
            isCore: false
        },
        {
            code: 'CHGH-LIS',
            name: '臨床檢驗醫學資訊系統',
            dept: '病理檢驗科 / 輸血小組',
            desc: '檢體條碼檢驗、危急值通報即時警示與檢驗報告審核',
            status: 'UNCONFIRMED',
            statusText: '狀態確認中',
            icon: 'bi-droplet-half',
            directUrl: '#sys-lis',
            isCore: true
        }
    ];

    // 4. 全域服務狀態摘要
    var serviceStatusSummary = {
        updatedAt: '2026-09-13 11:30:00',
        nextUpdateAt: '2026-09-13 12:00:00',
        overall: 'PARTIAL', // NORMAL | PARTIAL | MAINTENANCE | UNCONFIRMED
        overallText: '部分系統排定維護中',
        activeIncidentsCount: 1,
        maintenanceCount: 1,
        notice: '除 [衛材採購系統] 排定週日索引重整中，其餘核心醫療 HIS/PACS 均正常運作。'
    };

    // 5. 重大異常與維護公告（符合資訊室主任專業規範之說明文案）
    var alerts = [
        {
            id: 'INC-20260913-01',
            level: 'WARNING',
            levelText: '維護中',
            systemCode: 'CHGH-ERP',
            systemName: '衛材資產與醫療採購供應系統',
            title: '衛材採購供應系統例行維護作業',
            message: '【衛材採購系統】目前進行資料庫伺服器例行索引重整，資訊室處理中。若各單位急需請領常備醫療耗材，請依【離線手寫紙本衛材請領單】先行領用，待系統恢復後補登。最後更新：2026-09-13 11:00。預計作業至 14:00。',
            alternativeAction: '填寫急用衛材離線三聯單，由護理長核章後至藥庫/資材庫直接領料。',
            publishTime: '2026-09-13 09:00',
            lastUpdated: '2026-09-13 11:00',
            status: '處理中',
            scope: 'SPECIFIC'
        },
        {
            id: 'INC-20260912-02',
            level: 'INFO',
            levelText: '預告維護',
            systemCode: 'ALL',
            systemName: '全院系統核心網路',
            title: '9/20 (日) 02:00–06:00 全院網路核心骨幹設備更換通報',
            message: '資訊室將於 9/20 凌晨執行全院網路骨幹升級作業。期間所有院內系統將短暫離線，急診與病房各工作站請依【離線應變手冊】預備就緒。最後更新：2026-09-12 17:00。',
            alternativeAction: '啟動 HIS 離線備援工作站與病歷手寫應變機制。',
            publishTime: '2026-09-12 17:00',
            lastUpdated: '2026-09-12 17:00',
            status: '已排程',
            scope: 'GLOBAL'
        },
        {
            id: 'NOT-20260908-03',
            level: 'INFO',
            levelText: '一般通知',
            systemCode: 'CHGH-HRM',
            systemName: '人事差勤系統',
            title: '人事差勤系統 v3.8.5 上線：新增代理人多段時間授權',
            message: '主管公出或請假時，可同時設定多位代理人並分別指定授權區間，請多加利用。最後更新：2026-09-08 10:00。',
            alternativeAction: '如遇代理人清單顯示異常，請按 Ctrl+F5 強制重新整理或致電分機 5821。',
            publishTime: '2026-09-08 10:00',
            lastUpdated: '2026-09-08 10:00',
            status: '正式上線',
            scope: 'SPECIFIC'
        }
    ];

    // 6. 支援服務與資訊室聯絡資訊（無須登入即可求助）
    var support = {
        unit: '資訊室 — 使用者服務組 (IT Service Desk)',
        deskLocation: '院本部行政大樓 2F 資訊服務中心',
        dayPhone: '(02) 2826-4400 分機 5888',
        dayHours: '週一至週五 08:00–17:30',
        nightPhone: '值班工程師手機 0912-345-678（院內分機 5800）',
        nightHours: '夜間、週末與國定例假日（24小時全年無休緊急待命）',
        email: 'it-servicedesk@chgh.org.tw',
        portalVersion: 'Portal v2.6.4 (2026-Q3)'
    };

    // 7. 常見問題 FAQ（免登入即可查閱）
    var faqs = [
        {
            q: '忘記密碼或密碼連續錯誤遭鎖定怎麼辦？',
            a: '因全院資安稽核規範，密碼錯誤達 5 次系統將暫時鎖定 15 分鐘。若您忘記密碼，可點擊「忘記密碼」透過手機簡訊驗證碼 (OTP) 重置；或於上班時段持員工證致電資訊室分機 5888 由工程師身分確認後協助解鎖。'
        },
        {
            q: '新進同仁第一次使用，預設密碼是什麼？',
            a: '新進人員帳號建立完成後，系統會自動發送「啟動驗證簡訊」至您人事資料留存的手機號碼。初次登入請點擊「首次使用啟動帳號」，完成雙因素手機綁定並依規範建立自訂密碼。'
        },
        {
            q: '登入成功後，為何特定業務系統顯示「無使用權限」？',
            a: '本共用入口身分驗證成功，僅代表您具備全院同仁合法身分。各業務系統（如手術排程、藥局調劑、採購簽核）之作業權限，須由各科室主管透過【院內權限申請流程】個別核定。若有急需，請由單位主管聯繫資訊室專責工程師辦理臨時授權。'
        },
        {
            q: '在護理站或診間公用電腦登入，有哪些安全注意事項？',
            a: '公用電腦多名同仁輪班共用，登入時請切勿勾選「記住我的帳號」或瀏覽器密碼儲存功能；離座時請務必點擊【登出】或按下鍵盤「Win + L」鎖定畫面，以保障病患個資隱私與帳號稽核合規。'
        }
    ];

    // 8. 待確認整合架構說明（向使用者與評審透明揭露）
    var integrationNotes = {
        authSource: '預計介接院內 Microsoft Active Directory (AD) / LDAP 帳號目錄服務 [待環境串接確認]',
        ssoSupport: '單一登入 (SSO) SAML 2.0 / OIDC 驗證架構正評估規劃中，目前原型採前端模擬示範 [待確認]',
        mfaStatus: '雙因素驗證 (院內 OTP App / SMS) 預計於正式營運時納入特權帳號強制條件 [待確認]',
        sessionTimeout: '共用端點閒置保護政策預設為 15 分鐘無操作自動中斷工作階段 [待確認]'
    };

    
    // 9. 節日主題模組化設定庫 (可由管理後台或設定檔隨時抽換與新增節日)
    var holidayThemes = [
        {
            id: 'default',
            name: '平日標準藍調',
            greeting: '全院醫療資訊服務共用入口',
            badgeText: '標準院區主題',
            description: '標準醫療院區深藍專業質感，注重資訊架構與各系統運作狀態。'
        },
        {
            id: 'spring-festival',
            name: '新春誌慶 (農曆春節)',
            greeting: '🧧 恭賀新禧 · 萬象更新 · 祝全院同仁春節平安',
            badgeText: '新春特別版',
            description: '新春吉祥紅與璀璨暖金微光，呈現喜慶溫暖的過節氣氛。'
        },
        {
            id: 'mid-autumn',
            name: '中秋佳節 (月圓團圓)',
            greeting: '🌕 月圓人團圓 · 佳節同樂 · 感謝輪值守護同仁',
            badgeText: '中秋特別版',
            description: '午夜湛藍星空與皎潔明月金輝，為夜班及值勤同仁帶來靜謐溫馨感受。'
        },
        {
            id: 'christmas',
            name: '聖誕歲末 (年終平安)',
            greeting: '🎄 歲末平安 · 聖誕喜樂 · 迎接嶄新的一年',
            badgeText: '歲末年終版',
            description: '常青松柏綠搭配暖光與節慶絲帶，傳遞溫暖感恩氣氛。'
        },
        {
            id: 'nurse-day',
            name: '國際護師節 / 院慶紀念',
            greeting: '🩺 致敬白衣天使 · 守護生命希望 · 院慶榮耀同慶',
            badgeText: '護師節 / 院慶版',
            description: '療癒湖水綠與清爽晴空藍，向全體醫護同仁致敬。'
        }
    ];

    return {
        holidayThemes: holidayThemes,
        org: org,
        accountGuide: accountGuide,
        systems: systems,
        serviceStatusSummary: serviceStatusSummary,
        alerts: alerts,
        support: support,
        faqs: faqs,
        integrationNotes: integrationNotes
    };
})();