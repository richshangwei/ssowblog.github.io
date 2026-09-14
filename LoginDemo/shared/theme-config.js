/* ============================================================================
 * theme-config.js — 節日主題設定檔
 * ----------------------------------------------------------------------------
 * 只要編輯這個檔案，就能新增／修改節日主題，不需要動 engine 或 CSS。
 *
 * 每個主題的欄位：
 *   id        主題代號（英數、連字號），也是 <html data-theme="..."> 的值
 *   name      顯示名稱（預覽切換器、節日徽章用）
 *   priority  同一天有多個主題符合時，數字大的勝出
 *   when      生效日期規則，見下方「日期規則」
 *   badge     節日徽章文字（focus 版型會顯示在登入卡上方），null = 不顯示
 *   greeting  覆寫首頁問候語 { eyebrow, title, text }，null = 沿用頁面原文
 *   tokens    覆寫的 CSS 變數（直接寫進 <html> 的 inline style）
 *   stage     背景層設定
 *       gradient     背景漸層（CSS background 值，必填，也是沒有圖片時的底）
 *       image        真實背景圖網址，例：'assets/themes/spring.jpg'
 *                    → 有填就疊在 gradient 之上；沒有就只用 gradient + motif
 *       motif        可平鋪的 SVG 紋樣字串（engine 會自動轉成 data URI）
 *       motifSize    紋樣平鋪尺寸，例 '360px'
 *       motifOpacity 紋樣透明度
 *       scrim        遮罩層（確保文字對比度，通常是半透明漸層）
 *       fullOpacity  full 版型時背景強度（建議 0.15–0.4，避免干擾閱讀）
 *       focusOpacity focus 版型時背景強度（建議 0.75–1）
 *
 * 日期規則 when：
 *   { type:'always' }                                  永遠符合（拿來當預設主題）
 *   { type:'annual', from:'12-18', to:'01-03' }        每年固定區間（可跨年）
 *   { type:'ranges', list:[['2026-02-14','2026-02-23']] }  指定年份區間（農曆節日用）
 *   { type:'never' }                                   停用（保留設定但不自動套用）
 * ==========================================================================*/

window.THEME_CONFIG = {

  /* ---------- 全域選項 ---------- */
  options: {
    timeZone: 'Asia/Taipei',
    defaultLayout: 'full',        // 'full' 完整版 ｜ 'focus' 背景為主的極簡版
    autoFocusOnFestival: false,   // true = 偵測到節日時自動切成 focus 版型
    showSwitcher: true,           // 右下角預覽切換器（正式上線請改 false）
    applyGreeting: true,          // 是否讓節日主題覆寫首頁問候語
    themeParam: 'theme',          // 預覽用網址參數：?theme=lunar-new-year
    layoutParam: 'layout',        // 預覽用網址參數：?layout=focus
    // focus 版型要收起來的區塊：點 chip 才展開
    dock: [
      { id: 'news',      label: '最新公告',  icon: 'bell',    selectors: ['.announcements'], countSelector: '#news .news-item' },
      { id: 'resources', label: '系統資源',  icon: 'book',    selectors: ['.resources', '.help-line'] },
      { id: 'device',    label: '登入環境',  icon: 'monitor', selectors: ['.device'] }
    ]
  },

  /* ---------- 主題清單 ---------- */
  themes: [

    /* === 平日（預設） ==================================================== */
    {
      id: 'default',
      name: '平日',
      priority: 0,
      when: { type: 'always' },
      badge: null,
      greeting: null,
      tokens: {
        '--ink': '#223833', '--muted': '#6d7974', '--green': '#18594f',
        '--line': '#e1e7e1', '--bg': '#f6f7f2',
        '--theme-accent': '#18594f', '--theme-accent-soft': '#eaf0ea',
        '--theme-on-stage': '#20362f', '--theme-on-stage-muted': '#516057', '--theme-stage-tone': 'light'
      },
      stage: {
        gradient: 'linear-gradient(160deg,#f7f9f3 0%,#e8efe6 55%,#dbe6dd 100%)',
        image: null,
        motif: '<g fill="none" stroke="#18594f" stroke-width="1.2" opacity=".5"><path d="M60 44v32M44 60h32"/><path d="M240 224v32M224 240h32"/><circle cx="150" cy="150" r="26"/></g>',
        motifSize: '300px',
        motifOpacity: 0.16,
        scrim: 'linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,.8))',
        fullOpacity: 0.5,
        focusOpacity: 1
      }
    },

    /* === 農曆春節 ======================================================= */
    {
      id: 'lunar-new-year',
      name: '農曆春節',
      priority: 10,
      when: { type: 'ranges', list: [
        ['2026-02-14', '2026-02-23'],   // 2026 除夕 2/16、初一 2/17
        ['2027-02-04', '2027-02-12'],   // 2027 初一 2/6
        ['2028-01-24', '2028-01-31']    // 2028 初一 1/26
      ]},
      badge: '新春平安 · 恭賀新禧',
      greeting: {
        eyebrow: 'HAPPY LUNAR NEW YEAR',
        title: '新的一年，願同仁平安順心。',
        text: '春節期間門診與系統服務時間依院內公告，值班同仁辛苦了。'
      },
      tokens: {
        '--ink': '#3c1f1c', '--muted': '#7c5a54', '--green': '#9e2b25',
        '--line': '#eddcd4', '--bg': '#fdf4ee',
        '--theme-accent': '#9e2b25', '--theme-accent-soft': '#f7e4dc',
        '--theme-on-stage': '#ffffff', '--theme-on-stage-muted': 'rgba(255,255,255,.76)', '--theme-stage-tone': 'dark'
      },
      stage: {
        gradient: 'radial-gradient(120% 90% at 78% 12%,#f6d9a8 0%,rgba(246,217,168,0) 55%),linear-gradient(165deg,#a82f27 0%,#8c2019 45%,#5f130f 100%)',
        image: null,
        motif: '<g fill="none" stroke="#f3d9a6" stroke-width="1.6" opacity=".85"><path d="M40 70c0-14 22-14 22 0s22 14 22 0"/><path d="M216 70c0-14 22-14 22 0s22 14 22 0"/><path d="M128 196c0-14 22-14 22 0s22 14 22 0"/><ellipse cx="150" cy="86" rx="26" ry="32"/><path d="M150 54v-12M150 118v14M124 86h52"/><ellipse cx="60" cy="212" rx="17" ry="21"/><path d="M60 191v-9M60 233v9"/></g>',
        motifSize: '340px',
        motifOpacity: 0.3,
        scrim: 'linear-gradient(180deg,rgba(70,14,10,.25),rgba(50,10,8,.55))',
        fullOpacity: 0.28,
        focusOpacity: 1
      }
    },

    /* === 中秋節 ========================================================= */
    {
      id: 'mid-autumn',
      name: '中秋節',
      priority: 10,
      when: { type: 'ranges', list: [
        ['2026-09-23', '2026-09-27'],   // 2026 中秋 9/25
        ['2027-09-13', '2027-09-17'],   // 2027 中秋 9/15
        ['2028-10-01', '2028-10-05']    // 2028 中秋 10/3
      ]},
      badge: '中秋佳節 · 月圓人團圓',
      greeting: {
        eyebrow: 'MID-AUTUMN FESTIVAL',
        title: '月圓時分，謝謝你守著這裡。',
        text: '連假期間的值班與門診安排，請留意院內最新公告。'
      },
      tokens: {
        '--ink': '#1f2540', '--muted': '#5f6785', '--green': '#2f3f7a',
        '--line': '#dfe2ef', '--bg': '#f3f4fa',
        '--theme-accent': '#2f3f7a', '--theme-accent-soft': '#e6e9f6',
        '--theme-on-stage': '#ffffff', '--theme-on-stage-muted': 'rgba(255,255,255,.76)', '--theme-stage-tone': 'dark'
      },
      stage: {
        gradient: 'radial-gradient(38% 30% at 76% 20%,#ffeec4 0%,#f2d999 42%,rgba(242,217,153,0) 70%),linear-gradient(170deg,#20305e 0%,#1a2547 48%,#101733 100%)',
        image: null,
        motif: '<g fill="none" stroke="#cdd8f2" stroke-width="1.4" opacity=".75"><path d="M20 120c16-12 34-12 50 0s34 12 50 0"/><path d="M170 62c16-12 34-12 50 0s34 12 50 0"/><path d="M96 236c16-12 34-12 50 0s34 12 50 0"/><circle cx="248" cy="176" r="3.5"/><circle cx="58" cy="52" r="3"/><circle cx="196" cy="150" r="2.5"/><circle cx="36" cy="196" r="2.5"/></g>',
        motifSize: '380px',
        motifOpacity: 0.35,
        scrim: 'linear-gradient(180deg,rgba(12,18,40,.2),rgba(10,15,34,.6))',
        fullOpacity: 0.26,
        focusOpacity: 1
      }
    },

    /* === 聖誕與跨年 ===================================================== */
    {
      id: 'year-end',
      name: '聖誕跨年',
      priority: 10,
      when: { type: 'annual', from: '12-18', to: '01-03' },
      badge: '歲末感謝 · 平安喜樂',
      greeting: {
        eyebrow: 'SEASON OF THANKS',
        title: '一整年的堅守，辛苦了。',
        text: '歲末年初系統維護與門診異動，請以院內公告為準。'
      },
      tokens: {
        '--ink': '#152a22', '--muted': '#5d7367', '--green': '#14532d',
        '--line': '#dde8e0', '--bg': '#f4f8f4',
        '--theme-accent': '#14532d', '--theme-accent-soft': '#e4efe6',
        '--theme-on-stage': '#ffffff', '--theme-on-stage-muted': 'rgba(255,255,255,.76)', '--theme-stage-tone': 'dark'
      },
      stage: {
        gradient: 'radial-gradient(90% 70% at 18% 8%,rgba(214,232,214,.35) 0%,rgba(214,232,214,0) 55%),linear-gradient(168deg,#123b28 0%,#0d2c1f 52%,#071a13 100%)',
        image: null,
        motif: '<g fill="none" stroke="#e3efe4" stroke-width="1.4" opacity=".8"><g transform="translate(70 70)"><path d="M0-22V22M-19-11 19 11M-19 11 19-11"/><path d="M0-22l-6 7M0-22l6 7M0 22l-6-7M0 22l6-7"/></g><g transform="translate(220 170) scale(.72)"><path d="M0-22V22M-19-11 19 11M-19 11 19-11"/></g><circle cx="232" cy="58" r="3"/><circle cx="120" cy="216" r="3"/><circle cx="44" cy="180" r="2.5"/><circle cx="168" cy="118" r="2.5"/></g>',
        motifSize: '300px',
        motifOpacity: 0.3,
        scrim: 'linear-gradient(180deg,rgba(6,22,15,.2),rgba(5,18,12,.6))',
        fullOpacity: 0.26,
        focusOpacity: 1
      }
    },

    /* === 院慶（請改成實際院慶日） ======================================= */
    {
      id: 'hospital-anniversary',
      name: '院慶',
      priority: 20,                                   // 院內專屬日優先於一般節日
      when: { type: 'annual', from: '06-01', to: '06-03' },  // TODO: 換成真正的院慶日期
      badge: '院慶紀念日',
      greeting: {
        eyebrow: 'HOSPITAL ANNIVERSARY',
        title: '因為有你，這裡才是振興。',
        text: '院慶活動資訊與同仁表揚名單，詳見院內公告。'
      },
      tokens: {
        '--ink': '#20352f', '--muted': '#6a7a72', '--green': '#12564b',
        '--line': '#e6e2d5', '--bg': '#faf7ef',
        '--theme-accent': '#12564b', '--theme-accent-soft': '#efe9d8',
        '--theme-on-stage': '#ffffff', '--theme-on-stage-muted': 'rgba(255,255,255,.76)', '--theme-stage-tone': 'dark'
      },
      stage: {
        gradient: 'radial-gradient(100% 80% at 82% 10%,#e7d7a8 0%,rgba(231,215,168,0) 58%),linear-gradient(165deg,#14655a 0%,#0f4d45 50%,#0a3a34 100%)',
        image: null,
        motif: '<g fill="none" stroke="#f0e2bb" stroke-width="1.5" opacity=".8"><g transform="translate(80 80)"><path d="M0-20 5.9-6.2 20-4.9 9.4 4.6 12.4 19 0 11.6-12.4 19l3-14.4L-20-4.9l14.1-1.3Z"/></g><g transform="translate(218 196) scale(.7)"><path d="M0-20 5.9-6.2 20-4.9 9.4 4.6 12.4 19 0 11.6-12.4 19l3-14.4L-20-4.9l14.1-1.3Z"/></g><path d="M150 40v26M137 53h26" stroke-width="2"/><circle cx="52" cy="214" r="3"/><circle cx="240" cy="76" r="3"/></g>',
        motifSize: '320px',
        motifOpacity: 0.32,
        scrim: 'linear-gradient(180deg,rgba(8,40,35,.2),rgba(6,32,28,.58))',
        fullOpacity: 0.26,
        focusOpacity: 1
      }
    },

    /* === 國際護師節 5/12 ================================================ */
    {
      id: 'nurses-day',
      name: '護師節',
      priority: 20,
      when: { type: 'annual', from: '05-11', to: '05-12' },
      badge: '5.12 國際護師節',
      greeting: {
        eyebrow: 'INTERNATIONAL NURSES DAY',
        title: '謝謝每一盞不熄的燈。',
        text: '獻給日夜守護病人的護理同仁，辛苦了。'
      },
      tokens: {
        '--ink': '#2e2530', '--muted': '#7b6a76', '--green': '#8d3f5e',
        '--line': '#eddde4', '--bg': '#fbf4f7',
        '--theme-accent': '#8d3f5e', '--theme-accent-soft': '#f6e5ec',
        '--theme-on-stage': '#ffffff', '--theme-on-stage-muted': 'rgba(255,255,255,.76)', '--theme-stage-tone': 'dark'
      },
      stage: {
        gradient: 'radial-gradient(95% 75% at 20% 12%,#f6dbe4 0%,rgba(246,219,228,0) 58%),linear-gradient(165deg,#9d4a68 0%,#7d3853 50%,#5a2740 100%)',
        image: null,
        motif: '<g fill="none" stroke="#f7e2ea" stroke-width="1.5" opacity=".82"><g transform="translate(76 84)"><path d="M-13-4c0-8 13-11 13-2 0-9 13-6 13 2 0 9-13 17-13 17S-13 5-13-4Z"/></g><g transform="translate(214 188)"><path d="M0-18v36M-18 0h36" stroke-width="2.2"/></g><path d="M150 120c-9 0-13 8-13 15 0 8 6 13 13 13s13-5 13-13c0-7-4-15-13-15Z"/><circle cx="46" cy="206" r="3"/><circle cx="252" cy="62" r="3"/></g>',
        motifSize: '320px',
        motifOpacity: 0.3,
        scrim: 'linear-gradient(180deg,rgba(60,22,38,.2),rgba(48,18,32,.58))',
        fullOpacity: 0.24,
        focusOpacity: 1
      }
    },

    /* === 醫師節 11/12 =================================================== */
    {
      id: 'doctors-day',
      name: '醫師節',
      priority: 20,
      when: { type: 'annual', from: '11-11', to: '11-12' },
      badge: '11.12 醫師節',
      greeting: {
        eyebrow: "PHYSICIANS' DAY",
        title: '向每一個艱難的決定致敬。',
        text: '謝謝醫療團隊在每個崗位上的判斷與承擔。'
      },
      tokens: {
        '--ink': '#1d2a3a', '--muted': '#5f7288', '--green': '#1e3a5f',
        '--line': '#dde4ec', '--bg': '#f3f6fa',
        '--theme-accent': '#1e3a5f', '--theme-accent-soft': '#e4ebf4',
        '--theme-on-stage': '#ffffff', '--theme-on-stage-muted': 'rgba(255,255,255,.76)', '--theme-stage-tone': 'dark'
      },
      stage: {
        gradient: 'radial-gradient(95% 75% at 80% 12%,#cfe0f0 0%,rgba(207,224,240,0) 58%),linear-gradient(168deg,#254764 0%,#1b3450 48%,#11223a 100%)',
        image: null,
        motif: '<g fill="none" stroke="#dbe7f4" stroke-width="1.5" opacity=".8"><g transform="translate(78 78)"><path d="M-16-18v10a16 16 0 0 0 32 0v-10"/><path d="M0 8v10a12 12 0 0 0 24 0v-6"/><circle cx="24" cy="8" r="6"/></g><g transform="translate(210 190) scale(.85)"><path d="M0-18v36M-18 0h36" stroke-width="2.2"/></g><path d="M30 150h26l8-14 10 28 8-14h28" /><circle cx="248" cy="60" r="3"/><circle cx="118" cy="236" r="3"/></g>',
        motifSize: '340px',
        motifOpacity: 0.28,
        scrim: 'linear-gradient(180deg,rgba(12,26,42,.2),rgba(10,22,36,.58))',
        fullOpacity: 0.24,
        focusOpacity: 1
      }
    }

  ]
};
