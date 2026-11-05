# Botslab Vacuum Robot — Home Assistant Entegrasyonu

[![English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![Turkish](https://img.shields.io/badge/Dil-T%C3%BCrk%C3%A7e-red.svg)](#)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.1%2B-blue.svg?logo=home-assistant)](https://www.home-assistant.io)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?logo=home-assistant)](https://hacs.xyz)
[![Lisans: MIT](https://img.shields.io/badge/Lisans-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.14.2%2B-3776AB.svg?logo=python)](https://www.python.org)

**Botslab** ve **Qihoo 360** robot süpürgeler için doğrudan kullanıma hazır Home Assistant entegrasyonu. Botslab Cloud'a gömülü **QUC Kimlik Doğrulama** (DES + RSA + MD5 imza üretimi) üzerinden bağlanır; robot kontrollerini, sensörleri, oda temizliğini ve anlık durum verilerini Home Assistant'a aktarır.

---

## 📱 Desteklenen Cihazlar

| Model | Durum | Notlar |
|---|---|---|
| **Botslab S8** | ✅ **Destekleniyor & Doğrulandı** | Fiziksel cihazda bizzat test edildi. Tam kontroller, oda temizliği, harita |
| **Qihoo 360 S6** | ✅ **Destekleniyor & Doğrulandı** | Çin (360 Smart Life) sunucusu üzerinden fiziksel cihazda topluluk tarafından bizzat test edilip doğrulandı ([Issue #1](https://github.com/srg-n/ha-botslab-vacuum/issues/1)). Tam kontroller, anlık durum, canlı harita |
| **Botslab S8 Plus** | ⚠️ **Test Edilmedi (Çalışması Beklenir)** | Aynı bulut API mimarisi — geri bildirim ve testler beklenir |
| **Botslab S7 / S9 / S10** | ⚠️ **Test Edilmedi (Çalışması Beklenir)** | Uluslararası veya Çin sunucusu üzerinden uyumlu mimari |
| **Qihoo 360 (S5, S7, S9, X90)** | ⚠️ **Deneysel Destek** | Çin (360 Smart Life) bölge seçeneği ile protokol desteği |

> 💡 **Hangi Sunucu Bölgesini (Server Region) Seçmelisiniz? (Altın Kural)**
> Seçiminiz, evinizin fiziksel konumuna göre DEĞİL, **süpürgenizin kayıtlı olduğu mobil uygulamaya göre** belirlenir:
> 
> 1. **Süpürgeniz "360 Robot" veya "360 Smart Life" uygulamasında kayıtlıysa (örn. 360 S5, S6, S7, S9, X90):**
>    - **Seçilecek Bölge:** **`China Mainland (360 Smart Life)` (`cn`)**
>    - ⚠️ **Avrupa'da veya Türkiye'de yaşıyor olsanız dahi**, eski model bir 360 süpürgeniz varsa mutlaka **`China Mainland (360 Smart Life)`** bölgesini seçmelisiniz! Çünkü eski 360 ekosistemi tüm dünyadaki cihazları merkezi Qihoo sunucusuna (`q.smart.360.cn` / `passport.360.cn`) bağlar. `Europe 1` seçerseniz sunucu *Hesap bulunamadı* hatası verecektir. Giriş yaparken 360 uygulamasındaki e-posta ve şifrenizi kullanın.
> 
> 2. **Süpürgeniz modern "Botslab" uygulamasında kayıtlıysa (örn. Botslab S8, S8 Plus):**
>    - **Seçilecek Bölge:** Fiziksel olarak bulunduğunuz bölge (örn. Türkiye ve Avrupa için **`Europe 1 (Frankfurt)`**, ABD için **`North America`** vb.).
>    - Bu modeller modern bölgesel Botslab IoT bulutunu (`*-sapp-api.botslab.com`) kullanır. Elektronik su tankı debisi, halı güç artırma ve anlık QPush telemetrisi dahil tüm IoT TSL özelliklerini destekler.

---

## 🌟 Temel Özellikler

- 🔐 **Otomatik Giriş:** ADB, root, paket koklama veya proxy gerekmez. Yalnızca Botslab mobil uygulama e-posta ve şifrenizi girmeniz yeterlidir.
- 🧹 **Kapsamlı Süpürge Kontrolleri:**
  - Başlat / Temizle, Duraklat, Durdur, Şarja Dön (Dock)
  - Fan Hızı seçimi (`Quiet`, `Standard`, `Medium`, `Max`)
  - Su Seviyesi seçimi (`Low`, `Medium`, `High`)
  - Temizlik Modu seçimi (`Vacuum & Mop`, `Vacuum Only`, `Mop Only`)
  - Robotu Bul sesli uyarısı (`locate`)
- 🚪 **Dinamik Oda Temizliği & Yasaklı Alanlar (No-Go Zones):**
  - Haritanızdaki bölünmüş odaları otomatik olarak tanır
  - Home Assistant üzerinden oda bazlı temizlik servislerini doğrudan tetikler
  - **Yasaklı Alanlar (`SetFbdPlaces`):** Home Assistant servis çağrısıyla doğrudan haritaya sanal duvar ve girilmez alanlar tanımlayabilme
- 🗺️ **Gelişmiş Yüksek Çözünürlüklü Harita & Sıfır Yapılandırmalı Kartlar:**
  - Pillow tabanlı dinamik kenar kırpma (auto-crop) ile gereksiz siyah boşlukları yok etme
  - Yeşil şarj istasyonu ikonu, camgöbeği (cyan) anlık temizlik rotası ve robotun baktığı yönü gösteren yön oku
  - Harici HACS indirmesi gerektirmeyen, otomatik yüklenen hazır Lovelace kartları (`xiaomi-vacuum-map-card` ve `botslab-routines-card`)
- ⏱️ **HA Tabanlı Rutin & Zamanlayıcı Motoru:**
  - İstenen günlerde, saatlerde, seçili odalarda ve farklı emiş güçlerinde otomatik temizlik rutinleri
  - Home Assistant dahili hafızasında saklanır (yeniden başlatmalardan etkilenmez)
  - Özel zamanlama sensörü ve Türkçe/İngilizce otomatik dil destekli kontrol kartı
- ⚡ **Dinamik Durum Geçiş Takipçisi (State Transition Watcher):**
  - Komut verildiğinde yapay (iyimser) durumlar uydurmak yerine bulutu 1.5 saniyelik seri aralıklarla kontrol eden döngü
  - Temizlik başladığında veya bittiğinde arayüzde sıfır gecikmeyle anında gerçek durumu yansıtma
- 📊 **Sarf Malzemesi & Bakım Sensörleri:**
  - HEPA Filtre kalan ömrü (saat)
  - Ana Fırça kalan ömrü (saat)
  - Yan Fırça kalan ömrü (saat)
  - Sensör temizleme bakım durumu (saat)
  - Toplam temizlenen alan (m²) ve toplam temizlik süresi (saat)
  - Hata kodu ve tanı durumu
- ⚙️ **Anahtarlar & Ayarlar:**
  - Halı Güç Artırma (Carpet Auto-Boost) anahtarı
  - Çarpışma Koruması anahtarı
  - Buton Işığı anahtarı
  - Ses Seviyesi ayarı (`%0 - %100`)

---

## 🚀 Kurulum

### Tercih Edilen: HACS Özel Depo ile Kurulum (ÖNERİLEN) ⭐

Dosya indirme veya kopyalama işlemleriyle uğraşmadan, doğrudan HACS üzerinden saniyeler içinde kurabilirsiniz:

1. Home Assistant yan menüsünden **HACS** ➔ **Entegrasyonlar** (Integrations) bölümüne girin.
2. Sağ üst köşedeki **üç noktaya** (`⋮`) tıklayın ve **Özel depolar** (Custom repositories) seçeneğini seçin.
3. Depo (Repository) kutusuna bu GitHub URL'sini yapıştırın:
   ```text
   https://github.com/srg-n/ha-botslab-vacuum
   ```
4. Kategori olarak **Entegrasyon** (Integration) seçin ve **Ekle** (Add) butonuna basın.
5. Listede beliren **Botslab Vacuum Robot** kutusuna tıklayıp sağ alt köşedeki **İndir** (Download) butonuna basın.
6. **Home Assistant'ı yeniden başlatın** (**Ayarlar ➔ Sistem ➔ Yeniden Başlat**).
7. **Ayarlar ➔ Cihazlar ve Hizmetler ➔ Entegrasyon Ekle** adımlarını izleyin, **"Botslab Vacuum"** aratın ve giriş yapın:
   - **Modern Botslab Modelleri (örn. S8):** Bulunduğunuz bölgeyi (örn. `Europe 1 (Frankfurt)`) seçin ve Botslab mobil uygulama e-posta ve şifrenizle giriş yapın.
   - **Eski Nesil Qihoo 360 Modelleri (örn. S5, S6, S7):** Avrupa'da veya Türkiye'de yaşıyor olsanız dahi bölge olarak **`China Mainland (360 Smart Life)`** seçin ve 360 Smart Life / 360 Robot uygulaması e-posta ve şifrenizle giriş yapın.

---

### Alternatif: Manuel Klasör Kopyalama (HACS Olmadan)

Eğer HACS kullanmıyorsanız:

1. Bu repodaki `custom_components/botslab_vacuum` klasörünü Home Assistant `/config/custom_components/` dizinine kopyalayın:
   ```bash
   cp -r custom_components/botslab_vacuum /config/custom_components/
   ```
2. Home Assistant'ı yeniden başlatın.
3. **Ayarlar ➔ Cihazlar ve Hizmetler ➔ Entegrasyon Ekle** üzerinden **Botslab Vacuum** entegrasyonunu ekleyin.

---

## 📚 Dokümantasyon & Teknik Referanslar

Protokol analizi, servis yükleri ve mimari detaylar için `docs/` klasöründeki teknik belgeleri inceleyebilirsiniz:

- [Protokol Spesifikasyonu (`docs/PROTOCOL.md`)](docs/PROTOCOL.md) — Ağ protokolü, imzalama şeması, QUC kimlik adımları ve Alibaba Cloud OSS / Alink etkileşimleri.
- [Kontrol & Komut Referansı (`docs/CONTROL.md`)](docs/CONTROL.md) — Bulut komutları (`SetFbdPlaces`, `StartCleanInAreas` vb.), servis şemaları ve oda temizlik yükleri.
- [Entegrasyon Mimarisi (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md) — Sistem veri akışı, hibrit QPUSH + uyarlanabilir sorgulama modeli, Pillow harita işleme ve dahili rutin motoru.

---

## 🔬 Teknik Mimari

Robot süpürgelerimizin bulut iletişimi 3 katmanlı tescilli bir altyapı üzerinde çalışır:

```
[ Bizim Entegrasyon / HA ]
               │
               ▼ (1. HTTPS QUC Auth & invoke_service)
     [ Botslab Cloud Backend (eu1-sapp-api.botslab.com) ]
               │                                   │
               ▼ (2. Alink Downlink)               ▼ (3. QPUSH Gateway)
        [ Robot Süpürge ]                    [ Home Assistant Dinleyici ]
  (Aliyun MQTT, Frankfurt broker)        (dp.push.dc.360.cn -> 8.211.52.133)
```

### 1. Qihoo QPUSH Nedir?
* **Protokol:** Qihoo ve Botslab'ın mobil uygulamalara anlık bildirim göndermek için geliştirdiği tescilli ikili TCP bildirim protokolüdür (`dp.push.dc.360.cn` -> `8.211.52.133`).
* **İşlevi:** QPUSH robota komut göndermek için **kullanılmaz**. Robot temizliğe başladığında, harita dosyası ürettiğinde veya bir hata verdiğinde sunucunun istemciye "durum güncellendi" sinyali fırlatması (`OP_PUSH`) için kullanılır.
* **İsteğe bağlıdır:** Entegrasyon temizlik sırasında 30sn, boştayken 120sn aralıklarla zaten sorgulama yapar; QPUSH olmasa da tam çalışır.

### 2. Alibaba Cloud (Aliyun) Alink ve Robota Komut İletimi
* Botslab S8, donanımsal olarak **Alibaba Cloud IoT (Alink)** protokolünü kullanır (`ProductKey: 7347e727042a`).
* Süpürge standby/uyku modundayken evinizin Wi-Fi ağı üzerinden Alibaba'nın Frankfurt broker'ına sürekli bir MQTT tüneli açık tutar.
* Biz entegrasyon üzerinden başlatma, durdurma veya oda temizleme komutu verdiğimizde, Botslab Cloud kurumsal Alibaba yetkisi üzerinden bu komutu Alink protokolüyle cihazın açık bekleyen tüneline fırlatır ve süpürge uyku modundan çıkar.

### 3. Neden Bizde DeviceSecret Yok ve Gerekli Değil?
* Alibaba Cloud IoT protokolünde broker'a doğrudan cihaz olarak bağlanmak için `DeviceSecret` gereklidir.
* Bu gizli anahtar, robot fabrikada üretilirken doğrudan **anakarttaki şifreli flash belleğe (Secure Storage/EEPROM)** kazınır. Mobil uygulamaya dahi gönderilmez.
* Ayrıca Alibaba Cloud IoT tek bir seri numarası için **aynı anda sadece 1 aktif MQTT soketine** izin verir. Dışarıdan doğrudan bağlanılmaya çalışılsaydı evdeki gerçek süpürgenin bağlantısı koparılırdı (*kicked offline*).
* Bu nedenle entegrasyonumuz, resmi Botslab uygulamasının da kullandığı güvenli ve resmi `invoke_service` API tünelini kullanarak robotu sorunsuz şekilde yönetir.

### 4. Resmi uygulamanın bağlandığı sunucular

Resmi uygulamanın ağ trafiği incelendiğinde **hiçbir özel (yerel) adrese bağlanılmadığı** görülüyor. Robot ev ağınızda hiçbir port dinlemiyor; kendisi buluta dış bağlantı kuruyor. Entegrasyonun kullandığı tüm sunucular:

| Sunucu | İşlev | Kullanılıyor mu? |
|---|---|---|
| `eu1-sapp-api.botslab.com` | Cihaz listesi, özellikler, `invoke_service` komutları, OTA | Evet |
| `eu1-sapp-login.botslab.com` | QUC e-posta/parola kimlik doğrulama | Evet |
| `eu1-ali-*-days.oss-eu-central-1.aliyuncs.com` | Harita paketi yükleme/indirme (Alibaba OSS) | Evet |
| `dp.push.dc.360.cn` -> `8.211.52.133` | QPush gateway adres çözümleme | İsteğe bağlı |
| `eu1-video-iotext.botslab.com` | Firmware indirme | Kullanılmıyor |
| `eu1-ad2-app.botslab.com` | Reklam | Kullanılmıyor |
| `eu1-logs-app.botslab.com` | Telemetri / crash log | Kullanılmıyor |
| `ad.iot.360.cn`, `qos.live.360.cn`, `wenjuan.lap.360.cn`, `q5.jia.360.cn` | Reklam, telemetri, anket | Kullanılmıyor |
| `q.smart.360.cn`, `passport.360.cn` | Eski nesil Qihoo 360 Çin bulutu (komutlar, kayıtlar, harita) | `cn` bölgesi için kullanılır |

`eu1`, `eu2`, `na1`, `ap1` ve `cn` (eski nesil Qihoo 360 / 360 Smart Life sunucusu `q.smart.360.cn`) bölgeleri için bölgesel karşılıkları mevcuttur.

> **Bu donanımda yerel çalıştırma mümkün değildir.** Robot yalnızca dışa doğru bulut bağlantısı kurduğu için yerel bir API bulunmuyor. Bu deponun önceki sürümlerinde yer alan MQTT bridge kaldırıldı: bulut bağımlılığını ortadan kaldırmadan fazladan bir süreç ve broker ekliyordu, ayrıca artık entegrasyonun içinde olan kodun kopyasıydı.

### 5. Stabilite uyarısı

Bu entegrasyon **belgelenmemiş bulut endpoint'lerine** ve resmî Android uygulamasının içindeki imza anahtarına dayanır. Botslab API'yi değiştirirse entegrasyon güncellenene kadar çalışmayabilir. Uyumluluk garantisi verilmemektedir.

---

## 🎨 Home Assistant Dashboard / Kart Örneği

Standart Vakum Kartı ve [Xiaomi Vacuum Map Card](https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card) ile kullanım için örnek konfigürasyon `lovelace_card_example.yaml` dosyasında yer almaktadır. Harita kartı; haritadan oda seçerek temizleme, dikdörtgen bölge temizleme ve haritada bir noktaya gitme özelliklerini içerir.

```yaml
type: vacuum-card
entity: >
  {%- set ids = states('vacuum') | selectattr('entity_id', 'match', '_vacuum$')
                              | map(attribute='entity_id') | list -%}
  {{ ids | first }}
show_toolbar: true
```

Entity'ler robotun seri numarasına göre adlandırıldığı için, yukarıdaki Jinja bloğu sizin hiçbir şeyi düzenlemenize gerek kalmadan doğru entity'yi bulur.

### Sıfır Yapılandırmalı Dahili Kartlar

Gerekli Lovelace kartları entegrasyonla birlikte gelir ve başlatma sırasında otomatik olarak Home Assistant'a kaydedilir:
- `/botslab_vacuum/www/xiaomi-vacuum-map-card.js` (Oda seçimi, bölge temizliği ve nokta navigasyonu sunan harita kartı)
- `/botslab_vacuum/www/botslab-routines-card.js` (Otomatik Türkçe/İngilizce dil destekli rutin ve zamanlama yönetim kartı)

Harici olarak HACS üzerinden kart aramanıza veya kaynak eklemenize gerek yoktur.

### 🗺️ Eviniz İçin Harita Kartı Üretme ve Panoya Ekleme Rehberi

Oda konturları ve poligon sınırları evinize özeldir; Botslab uygulamasında oda böldüğünüzde veya adını değiştirdiğinizde güncellenir. Bu koordinatları elle tek tek çıkarmak yerine entegrasyon tek tıkla üretir:

1. Robot en son haritayı sunucuya göndersin diye Home Assistant'ta **Haritayı Senkronize Et** (`Sync Map`) butonuna basın.
2. Ardından **Harita Kartı Yapılandırması Üret** (`Generate Map Card Config`) butonuna basın.
3. Entegrasyon, evinizin tüm oda sınırlarını ve kalibrasyonunu içeren hazır kart kodunu Home Assistant ana dizinindeki **`/config/botslab_map_card.yaml`** dosyasına yazar ve sol menüdeki **Bildirimler (Notifications)** alanına bir bilgi mesajı bırakır.

#### 📌 Dosyayı Panonuza (Dashboard) Ekleme Adımları:

1. **Dosya İçeriğini Kopyalayın:**  
   Home Assistant içindeki **File Editor** (veya Studio Code Server / Samba) eklentisiyle `/config/botslab_map_card.yaml` dosyasını açıp içindeki tüm metni kopyalayın (`Ctrl+A`, `Ctrl+C`).
2. **Panonuzu Açın:**  
   Home Assistant sol menüsünden süpürgenizi eklemek istediğiniz **Panoya (Dashboard)** gidin.
3. **Düzenleme Moduna Geçin:**  
   Sağ üst köşedeki **üç nokta (⋮)** simgesine tıklayıp **Panoyu Düzenle** (Edit Dashboard) deyin.
4. **Manuel Kart Ekleyin:**  
   Sağ alttaki mavi **+ Kart Ekle** (+ Add Card) butonuna basın. Açılan kart listesinin en aşağısına inerek **Manuel (Manual)** kart türünü seçin.
5. **Kodu Yapıştırın ve Kaydedin:**  
   Kutudaki mevcut örnek kodu silin, kopyaladığınız YAML kodunu yapıştırın ve **Kaydet** butonuna basın.

> [!WARNING]
> **Önemli Hata Uyarısı:**  
> Kopyaladığınız kod **tek bir karta** aittir. Bu kodu panonun en üstündeki **"Ham Yapılandırma Düzenleyicisi" (Raw configuration editor)** içine **YAPIŞTIRMAYIN**. Aksi halde Home Assistant panonun tamamını bozup `At path: views -- Expected an array value` hatası verecektir. Her zaman **+ Kart Ekle ➔ Manuel** adımını kullanın.

> [!TIP]
> Botslab uygulamasından odaları yeniden bölerseniz veya haritanız değişirse; sadece yukarıdaki iki butona tekrar basıp üretilen yeni YAML'ı kart düzenleyicisine yapıştırmanız yeterlidir.

### Zamanlanmış Rutinler Kart Örneği

Dashboard'unuza Türkçe destekli rutin yönetim kartını eklemek için:

```yaml
type: custom:botslab-routines-card
entity: sensor.botslab_schedules_CIHAZ_ID
vacuum_entity: vacuum.botslab_vacuum_CIHAZ_ID
```

Odaları değiştirdikten sonra 2. ve 3. adımları tekrarlayın.

---

## 🤝 Katkıda Bulunma & Lisans

Yalnızca Botslab S8 modeli doğrulandığı için diğer modellerle (S8 Plus, S7, S9, S10) test sonuçları ve pull request'ler memnuniyetle karşılanır!  
Bu proje [MIT Lisansı](LICENSE) ile açık kaynak olarak sunulmuştur.
