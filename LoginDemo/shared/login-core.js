/**
 * 登入畫面共用核心邏輯（14 款設計共用）
 * 功能：
 *   1. 依日期 / 節日抽換「背景」與「整體節慶設計風格」（端午、春節、中秋、聖誕…）
 *   2. 可置換的公司 Logo（有圖檔用圖片，否則 fallback 內建 SVG 標記）
 *   3. 節慶橫幅文案、公告載入、日期問候、密碼切換、表單驗證
 *
 * === 如何置換公司 Logo ===
 *   將 Logo 圖檔放到  assets/logo.png  即可自動套用；
 *   或修改下方 LOGO_CONFIG.src 指向實際路徑（留空則使用內建 SVG）。
 *
 * === 如何放節日背景「圖片」 ===
 *   將圖檔放到 assets/festivals/ 下，檔名同節日 key（例如 dragonboat.jpg、midautumn.jpg），
 *   系統會自動帶入該路徑當背景；也可在對應節日的 image 欄位直接填完整路徑覆寫。
 *   圖檔不存在時，自動 fallback 回各 style 內建的 CSS 漸層 + SVG 裝飾。
 *
 * === 如何放平日（星期）背景「圖片」 ===
 *   將圖檔放到 assets/weekdays/ 下，檔名同星期 key（sun/mon/tue/wed/thu/fri/sat，例如 mon.jpg），
 *   系統會在無節日的平日自動帶入；同樣可在 WEEKDAY_THEMES 的 image 欄位填完整路徑覆寫。
 *   圖檔不存在時，自動 fallback 回 CSS 主題。
 *
 * === 手動預覽某節日 ===
 *   於網址加上 ?theme=dragonboat（或 lunar / midautumn / christmas / newyear）即可預覽。
 *
 * 各款 HTML 只需提供對應 id 的容器即可（缺少的會自動略過）：
 *   #bgLayer #brandLogo #festivalBanner #announcementList
 *   #todayLabel #greeting #year #loginForm #togglePassword #formMessage
 */
(function (global) {
    "use strict";

    /* ---------- 公司 Logo 設定 ---------- */
    var LOGO_CONFIG = {
        src: "../assets/logo.png",   // 公司 Logo 圖檔路徑（找不到時自動 fallback SVG）
        alt: "振興醫院 Logo"
    };

    /* ---------- 背景圖資料夾（程式自動帶路徑）---------- */
    /**
     * 節日背景圖預設放於 assets/festivals/<key>.jpg
     * 平日背景圖預設放於 assets/weekdays/<key>.jpg
     * 找不到圖檔時自動 fallback 回各 style 內建的 CSS 漸層 + SVG 裝飾。
     * 若要改副檔名或路徑，調整下方常數或在各設定的 image 欄位直接填入完整路徑即可。
     */
    var FESTIVAL_IMAGE_DIR = "../assets/festivals/";
    var WEEKDAY_IMAGE_DIR = "../assets/weekdays/";
    var BG_IMAGE_EXT = ".jpg";

    /**
     * 星期主題（0=週日，平日無節日時套用）。
     * key  ：會以 class "theme-<key>" 套在 #bgLayer 上（沿用各 style 既有 CSS）。
     * image：背景圖片路徑（選填）。留空時自動帶 WEEKDAY_IMAGE_DIR + key + BG_IMAGE_EXT；
     *        該路徑圖檔不存在時，再 fallback 回 CSS 主題。
     */
    var WEEKDAY_THEMES = [
        { key: "sun", image: "" },
        { key: "mon", image: "" },
        { key: "tue", image: "" },
        { key: "wed", image: "" },
        { key: "thu", image: "" },
        { key: "fri", image: "" },
        { key: "sat", image: "" }
    ];

    /**
     * 節日設計包。
     * key 為主題代碼，會以 class "theme-<key>" 套在 #bgLayer 上，
     * 各 style.html 已針對這些 class 定義對應的背景與裝飾。
     *
     * range：節日「期間」（國曆 月-日），起訖之間都套用該節慶設計（含節慶氛圍前後幾天）。
     *        農曆節日的國曆日期每年不同，請逐年維護或改由後端計算後傳入。
     * image：背景圖片路徑（選填）。留空時自動帶 FESTIVAL_IMAGE_DIR + key + BG_IMAGE_EXT；
     *        該路徑圖檔不存在時，再 fallback 回各 style 內建的 CSS 背景。
     * label / wish：節慶橫幅顯示文案。
     * icon ：節慶代表圖示（emoji，作為橫幅前綴與裝飾用）。
     */
    var FESTIVALS = {
        newyear:    { key: "newyear",    range: ["12-31", "1-2"],   image: "", icon: "🎉", label: "元旦快樂",   wish: "辭舊迎新，祝您新年新氣象" },
        lunar:      { key: "lunar",      range: ["2-14", "2-22"],   image: "", icon: "🧧", label: "新春賀喜",   wish: "恭賀新禧，福壽安康" },
        dragonboat: { key: "dragonboat", range: ["6-16", "6-22"],   image: "", icon: "🐲", label: "端午安康",   wish: "粽葉飄香，祝您端午佳節安康" },
        midautumn:  { key: "midautumn",  range: ["9-22", "9-28"],   image: "", icon: "🌕", label: "中秋團圓",   wish: "花好月圓，闔家團聚" },
        christmas:  { key: "christmas",  range: ["12-20", "12-26"], image: "", icon: "🎄", label: "聖誕佳節",   wish: "佳節愉快，溫暖同行" },
        anniversary:{ key: "anniversary",range: ["6-9", "6-9"],     image: "", icon: "🏥", label: "院慶誌喜",   wish: "攜手同行，守護健康" }
    };

    /* ---------- 公告（實務上可改為 fetch 後端 API）---------- */
    var ANNOUNCEMENTS = [
        { tag: "urgent", text: "HIS 醫療資訊系統將於本週六 02:00-04:00 進行例行維護，期間暫停服務。" },
        { tag: "event",  text: "員工年度健康檢查報名開跑，請於本月底前至人資系統完成登記。" },
        { tag: "",       text: "門診排班系統已更新，請使用最新版瀏覽器以獲得最佳操作體驗。" },
        { tag: "",       text: "新版員工福利整合平台正式上線，歡迎同仁踴躍使用。" },
        { tag: "event",  text: "院內教育訓練課程開放選課，名額有限，額滿為止。" }
    ];

    var TAG_LABEL = { urgent: "緊急", event: "活動" };

    /* ---------- 工具函式 ---------- */
    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function setText(id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function escapeHtml(str) {
        var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        return String(str).replace(/[&<>"']/g, function (m) { return map[m]; });
    }

    // 取得網址查詢參數（供手動預覽 ?theme=dragonboat）
    function getQueryParam(name) {
        var m = new RegExp("[?&]" + name + "=([^&]+)").exec(global.location.search);
        return m ? decodeURIComponent(m[1]) : null;
    }

    /**
     * 判斷某日期是否落在節日期間（支援跨年，例如 12-31 ~ 1-2）。
     */
    function inRange(date, range) {
        var month = date.getMonth() + 1, day = date.getDate();
        var cur = month * 100 + day;
        function toNum(s) { var p = s.split("-"); return parseInt(p[0], 10) * 100 + parseInt(p[1], 10); }
        var start = toNum(range[0]), end = toNum(range[1]);
        if (start <= end) {
            return cur >= start && cur <= end;
        }
        // 跨年區間
        return cur >= start || cur <= end;
    }

    /**
     * 解析今日該套用的節日設計包；無節日則回傳 null（改用星期主題）。
     */
    function resolveFestival(date) {
        var forced = getQueryParam("theme");
        if (forced && FESTIVALS[forced]) return FESTIVALS[forced];
        for (var k in FESTIVALS) {
            if (FESTIVALS.hasOwnProperty(k) && inRange(date, FESTIVALS[k].range)) {
                return FESTIVALS[k];
            }
        }
        return null;
    }

    /**
     * 解析背景圖路徑：優先用設定中明確填寫的 image；
     * 留空時自動以「資料夾 + key + 副檔名」組出預設路徑。
     */
    function resolveBgImage(theme, dir) {
        if (!theme) return "";
        if (theme.image) return theme.image;
        return dir + theme.key + BG_IMAGE_EXT;
    }

    /**
     * 嘗試套用背景圖片；圖檔載入失敗時自動清除，fallback 回 CSS 主題。
     */
    function setBackgroundImage(bg, src) {
        if (!bg) return;
        if (!src) {
            bg.style.backgroundImage = "";
            bg.classList.remove("has-bg-image");
            return;
        }
        var probe = new Image();
        probe.onload = function () {
            bg.style.backgroundImage = "url('" + src + "')";
            bg.classList.add("has-bg-image");
        };
        probe.onerror = function () {
            // 找不到背景圖 → 清除並 fallback 回 CSS 漸層 / SVG 裝飾
            bg.style.backgroundImage = "";
            bg.classList.remove("has-bg-image");
        };
        probe.src = src;
    }

    /* ---------- 套用背景與節慶設計 ---------- */
    function applyBackground(date) {
        var bg = document.getElementById("bgLayer");
        var festival = resolveFestival(date);
        var weekday = WEEKDAY_THEMES[date.getDay()];
        var themeKey = festival ? festival.key : weekday.key;
        var themeClass = "theme-" + themeKey;
        var bgImage = festival
            ? resolveBgImage(festival, FESTIVAL_IMAGE_DIR)
            : resolveBgImage(weekday, WEEKDAY_IMAGE_DIR);

        if (bg) {
            // 清除既有 theme-* / 狀態 class 後重新套用
            bg.className = bg.className
                .split(" ")
                .filter(function (c) {
                    return c && c.indexOf("theme-") !== 0 &&
                        c !== "is-festival" && c !== "has-bg-image";
                })
                .join(" ");
            bg.classList.add(themeClass);
            if (festival) bg.classList.add("is-festival");

            // 節日與平日皆嘗試套用背景圖（圖檔不存在時自動 fallback CSS）
            setBackgroundImage(bg, bgImage);
        }

        // 讓 body 也帶上節慶代碼，方便各 style 對裝飾元素做進階變化
        document.body.setAttribute("data-festival", festival ? festival.key : "");
        renderFestivalBanner(festival);
    }

    /* ---------- 節慶橫幅 ---------- */
    function renderFestivalBanner(festival) {
        var el = document.getElementById("festivalBanner");
        if (!el) return;
        if (!festival) {
            el.style.display = "none";
            el.innerHTML = "";
            return;
        }
        el.style.display = "";
        el.innerHTML =
            '<span class="fb-icon" aria-hidden="true">' + festival.icon + "</span>" +
            '<span class="fb-label">' + escapeHtml(festival.label) + "</span>" +
            '<span class="fb-wish">' + escapeHtml(festival.wish) + "</span>";
    }

    /* ---------- 公司 Logo ---------- */
    function renderLogo() {
        var holder = document.getElementById("brandLogo");
        if (!holder) return;
        var fallback = holder.innerHTML; // 內建 SVG 作為 fallback
        var img = new Image();
        img.alt = LOGO_CONFIG.alt;
        img.className = "brand-logo-img";
        img.onload = function () {
            holder.innerHTML = "";
            holder.appendChild(img);
        };
        img.onerror = function () {
            // 找不到 Logo 圖檔 → 保留內建 SVG
            holder.innerHTML = fallback;
        };
        if (LOGO_CONFIG.src) {
            img.src = LOGO_CONFIG.src;
        }
    }

    /* ---------- 公告 ---------- */
    function renderAnnouncements() {
        var list = document.getElementById("announcementList");
        if (!list) return;
        list.innerHTML = ANNOUNCEMENTS.map(function (a) {
            var tag = a.tag
                ? '<span class="tag ' + a.tag + '">' + (TAG_LABEL[a.tag] || "") + "</span>"
                : "";
            return "<li>" + tag + '<span class="ann-text">' + escapeHtml(a.text) + "</span></li>";
        }).join("");
    }

    /* ---------- 日期 / 問候語 ---------- */
    function renderDateInfo(date) {
        var weekNames = ["日", "一", "二", "三", "四", "五", "六"];
        var label = date.getFullYear() + "/" + pad(date.getMonth() + 1) + "/" +
            pad(date.getDate()) + " (週" + weekNames[date.getDay()] + ")";
        setText("todayLabel", label);
        setText("todayLabelAnn", label);
        setText("year", String(date.getFullYear()));

        var h = date.getHours();
        var greet = h < 12 ? "早安" : (h < 18 ? "午安" : "晚安");
        setText("greeting", greet + "，祝您有美好的一天，辛苦了！");
    }

    /* ---------- 密碼顯示切換 ---------- */
    function bindPasswordToggle() {
        var btn = document.getElementById("togglePassword");
        var input = document.getElementById("password");
        if (!btn || !input) return;
        btn.addEventListener("click", function () {
            var show = input.type === "password";
            input.type = show ? "text" : "password";
            btn.textContent = show ? "隱藏" : "顯示";
        });
    }

    /* ---------- 表單驗證與送出 ---------- */
    function bindForm() {
        var form = document.getElementById("loginForm");
        if (!form) return;
        var msg = document.getElementById("formMessage");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var username = form.username.value.trim();
            var password = form.password.value;
            if (msg) msg.className = "form-message";

            if (!username) {
                if (msg) msg.textContent = "請輸入帳號。";
                form.username.focus();
                return;
            }
            if (!password) {
                if (msg) msg.textContent = "請輸入密碼。";
                form.password.focus();
                return;
            }

            var btn = form.querySelector("button[type=submit]");
            var label = btn ? btn.textContent : "";
            if (btn) { btn.disabled = true; btn.textContent = "登入中…"; }

            // 前端示意；實務應呼叫後端登入 API
            setTimeout(function () {
                if (msg) { msg.className = "form-message success"; msg.textContent = "登入成功！正在為您導向系統首頁…"; }
                if (btn) { btn.disabled = false; btn.textContent = label; }
            }, 900);
        });
    }

    /* ---------- 初始化 ---------- */
    function init() {
        var now = new Date();
        applyBackground(now);
        renderLogo();
        renderAnnouncements();
        renderDateInfo(now);
        bindPasswordToggle();
        bindForm();
    }

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    ready(init);

    // 對外公開（方便客製覆寫資料）
    global.CHGHLogin = {
        LOGO_CONFIG: LOGO_CONFIG,
        WEEKDAY_THEMES: WEEKDAY_THEMES,
        FESTIVALS: FESTIVALS,
        ANNOUNCEMENTS: ANNOUNCEMENTS,
        FESTIVAL_IMAGE_DIR: FESTIVAL_IMAGE_DIR,
        WEEKDAY_IMAGE_DIR: WEEKDAY_IMAGE_DIR,
        BG_IMAGE_EXT: BG_IMAGE_EXT,
        resolveFestival: resolveFestival,
        resolveBgImage: resolveBgImage
    };
})(window);
