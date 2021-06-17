using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;
using AracSatis.Models;
using AracSatis.ViewModel;


namespace AracSatis.Controllers
{
    public class ServisController : ApiController
    {
        DB002Entities1 db = new DB002Entities1();
        SonucModel sonuc = new SonucModel();

        #region kategori

        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.kategoriler.Select(x => new KategoriModel()
            {

                katId = x.katId,
                katAdi = x.katAdi,
                katAracSay = x.araclar.Count()

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.kategoriler.Where(s => s.katId == katId).Select(x => new KategoriModel()
            {
                
                katId = x.katId,
                katAdi = x.katAdi,
                katAracSay = x.araclar.Count()

            }
            ).FirstOrDefault();
            
            return kayit;
        }
        [Authorize]
        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.kategoriler.Count(s => s.katAdi == model.katAdi) > 0)
            {
                
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Kayıtlıdır.";
                
                return sonuc;
            }

            kategoriler yeni = new kategoriler();
            yeni.katAdi = model.katAdi;
            db.kategoriler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Başarıyla Eklendi";
            return sonuc;
        }
        [Authorize]
        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            kategoriler kayit = db.kategoriler.Where(s => s.katId == model.katId).FirstOrDefault();

            if (kayit == null)
            {
               
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Kategori Yok";
                
                return sonuc;
            }

            kayit.katAdi = model.katAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Başarıyla Düzenlendi";
            
            return sonuc;
        }
        [Authorize]
        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
             kategoriler kayit = db.kategoriler.Where(s => s.katId == katId).FirstOrDefault();

            if (kayit == null)
            {
               
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Kategori Yok";
                
                return sonuc;
            }

            if (db.araclar.Count(s => s.aracKatId == katId) > 0)
            {
                
                sonuc.islem = false;
                sonuc.mesaj = "Bu Kategorinin İçerisinde Ürünler Var Kategori Silinemedi";
                
                return sonuc;
            }

            db.kategoriler.Remove(kayit);
            db.SaveChanges();
           
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
           
            return sonuc;
        }

        #endregion

        #region arac

        [HttpGet]
        [Route("api/aracliste")]
        public List<AracModel> AracListe()
        {
            List<AracModel> liste = db.araclar.Select(x => new AracModel()
            {

                aracId = x.aracId,
                aracAdi = x.aracAdi,
                aracFiyat = x.aracFiyat,
                aracBilgi = x.aracBilgi,
                aracStok = x.aracStok,
                aracFoto = x.aracFoto,
                aracKodu = x.aracKodu,
                aracKatId = x.aracKatId,
                aracMarkaId = x.aracMarkaId,

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/aracbyid/{aracId}")]
        public AracModel AracById(int aracId)
        {
            AracModel kayit = db.araclar.Where(s => s.aracId == aracId).Select(x => new AracModel()
            {
               
                aracId = x.aracId,
                aracAdi = x.aracAdi,
                aracFiyat = x.aracFiyat,
                aracBilgi = x.aracBilgi,
                aracStok = x.aracStok,
                aracFoto = x.aracFoto,
                aracKodu = x.aracKodu,
                aracKatId = x.aracKatId,
                aracMarkaId = x.aracMarkaId,

            }
            ).FirstOrDefault();
            
            return kayit;
        }
        [Authorize]
        [HttpPost]
        [Route("api/aracekle")]
        public SonucModel AracEkle(AracModel model)
        {
            if (db.araclar.Count(s => s.aracAdi == model.aracAdi) > 0)
            {
               
                sonuc.islem = false;
                sonuc.mesaj = "Araç zaten sistemde kayıtlıdır!";
               
                return sonuc;
            }

            araclar yeni = new araclar();
            yeni.aracAdi = model.aracAdi;
            yeni.aracKatId = model.aracKatId;
            yeni.aracFiyat = model.aracFiyat;
            yeni.aracBilgi = model.aracBilgi;
            yeni.aracStok = model.aracStok;
            yeni.aracFoto = "stokfoto.jpg";
            yeni.aracKodu = model.aracKodu;
            yeni.aracMarkaId = model.aracMarkaId;
            db.araclar.Add(yeni);
            db.SaveChanges();
          
            sonuc.islem = true;
            sonuc.mesaj = "Araç sisteme başarıyla eklendi.";
          
            return sonuc;
        }
        [Authorize]
        [HttpPut]
        [Route("api/aracduzenle")]
        public SonucModel AracDuzenle(AracModel model)
        {
            araclar kayit = db.araclar.Where(s => s.aracId == model.aracId).FirstOrDefault();

            if (kayit == null)
            {
               
                sonuc.islem = false;
                sonuc.mesaj = "Sistemde böyle bir araç yok!";
               
                return sonuc;
            }

          

            kayit.aracAdi = model.aracAdi;
            kayit.aracKatId = model.aracKatId;
            kayit.aracFiyat = model.aracFiyat;
            kayit.aracBilgi = model.aracBilgi;
            kayit.aracStok = model.aracStok;
            kayit.aracFoto = model.aracFoto;
            kayit.aracKodu = model.aracKodu;
            kayit.aracMarkaId = model.aracMarkaId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Araç başarıyla düzenlendi.";
           
            return sonuc;
        }
        [Authorize]
        [HttpDelete]
        [Route("api/aracsil/{aracId}")]
        public SonucModel AracSil(int aracId)
        {
            araclar kayit = db.araclar.Where(s => s.aracId == aracId).FirstOrDefault();

            if (kayit == null)
            {
              
                sonuc.islem = false;
                sonuc.mesaj = "Sistemde böyle bir araç yok!";
              
                return sonuc;
            }


            db.araclar.Remove(kayit);
            db.SaveChanges();
           
            sonuc.islem = true;
            sonuc.mesaj = "Araç sistemden silindi.";
          
            return sonuc;
        }
        [Authorize]
        [HttpPost]
        [Route("api/aracgorselguncelle")]
        public SonucModel aracgorselguncelle(AracGorselModel model)
        {
            araclar arc = db.araclar.Where(s => s.aracKodu == model.aracKodu).SingleOrDefault();
            if (arc == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Ürün Yok";
                return sonuc;
            }

            if (arc.aracFoto != "stokfoto.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + arc.aracFoto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = arc.aracKodu + model.fotoUzanti.Replace("image/", ".");

            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {

                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));

            }

            arc.aracFoto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Görsel Güncellendi";


            return sonuc;
        }

        #endregion

        #region marka

        [HttpGet]
        [Route("api/markaliste")]
        public List<MarkaModel> MarkaListe()
        {
            List<MarkaModel> liste = db.markalar.Select(x => new MarkaModel()
            {

                markaId = x.markaId,
                markaAdi = x.markaAdi,
              
            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/markabyid/{markaId}")]
        public MarkaModel MarkaById(int markaId)
        {
            MarkaModel kayit = db.markalar.Where(s => s.markaId == markaId).Select(x => new MarkaModel()
            {
             
                markaId = x.markaId,
                markaAdi = x.markaAdi,
           
            }
            ).FirstOrDefault();
            
            return kayit;
        }
        [Authorize]
        [HttpPost]
        [Route("api/markaekle")]
        public SonucModel MarkaEkle(MarkaModel model)
        {
            if (db.markalar.Count(s => s.markaAdi == model.markaAdi) > 0)
            {
               
                sonuc.islem = false;
                sonuc.mesaj = "Girilen marka sistemde kayıtlıdır!";
               
                return sonuc;
            }

            markalar yeni = new markalar();

            yeni.markaAdi = model.markaAdi;

            db.markalar.Add(yeni);
            db.SaveChanges();
            
            sonuc.islem = true;
            sonuc.mesaj = "Marka sisteme başarıyla eklendi.";
           
            return sonuc;
        }

        [Authorize]
        [HttpPut]
        [Route("api/markaduzenle")]
        public SonucModel MarkaDuzenle(MarkaModel model)
        {
            markalar kayit = db.markalar.Where(s => s.markaId == model.markaId).FirstOrDefault();

            if (kayit == null)
            {
               
                sonuc.islem = false;
                sonuc.mesaj = "Sistemde böyle bir marka yok!";
               
                return sonuc;
            }

            kayit.markaAdi = model.markaAdi;
            
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Marka başarıyla düzenlendi.";
            
            return sonuc;
        }
        [Authorize]
        [HttpDelete]
        [Route("api/markasil/{markaId}")]
        public SonucModel MarkaSil(int markaId)
        {
            markalar kayit = db.markalar.Where(s => s.markaId == markaId).FirstOrDefault();

            if (kayit == null)
            {
               
                sonuc.islem = false;
                sonuc.mesaj = "Sistemde böyle bir marka yok!";
               
                return sonuc;
            }


            db.markalar.Remove(kayit);
            db.SaveChanges();
           
            sonuc.islem = true;
            sonuc.mesaj = "Marka sistemden silindi.";
            
            return sonuc;
        }

        #endregion

        #region uye
        [Authorize]
        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.uyeler.Select(x => new UyeModel()
            {

                uyeId = x.uyeId,
                uyeAdi = x.uyeAdi,
                uyeSoyadi = x.uyeSoyadi,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeSifre = x.uyeSifre,
                uyeTelefon = x.uyeTelefon,
                uyeEposta = x.uyeEposta,
                uyeAdres = x.uyeAdres,
                uyeYetkilendirme = x.uyeYetkilendirme,


            }
            ).ToList();

            return liste;
        }
        
        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.uyeler.Where(s => s.uyeId == uyeId).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdi = x.uyeAdi,
                uyeSoyadi = x.uyeSoyadi,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeSifre = x.uyeSifre,
                uyeTelefon = x.uyeTelefon,
                uyeEposta = x.uyeEposta,
                uyeAdres = x.uyeAdres,
                uyeYetkilendirme = x.uyeYetkilendirme,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.uyeler.Count(s => s.uyeKullaniciAdi == model.uyeKullaniciAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen üye sistemde zaten kayıtlıdır!";
                return sonuc;
            }

            uyeler yeni = new uyeler();

            yeni.uyeAdi = model.uyeAdi;
            yeni.uyeSoyadi = model.uyeSoyadi;
            yeni.uyeKullaniciAdi = model.uyeKullaniciAdi;
            yeni.uyeSifre = model.uyeSifre;
            yeni.uyeTelefon = model.uyeTelefon;
            yeni.uyeEposta = model.uyeEposta;
            yeni.uyeAdres = model.uyeAdres;
            

            db.uyeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye sisteme başarıyla eklendi.";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            uyeler kayit = db.uyeler.Where(s => s.uyeId == model.uyeId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sistemde böyle bir üye yok!";
                return sonuc;
            }

          

            kayit.uyeAdi = model.uyeAdi;
            kayit.uyeSoyadi = model.uyeSoyadi;
            kayit.uyeKullaniciAdi = model.uyeKullaniciAdi;
            kayit.uyeSifre = model.uyeSifre;
            kayit.uyeTelefon = model.uyeTelefon;
            kayit.uyeEposta = model.uyeEposta;
            kayit.uyeAdres = model.uyeAdres;
            kayit.uyeYetkilendirme = model.uyeYetkilendirme;


            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye başarıyla düzenlendi.";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            uyeler kayit = db.uyeler.Where(s => s.uyeId == uyeId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Sistemde böyle bir üye yok!";
                return sonuc;
            }




            db.uyeler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye sistemden silindi.";
            return sonuc;
        }

        #endregion

        #region aracSiparis
        [Authorize]
        [HttpGet]
        [Route("api/siparisliste")]
        public List<aracSiparisModel> SiparisListe()
        {
            List<aracSiparisModel> liste = db.aracSiparisler.Select(x => new aracSiparisModel()
            {

                siparisId = x.siparisId,
                siparisTarih = x.siparisTarih,
                siparisKodu = x.siparisKodu,
                siparisAracId = x.siparisAracId,
                aracAdi = x.araclar.aracAdi,
                aracFiyat = x.araclar.aracFiyat,
                aracBilgi = x.araclar.aracBilgi,
                aracStok = x.araclar.aracStok,
                aracKodu = x.araclar.aracKodu,
                siparisUyeId = x.siparisUyeId,
                uyeAd = x.uyeler.uyeAdi,
                uyeSoyad = x.uyeler.uyeSoyadi,
                uyeTelefon = x.uyeler.uyeTelefon,
                uyeEposta = x.uyeler.uyeEposta,
                uyeAdres = x.uyeler.uyeAdres,
                markaAdi = x.araclar.markalar.markaAdi,
                katAdi = x.araclar.kategoriler.katAdi,








            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/siparisbyid/{siparisId}")]
        public aracSiparisModel SiparisById(int siparisId)
        {
            aracSiparisModel kayit = db.aracSiparisler.Where(s => s.siparisId == siparisId).Select(x => new aracSiparisModel()
            {
                siparisId = x.siparisId,
                siparisTarih = x.siparisTarih,
                siparisKodu = x.siparisKodu,
                siparisAracId = x.siparisAracId,
                aracAdi = x.araclar.aracAdi,
                aracFiyat = x.araclar.aracFiyat,
                aracBilgi = x.araclar.aracBilgi,
                aracStok = x.araclar.aracStok,
                aracKodu = x.araclar.aracKodu,
                siparisUyeId = x.siparisUyeId,
                uyeAd = x.uyeler.uyeAdi,
                uyeSoyad = x.uyeler.uyeSoyadi,
                uyeTelefon = x.uyeler.uyeTelefon,
                uyeEposta = x.uyeler.uyeEposta,
                uyeAdres = x.uyeler.uyeAdres,
                markaAdi = x.araclar.markalar.markaAdi,
                katAdi = x.araclar.kategoriler.katAdi,

            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/siparisekle")]
        public SonucModel SiparisEkle(aracSiparisModel model)
        {
            if (db.aracSiparisler.Count(s => s.siparisKodu == model.siparisKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Sipariş Kayıtlıdır.";
                return sonuc;
            }

            aracSiparisler yeni = new aracSiparisler();

            yeni.siparisUyeId = model.siparisUyeId;
            yeni.siparisTarih = model.siparisTarih;
            yeni.siparisKodu = model.siparisKodu;
            yeni.siparisAracId = model.siparisAracId;


            db.aracSiparisler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/siparisduzenle")]
        public SonucModel SiparisDuzenle(aracSiparisModel model)
        {
            aracSiparisler kayit = db.aracSiparisler.Where(s => s.siparisId == model.siparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Sipariş Yok";
                return sonuc;
            }


            kayit.siparisId = model.siparisId;
            kayit.siparisUyeId = model.siparisUyeId;
            kayit.siparisTarih = model.siparisTarih;
            kayit.siparisKodu = model.siparisKodu;
            kayit.siparisAracId = model.siparisAracId;



            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/siparissil/{siparisId}")]
        public SonucModel SiparisSil(int siparisId)
        {
            aracSiparisler kayit = db.aracSiparisler.Where(s => s.siparisId == siparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Sipariş Yok";
                return sonuc;
            }




            db.aracSiparisler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Silindi";
            return sonuc;
        }

        #endregion





    }
}
