# 靜心單窗

把登入放在畫面中央；服務狀態直接可見，公告與完整協助按需要展開。

直接開啟 index.html。頂端「展示控制」可切換直接入口／目標系統、服務狀態、登入結果。按「填入示範資料」再送出登入。預設服務狀態為未確認。

此資料夾可獨立離線使用；vendor 包含 Bootstrap 5.3.3 / jQuery 3.7.1。父層總覽連結需要保留父層index.html。data.js 是可替換的公開示範資料；app.js 處理固定情境，不連接驗證或權限API，不傳送或儲存帳號密碼。

可用網址參數 `?target=hr`、`?target=docs`、`?target=supply` 示範來源系統，其他target退回共用入口。前兩者有示範權限，採購沒有示範權限。任意returnUrl不會導向。

## 節慶模組

頂端「節慶展示」可切換新春、中秋、日常外觀，以及原版配置／背景主視覺模式。可用 ?theme=spring&layout=immersive 直接預覽。完整資源在 seasonal/ 內；共用來源位於父層 portal-src/seasonal/，修改後重新建置。排程預設停用，請逐年提供確認日期。詳見父層 SEASONAL-GUIDE.md。
