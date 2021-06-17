import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { marka } from 'src/app/models/marka';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Urun;
  islem: string;
  frm: FormGroup;
  dataSource: any;
  kategoriler: Kategori[];
  markalar: marka[];
  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Araç Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Araç Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListe();
    this.MarkaListe();
  }

  FormOlustur() {
    return this.frmBuild.group({

      aracKodu: [this.yeniKayit.aracKodu],
      aracAdi: [this.yeniKayit.aracAdi],
      aracStok: [this.yeniKayit.aracStok],
      aracFiyat: [this.yeniKayit.aracFiyat],
      aracBilgi: [this.yeniKayit.aracBilgi],
      aracFoto: [this.yeniKayit.aracFoto],
      aracKatId: [this.yeniKayit.aracKatId],
      aracMarkaId: [this.yeniKayit.aracMarkaId],
    });
  }

  KategoriListe() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(this.kategoriler);

    });
  }

  MarkaListe() {
    this.apiServis.MarkaListe().subscribe((d: marka[]) => {
      this.markalar = d;
      this.dataSource = new MatTableDataSource(this.markalar);

    });
  }
}
