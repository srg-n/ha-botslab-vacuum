/* Botslab Routines Card — create/edit the vacuum's cleaning routines.
 * Reads sensor.<device>_schedules (schedules + rooms) and calls
 * botslab_vacuum.set_schedule / delete_schedule / run_schedule services.
 * Bilingual: English and Turkish with automatic language detection.
 */

const SUCTIONS = ["quiet", "normal", "strong", "max", "auto"];

const I18N = {
  tr: {
    header: "Temizlik Rutinleri",
    addBtn: "＋ Yeni Rutin",
    empty: "Kayıtlı rutin yok. '＋ Yeni Rutin' ile ekleyin.",
    noEntity: "Lütfen kart yapılandırmasından bir süpürge (vacuum) varlığı seçin.",
    wholeHouse: "Tüm Ev",
    passes1: "1 geçiş",
    passes2: "2 geçiş",
    runConfirm: "Bu rutini şimdi çalıştırmak istiyor musunuz?",
    deleteConfirm: "Bu rutini silmek istediğinize emin misiniz?",
    dayLabels: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    time: "Başlangıç Saati",
    days: "Günler",
    roomsLabel: "Odalar (temizleme sırasına göre tıklayın; boş = tüm ev)",
    mapNotLoaded: "Harita henüz yüklenmedi",
    suction: "Emiş Gücü",
    suctions: { quiet: "Sessiz", normal: "Standart", strong: "Güçlü", max: "Maksimum", auto: "Otomatik" },
    passes: "Geçiş Sayısı",
    active: "Aktif",
    cancel: "İptal",
    save: "Kaydet",
    create: "Oluştur",
    pickOneDay: "Lütfen en az bir gün seçin.",
    runNowTitle: "Şimdi Çalıştır",
    editTitle: "Düzenle",
    deleteTitle: "Sil",
  },
  en: {
    header: "Cleaning Routines",
    addBtn: "＋ New Routine",
    empty: "No routines saved. Create one with '＋ New Routine'.",
    noEntity: "Please select a vacuum entity in the card configuration.",
    wholeHouse: "Whole House",
    passes1: "1 pass",
    passes2: "2 passes",
    runConfirm: "Execute this routine now?",
    deleteConfirm: "Delete this routine?",
    dayLabels: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    time: "Start Time",
    days: "Days",
    roomsLabel: "Rooms (tap in order to clean; empty = whole house)",
    mapNotLoaded: "Map not loaded yet",
    suction: "Suction Power",
    suctions: { quiet: "Quiet", normal: "Standard", strong: "Strong", max: "Max", auto: "Auto" },
    passes: "Passes",
    active: "Active",
    cancel: "Cancel",
    save: "Save",
    create: "Create",
    pickOneDay: "Select at least one day.",
    runNowTitle: "Run now",
    editTitle: "Edit",
    deleteTitle: "Delete",
  }
};

class BotslabRoutinesCard extends HTMLElement {
  static getStubConfig(hass) {
    const o = Object.keys(hass?.states ?? {}).find((s) => s.startsWith("vacuum."));
    return {
      type: "custom:botslab-routines-card",
      entity: o || ""
    };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "entity", required: true, selector: { entity: { domain: "vacuum" } } },
        { name: "title", selector: { text: {} } },
        { name: "schedules_entity", selector: { entity: { domain: "sensor" } } }
      ],
      computeLabel: (s) => {
        if (s.name === "entity") return "Vacuum Entity";
        if (s.name === "title") return "Card Title (optional)";
        if (s.name === "schedules_entity") return "Schedules Sensor (optional)";
        return s.name;
      }
    };
  }

  setConfig(config) {
    this._config = Object.assign({}, config);
    this._editing = null;
    this._built = false;
    this._lastKey = null;
    if (this._hass) this._ensureEntity();
  }

  set hass(hass) {
    this._hass = hass;
    this._ensureEntity();
    if (!this._built) this._build();
    if (!this._editing) {
      const key = JSON.stringify(this._data());
      if (key !== this._lastKey) { this._lastKey = key; this._renderList(); }
    }
  }

  getCardSize() { return 8; }

  _ensureEntity() {
    if (!this._config.entity && this._hass && this._hass.states) {
      const vac = Object.keys(this._hass.states).find((s) => s.startsWith("vacuum."));
      if (vac) {
        this._config.entity = vac;
      }
    }
  }

  _t() {
    const lang = (this._hass && (this._hass.language || this._hass.locale?.language || "")) || "en";
    return lang.startsWith("tr") ? I18N.tr : I18N.en;
  }

  _schedEntity() {
    if (this._config.schedules_entity) return this._config.schedules_entity;
    if (!this._config.entity) return null;
    const parts = this._config.entity.split(".");
    return parts.length > 1 ? ("sensor." + parts[1] + "_schedules") : null;
  }

  _data() {
    const ent = this._schedEntity();
    const st = ent && this._hass && this._hass.states[ent];
    const a = st ? st.attributes : {};
    return { schedules: a.schedules || [], rooms: a.rooms || {} };
  }

  _call(service, data) {
    if (!this._config.entity) return Promise.reject(new Error("No vacuum entity configured"));
    return this._hass.callService("botslab_vacuum", service, data,
      { entity_id: this._config.entity });
  }

  _build() {
    const t = this._t();
    const headerTitle = this._config.title || t.header;
    this.innerHTML = `
      <ha-card header="${headerTitle}">
        <style>
          .wrap{padding:8px 16px 16px}
          .row{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--divider-color)}
          .row:first-child{border-top:none}
          .time{font-size:1.5em;font-weight:600;min-width:64px}
          .meta{flex:1;display:flex;flex-direction:column;gap:4px;font-size:.9em;color:var(--secondary-text-color)}
          .days{display:flex;gap:3px}
          .d{width:22px;height:22px;line-height:22px;text-align:center;border-radius:50%;font-size:.72em;background:var(--divider-color);color:var(--secondary-text-color)}
          .d.on{background:var(--primary-color);color:var(--text-primary-color,#fff);font-weight:bold}
          .rooms{font-weight:500;color:var(--primary-text-color)}
          .iconbtn{cursor:pointer;color:var(--secondary-text-color);background:none;border:none;font-size:1.1em;padding:6px;border-radius:4px}
          .iconbtn:hover{background:var(--secondary-background-color);color:var(--primary-text-color)}
          button.main{background:var(--primary-color);color:var(--text-primary-color,#fff);border:none;border-radius:8px;padding:8px 14px;cursor:pointer;font-size:.95em}
          button.ghost{background:none;border:1px solid var(--divider-color);border-radius:8px;padding:8px 14px;cursor:pointer;color:var(--primary-text-color)}
          .add{padding-top:12px}
          .ed{border-top:1px solid var(--divider-color);margin-top:8px;padding-top:12px;display:flex;flex-direction:column;gap:14px}
          .fld{display:flex;flex-direction:column;gap:6px}
          .fld>label{font-size:.85em;color:var(--secondary-text-color)}
          .chips{display:flex;flex-wrap:wrap;gap:6px}
          .chip{border:1px solid var(--divider-color);border-radius:16px;padding:5px 11px;cursor:pointer;user-select:none;font-size:.9em;position:relative}
          .chip.sel{background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:var(--primary-color)}
          .chip .ord{font-size:.75em;margin-left:6px;background:rgba(255,255,255,0.3);border-radius:50%;padding:1px 5px}
          select,input[type=time]{padding:8px;border-radius:8px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color);font-size:1em}
          .acts{display:flex;gap:10px;justify-content:flex-end}
          .muted{color:var(--secondary-text-color);font-style:italic}
          .inline{display:flex;align-items:center;gap:8px}
        </style>
        <div class="wrap">
          <div id="list"></div>
          <div class="add"><button class="main" id="addbtn">${t.addBtn}</button></div>
          <div id="editor"></div>
        </div>
      </ha-card>`;
    this.querySelector("#addbtn").addEventListener("click", () => this._openEditor(null));
    this._built = true;
  }

  _roomName(rooms, id) { return rooms[id] != null ? rooms[id] : ("Room " + id); }

  _renderList() {
    const t = this._t();
    const list = this.querySelector("#list");
    const addBtn = this.querySelector("#addbtn");

    if (!this._config.entity) {
      if (list) list.innerHTML = `<div class="muted" style="padding:16px 0;text-align:center">${t.noEntity}</div>`;
      if (addBtn) addBtn.style.display = "none";
      return;
    }
    if (addBtn && !this._editing) addBtn.style.display = "";

    const { schedules, rooms } = this._data();
    if (!schedules.length) {
      list.innerHTML = `<div class="muted" style="padding:8px 0">${t.empty}</div>`;
      return;
    }
    list.innerHTML = schedules.map((s) => {
      const days = t.dayLabels.map((d, i) =>
        `<span class="d ${s.days.includes(i) ? "on" : ""}">${d}</span>`).join("");
      const roomsTxt = (s.room_ids && s.room_ids.length)
        ? s.room_ids.map((id) => this._roomName(rooms, id)).join(" → ")
        : t.wholeHouse;
      const sx = t.suctions[s.suction] || s.suction || t.suctions.auto;
      const passesTxt = s.passes === 2 ? t.passes2 : t.passes1;
      return `
        <div class="row">
          <div class="time">${s.time}</div>
          <div class="meta">
            <div class="days">${days}</div>
            <div class="rooms">${roomsTxt}</div>
            <div>${sx} · ${passesTxt}</div>
          </div>
          <label class="inline"><input type="checkbox" data-act="toggle" data-slot="${s.slot}" ${s.active ? "checked" : ""}></label>
          <button class="iconbtn" title="${t.runNowTitle}" data-act="run" data-slot="${s.slot}">▶</button>
          <button class="iconbtn" title="${t.editTitle}" data-act="edit" data-slot="${s.slot}">✎</button>
          <button class="iconbtn" title="${t.deleteTitle}" data-act="del" data-slot="${s.slot}">🗑</button>
        </div>`;
    }).join("");
    list.querySelectorAll("[data-act]").forEach((el) => {
      const slot = parseInt(el.dataset.slot, 10);
      const act = el.dataset.act;
      if (act === "toggle") el.addEventListener("change", (e) => this._toggle(slot, e.target.checked));
      else if (act === "run") el.addEventListener("click", () => this._run(slot));
      else el.addEventListener("click", () => act === "edit" ? this._openEditor(slot) : this._delete(slot));
    });
  }

  async _run(slot) {
    const t = this._t();
    if (!confirm(t.runConfirm)) return;
    await this._call("run_schedule", { slot });
  }

  _openEditor(slot) {
    const { schedules } = this._data();
    if (slot != null && schedules[slot]) {
      const s = schedules[slot];
      this._editing = {
        slot, time: s.time || "09:00", days: new Set(s.days || []),
        rooms: [...(s.room_ids || [])],
        suction: s.suction || "auto", passes: s.passes === 2 ? 2 : 1, active: !!s.active,
      };
    } else {
      this._editing = { slot: -1, time: "09:00", days: new Set(), rooms: [],
        suction: "auto", passes: 1, active: true };
    }
    const addBtn = this.querySelector("#addbtn");
    if (addBtn) addBtn.style.display = "none";
    this._renderEditor();
  }

  _closeEditor() {
    this._editing = null;
    this.querySelector("#editor").innerHTML = "";
    const addBtn = this.querySelector("#addbtn");
    if (addBtn && this._config.entity) addBtn.style.display = "";
    this._lastKey = null;
    this._renderList();
  }

  _renderEditor() {
    const t = this._t();
    const e = this._editing;
    const { rooms } = this._data();
    const roomIds = Object.keys(rooms).map((k) => k).sort();
    const ed = this.querySelector("#editor");
    const dayChips = t.dayLabels.map((d, i) =>
      `<div class="chip ${e.days.has(i) ? "sel" : ""}" data-day="${i}">${d}</div>`).join("");
    const roomChips = roomIds.map((id) => {
      const pos = e.rooms.indexOf(id);
      const ord = pos >= 0 ? `<span class="ord">${pos + 1}</span>` : "";
      return `<div class="chip ${pos >= 0 ? "sel" : ""}" data-room="${id}">${this._roomName(rooms, id)}${ord}</div>`;
    }).join("");
    const sucOpts = SUCTIONS.map((s) =>
      `<option value="${s}" ${e.suction === s ? "selected" : ""}>${t.suctions[s] || s}</option>`).join("");
    ed.innerHTML = `
      <div class="ed">
        <div class="fld"><label>${t.time}</label><input type="time" id="f-time" value="${e.time}"></div>
        <div class="fld"><label>${t.days}</label><div class="chips" id="f-days">${dayChips}</div></div>
        <div class="fld"><label>${t.roomsLabel}</label>
          <div class="chips" id="f-rooms">${roomChips || `<span class="muted">${t.mapNotLoaded}</span>`}</div></div>
        <div class="fld"><label>${t.suction}</label><select id="f-suc">${sucOpts}</select></div>
        <div class="fld"><label>${t.passes}</label>
          <select id="f-pass"><option value="1" ${e.passes === 1 ? "selected" : ""}>1</option>
          <option value="2" ${e.passes === 2 ? "selected" : ""}>2</option></select></div>
        <label class="inline"><input type="checkbox" id="f-active" ${e.active ? "checked" : ""}> ${t.active}</label>
        <div class="acts">
          <button class="ghost" id="f-cancel">${t.cancel}</button>
          <button class="main" id="f-save">${e.slot >= 0 ? t.save : t.create}</button>
        </div>
      </div>`;
    ed.querySelectorAll("#f-days .chip").forEach((c) => c.addEventListener("click", () => {
      const d = parseInt(c.dataset.day, 10);
      e.days.has(d) ? e.days.delete(d) : e.days.add(d);
      this._syncEditFields(); this._renderEditor();
    }));
    ed.querySelectorAll("#f-rooms .chip").forEach((c) => c.addEventListener("click", () => {
      const id = c.dataset.room;
      const pos = e.rooms.indexOf(id);
      pos >= 0 ? e.rooms.splice(pos, 1) : e.rooms.push(id);
      this._syncEditFields(); this._renderEditor();
    }));
    ed.querySelector("#f-cancel").addEventListener("click", () => this._closeEditor());
    ed.querySelector("#f-save").addEventListener("click", () => this._save());
  }

  _syncEditFields() {
    const e = this._editing, ed = this.querySelector("#editor");
    const tm = ed.querySelector("#f-time"); if (tm) e.time = tm.value;
    const s = ed.querySelector("#f-suc"); if (s) e.suction = s.value;
    const p = ed.querySelector("#f-pass"); if (p) e.passes = parseInt(p.value, 10);
    const a = ed.querySelector("#f-active"); if (a) e.active = a.checked;
  }

  async _save() {
    const t = this._t();
    this._syncEditFields();
    const e = this._editing;
    if (!e.days.size) { alert(t.pickOneDay); return; }
    await this._call("set_schedule", {
      time: e.time, days: [...e.days].sort((a, b) => a - b),
      room_ids: e.rooms, suction: e.suction, passes: e.passes,
      active: e.active, slot: e.slot,
    });
    this._closeEditor();
  }

  async _delete(slot) {
    const t = this._t();
    if (!confirm(t.deleteConfirm)) return;
    await this._call("delete_schedule", { slot });
    this._lastKey = null;
  }

  async _toggle(slot, active) {
    const s = this._data().schedules[slot];
    if (!s) return;
    await this._call("set_schedule", {
      time: s.time, days: s.days, room_ids: s.room_ids, suction: s.suction || "auto",
      passes: s.passes === 2 ? 2 : 1, active, slot,
    });
    this._lastKey = null;
  }
}

if (!customElements.get("botslab-routines-card")) {
  customElements.define("botslab-routines-card", BotslabRoutinesCard);
}
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "botslab-routines-card")) {
  window.customCards.push({
    type: "botslab-routines-card",
    name: "Botslab Routines",
    description: "Create and edit scheduled cleaning routines for Botslab robots",
  });
}
