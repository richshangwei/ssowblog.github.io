# 多系統共用登入入口｜10 款前端原型

開啟 index.html 比較十款；decision.html 包含架構、比較、前三款建議與整合問題。DECISION-GUIDE.md 提供完整設計評估。舊版保留於 prior-designs.html。

- `portal-01-service-desk/index.html` — 晴白服務台
- `portal-02-focus-window/index.html` — 靜心單窗
- `portal-03-night-command/index.html` — 夜班指揮
- `portal-04-bulletin/index.html` — 資訊公報
- `portal-05-guided/index.html` — 清楚三步
- `portal-06-conversation/index.html` — 親切接待
- `portal-07-index/index.html` — 資訊索引
- `portal-08-workstation/index.html` — 高效工作站
- `portal-09-mobile/index.html` — 隨行服務
- `portal-10-layered/index.html` — 分層服務

## 操作

頂端「展示控制」可切換直接入口／目標系統，正常／未知／部分異常／維護，以及成功／驗證失敗／網路或登入服務無法使用／工作階段逾時／無權限。先按「填入示範資料」，再示範登入。可直接使用 `?target=hr`、`?target=docs`、`?target=supply`；未識別target退回共用入口，任意返回網址不會執行導向。

預設狀態未確認。只接受demo.user與Demo-only-123，非示範輸入會清除。登入資料不送出、不寫入cookies或Web Storage。問題回報只產生可複製摘要，不送件。

## 資料與整合

每款的data.js是公開示範資料。組織、Logo、聯絡窗口為占位欄位，公告與狀態均為展示；正式前須替換。公告資料包括發布單位、等級、系統、發布與失效時間、公開範圍及各操作指引。固定示範時點用於資料有效期限。

正式驗證、SSO/AD/LDAP/MFA、權限、導向允許清單、公告與狀態來源、服務管理與個人登入紀錄均待整合。不應把前端情境切換當作實際授權控制。

## 開發

portal-src為共用原始碼。從專案根目錄執行`node LoginDemoCode/build.cjs`產生十款；現有Bootstrap5.3.3與jQuery3.7.1從LoginDemoCC本機資源複製。每款是獨立可離線HTML/CSS/JS，無遠端字型、圖片或CDN。verify.cjs驗證共用流程與十款版面；預覽圖與portal-verification.json保留驗證結果。
