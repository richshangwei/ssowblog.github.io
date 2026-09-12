/* ICD-10 疼痛部位標示 ── 選取診斷碼，在人體圖上標示可能的疼痛部位 */
(() => {
  "use strict";

  const MASTER = window.ICD10_PAIN_MASTER || [];
  const REGIONS = window.BODY_REGION_MASTER || [];
  const REGION_META = new Map(REGIONS.map((r) => [r.id, r]));

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    view: "FRONT",
    showLabels: true,
    search: "",
    selected: null, // { code, name, regions, note }
    pickedRegions: [], // 反向：多選的部位 region_id 陣列
  };

  /* ── 反向索引：部位 → 可能的 ICD-10 診斷 ── */
  // 每個 region_id 對應到「包含該部位」的所有診斷碼
  const REGION_TO_CODES = new Map();
  MASTER.forEach((c) => {
    c.regions.forEach((rid) => {
      if (!REGION_TO_CODES.has(rid)) REGION_TO_CODES.set(rid, []);
      REGION_TO_CODES.get(rid).push(c);
    });
  });

  // 取得某部位「直接或經父區」對應的所有診斷碼
  function codesForRegion(regionId) {
    const direct = REGION_TO_CODES.get(regionId) || [];
    const meta = REGION_META.get(regionId);
    const parent = meta && meta.parent ? REGION_TO_CODES.get(meta.parent) || [] : [];
    const merged = new Map();
    [...direct, ...parent].forEach((c) => merged.set(c.code, c));
    return Array.from(merged.values());
  }

  // 多選推測：找出涵蓋「最多選取部位」的診斷，依涵蓋數由多到少排序
  function suggestCodes(regionIds) {
    const ids = Array.from(new Set(regionIds));
    if (!ids.length) return [];
    const scored = new Map(); // code -> { code, name, regions, hit }
    ids.forEach((rid) => {
      codesForRegion(rid).forEach((c) => {
        const cur = scored.get(c.code) || { ...c, hit: 0 };
        cur.hit += 1;
        scored.set(c.code, cur);
      });
    });
    return Array.from(scored.values())
      .sort((a, b) => b.hit - a.hit || a.regions.length - b.regions.length)
      .slice(0, 30);
  }

  /* ── DOM 索引 ── */
  const views = {
    FRONT: { root: $('.body-view[data-view="FRONT"]'), markers: $("#markers-front"), paths: new Map() },
    BACK: { root: $('.body-view[data-view="BACK"]'), markers: $("#markers-back"), paths: new Map() },
  };

  Object.entries(views).forEach(([key, v]) => {
    $$(".body-region", v.root).forEach((el) => {
      if (!el.classList.contains("body-aggregate")) v.paths.set(el.dataset.regionId, el);
    });
  });

  const allPaths = () => Object.values(views).flatMap((v) => Array.from(v.paths.values()));

  /* ── 部位名稱工具 ── */
  function regionName(id) {
    const m = REGION_META.get(id);
    return m ? m.name : id;
  }

  /* ── 搜尋 ── */
  function filteredCodes() {
    const q = state.search.trim().toLowerCase();
    if (!q) return [];
    return MASTER.filter((c) => {
      return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    }).slice(0, 60);
  }

  function renderCodeList() {
    const box = $("#codeList");
    const rows = filteredCodes();
    $("#searchCount").textContent = state.search.trim() ? `${rows.length} 個符合` : "輸入關鍵字";
    box.textContent = "";

    if (!state.search.trim()) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "輸入 ICD-10 代碼或中文名稱開始查詢。";
      box.append(p);
      return;
    }

    if (!rows.length) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "沒有符合的診斷碼。";
      box.append(p);
      return;
    }

    rows.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-row";
      btn.innerHTML = '<span class="code"></span><span class="label"></span>';
      $(".code", btn).textContent = c.code;
      $(".label", btn).textContent = c.name;
      btn.addEventListener("click", () => selectCode(c));
      box.append(btn);
    });
  }

  /* ── 選取診斷碼 ── */
  function selectCode(c) {
    state.selected = c;
    state.pickedRegions = [];
    $("#searchInput").value = "";
    state.search = "";
    renderCodeList();
    renderCurrent();
    renderDetail();
    renderSuggest();
    paintBody();
    showToast(`已選取 ${c.code} ${c.name}`);
  }

  function clearSelection() {
    state.selected = null;
    state.pickedRegions = [];
    renderCurrent();
    renderDetail();
    renderSuggest();
    paintBody();
  }

  /* ── 目前選取 ── */
  function renderCurrent() {
    const box = $("#currentBox");
    box.textContent = "";
    if (state.pickedRegions.length) {
      const div = document.createElement("div");
      div.className = "current-item picked";
      div.innerHTML = "<b></b><span></span>";
      $("b", div).textContent = `${state.pickedRegions.length} 個部位`;
      $("span", div).textContent = state.pickedRegions.map(regionName).join("、");
      box.append(div);
      return;
    }
    if (!state.selected) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "尚未選取診斷碼。";
      box.append(p);
      return;
    }
    const c = state.selected;
    const div = document.createElement("div");
    div.className = "current-item";
    div.innerHTML = "<b></b><span></span>";
    $("b", div).textContent = c.code;
    $("span", div).textContent = c.name;
    box.append(div);
  }

  /* ── 診斷資訊 ── */
  function renderDetail() {
    const box = $("#detailBox");
    box.textContent = "";
    if (!state.selected) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "選取診斷碼後，這裡會顯示對應的疼痛部位清單。";
      box.append(p);
      return;
    }
    const c = state.selected;
    const h = document.createElement("h3");
    h.textContent = `${c.code}　${c.name}`;
    box.append(h);

    const list = document.createElement("ul");
    list.className = "region-tags";
    c.regions.forEach((id) => {
      const li = document.createElement("li");
      li.textContent = regionName(id);
      li.dataset.regionId = id;
      li.addEventListener("click", () => focusRegion(id));
      list.append(li);
    });
    box.append(list);

    if (c.note) {
      const note = document.createElement("p");
      note.className = "note";
      note.textContent = c.note;
      box.append(note);
    }
  }

  /* ── 人體圖繪製 ── */
  function paintBody() {
    const selected = state.selected;
    const pickedSet = new Set(state.pickedRegions);
    const regionSet = new Set(selected ? selected.regions : []);

    allPaths().forEach((el) => {
      el.classList.remove("is-pain", "is-secondary", "is-focus");
      const id = el.dataset.regionId;
      if (pickedSet.has(id)) {
        el.classList.add("is-focus");
        return;
      }
      if (!selected) return;
      if (regionSet.has(id)) {
        el.classList.add("is-pain");
      } else {
        // 若選取的細區被隱藏（例如只顯示 L2），往上找父區標示
        const parent = REGION_META.get(id) ? REGION_META.get(id).parent : null;
        if (parent && regionSet.has(parent)) el.classList.add("is-secondary");
      }
    });

    drawLabels();
  }

  function drawLabels() {
    Object.keys(views).forEach((view) => {
      const layer = views[view].markers;
      layer.textContent = "";
      if (!state.showLabels || view !== state.view) return;

      // 反向選取：標示所有點選的部位名稱
      if (state.pickedRegions.length) {
        state.pickedRegions.forEach((rid) => {
          const el = views[view].paths.get(rid);
          if (!el) return;
          let box;
          try {
            box = el.getBBox();
          } catch (err) {
            return;
          }
          if (box && box.width) {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", box.x + box.width / 2);
            text.setAttribute("y", box.y + box.height / 2 + 4);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("class", "region-label");
            text.textContent = regionName(rid);
            g.append(text);
            layer.append(g);
          }
        });
        return;
      }

      if (!state.selected) return;

      const regionSet = new Set(state.selected.regions);
      regionSet.forEach((id) => {
        const el = views[view].paths.get(id);
        if (!el) return;
        let box;
        try {
          box = el.getBBox();
        } catch (err) {
          return;
        }
        if (!box || !box.width) return;
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", cx);
        text.setAttribute("y", cy + 4);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("class", "region-label");
        text.textContent = regionName(id);
        g.append(text);
        layer.append(g);
      });
    });
  }

  /* ── 聚焦部位 ── */
  function focusRegion(id) {
    // 切換到該部位所在的視圖
    const meta = REGION_META.get(id);
    if (meta && (meta.view === "FRONT" || meta.view === "BACK")) {
      setView(meta.view);
    }
    allPaths().forEach((el) => el.classList.remove("is-focus"));
    Object.keys(views).forEach((view) => {
      const el = views[view].paths.get(id);
      if (el) el.classList.add("is-focus");
    });
  }

  /* ── 視圖切換 ── */
  function setView(view) {
    state.view = view;
    $$(".segmented button").forEach((b) => b.classList.toggle("is-active", b.dataset.view === view));
    $$(".body-view").forEach((v) => v.classList.toggle("is-active", v.dataset.view === view));
    paintBody();
  }

  /* ── 匯出 ── */
  function exportJson() {
    const blob = new Blob([JSON.stringify(MASTER, null, 2)], { type: "application/json" });
    download(blob, "icd10-pain-map.json");
  }

  function exportCsv() {
    const rows = [["code", "name", "regions"]];
    MASTER.forEach((c) => rows.push([c.code, c.name, c.regions.join("|")]));
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    download(blob, "icd10-pain-map.csv");
  }

  function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* ── Toast ── */
  /* ── 反向：點選部位 → 推測 ICD-10（多選） ── */
  function pickRegion(regionId) {
    // 若已選取診斷碼，先清除
    if (state.selected) {
      state.selected = null;
      renderDetail();
    }
    // 多選：切換該部位的選取狀態
    const idx = state.pickedRegions.indexOf(regionId);
    if (idx >= 0) {
      state.pickedRegions.splice(idx, 1);
    } else {
      state.pickedRegions.push(regionId);
    }
    $("#searchInput").value = "";
    state.search = "";
    renderCodeList();
    renderCurrent();
    renderSuggest();
    paintBody();
    const on = idx < 0;
    showToast(`${on ? "已選取" : "已取消"}部位：${regionName(regionId)}`);
  }

  function renderSuggest() {
    const box = $("#suggestBox");
    box.textContent = "";
    if (!state.pickedRegions.length) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "在人體圖上點選一個或多個部位，這裡會列出涵蓋這些部位的 ICD-10 診斷。";
      box.append(p);
      return;
    }
    const codes = suggestCodes(state.pickedRegions);
    const h = document.createElement("h3");
    h.textContent = `${state.pickedRegions.length} 個部位　可能的診斷（${codes.length}）`;
    box.append(h);

    if (!codes.length) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "這些部位目前沒有同時對應的診斷資料。";
      box.append(p);
      return;
    }

    const list = document.createElement("ul");
    list.className = "suggest-list";
    codes.forEach((c) => {
      const li = document.createElement("li");
      li.innerHTML = '<span class="code"></span><span class="label"></span><span class="count"></span>';
      $(".code", li).textContent = c.code;
      $(".label", li).textContent = c.name;
      $(".count", li).textContent = `涵蓋 ${c.hit}/${state.pickedRegions.length} 部位`;
      li.addEventListener("click", () => selectCode(c));
      list.append(li);
    });
    box.append(list);
  }

  function showToast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => (t.hidden = true), 2200);
  }

  /* ── 事件綁定 ── */
  $("#searchInput").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderCodeList();
  });

  // 人體圖點擊 → 反向推測
  allPaths().forEach((el) => {
    el.addEventListener("click", () => pickRegion(el.dataset.regionId));
  });

  $$(".segmented button").forEach((b) => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });

  $("#labelToggle").addEventListener("change", (e) => {
    state.showLabels = e.target.checked;
    paintBody();
  });

  $("#btnClear").addEventListener("click", clearSelection);
  $("#btnExportJson").addEventListener("click", exportJson);
  $("#btnExportCsv").addEventListener("click", exportCsv);

  /* ── 初始化 ── */
  renderCodeList();
  renderCurrent();
  renderDetail();
  renderSuggest();
  paintBody();
})();
