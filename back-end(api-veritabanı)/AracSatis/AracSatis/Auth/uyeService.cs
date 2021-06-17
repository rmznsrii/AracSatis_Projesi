using AracSatis.Models;
using AracSatis.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracSatis.Auth
{
    public class uyeService
    {
        DB002Entities1 db = new DB002Entities1();
        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.uyeler.Where(s => s.uyeKullaniciAdi == kadi && s.uyeSifre == parola).Select(x => new UyeModel()
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

            }).SingleOrDefault();

            return uye;
        }

    }
}