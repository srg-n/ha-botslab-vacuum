"""Localization catalog for Botslab Vacuum Robot.

Centralized translation registry for generated UI cards, notifications, and dynamic
messages that fall outside Home Assistant's static strings.json schema.
"""
from __future__ import annotations

from typing import Any

CATALOG: dict[str, dict[str, str]] = {
    "en": {
        # Card Labels
        "btn_start": "Start",
        "btn_pause": "Pause",
        "btn_dock": "Return to Dock",
        "btn_stop": "Stop",
        "vacuum_status": "Vacuum Status",
        "battery_level": "Battery Level",
        "maintenance_title": "Maintenance & Settings",
        "camera_title": "Cleaning Map",
        "card_header_comment": (
            "# ==============================================================================\n"
            "# 360 Legacy Vacuum ({title}) - Dashboard Card Configuration\n"
            "#\n"
            "# ⚠️ INSTALLATION INSTRUCTION:\n"
            "# This snippet is a SINGLE CARD configuration. Do NOT paste into dashboard Raw Configuration Editor.\n"
            "# Dashboard -> Edit -> + Add Card -> Manual (at the bottom).\n"
            "# ==============================================================================\n"
        ),

        # Notifications
        "map_card_title": "Botslab Map Card - {title}",
        "legacy_card_title": "Botslab Dashboard Card - {title}",
        "legacy_card_msg": (
            "Dashboard card configuration generated for **{title}** (Legacy 360 / S6).\n\n"
            "Saved to: `{filename}` in your Home Assistant configuration directory.\n\n"
            "📋 **Direct Setup**: No file manager needed! Copy the YAML snippet below and paste it into **Edit Dashboard ➔ + Add Card ➔ Manual** (at the bottom):\n\n"
            "```yaml\n{snippet}\n```"
        ),
        "map_card_success": (
            "Map and routine card configurations generated for **{title}** ({room_count} rooms).\n\n"
            "Saved to: `{filename}` in your Home Assistant configuration directory.\n\n"
            "📋 **Direct Setup**: No file manager needed! Copy the YAML snippet below and paste it into **Edit Dashboard ➔ + Add Card ➔ Manual** (at the bottom):\n\n"
            "```yaml\n{snippet}\n```\n\n"
            "Includes bundled *botslab-vacuum-map-card* and *botslab-routines-card* frontend cards (ready zero-config)."
        ),
        "map_card_no_rooms": (
            "No room geometry available yet. {hint}"
            "📋 You can still use the control and maintenance card below by pasting it into your dashboard:\n\n"
            "```yaml\n{snippet}\n```"
        ),
        "map_disabled_hint": (
            "Map support is currently disabled in the integration options. "
            "Enable **Enable live map** for this robot, then press this button again.\n\n"
        ),
        "map_sync_hint": (
            "Robot may not have synced its floor plan to the cloud yet. "
            "Press **Sync Map** on the robot first, then press this button again.\n\n"
        ),
        "err_no_vacuum": "No vacuum entity is registered for {title}.",
        "err_missing_entities": (
            "No {entities} entity is registered for {title}, so the card could not be generated. "
            "Check that the robot is loaded and that **Enable live map** is on in the integration options."
        ),

        # Hardware Error Codes (ErrorCode 0-14)
        "error_0": "Normal",
        "error_1": "Radar / LiDAR obstructed or trapped",
        "error_2": "Collision bumper stuck",
        "error_3": "Wheels off the ground / suspended",
        "error_4": "Cliff drop sensor dirty or obstructed",
        "error_5": "Main roller brush tangled or stuck",
        "error_6": "Side brush tangled or stuck",
        "error_7": "Drive wheel stuck",
        "error_8": "Dustbin missing or removed",
        "error_9": "Filter blocked or dirty",
        "error_10": "Battery critically low",
        "error_11": "Charging abnormal or dock contacts dirty",
        "error_12": "Robot trapped or stuck",
        "error_13": "Water tank empty",
        "error_14": "Mop bracket / pad missing",

        # Clean Sub-Statuses
        "clean_sub_0": "Standard cleaning",
        "clean_sub_1": "Edge / wall following",
        "clean_sub_2": "Area completion",
    },
    "tr": {
        # Card Labels
        "btn_start": "Başlat",
        "btn_pause": "Duraklat",
        "btn_dock": "Şarja Dön",
        "btn_stop": "Durdur",
        "vacuum_status": "Robot Durumu",
        "battery_level": "Pil Seviyesi",
        "maintenance_title": "Sarf Malzemeleri ve Ayarlar",
        "camera_title": "Temizlik Haritası",
        "card_header_comment": (
            "# ==============================================================================\n"
            "# 360 Legacy Vacuum ({title}) - Kontrol Paneli Yapılandırması\n"
            "#\n"
            "# ⚠️ KURULUM TALİMATI:\n"
            "# Bu kod TEK BİR KART yapılandırmasıdır. Panonun tamamının 'Ham Yapılandırma Düzenleyicisi' içine yapıştırmayın.\n"
            "# Panolar -> Düzenle -> + Kart Ekle -> Manuel (en altta) alanına yapıştırın.\n"
            "# ==============================================================================\n"
        ),

        # Notifications
        "map_card_title": "Botslab Harita Kartı - {title}",
        "legacy_card_title": "Botslab Kontrol Paneli - {title}",
        "legacy_card_msg": (
            "Kontrol paneli kartı **{title}** (Legacy 360 / S6) için oluşturuldu.\n\n"
            "Kayıt konumu: `{filename}` (Home Assistant yapılandırma klasörü).\n\n"
            "📋 **Hemen Kullanın**: Dosya yöneticisine gerek olmadan, aşağıdaki kodu kopyalayıp panonuzda **+ Kart Ekle ➔ Manuel** (en altta) alanına yapıştırın:\n\n"
            "```yaml\n{snippet}\n```"
        ),
        "map_card_success": (
            "Harita ve rutin kartı yapılandırmaları **{title}** ({room_count} oda) için başarıyla oluşturuldu.\n\n"
            "Kayıt konumu: `{filename}` (Home Assistant yapılandırma klasörü).\n\n"
            "📋 **Hemen Kullanın**: Dosya yöneticisine gerek olmadan, aşağıdaki kodu kopyalayıp panonuzda **+ Kart Ekle ➔ Manuel** (en altta) alanına yapıştırın:\n\n"
            "```yaml\n{snippet}\n```\n\n"
            "Dahili *botslab-vacuum-map-card* ve *botslab-routines-card* kartlarını içerir (otomatik yüklüdür)."
        ),
        "map_card_no_rooms": (
            "Henüz oda geometrisi bulunamadı. {hint}"
            "📋 Yine de temel kontrol ve bakım kartını kullanmak için aşağıdaki kodu panonuza yapıştırabilirsiniz:\n\n"
            "```yaml\n{snippet}\n```"
        ),
        "map_disabled_hint": (
            "Harita desteği eklenti ayarlarında kapalı olabilir. "
            "Ayarlardan **Canlı haritayı etkinleştir** seçeneğini açıp tekrar deneyin.\n\n"
        ),
        "map_sync_hint": (
            "Robot henüz buluta kat planını yüklememiş olabilir. "
            "Önce robota **Sync Map** yapıp tekrar deneyin.\n\n"
        ),
        "err_no_vacuum": "{title} için kayıtlı bir vakum (vacuum) varlığı bulunamadı.",
        "err_missing_entities": (
            "{title} için gerekli ({entities}) varlıkları bulunamadı. "
            "Robotun yüklü olduğundan ve entegrasyon ayarlarında **Canlı haritayı etkinleştir** seçeneğinin açık olduğundan emin olun."
        ),

        # Hardware Error Codes (ErrorCode 0-14)
        "error_0": "Normal",
        "error_1": "Radar / LiDAR tıkandı veya önü kapalı",
        "error_2": "Çarpışma tamponu sıkıştı",
        "error_3": "Tekerlekler havada / boşlukta kaldı",
        "error_4": "Uçurum düşme sensörleri kirli veya önü kapalı",
        "error_5": "Ana rulo fırça sıkıştı veya saç dolandı",
        "error_6": "Yan fırça sıkıştı",
        "error_7": "Ana sürüş tekerleği sıkıştı",
        "error_8": "Toz haznesi çıkarıldı veya takılı değil",
        "error_9": "Filtre tıkandı veya kirli",
        "error_10": "Batarya kritik seviyede düşük",
        "error_11": "Şarj istasyonu temas noktaları kirli veya şarj olmuyor",
        "error_12": "Robot engeller arasında sıkıştı",
        "error_13": "Su haznesi boş",
        "error_14": "Paspas plakası takılı değil",

        # Clean Sub-Statuses
        "clean_sub_0": "Normal süpürme",
        "clean_sub_1": "Kenar takibi",
        "clean_sub_2": "Alan tamamlama",
    },
}


def translate(key: str, lang: str | None = "en", **kwargs: Any) -> str:
    """Retrieve localized text with automatic fallback to English."""
    normalized_lang = "tr" if (lang or "").startswith("tr") else "en"
    text = CATALOG.get(normalized_lang, {}).get(key) or CATALOG["en"].get(key, key)
    if kwargs:
        return text.format(**kwargs)
    return text


def translate_error_code(code: int | None, lang: str | None = "en") -> str:
    """Translate a numeric hardware error code using the i18n catalog."""
    c = int(code or 0)
    key = f"error_{c}"
    normalized_lang = "tr" if (lang or "").startswith("tr") else "en"
    if c in range(15):
        return translate(key, lang=normalized_lang)
    return f"Hata {c}" if normalized_lang == "tr" else f"Error {c}"


def translate_clean_sub_status(status: int | str | None, lang: str | None = "en") -> str:
    """Translate clean sub-status using the i18n catalog."""
    try:
        s = int(status or 0)
        normalized_lang = "tr" if (lang or "").startswith("tr") else "en"
        return translate(f"clean_sub_{s}", lang=normalized_lang)
    except (ValueError, TypeError):
        return str(status or "")
