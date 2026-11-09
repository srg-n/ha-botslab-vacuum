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
    const vac = Object.keys(hass?.states ?? {}).find((s) => s.startsWith("vacuum."));
    const sched = Object.keys(hass?.states ?? {}).find(
      (id) => id.startsWith("sensor.") && hass?.states[id]?.attributes?.schedules !== undefined
    );
    return {
      type: "custom:botslab-routines-card",
      entity: vac || "vacuum.botslab_vacuum",
      ...(sched ? { schedules_entity: sched } : {})
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
    if (!this._config.schedules_entity && this._hass && this._hass.states) {
      const sched = Object.keys(this._hass.states).find(
        (id) => id.startsWith("sensor.") && this._hass.states[id]?.attributes?.schedules !== undefined
      );
      if (sched) {
        this._config.schedules_entity = sched;
      }
    }
  }

  _t() {
    const lang = (this._hass && (this._hass.language || this._hass.locale?.language || "")) || "en";
    return lang.startsWith("tr") ? I18N.tr : I18N.en;
  }

  _schedEntity() {
    if (this._config.schedules_entity) return this._config.schedules_entity;
    if (this._hass && this._hass.states) {
      const found = Object.keys(this._hass.states).find(
        (id) => id.startsWith("sensor.") && this._hass.states[id]?.attributes?.schedules !== undefined
      );
      if (found) return found;
    }
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
          .time{font-size:18px;font-weight:600;min-width:60px}
          .mid{flex:1;min-width:0}
          .days{font-size:12px;color:var(--secondary-text-color)}
          .sub{font-size:12px;color:var(--secondary-text-color);margin-top:2px}
          .btns{display:flex;align-items:center;gap:4px}
          ha-icon-button{--mdc-icon-button-size:36px}
          .addbtn{margin-top:12px}
          .editor{padding:12px;background:var(--secondary-background-color);border-radius:8px;margin-top:12px}
          .field{margin-bottom:12px}
          .field label{display:block;font-size:12px;color:var(--secondary-text-color);margin-bottom:4px}
          .daygrid{display:flex;gap:4px;flex-wrap:wrap}
          .daychip{padding:6px 10px;border-radius:16px;border:1px solid var(--divider-color);cursor:pointer;font-size:12px;user-select:none}
          .daychip.on{background:var(--primary-color);color:var(--primary-text-color, #fff);border-color:var(--primary-color)}
          .roomgrid{display:flex;gap:6px;flex-wrap:wrap}
          .roomchip{padding:6px 10px;border-radius:6px;border:1px solid var(--divider-color);cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;user-select:none}
          .roomchip.on{background:var(--primary-color);color:var(--primary-text-color, #fff);border-color:var(--primary-color)}
          .ord{display:inline-block;width:16px;height:16px;line-height:16px;text-align:center;border-radius:50%;background:#fff;color:var(--primary-color);font-size:10px;font-weight:700}
          select,input[type=time]{padding:6px 8px;border-radius:4px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color);font-size:14px}
          .actrow{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
          .muted{color:var(--secondary-text-color);font-style:italic}
        </style>
        <div class="wrap">
          <div id="list"></div>
          <div id="editor"></div>
          <mwc-button id="addbtn" class="addbtn" outlined>${t.addBtn}</mwc-button>
        </div>
      </ha-card>
    `;
    this.querySelector("#addbtn").addEventListener("click", () => this._openEditor(-1));
    this._renderList();
  }

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
    list.innerHTML = schedules.map(s => {
      const dayNames = s.days.map(d => t.dayLabels[d]).join(" ");
      let target;
      if (s.rooms && s.rooms.length) {
        target = s.rooms.map(r => rooms[r] || `#${r}`).join(" → ");
      } else {
        target = t.wholeHouse;
      }
      const suc = t.suctions[s.suction] || s.suction;
      const passText = s.passes === 2 ? t.passes2 : t.passes1;
      return `
        <div class="row" data-slot="${s.slot}">
          <div class="time">${s.time}</div>
          <div class="mid">
            <div class="days">${dayNames || "—"}</div>
            <div class="sub">${target} • ${suc} • ${passText}</div>
          </div>
          <div class="btns">
            <ha-switch ${s.active ? "checked" : ""}></ha-switch>
            <ha-icon-button class="run-btn" title="${t.runNowTitle}">
              <ha-icon icon="mdi:play"></ha-icon>
            </ha-icon-button>
            <ha-icon-button class="edit-btn" title="${t.editTitle}">
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button class="del-btn" title="${t.deleteTitle}">
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `;
    }).join("");

    list.querySelectorAll(".row").forEach(el => {
      const slot = Number(el.dataset.slot);
      const sw = el.querySelector("ha-switch");
      sw.addEventListener("change", (ev) => {
        const checked = ev.target.checked;
        const cur = schedules.find(s => s.slot === slot);
        if (!cur) return;
        this._call("set_schedule", {
          slot: slot, time: cur.time, days: cur.days,
          rooms: cur.rooms, suction: cur.suction, passes: cur.passes,
          active: checked,
        }).catch(err => { console.error(err); ev.target.checked = !checked; });
      });

      el.querySelector(".run-btn").addEventListener("click", () => {
        if (confirm(t.runConfirm)) {
          this._call("run_schedule", { slot: slot });
        }
      });
      el.querySelector(".edit-btn").addEventListener("click", () => this._openEditor(slot));
      el.querySelector(".del-btn").addEventListener("click", () => {
        if (confirm(t.deleteConfirm)) {
          this._call("delete_schedule", { slot: slot })
            .then(() => { this._lastKey = null; this._renderList(); });
        }
      });
    });
  }

  _openEditor(slot) {
    const { schedules } = this._data();
    if (slot >= 0) {
      const cur = schedules.find(s => s.slot === slot);
      if (!cur) return;
      this._editing = {
        slot: cur.slot,
        time: cur.time,
        days: new Set(cur.days),
        rooms: [...(cur.rooms || [])],
        suction: cur.suction || "auto",
        passes: cur.passes || 1,
        active: cur.active !== false,
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
    const ed = this.querySelector("#editor");

    const daysHtml = t.dayLabels.map((lbl, idx) => `
      <div class="daychip ${e.days.has(idx) ? "on" : ""}" data-day="${idx}">${lbl}</div>
    `).join("");

    const roomEntries = Object.entries(rooms);
    const roomsHtml = roomEntries.length ? roomEntries.map(([id, name]) => {
      const ordIdx = e.rooms.indexOf(Number(id));
      const on = ordIdx >= 0;
      return `
        <div class="roomchip ${on ? "on" : ""}" data-rid="${id}">
          ${on ? `<span class="ord">${ordIdx + 1}</span>` : ""}
          <span>${name}</span>
        </div>
      `;
    }).join("") : `<div class="muted">${t.mapNotLoaded}</div>`;

    const sucOpts = SUCTIONS.map(k => `
      <option value="${k}" ${e.suction === k ? "selected" : ""}>${t.suctions[k] || k}</option>
    `).join("");

    ed.innerHTML = `
      <div class="editor">
        <div class="field">
          <label>${t.time}</label>
          <input type="time" id="ed-time" value="${e.time}">
        </div>
        <div class="field">
          <label>${t.days}</label>
          <div class="daygrid" id="ed-days">${daysHtml}</div>
        </div>
        <div class="field">
          <label>${t.roomsLabel}</label>
          <div class="roomgrid" id="ed-rooms">${roomsHtml}</div>
        </div>
        <div class="field">
          <label>${t.suction}</label>
          <select id="ed-suction">${sucOpts}</select>
        </div>
        <div class="field">
          <label>${t.passes}</label>
          <select id="ed-passes">
            <option value="1" ${e.passes === 1 ? "selected" : ""}>1</option>
            <option value="2" ${e.passes === 2 ? "selected" : ""}>2</option>
          </select>
        </div>
        <div class="field" style="display:flex;align-items:center;gap:10px">
          <label style="margin:0">${t.active}</label>
          <ha-switch id="ed-active" ${e.active ? "checked" : ""}></ha-switch>
        </div>
        <div class="actrow">
          <mwc-button id="ed-cancel">${t.cancel}</mwc-button>
          <mwc-button id="ed-save" raised>${e.slot >= 0 ? t.save : t.create}</mwc-button>
        </div>
      </div>
    `;

    ed.querySelector("#ed-days").querySelectorAll(".daychip").forEach(ch => {
      ch.addEventListener("click", () => {
        const d = Number(ch.dataset.day);
        if (e.days.has(d)) e.days.delete(d); else e.days.add(d);
        this._renderEditor();
      });
    });

    ed.querySelector("#ed-rooms").querySelectorAll(".roomchip").forEach(ch => {
      ch.addEventListener("click", () => {
        const rid = Number(ch.dataset.rid);
        const idx = e.rooms.indexOf(rid);
        if (idx >= 0) e.rooms.splice(idx, 1); else e.rooms.push(rid);
        this._renderEditor();
      });
    });

    ed.querySelector("#ed-time").addEventListener("change", ev => { e.time = ev.target.value; });
    ed.querySelector("#ed-suction").addEventListener("change", ev => { e.suction = ev.target.value; });
    ed.querySelector("#ed-passes").addEventListener("change", ev => { e.passes = Number(ev.target.value); });
    ed.querySelector("#ed-active").addEventListener("change", ev => { e.active = ev.target.checked; });

    ed.querySelector("#ed-cancel").addEventListener("click", () => this._closeEditor());
    ed.querySelector("#ed-save").addEventListener("click", () => {
      if (!e.days.size) { alert(t.pickOneDay); return; }
      this._call("set_schedule", {
        slot: e.slot,
        time: e.time,
        days: Array.from(e.days).sort(),
        rooms: e.rooms,
        suction: e.suction,
        passes: e.passes,
        active: e.active,
      }).then(() => this._closeEditor())
        .catch(err => { console.error(err); alert("Error saving schedule: " + err); });
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
    preview: true,
  });
}
