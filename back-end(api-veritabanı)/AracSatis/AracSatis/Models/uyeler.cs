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
    
    public partial class uyeler
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public uyeler()
        {
            this.aracSiparisler = new HashSet<aracSiparisler>();
        }
    
        public int uyeId { get; set; }
        public string uyeAdi { get; set; }
        public string uyeSoyadi { get; set; }
        public string uyeKullaniciAdi { get; set; }
        public string uyeSifre { get; set; }
        public string uyeEposta { get; set; }
        public string uyeTelefon { get; set; }
        public string uyeAdres { get; set; }
        public int uyeYetkilendirme { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<aracSiparisler> aracSiparisler { get; set; }
    }
}
