using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracSatis.ViewModel
{
    public class aracSiparisModel
    {
        public int siparisId { get; set; }
        public int siparisUyeId { get; set; }
        public string siparisTarih { get; set; }
        public int siparisAracId { get; set; }
        public int siparisKodu { get; set; }
        
        public string uyeAd { get; set; }
        public string uyeSoyad { get; set; }
        public string uyeTelefon { get; set; }
        public string uyeEposta { get; set; }
        public string uyeAdres { get; set; }

        public string aracAdi { get; set; }
        public decimal aracFiyat { get; set; }
        public string aracBilgi { get; set; }
        public int aracStok { get; set; }
        public string aracKodu { get; set; }

        public string markaAdi { get; set; }
        
        public string katAdi { get; set; }
    }
}