# 節日主題模組（Festival Theme System）

登入頁的節日背景、配色與「背景為主」版型，全部由三個檔案組成，彼此分離：

| 檔案 | 角色 | 會不會常改 |
| --- | --- | --- |
| `shared/theme-config.js` | **設定檔**：節日清單、日期規則、色票、背景 | 每次新增節日都改這裡 |
| `shared/theme-engine.js` | **引擎**：挑主題、套色票、切版型、收合抽屜 | 幾乎不用改 |
| `shared/theme.css` | **樣式**：背景層、focus 版型、chip 與抽屜 | 幾乎不用改 |

頁面只需要這樣引入（`theme.css` 要在 `home.css` 之後，兩支 JS 要在 `home.js` 之後）：

```html
<link rel="stylesheet" href="shared/home.css">
<link rel="stylesheet" href="shared/theme.css">
<script src="shared/home.js" defer></script>
<script src="shared/theme-config.js" defer></script>
<script src="shared/theme-engine.js" defer></script>
```

---

## 兩種版型

| 版型 | `<html data-layout>` | 說明 |
| --- | --- | --- |
| 完整版 | `full` | 現在的版面。節日背景只當淡底紋，上面蓋白紗，維持長時間閱讀的對比度。 |
| 背景版 | `focus` | 背景圖滿版，畫面上只留「登入必要資訊」：品牌、問候語、帳號密碼、登入按鈕。公告、系統資源、登入環境**整塊搬進抽屜**，點下方 chip 才展開。 |

切版型時，區塊是被 **搬移** 而不是複製，所以公告篩選、Modal、密碼顯示等既有互動完全不受影響；切回 `full` 會依原本的位置放回去。

切換方式：

- 右下角的預覽切換器（正式上線把 `options.showSwitcher` 改成 `false` 就會消失）
- 網址參數：`home-preview.html?theme=mid-autumn&layout=focus`
- 程式：`ThemeEngine.setLayout('focus')`
- 想讓節日期間自動變成背景版：`options.autoFocusOnFestival: true`

---

## 新增一個節日

在 `theme-config.js` 的 `themes` 陣列加一筆就好，**不用動 engine 和 CSS**：

```js
{
  id: 'dragon-boat',                 // 代號，也是 <html data-theme> 的值
  name: '端午節',                     // 預覽切換器顯示的名稱
  priority: 10,                      // 同一天多個主題符合時，數字大的贏
  when: { type: 'ranges', list: [    // 農曆節日用實際日期，一次寫好幾年
    ['2026-06-17', '2026-06-20'],
    ['2027-06-07', '2027-06-10']
  ]},
  badge: '端午安康',                  // 登入卡上方的小徽章，不要就填 null
  greeting: {                        // 覆寫首頁問候語，不要就填 null
    eyebrow: 'DRAGON BOAT FESTIVAL',
    title: '端午安康，願同仁平安。',
    text: '連假期間的值班安排，請留意院內公告。'
  },
  tokens: {                          // 色票：直接覆寫 home.css 的 CSS 變數
    '--ink': '#26332a', '--muted': '#66766a', '--green': '#3f6b46',
    '--line': '#dfe7de', '--bg': '#f4f8f3',
    '--theme-accent': '#3f6b46', '--theme-accent-soft': '#e6efe5',
    '--theme-on-stage': '#ffffff',                       // 背景版的文字色
    '--theme-on-stage-muted': 'rgba(255,255,255,.76)',
    '--theme-stage-tone': 'dark'                         // 背景偏深就填 dark
  },
  stage: {
    gradient: 'linear-gradient(165deg,#2f5c3a 0%,#1d4028 100%)',
    image: null,                     // ← 真實背景圖放這裡
    motif: '<g fill="none" stroke="#dff0dd" stroke-width="1.5">…</g>',
    motifSize: '320px',
    motifOpacity: 0.3,
    scrim: 'linear-gradient(180deg,rgba(10,30,18,.2),rgba(8,24,14,.58))',
    fullOpacity: 0.26,               // 完整版的背景強度
    focusOpacity: 1                  // 背景版的背景強度
  }
}
```

### 日期規則 `when`

| 寫法 | 用途 |
| --- | --- |
| `{ type:'always' }` | 預設主題（平日） |
| `{ type:'annual', from:'05-11', to:'05-12' }` | 每年固定日期（護師節、醫師節、院慶） |
| `{ type:'annual', from:'12-18', to:'01-03' }` | 跨年的區間也支援 |
| `{ type:'ranges', list:[['2026-02-14','2026-02-23']] }` | 農曆節日，逐年列出 |
| `{ type:'never' }` | 先留著設定但不自動套用 |

> 農曆節日沒有辦法用固定 MM-DD 推算，所以用 `ranges` 逐年列。目前春節與中秋已填到 **2028 年**，之後請記得補。

### 色票是怎麼生效的

引擎把 `tokens` 直接寫進 `<html>` 的 inline style，因為 `home.css` 的顏色全都走 CSS 變數（`--green`、`--ink`、`--bg`…），所以**只要覆寫變數，整頁的按鈕、banner、連結、focus ring 都會跟著換色**，不需要為每個節日寫一份 CSS。

---

## 換上真實的背景圖

目前每個節日的背景都是程式生成的（CSS 漸層 + 可平鋪的 SVG 紋樣），不依賴外部檔案、離線也能跑。等實際的背景圖設計好：

1. 圖片放到 `assets/themes/`，例如 `assets/themes/mid-autumn.jpg`
2. 在該主題的 `stage.image` 填路徑：`image: 'assets/themes/mid-autumn.jpg'`
3. 保留 `gradient` 不要刪 —— 它是圖片載入前與載入失敗時的底色

圖片會疊在漸層之上、紋樣與遮罩之下。建議規格：

- 橫式 **2400×1400** 以上，主體留在中央偏右，左上角保留給問候語
- 檔案 **400KB 以內**（WebP 佳），登入頁是每天第一個畫面
- 圖本身**不要有文字**，文字都由 `greeting` 出
- 圖偏深就把 `--theme-stage-tone` 設 `dark`、文字色設淺色；偏淺則相反
- 對比度不夠時調 `scrim`（遮罩）而不是調文字顏色

---

## 調整 focus 版型要收哪些區塊

在 `options.dock` 改：

```js
dock: [
  { id:'news', label:'最新公告', icon:'bell', selectors:['.announcements'], countSelector:'#news .news-item' },
  { id:'resources', label:'系統資源', icon:'book', selectors:['.resources', '.help-line'] },
  { id:'device', label:'登入環境', icon:'monitor', selectors:['.device'] }
]
```

- `selectors`：要搬進抽屜的區塊，可以多個
- `countSelector`：chip 上的數字徽章要數什麼（選填）
- `icon`：`bell` / `book` / `monitor` / `grid`（在 `theme-engine.js` 的 `ICONS` 加新的）
- 找不到對應區塊的項目會自動略過，所以同一份設定可以套在不同頁面上

---

## 對外 API

```js
ThemeEngine.list()                  // [{id,name}, …]
ThemeEngine.current()               // {theme, layout, autoToday, date}
ThemeEngine.apply('lunar-new-year') // 手動套主題
ThemeEngine.setLayout('focus')      // 切版型
ThemeEngine.resolve('2026-09-25')   // 查那天會套到哪個主題 → 'mid-autumn'

document.addEventListener('themechange', e => console.log(e.detail));
```

---

## 上線前的檢查清單

- [ ] `options.showSwitcher` 改成 `false`（關掉右下角預覽器）
- [ ] 院慶主題 `hospital-anniversary` 的 `when` 換成**真正的院慶日期**（目前是 `06-01`～`06-03` 的暫定值）
- [ ] 確認各節日的問候語文案由院方核可
- [ ] 春節／中秋的 `ranges` 補到需要的年份
- [ ] 真實背景圖上線後，確認 `--theme-on-stage` 在圖上的對比度足夠（AA 4.5:1）
