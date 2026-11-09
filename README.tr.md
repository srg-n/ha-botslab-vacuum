# Botslab Vacuum Robot — Home Assistant Entegrasyonu

[![English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![Turkish](https://img.shields.io/badge/Language-T%C3%BCrk%C3%A7e-red.svg)](#)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.1%2B-blue.svg?logo=home-assistant)](https://www.home-assistant.io)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?logo=home-assistant)](https://hacs.xyz)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.14.2%2B-3776AB.svg?logo=python)](https://www.python.org)

**Botslab** ve **Qihoo 360** robot süpürgeleri için hazırlanmış, üretime hazır Home Assistant entegrasyonu. Botslab Bulutuna doğrudan gömülü **QUC Kimlik Doğrulama** (DES + RSA + MD5 imza üretimi) ile bağlanarak süpürge kontrollerini, sensörlerini, oda temizliğini ve canlı telemetrisini Home Assistant'a aktarır.

---

## 📱 Desteklenen Modeller

| Model | Durum | Notlar |
|---|---|---|
| **Botslab S8** | ✅ **Destekleniyor & Doğrulandı** | Donanım üzerinde test edildi. Tam süpürge kontrolleri, oda temizliği, canlı harita ve sensörler |
| **Qihoo 360 S6** | ✅ **Destekleniyor & Doğrulandı** | Topluluk tarafından Çin Anakara sunucusu üzerinden test edildi ve doğrulandı ([Issue #1](https://github.com/srg-n/ha-botslab-vacuum/issues/1)). Tam kontroller, harita ve sarf malzemeleri |
| **Botslab S8 Plus** | ⚠️ **Test Edilmedi (Çalışması Bekleniyor)** | Aynı TSL bulut API mimarisi — geri bildirim ve testler memnuniyetle karşılanır |
| **Botslab S7 / S9 / S10** | ⚠️ **Test Edilmedi (Çalışması Bekleniyor)** | Uluslararası veya Çin sunucusu üzerinden aynı bulut mimarisi |
| **Qihoo 360 (S5, S7, S9, X90)** | ⚠️ **Deneysel Destek** | Çin Anakara (360 Smart Life) sunucu bölgesi üzerinden protokol desteği |

> 💡 **Hangi Sunucu Bölgesini Seçmelisiniz? (Altın Kural)**
> Bölge seçimi nerede yaşadığınıza değil, **süpürgenizin kayıtlı olduğu mobil uygulamaya** kesin olarak bağlıdır:
> 
> 1. **Eğer süpürgeniz "360 Robot" veya "360 Smart Life" uygulamasındaysa (örn. 360 S5, S6, S7, S9, X90):**
>    - **Seçin:** **`China Mainland (360 Smart Life)` (`cn`)**
>    - ⚠️ **Avrupa'da, Türkiye'de veya Amerika'da yaşıyor olsanız bile**, **`China Mainland (360 Smart Life)`** seçeneğini seçmek **zorundasınız**! Eski 360 süpürgeleri Qihoo'nun merkezi Çin altyapısına (`q.smart.360.cn` / `passport.360.cn`) bağlanır. `Europe 1` seçerseniz *Hesap bulunamadı* hatası alırsınız. Mevcut 360 uygulama e-posta ve şifrenizi kullanın.
> 
> 2. **Eğer süpürgeniz modern "Botslab" uygulamasındaysa (örn. Botslab S8, S8 Plus veya yeni modeller):**
>    - **Seçin:** Coğrafi bölgenizi (örn. Türkiye/Avrupa için **`Asia Pacific`** veya **`Europe 1 (Frankfurt)`**).
>    - Bu modeller modern bölgesel Botslab IoT bulutunu (`*-sapp-api.botslab.com`) kullanır.

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
- 🗺️ **Gelişmiş Yüksek Çözünürlüklü Harita & Dahili Kartlar:**
  - Pillow tabanlı dinamik kenar kırpma (auto-crop) ile gereksiz siyah boşlukları yok etme
  - Yeşil şarj istasyonu ikonu, canlı temizlik rotası ve robotun baktığı yönü gösteren yön oku
  - **Otomatik Yüklenen Dahili Kartlar:**
    - **`botslab-vacuum-map-card`**: Görsel arayüz düzenleyicisi (Visual UI Editor), sıralı oda temizliği (1 -> 2), odaya özel emiş gücü / su debisi ayarı, nokta temizliği ve serbest bölge seçimi sunan modern harita kartı (*noambergauz/dreame-vacuum-map-card* baz alınarak uyarlanmıştır).
    - **`botslab-routines-card`**: Tam teşekküllü Türkçe/İngilizce destekli, görsel düzenleyicili temizlik rutin ve zamanlama yönetim kartı.
- 📡 **Dinamik QPush Ağ Geçidi & Canlı Telemetri:**
  - `dp.push.dc.360.cn` üzerinden dinamik IP çözümü, ham binary TCP Port 443 (öncelikli) ve Port 80 (yedek) bağlantısı
  - Milimetre hassasiyetinde kartezyen konum $[x, y, \theta]$ ve anlık temizlik rotası takibi
- ⏱️ **Çift Kademeli Dinamik Polling & Watchdog Güvenlik Motoru:**
  - **Aktif Temizlik (5s):** 5 saniyelik seri telemetri ve Alibaba OSS `1days` canlı harita akışı
  - **Firmware Güvenlik Watchdog:** 60 saniyelik donanım güvenlik zaman aşımı ve 50 saniyelik keepalive döngüsü (`StartSyncMapPkgToOss`); temizlik bittiğinde derhal sonlandırma (`StopSyncMapPkgToOss`)
  - **Boşta / Şarjda (5 dakika):** Ev Wi-Fi ağını ve robot işlemcisini yormamak için 300 saniyelik rölanti modu; QPush arka plan TCP soketi durum değişiminde Home Assistant'ı anında uyandırır
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

### Tercih Edilen: Home Assistant Marketplace / HACS ile Kurulum (ÖNERİLEN) ⭐

Dosya indirme veya kopyalama işlemleriyle uğraşmadan, doğrudan HACS veya Home Assistant Marketplace üzerinden kurabilirsiniz:

> [!NOTE]
> **Marketplace Uyumlu:** Bu entegrasyon HACS dahili sinyallerine veya özel depolama alanına bağımlı değildir; resmî Home Assistant Core manifest kurallarına tam uyumludur. **Ayarlar ➔ Sistem ➔ Onarımlar** menüsünde tam Marketplace desteği sunar.

#### Home Assistant Marketplace ile (HA 2026+):
1. Home Assistant sol menüsünden **Marketplace** (veya **Ayarlar ➔ Sistem ➔ Marketplace**) bölümüne girin.
2. Sağ üst köşedeki **üç noktaya** (`⋮`) tıklayın ve **Özel depolar** (Custom repositories) seçeneğini seçin.
3. Depo (Repository) kutusuna bu GitHub URL'sini yapıştırın:
   ```text
   https://github.com/srg-n/ha-botslab-vacuum
   ```
4. Kategori olarak **Entegrasyon** (Integration) seçin ve **Ekle** (Add) butonuna basın.
5. Listede beliren **Botslab Vacuum Robot** kutusuna tıklayıp sağ alt köşedeki **İndir / Yükle** (Install) butonuna basın.
6. **Home Assistant'ı yeniden başlatın** (**Ayarlar ➔ Sistem ➔ Yeniden Başlat**).

#### HACS ile (Legacy):
1. Home Assistant sol menüsünden **HACS** ➔ **Entegrasyonlar** (Integrations) bölümüne girin.
2. Sağ üst köşedeki **üç noktaya** (`⋮`) tıklayın ve **Özel depolar** (Custom repositories) seçeneğini seçin.
3. Depo alanına `https://github.com/srg-n/ha-botslab-vacuum` yapıştırıp kategori olarak **Integration** seçin ve **Add** deyin.
4. Listede **Botslab Vacuum Robot** entegrasyonunu bulup **Download** butonuna basın.
5. Home Assistant'ı yeniden başlatın.

#### Hesap Yapılandırması & Bölge Seçimi:
Yeniden başlatmanın ardından **Ayarlar ➔ Cihazlar ve Hizmetler ➔ Entegrasyon Ekle** bölümüne gidip **Botslab Vacuum** arayın ve giriş yapın:
- **Botslab modelleri için (örn. S8, S8 Plus):**
  - Türkiye veya Orta Doğu hesabı kullanıyorsanız öncelikle **`Asia Pacific`** seçin.
  - Veya hesabınızın ait olduğu bölgeye göre **`Europe 1 (Frankfurt)`**, **`Europe 2`** ya da **`North America`** seçin.
- **Eski Qihoo 360 modelleri için (örn. S5, S6, S7, S9, X90):**
  - Dünyanın neresinde yaşıyor olursanız olun **`China Mainland (360 Smart Life)`** seçin ve 360 Smart Life uygulama bilgilerinizi girin.

---

## 🎨 Home Assistant Dashboard & Dahili Kartlar

Entegrasyon, Home Assistant tarafından doğrudan sunulan **iki dahili Lovelace kartı** ile birlikte gelir. Ayrı bir kart indirme veya Lovelace kaynak (resource) yapılandırması yapmanız gerekmez!

### 1. `botslab-vacuum-map-card` (İnteraktif Harita Kartı)

Botslab robot süpürgeleri için özel olarak geliştirilmiş modern harita kartı:

- **Sıralı Oda Temizliği:** Harita üzerindeki odalara doğrudan tıklayarak seçin. Oda üzerindeki numaralar (`1`, `2`, `3`) temizliğin hangi sırayla yapılacağını gösterir.
- **Otomatik Rota (Auto-Order) Seçeneği:** Odaların seçtiğiniz sırayla mı yoksa robotun hesaplayacağı en kısa rotayla mı temizleneceğini tek tıkla belirleyin.
- **Odaya Özel Ayarlar:** Her oda için bağımsız olarak çekim gücü (Quiet, Standard, Strong, Max), su debisi (Low, Medium, High) ve tekrar sayısı (1x veya 2x) belirleyin.
- **Bölge Temizliği (Zone Clean):** Harita üzerinde dikdörtgen temizlik alanları çizerek sadece o bölgeyi temizletin.
- **Nokta Temizliği (Go To / Spot Clean):** Haritada herhangi bir noktaya tıklayarak süpürgeyi o konuma gönderin.
- **Canlı Katmanlar:** Canlı robot konumu, baktığı yönü gösteren yön oku, yeşil şarj istasyonu ikonu ve anlık temizlik rotası çizgisi.
- **Harita Kontrolleri:** Yakınlaştırma (zoom), kaydırma (pan) ve 90 derecelik açılarla haritayı döndürme butonları.
- **Görsel Kart Düzenleyicisi (Visual Editor):** YAML kodlarıyla uğraşmadan, menüden süpürgenizi seçip anında önizleme alabilirsiniz.

#### Harita Kartını Panonuza Ekleme:
1. Panonuzu açın, sağ üst köşedeki **üç noktaya (⋮)** tıklayıp **Panoyu Düzenle** (Edit Dashboard) deyin.
2. Sağ alttaki **+ Kart Ekle** (+ Add Card) butonuna basın.
3. Arama kutusuna **Botslab** yazın ve **Botslab Vacuum Map Card** seçeneğini seçin.
4. Görsel düzenleyici süpürge ve harita kamerası entity'lerinizi otomatik olarak tanımlar.
5. **Kaydet** butonuna basın!

Veya YAML / Manuel Kart olarak eklemek için:
```yaml
type: custom:botslab-vacuum-map-card
entity: vacuum.botslab_vacuum
map_entity: camera.botslab_map_camera
title: Botslab Vacuum
default_mode: room
# auto_order: false   # false (varsayılan): Robot odaları arayüzde seçtiğiniz sırada temizler (1 -> 2). true: Otomatik rota.
```

---

### 2. `botslab-routines-card` (Temizlik Rutinleri ve Zamanlayıcı)

Zamanlanmış temizlik planlarını doğrudan kontrol panelinizden yönetmenizi sağlayan kart:

- **Rutin Yönetimi:** Mobil uygulamayı açmaya gerek kalmadan yeni temizlik görevleri ekleyin, düzenleyin veya kapatıp açın.
- **Gün ve Saat Seçimi:** Temizliğin başlayacağı saat (SS:DD) ve haftanın tekrarlanacak günlerini belirleyin.
- **Oda ve Güç Seçimi:** Hangi odaların süpürüleceğini, çekim gücünü ve tekrar sayısını rutine özel yapılandırın.
- **Görsel Düzenleyici:** Menüden süpürgenizi seçerek kolayca yapılandırın.
- **Çift Dil Desteği:** Home Assistant kullanıcı dilinize göre otomatik olarak Türkçe veya İngilizce görüntülenir.

#### Rutin Kartını Panonuza Ekleme:
1. Panoyu Düzenle modundayken **+ Kart Ekle** butonuna basın.
2. **Botslab** aratıp **Botslab Routines Card** seçeneğini seçin.
3. Açılır menüden süpürgenizi seçin.
4. **Kaydet** butonuna basın!

Veya YAML / Manuel Kart olarak:
```yaml
type: custom:botslab-routines-card
entity: vacuum.botslab_vacuum
```

---

## 📚 Dokümantasyon & Teknik Referanslar

Derinlemesine protokol analizi, payload şemaları ve mimari detaylar için `docs/` klasöründeki teknik rehberleri inceleyebilirsiniz:

- [Protokol Spesifikasyonu (`docs/PROTOCOL.md`)](docs/PROTOCOL.md) — Ağ protokolü, imzalama algoritmaları, QUC adımları ve Alibaba Cloud OSS / Alink detayları.
- [Kontrol & Payload Referansı (`docs/CONTROL.md`)](docs/CONTROL.md) — Bulut komut kataloğu (`SetFbdPlaces`, `StartCleanInAreas` vb.), servis payload şemaları ve oda temizlik formatları.
- [Entegrasyon Mimarisi (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md) — Sistem akışı, hibrit QPUSH + dinamik polling modeli, Pillow harita motoru ve dahili rutin mimarisi.

---

## 🔬 Teknik Mimari

Süpürgenin bulut iletişimi 3 katmanlı özel bir mimari üzerinde çalışır:

```
[ Entegrasyon / Home Assistant ]
               │
               ▼ (1. HTTPS QUC Auth & invoke_service)
     [ Botslab Bulut Sunucusu (eu1-sapp-api.botslab.com) ]
               │                                   │
               ▼ (2. Alink Downlink)               ▼ (3. QPUSH Ağ Geçidi)
         [ Robot Süpürge ]                  [ Home Assistant Dinleyicisi ]
  (Aliyun MQTT, Frankfurt sunucusu)       (Dinamik GSLB dp.push.dc.360.cn -> Port 443/80)
```

### 1. Qihoo QPUSH Nedir?
* **Protokol:** Qihoo ve Botslab tarafından anlık istemci bildirimleri için geliştirilmiş ikili (binary) bir TCP itme protokolüdür. Entegrasyon, bölgesel push gateway IP'lerini `dp.push.dc.360.cn?appId=gqrwex6nq54m` üzerinden dinamik çözer ve doğrudan ham ikili TCP Port 443 (öncelikli) veya Port 80 (yedek) ile bağlanır.
* **Görevi:** QPUSH komut göndermek için **kullanılmaz**. Süpürge temizliğe başladığında, harita yüklediğinde veya hata verdiğinde bulut `OP_PUSH` paketi yollar ve Home Assistant arayüzü anında güncellenir.
* **Çift Kademeli Dinamik Polling:** Entegrasyon, aktif temizlik esnasında her **5 saniyede bir** veri çeker. Cihaz şarjdayken veya boştayken Wi-Fi ağını ve robot işlemcisini yormamak için **5 dakikalık (300s)** bekleme moduna geçer. Herhangi bir durum değişikliğinde QPUSH TCP soketi Home Assistant'ı derhal uyandırır.

### 2. Alibaba Cloud (Aliyun) Alink ve Downlink Komutları
* Botslab S8 donanımı **Alibaba Cloud IoT (Alink)** platformunu (`ProductKey: 7347e727042a`) kullanır.
* Süpürge bekleme/uyku modundayken Alibaba'nın Frankfurt broker'ına aktif bir Alink MQTT bağlantısı tutar.
* Biz Home Assistant'tan başlat, durdur veya oda temizliği komutu gönderdiğimizde, Botslab Bulutu kurumsal Alibaba Cloud yetkileriyle Alink downlink tünelinden süpürgenin aktif soketine komutu iletir ve cihazı anında uyandırır.

### 3. DeviceSecret Neden Gerekli Değildir?
* Alibaba Cloud IoT platformuna doğrudan cihaz gibi bağlanmak için bir `DeviceSecret` gerekir.
* Bu anahtar üretim sırasında robotun **donanımsal güvenli EEPROM hafızasına** yazılır; mobil uygulamaya veya bulut hesabına asla aktarılmaz.
* Ayrıca Alibaba Cloud IoT **cihaz adı başına tek bir aktif MQTT oturumuna** izin verir. Cihaz gibi doğrudan bağlanmaya çalışmak evinizdeki gerçek süpürgenin bağlantısını koparacaktır.
* Bu sebeple bu entegrasyon resmî mobil uygulamanın yaptığı gibi `invoke_service` API tünelini kullanır.

### 4. Resmî Uygulamanın Bağlandığı Adresler

Resmî uygulamanın ağ trafiği incelendiğinde **hiçbir yerel/özel ağ adresiyle iletişim kurmadığı** görülür. Süpürge yerel ağdan gelen bağlantıları kabul etmez, dışarıdaki buluta bağlanır. Entegrasyonun kullandığı adresler:

| Sunucu | Amaç | Kullanılıyor mu? |
|---|---|---|
| `eu1-sapp-api.botslab.com` | Cihaz listesi, özellikler, `invoke_service` komutları, OTA | Evet |
| `eu1-sapp-login.botslab.com` | QUC e-posta/şifre kimlik doğrulaması | Evet |
| `eu1-ali-*-days.oss-eu-central-1.aliyuncs.com` | Alibaba OSS üzerinden harita paketi indirme/yükleme | Evet |
| `dp.push.dc.360.cn` -> `8.211.52.133` | QPush sunucu IP çözümlemesi | İsteğe bağlı |
| `q.smart.360.cn`, `passport.360.cn` | Eski Qihoo 360 Çin altyapısı (komutlar, harita) | `cn` bölgesi için |

### 5. Stabilite Uyarısı

Bu entegrasyon **belgelenmemiş bulut endpoint'lerine** ve resmî Android uygulamasının içindeki imza anahtarına dayanır. Botslab API'yi değiştirirse entegrasyon güncellenene kadar çalışmayabilir. Uyumluluk garantisi verilmemektedir.

---

## 👏 Teşekkür & Krediler (Credits)

- **[Noam Bergauz](https://github.com/noambergauz)** — Entegrasyonla birlikte gelen `botslab-vacuum-map-card`, Noam Bergauz'un harika [noambergauz/dreame-vacuum-map-card](https://github.com/noambergauz/dreame-vacuum-map-card) projesinden uyarlanmış; Botslab oda bölümlemeleri, canlı yön kalibrasyonu ve servislerine entegre edilmiştir.
- **Qihoo 360 & Botslab Topluluğu** — Eski 360 S6 / S7 protokollerinin test edilmesinde ve geliştirilmesinde katkı sunan tüm topluluk üyelerine teşekkürler.

---

## 🤝 Katkıda Bulunma & Lisans

Yalnızca Botslab S8 modeli doğrulandığı için diğer modellerle (S8 Plus, S7, S9, S10) test sonuçları ve pull request'ler memnuniyetle karşılanır!  
Bu proje [MIT Lisansı](LICENSE) ile açık kaynak olarak sunulmuştur.
