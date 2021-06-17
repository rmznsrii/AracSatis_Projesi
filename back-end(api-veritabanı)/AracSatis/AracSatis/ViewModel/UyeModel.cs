using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracSatis.ViewModel
{
    public class UyeModel
    {
        public int uyeId { get; set; }
        public string uyeAdi { get; set; }
        public string uyeSoyadi { get; set; }
        public string uyeKullaniciAdi { get; set; }
        public string uyeSifre { get; set; }
        public string uyeEposta { get; set; }
        public string uyeTelefon { get; set; }
        public string uyeAdres { get; set; }
        public int uyeYetkilendirme { get; set; }
    }
}