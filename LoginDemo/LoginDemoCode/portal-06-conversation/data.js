/* 僅包含可公開的示範資料。正式環境不得把敏感公告或個人權限送到未驗證頁面。 */
window.PortalData = {
  organization: '[組織名稱]', logo: '[Logo]', portal: '資訊服務共用入口',
  accountHint: '請使用組織配發的工作帳號；帳號格式與來源由資訊室確認。',
  support: { unit: '[資訊室／維護單位]', phone: '[資訊室分機]', offHours: '[非服務時段支援方式]', email: '[支援電子郵件]', hours: '[服務時段]', accountOffice: '[帳號管理窗口]', permissionOffice: '[系統權限審核窗口]' },
  links: { forgot: null, account: null, permission: null, manual: null, support: null },
  demo: { username: 'demo.user', password: 'Demo-only-123', referenceTime: '2030-04-15T09:10:00+08:00', permittedSystems: ['hr', 'docs'] },
  systems: [
    { id: 'hr', name: '人事差勤系統', description: '出勤與請假作業（示範）', public: true, destination: '/demo/hr' },
    { id: 'docs', name: '電子簽核系統', description: '申請與文件簽核（示範）', public: true, destination: '/demo/docs' },
    { id: 'supply', name: '採購申請系統', description: '採購需求與申請（示範）', public: true, destination: '/demo/supply' }
  ],
  serviceStates: {
    unknown: { label: '狀態未確認', severity: 'unknown', updatedAt: null, affected: [], summary: '尚未取得服務狀態資料，無法確認目前是否正常。', action: '您可使用示範登入；正式使用時若無法連線，請聯絡資訊室。', alternative: null, nextUpdate: null },
    normal: { label: '正常（示範）', severity: 'normal', updatedAt: '示範日 09:10', affected: [], summary: '展示情境：共用入口與列出的示範系統皆可操作。', action: '可繼續示範登入。這不是即時服務監測結果。', alternative: null, nextUpdate: null },
    partial: { label: '部分異常（示範）', severity: 'danger', updatedAt: '示範日 09:10', affected: ['hr'], when: '示範日 08:40 起', processing: '資訊室處理中，恢復時間尚未確認。', summary: '人事差勤系統的請假與出勤查詢暫時無法使用（示範）。', action: '共用入口、電子簽核與其他未受影響的示範系統仍可操作。', alternative: '尚未提供已確認的替代方式；急需辦理時請聯絡業務窗口確認。', nextUpdate: null },
    maintenance: { label: '維護中（示範）', severity: 'warning', updatedAt: '示範日 09:10', affected: ['docs'], when: '[預定維護開始] 至 [預定維護結束]', processing: '預定維護時段僅為替換欄位，不代表已確認的恢復時間。', summary: '電子簽核系統於維護情境中暫停文件送出（示範）。', action: '可繼續登入共用入口並使用其他未受影響的示範系統。', alternative: '請保留待辦內容，已確認的替代方式待業務單位提供。', nextUpdate: null }
  },
  announcements: [
    { id: 'demo-incident', title: '人事差勤作業暫停，資訊室處理中', summary: '請假與出勤查詢受影響；共用入口與電子簽核仍可示範操作。', publisher: '[資訊室／維護單位]', severity: '重大影響', rank: 3, systems: ['hr'], publishedAt: '2030-04-15T08:40:00+08:00', validUntil: '2030-04-16T23:59:00+08:00', visibility: 'public', scenarios: ['partial'], impact: '人事差勤系統：請假與出勤查詢使用者。', period: '示範日 08:40 起', processing: '資訊室處理中，恢復時間未確認。', action: '共用入口與其他示範系統可繼續使用。', alternative: '尚無已確認替代方式，急件請先洽業務窗口。', updatedAt: '示範日 09:10', nextUpdate: null },
    { id: 'demo-maintenance', title: '電子簽核系統維護提醒', summary: '維護情境暫停文件送出；請保留待辦內容，其他系統不受影響。', publisher: '[資訊室／維護單位]', severity: '維護通知', rank: 2, systems: ['docs'], publishedAt: '2030-04-14T09:00:00+08:00', validUntil: null, visibility: 'public', scenarios: ['maintenance'], impact: '電子簽核系統：文件送出與簽核作業。', period: '[預定維護開始] 至 [預定維護結束]', processing: '維護中（示範），未承諾恢復時間。', action: '可使用其他示範系統，並留意後續更新。', alternative: '已確認替代方式待業務單位提供。', updatedAt: '示範日 09:10', nextUpdate: null },
    { id: 'demo-entry', title: '從共用入口，前往您有權限的系統', summary: '直接登入後顯示示範可用系統；由業務系統導入時，先確認目標名稱。', publisher: '[資訊室／維護單位]', severity: '使用說明', rank: 1, systems: ['*'], publishedAt: '2030-04-14T08:00:00+08:00', validUntil: null, visibility: 'public', scenarios: ['all'], body: '直接開啟共用入口：示範登入後選擇系統。\n由特定系統導入：登入前會標明目標名稱，登入後示範返回。\n無權限時可查看申請方式。這些流程尚未連接真實驗證與權限資料。' },
    { id: 'demo-shared', title: '共用工作站使用提醒', summary: '使用結束請登出。需要協助時，可先使用免登入支援入口。', publisher: '[資訊室／維護單位]', severity: '帳號提醒', rank: 0, systems: ['*'], publishedAt: '2030-04-13T08:00:00+08:00', validUntil: null, visibility: 'public', scenarios: ['all'], body: '共用工作站不預設保持登入。此原型不提供帳號或密碼記憶。\n請勿在報修內容填入密碼、驗證碼或敏感業務資料。\n電腦名稱與個人登入紀錄待院內服務串接，未驗證時不提供個人化紀錄。' }
  ]
};

