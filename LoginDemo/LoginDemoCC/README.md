# LoginDemoCC — 系統登入頁（Bootstrap 5 + jQuery）

振興醫院員工入口登入頁範本。單一 HTML 頁面，直接用瀏覽器開 `index.html` 即可。

## 檔案結構

```
LoginDemoCC/
├─ index.html                 # 版面（Bootstrap 5 結構）
├─ assets/
│  ├─ css/app.css             # 客製樣式（主色集中在 :root 變數）
│  ├─ js/data.js              # ★ 所有可設定資料 + API endpoint 設定
│  ├─ js/app.js               # jQuery 渲染與互動邏輯
│  └─ libs/                   # CDN 失效時的本機備援
│     ├─ bootstrap/           # bootstrap 5.3.3
│     ├─ jquery/              # jquery 3.7.1
│     └─ bootstrap-icons/     # bootstrap-icons 1.11.3（含 woff2/woff）
└─ README.md
```

相依套件預設走 jsDelivr CDN，載入失敗會自動改用 `assets/libs/` 內的本機檔案，因此離線 / 內網也能運作。

## 需求對應

| 需求 | 實作位置 |
|---|---|
| 帳號欄位 | 左側登入表單 `#account` |
| 密碼欄位 | 左側登入表單 `#password`（含顯示／隱藏切換） |
| 忘記密碼、變更密碼連結 | 表單下方連結 → `#pwdModal`；設定 `links.forgotPassword` / `links.changePassword` 後改為直接跳轉 |
| 更版資訊與內容 | 右側「更版資訊」頁籤，資料來源 `data.js → releases`（分類：新功能／修正／資安／調整） |
| 公告（全系統 vs 單一系統） | 右側「公告」頁籤，`announcements[].scope` = `GLOBAL`（全系統）／`SYSTEM`（單一系統），畫面上可切換篩選 |
| 版本資訊 | 「系統資訊」頁籤 + 左側底部 + 頁尾，來源 `data.js → version` |
| 維護者資訊與聯絡方式 | 「系統資訊」頁籤下半，來源 `data.js → maintainer`（電話、分機、手機、Email、服務時間、委外廠商） |
| 系統功能教學與說明連結 | 「教學說明」頁籤，來源 `data.js → helpItems` / `links` |
| 登入之電腦名稱 | 「本機資訊」頁籤 + 左側摘要，來源 `data.js → client.computerName`（需後端提供） |
| 作業系統 | 同上；`client.os` 留空時由前端 UserAgent 推測 |
| 最後一次登入時間與地點 | 「本機資訊」頁籤 + 左側摘要，來源 `client.lastLogin`；另顯示前次失敗登入提醒 |
| 明確看出是哪個系統 | 頂部藍色識別列（系統名稱＋系統代碼＋環境徽章）、左側大字系統名、登入按鈕帶系統簡稱、瀏覽器分頁標題、頁尾重複標示；非正式環境整條識別列改為警示斜紋 |

## 換到別的系統

只要改 `assets/js/data.js` 最上面的 `system` 區塊：

```js
name: '人事差勤管理系統',   // 系統全名
shortName: 'HRM',          // LOGO 方塊與登入按鈕
code: 'CHGH-HRM',          // 系統代碼（稽核用）
env: 'PROD',               // PROD / UAT / SIT / DEV
envLabel: '正式環境',
themeColor: '#073b66'      // 系統代表色，不同系統給不同色更好辨識
```

`env` 設為 `UAT` / `SIT` / `DEV` 時，頂部識別列會自動變成斜紋警示配色，避免在測試區誤以為是正式環境。

## 接後端

`data.js` 最下方：

```js
var api = {
    enabled: false,          // 改成 true 即改走 $.ajax
    baseUrl: '/api',
    endpoints: {
        systemInfo:    '/login/system-info',
        announcements: '/login/announcements',
        releases:      '/login/releases',
        clientInfo:    '/login/client-info',
        login:         '/auth/login'
    }
};
```

- 各 GET endpoint 回傳的 JSON 結構請對齊 `data.js` 內同名物件的欄位。
- API 失敗時會自動退回本地假資料，登入頁不會空白。
- `POST /auth/login` 送出 `{ account, password, rememberDevice, systemCode, clientComputerName }`，預期回傳 `{ success, message, redirectUrl }`。

## 注意事項

- 電腦名稱、內網 IP、登入地點瀏覽器取不到，必須由後端（AD／網域服務／DHCP／登入紀錄表與 IP 網段對照表）提供。前端只能推測作業系統、瀏覽器與螢幕解析度。
- 目前為前端展示，未做實際驗證；正式使用請務必走 HTTPS，密碼不得以明碼傳輸，並保留登入稽核紀錄。

## 四款設計概念（concepts/）

`concepts/index.html` 是比較頁，四款並排＋一眼比較表。四款共用同一份 `assets/js/data.js`，
差別只在版面與資訊優先順序；`concepts/shared.js` 放共用的資料整理與行為（密碼切換、時鐘、DEMO 登入）。

| 檔案 | 概念 | 一句話 | 適合 |
|---|---|---|---|
| `concepts/concept-a.html` | 深色控制台 Console | 三欄儀表、資訊密度最高 | 資訊人員後台 |
| `concepts/concept-b.html` | 極簡置中 Focus | 置中卡片，資訊收進 accordion | 全院一般員工 |
| `concepts/concept-c.html` | 公告牆優先 Bulletin | 全幅識別橫幅＋跑馬燈＋公告卡片牆 | 公告量大的系統 |
| `concepts/concept-d.html` | 高對比大字 Accessible | 18px 起跳、粗黑框、全部攤開 | 年長者多／需投影稽核 |

根目錄的 `index.html` 是第一版（雙欄＋頁籤），可視為第五種選項。
四款都涵蓋完整需求，選定後再把該款的樣式合併回主版即可。

## 十款風格（designs/）

`designs/index.html` 是十款的縮圖牆＋一眼比較表。十款共用 `assets/js/data.js`（資料）與
`designs/shared.js`（資料整理、密碼切換、時鐘、DEMO 登入），每個檔案只負責自己的版面與樣式。

| 檔案 | 風格 | 一句話 | 最適合 |
|---|---|---|---|
| `01-split-diagonal.html` | 斜切雙欄 | 左深色品牌斜切＋右白色表單，資訊收在 offcanvas 抽屜 | 一般員工入口 |
| `02-metro-tiles.html` | 磁磚看板 | 每類資訊一塊色磚，直角實色 | 需要快速掃視 |
| `03-terminal.html` | 終端機 | 等寬字、命令列提示符、視窗標題列固定顯示系統代碼 | 資訊機房／維運 |
| `04-glass.html` | 玻璃擬態 | 漸層背景＋毛玻璃卡片，識別膠囊列隨捲動固定 | 對外形象入口 |
| `05-newspaper.html` | 報紙排版 | 系統名就是報頭，最新公告當頭條，雙欄短訊 | 公告為重點 |
| `06-timeline.html` | 時間軸 | 公告＋更版＋登入紀錄合成一條時間線 | 更版頻繁的系統 |
| `07-wizard.html` | 步驟引導 | ①確認系統 ②看公告 ③輸入帳密，第一步強迫確認系統 | 稽核要求最嚴 |
| `08-app-shell.html` | 側欄應用 | 登入頁長得像登入後的後台，「尚未登入」紅標明示 | 與後台統一 |
| `09-brutalist.html` | 粗野主義 | 零圓角、3px 黑邊、螢光黃，辨識度最高 | 極高辨識度需求 |
| `10-compact.html` | 單屏密集 | 四欄等高面板，1080p 不用捲動 | 每天登入多次的老手 |

先前的四款概念在 `concepts/`，根目錄 `index.html` 是第一版（雙欄＋頁籤）。
