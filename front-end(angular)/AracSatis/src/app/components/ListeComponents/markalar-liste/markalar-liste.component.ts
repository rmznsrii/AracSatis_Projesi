import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { marka } from 'src/app/models/marka';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MarkaDialogComponent } from '../../dialogs/marka-dialog/marka-dialog.component';

@Component({
  selector: 'app-markalar-liste',
  templateUrl: './markalar-liste.component.html',
  styleUrls: ['./markalar-liste.component.scss']
})
export class MarkalarListeComponent implements OnInit {

  dialogRef: MatDialogRef<MarkaDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  marka: marka[];
  markaId: number;
  secMarka: marka;
  dataSource: any;
  displayedColumns = [
    'katId',
    'katAdi',
    'katUrunSay',
    'islemler',
  ];

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((p) => {
      console.log(p);
     if (p) {
       this.markaId = p.markaId;
       this.MarkaGetir();
     }
   });

  }

  MarkaGetir() {
    this.apiServis.MarkaById(this.markaId).subscribe((d: marka) => {
      this.secMarka = d;
      console.log(d);
    });
  }

  Duzenle(kayit: marka) {
    this.dialogRef = this.matDialog.open(MarkaDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.markaId = d.markaId;
        this.apiServis.MarkaDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MarkaGetir();
          }
        });
      }
    });
  }

  Sil(kayit: marka) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.markaId +
      " Id'li " +
      kayit.markaAdi +
      '  Marka Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.KategoriSil(kayit.markaId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MarkaGetir();
          }
        });
      }
    });
  }

}
