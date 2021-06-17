import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';


@Component({
  selector: 'app-uyeler',
  templateUrl: './uyeler.component.html',
  styleUrls: ['./uyeler.component.css'],
})
export class UyelerComponent implements OnInit {
  dialogRef: MatDialogRef<UyeDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  uyeler: Uye[];
  dataSource: any;
  displayedColumns = [
    'uyeId',
    'uyeAdi',
    'uyeSoyadi',
    'uyeKullaniciAdi',
    //'uyeSifre',
    //'uyeTelefon',
    //'uyeEposta',
    //'uyeAdres',
    //'uyeYetkilendirme',
    'islemler',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  UyeFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle() {
    var yeniKayit: Uye = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

  Duzenle(kayit: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.uyeAdi = d.uyeAdi;
        kayit.uyeSoyadi = d.uyeSoyadi;
        kayit.uyeKullaniciAdi = d.uyeKullaniciAdi;
        kayit.uyeSifre = d.uyeSifre;
        kayit.uyeTelefon = d.uyeTelefon;
        kayit.uyeEposta = d.uyeEposta;
        kayit.uyeAdres = d.uyeAdres;
        kayit.uyeYetkilendirme=d.uyeYetkilendirme;
        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

  Sil(kayit: Uye) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj = kayit.uyeAdi + " " + kayit.uyeSoyadi + ' İsimli Kullanıcı Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.UyeSil(kayit.uyeId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }


}
