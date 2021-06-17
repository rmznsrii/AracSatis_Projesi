import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Siparis } from 'src/app/models/Siparis';

@Component({
  selector: 'app-siparis-dialog',
  templateUrl: './siparis-dialog.component.html',
  styleUrls: ['./siparis-dialog.component.css']
})
export class SiparisDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Siparis;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SiparisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Sipariş Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Sipariş Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({

      siparisId: [this.yeniKayit.siparisId],
      siparisUyeId: [this.yeniKayit.siparisUyeId],
      siparisAracId: [this.yeniKayit.siparisAracId],
      siparisKodu: [this.yeniKayit.siparisKodu],
      siparisTarih: [this.yeniKayit.siparisTarih],


      aracAdi: [this.yeniKayit.aracAdi],
      aracBilgi: [this.yeniKayit.aracBilgi],
      aracFiyat: [this.yeniKayit.aracFiyat],
      aracStok: [this.yeniKayit.aracStok],
      aracKodu: [this.yeniKayit.aracKodu],


      uyeAd: [this.yeniKayit.uyeAd],
      uyeSoyad: [this.yeniKayit.uyeSoyad],
      uyeTelefon: [this.yeniKayit.uyeTelefon],
      uyeEposta: [this.yeniKayit.uyeEposta],
      uyeAdres: [this.yeniKayit.uyeAdres],

      markaAdi: [this.yeniKayit.markaAdi],

      katAdi: [this.yeniKayit.katAdi],


    });
  }

}
