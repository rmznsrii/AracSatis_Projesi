import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UrunDialogComponent } from '../../dialogs/urun-dialog/urun-dialog.component';

@Component({
  selector: 'app-urun-liste',
  templateUrl: './urun-liste.component.html',
  styleUrls: ['./urun-liste.component.css'],
})
export class UrunListeComponent implements OnInit {
  dialogRef: MatDialogRef<UrunDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  urun: Urun[];
  urunId: number;
  secUrun: Urun;



  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      console.log(p);
      if (p) {
        this.urunId = p.urunId;
        this.UrunGetir();
      }
    });
  }

  UrunGetir() {
    this.apiServis.AracById(this.urunId).subscribe((d: Urun) => {
      this.secUrun = d;
    });
  }


  Duzenle(kayit: Urun) {
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.aracKodu = d.aracKodu;
        kayit.aracAdi = d.aracAdi;
        kayit.aracStok = d.aracStok;
        kayit.aracFiyat = d.aracFiyat;
        kayit.aracBilgi = d.aracBilgi;
        kayit.aracFoto = d.aracFoto;
        kayit.aracKatId = d.aracKatId;
        this.apiServis.AracDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunGetir();
          }
        });
      }
    });
  }

  Sil(kayit: Urun) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.aracKodu +
      ' Kodlu ' +
      kayit.aracAdi +
      '  Araç Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.AracSil(kayit.aracId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunGetir();
          }
        });
      }
    });
  }
}
