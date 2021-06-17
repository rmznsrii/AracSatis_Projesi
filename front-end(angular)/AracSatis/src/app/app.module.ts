import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UyelerComponent } from './components/admin/uyeler/uyeler.component';
import { UrunlerComponent } from './components/admin/urunler/urunler.component';
import { SiparislerComponent } from './components/admin/siparisler/siparisler.component';
import { KategorilerComponent } from './components/admin/kategoriler/kategoriler.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { ApiService } from './services/api.service';
import { MyAlertService } from './services/myAlert.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UyeListeComponent } from './components/ListeComponents/uye-liste/uye-liste.component';
import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { UrunListeComponent } from './components/ListeComponents/urun-liste/urun-liste.component';
import { KategoriListeComponent } from './components/ListeComponents/kategori-liste/kategori-liste.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { SiparisDialogComponent } from './components/dialogs/siparis-dialog/siparis-dialog.component';
import { SiparisListeComponent } from './components/ListeComponents/siparis-liste/siparis-liste.component';
import { GorselyukleDialogComponent } from './components/dialogs/gorselyukle-dialog/gorselyukle-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UyeolDialogComponent } from './components/dialogs/uyeol-dialog/uyeol-dialog.component';
import { SafeHTMLPipe } from './pipes/safeHTML.pipe';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AutgGuard';
import { MarkalarComponent } from './components/admin/markalar/markalar.component';
import { MarkalarListeComponent } from './components/ListeComponents/markalar-liste/markalar-liste.component';
import { MarkaDialogComponent } from './components/dialogs/marka-dialog/marka-dialog.component';
import { IletisimComponent } from './components/iletisim/iletisim.component';
import { HakkimizdaComponent } from './components/hakkimizda/hakkimizda.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeListeComponent,
    UrunListeComponent,
    KategoriListeComponent,
    SiparisListeComponent,
    MarkalarListeComponent,
    LoginComponent,
    SafeHTMLPipe,
    IletisimComponent,
    HakkimizdaComponent,



    //Admin
    AdminComponent,
    UyelerComponent,
    UrunlerComponent,
    SiparislerComponent,
    KategorilerComponent,
    MarkalarComponent,


    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    UrunDialogComponent,
    KategoriDialogComponent,
    SiparisDialogComponent,
    GorselyukleDialogComponent,
    UyeolDialogComponent,
    MarkaDialogComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    UrunDialogComponent,
    KategoriDialogComponent,
    SiparisDialogComponent,
    GorselyukleDialogComponent,
    UyeolDialogComponent,
    MarkaDialogComponent,

  ],
  providers: [ApiService,MyAlertService,AuthGuard ,SafeHTMLPipe,{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
