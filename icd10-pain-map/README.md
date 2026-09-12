# ICD-10 疼痛部位標示（icd10-pain-map）

輸入或選擇 **2023 ICD-10-CM** 診斷碼，在人體圖上標示該診斷可能對應的疼痛部位。
獨立於第一版（根目錄）、第二版（`body-map-v2/`）與疼痛註記（`pain-tracker/`），不更動既有檔案。

開啟方式：直接打開 `index.html`，或在此資料夾執行 `python -m http.server 8778` 後開 <http://localhost:8778/>。

## 功能

| 功能 | 說明 |
|---|---|
| 診斷碼查詢 | 輸入 ICD-10 代碼或中文名稱，即時篩選疼痛相關子集 |
| 部位標示 | 選取診斷碼後，人體圖以**橘色高亮**顯示可能的疼痛部位 |
| 反向推測 | 直接**點人體圖上的部位**（可多選），列出涵蓋這些部位的 ICD-10 診斷 |
| 正面／背面 | 切換視圖查看不同角度的部位標示 |
| 部位名稱 | 可開關顯示標示部位的 SVG 文字標籤 |
| 診斷資訊 | 右欄列出該診斷對應的所有部位，點一下可聚焦該部位 |
| 匯出 | JSON（完整資料）與 CSV（含 BOM，Excel 可直接開） |

## 資料

`icd10.js` 定義 `window.ICD10_PAIN_MASTER`，每筆格式：

```json
{
  "code": "M54.4",
  "name": "腰痛伴坐骨神經痛",
  "regions": ["BACK_LOWER", "LEFT_BUTTOCK", "RIGHT_BUTTOCK", "LEFT_THIGH", "RIGHT_THIGH"]
}
```

- `code`：2023 ICD-10-CM 診斷碼。
- `name`：中文描述。
- `regions`：對應到 `01_人體區域編碼表.md` 的細區（L3）或中區（L2）`region_id`。
- 選到哪個 ICD-10 代碼，就在人體圖上標示 `regions` 列出的部位。

**反向推測（多選）**：點人體圖上的部位時，`app.js` 會建立「部位 → 診斷」反向索引。可**多選**多個部位（再點一次取消），推測時會找出涵蓋最多選取部位的診斷碼，依「涵蓋數」由多到少排序，並顯示每個診斷涵蓋的選取部位數（如「涵蓋 2/2 部位」）。若細區沒有直接對應，會往上找父區。

目前收錄 **疼痛相關子集**（頭痛、頸肩、上肢、下肢、神經病變、胸痛、腹痛、泌尿生殖、骨骼關節等），約 150 筆常見疼痛診斷。可依相同格式持續擴充。

## 檔案

```
icd10-pain-map/
  index.html            主頁（內嵌 178 個熱區 path，由 build.py 產生）
  app.js                互動邏輯：查詢、選取、標示、匯出
  styles.css            樣式
  icd10.js              ICD-10 疼痛子集主檔（code / name / regions）
  regions.js            126 區部位主檔（複製自 pain-tracker）
  assets/               正面／背面底圖（複製自 pain-tracker）
  template.html         版面模板，含 <!--FRONT_PATHS--> / <!--BACK_PATHS--> 佔位
  front-paths.svg       正面熱區 path（抽自 pain-tracker/build）
  back-paths.svg        背面熱區 path
  build.py              重新產生 index.html
```

改版面或熱區後重新產生：

```bash
python build.py
```

## 慣例與已知取捨

- 左右採**病人視角**：正面圖的 `LEFT_*` 在畫面右側，背面圖的 `LEFT_*` 在畫面左側。
- 熱區依面積由大到小排序，小區在上層；因此點在重疊處會選到較細的區。
- 底圖沿用第二版的解剖圖，器官可見但不可點選；本頁只處理體表部位的疼痛標示。
- 這是**教育與參考工具**，不做任何醫療判斷或診斷建議。
