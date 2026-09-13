/* 每款的可設定資料；正式串接時由伺服器提供同一結構。 */
window.LoginPageConfig = {
  system: { organization: '振興醫院', name: '員工入口系統', shortName: 'ESS', code: 'CHGH-ESS', environment: '展示環境', tagline: '連結院內資源，讓每一天的照護更專注。' },
  version: { number: 'v2.6.0', date: '2026.09.10', sample: true, changes: ['整合常用服務，減少查找與切換。', '公告依全系統與員工入口分類呈現。', '改善行動裝置登入與帳號識別體驗。'] },
  maintainer: { unit: '資訊室', contact: null, phone: null, email: null, hours: null },
  client: { computerName: null, os: null, lastLogin: null },
  links: { forgot: null, change: null, guide: null, manual: null },
  announcements: [
    { id: 'N01', scope: 'GLOBAL', category: '維護通知', date: '2026.09.12', title: '院內系統例行維護，請提前儲存作業', pinned: true, body: '【示範公告】\n預定於 2026/09/19 02:00–04:00 進行維護。維護時段可能暫停服務，請提前完成作業。實際時間以資訊室正式公告為準。' },
    { id: 'N02', scope: 'SYSTEM', systemCode: 'CHGH-ESS', category: '功能更新', date: '2026.09.10', title: '員工入口 v2.6.0 上線，常用服務更好找', body: '【示範公告】\n新增常用服務入口與公告分類，並改善行動裝置的登入流程。完整內容請參閱本頁更版資訊。' },
    { id: 'N03', scope: 'GLOBAL', category: '資安提醒', date: '2026.09.08', title: '共用電腦使用完畢，請記得登出', body: '【示範公告】\n請勿共用帳號密碼，離開座位時請鎖定電腦。若發現非本人登入紀錄，請透過院內通訊錄聯絡資訊室。' },
    { id: 'N04', scope: 'SYSTEM', systemCode: 'CHGH-ESS', category: '使用指南', date: '2026.09.05', title: '新進同仁快速上手：認識員工入口', body: '【示範公告】\n先確認畫面顯示的系統名稱、代碼與環境，再使用院內帳號登入。登入後可從常用服務前往各項工作功能。' }
  ]
};
