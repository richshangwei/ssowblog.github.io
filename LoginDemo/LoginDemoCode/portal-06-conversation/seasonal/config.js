/*
 * 節慶外觀模組設定。圖像與文案均為設計示範，不代表組織活動或服務公告。
 * 啟用日期須由維護單位確認後，依實際年度填入 schedules；農曆節日不以固定國曆日推算。
 * 背景僅作裝飾，所有登入、狀態及求助內容仍由共用入口提供。
 */
window.PortalSeasonalConfig = {
  timeZone: 'Asia/Taipei',
  defaultTheme: 'default',
  defaultLayout: 'standard',
  scheduleEnabled: false,
  schedules: [],
  themes: {
    default: {
      name: '日常外觀',
      preferredLayout: 'standard'
    },
    spring: {
      name: '新春｜示範',
      headline: '迎接新的一頁',
      message: '讓每一次登入，都有清楚的方向。',
      background: 'seasonal/assets/spring-desktop.svg',
      mobileBackground: 'seasonal/assets/spring-mobile.svg',
      backgroundPosition: 'center',
      mobileBackgroundPosition: 'center top',
      preferredLayout: 'immersive',
      palette: {
        bg: '#FAF3E6',
        surface: '#FFFCF7',
        ink: '#372B2A',
        muted: '#6D5A54',
        line: '#DFCDC1',
        accent: '#A52D35',
        onAccent: '#FFFFFF',
        soft: '#F8E6DF'
      },
      artInk: '#732E31',
      artMuted: '#795A4D'
    },
    midautumn: {
      name: '中秋｜示範',
      headline: '月光相伴\n服務同行',
      message: '資訊清楚，工作從容。',
      background: 'seasonal/assets/midautumn-desktop.svg',
      mobileBackground: 'seasonal/assets/midautumn-mobile.svg',
      backgroundPosition: 'center',
      mobileBackgroundPosition: 'center top',
      preferredLayout: 'immersive',
      palette: {
        bg: '#112A43',
        surface: '#FFFCF5',
        ink: '#1F3346',
        muted: '#506171',
        line: '#C9D1D5',
        accent: '#244F68',
        onAccent: '#FFFFFF',
        soft: '#E9EFF0'
      },
      artInk: '#FFF4D6',
      artMuted: '#E6D8B6'
    }
  }
};
