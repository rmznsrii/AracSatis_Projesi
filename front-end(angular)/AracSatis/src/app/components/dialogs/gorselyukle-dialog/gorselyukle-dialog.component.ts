import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';
import { UrunGorsel } from 'src/app/models/UrunGorsel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gorselyukle-dialog',
  templateUrl: './gorselyukle-dialog.component.html',
  styleUrls: ['./gorselyukle-dialog.component.css'],
})
export class GorselyukleDialogComponent implements OnInit {
  secilenGorsel: any;
  urungorsel: UrunGorsel = new UrunGorsel();
  secUrun: Urun;
  constructor(
    public dialogRef: MatDialogRef<GorselyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secUrun = this.data;
  }

  ngOnInit() {

  }

  GorselSec(e) {
    var gorseller = e.target.files;
    var gorsel = gorseller[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenGorsel = fr.result;
      this.urungorsel.fotoData = fr.result.toString();
      this.urungorsel.fotoUzanti = gorsel.type;
    };

    fr.readAsDataURL(gorsel);
  }


}
