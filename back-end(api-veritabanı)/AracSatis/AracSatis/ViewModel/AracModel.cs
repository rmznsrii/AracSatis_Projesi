using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AracSatis.ViewModel
{
    public class AracModel
    {
        public int aracId { get; set; }
        public string aracAdi { get; set; }
        public decimal aracFiyat { get; set; }
        public string aracBilgi { get; set; }
        public int aracStok { get; set; }
        public string aracFoto { get; set; }
        public string aracKodu { get; set; }
        public int aracKatId { get; set; }
        public int aracMarkaId { get; set; }
    }

}