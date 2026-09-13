資產資料夾說明
====================

1) 公司 Logo
   - 將正式 Logo 圖檔命名為  logo.png  放在本資料夾，即會自動套用到 5 款登入畫面。
   - 也可改用 .svg：請同步修改 shared/login-core.js 內 LOGO_CONFIG.src 的副檔名。
   - 找不到圖檔時，系統會自動使用內建的 SVG 醫療十字標記（fallback），畫面不會破版。
   - 建議尺寸：寬高比約 1:1 或橫式，背景透明 PNG（深淺面板皆可用）。
   - 本資料夾已附 logo.svg 作為示意，可直接改名 logo.png 或自行替換。

2) 節日背景圖（選填）
   - 將節日背景圖放在  festivals/  子資料夾，例如：
       festivals/dragonboat.jpg  （端午）
       festivals/lunar.jpg       （春節）
       festivals/midautumn.jpg   （中秋）
       festivals/christmas.jpg   （聖誕）
   - 接著在 shared/login-core.js 的 FESTIVALS 設定中，將對應節日的 image 欄位
     填入路徑（例：image: "../assets/festivals/dragonboat.jpg"）。
   - 未提供圖片時，使用各款式內建的 CSS 漸層 + SVG 裝飾呈現節慶氛圍，仍可正常運作。

3) 節日期間與手動預覽
   - 每個節日以「期間」設定（range），落在期間內即自動套用該節慶設計。
   - 手動預覽：在網址後加上 ?theme=dragonboat（或 lunar / midautumn / christmas / newyear）。
