//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AracSatis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class araclar
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public araclar()
        {
            this.aracSiparisler = new HashSet<aracSiparisler>();
        }
    
        public int aracId { get; set; }
        public string aracAdi { get; set; }
        public decimal aracFiyat { get; set; }
        public string aracBilgi { get; set; }
        public int aracStok { get; set; }
        public string aracFoto { get; set; }
        public string aracKodu { get; set; }
        public int aracKatId { get; set; }
        public int aracMarkaId { get; set; }
    
        public virtual kategoriler kategoriler { get; set; }
        public virtual markalar markalar { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<aracSiparisler> aracSiparisler { get; set; }
    }
}
