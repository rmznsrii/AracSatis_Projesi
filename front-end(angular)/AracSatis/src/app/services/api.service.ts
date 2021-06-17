import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { marka } from '../models/marka';
import { Siparis } from '../models/Siparis';
import { Urun } from '../models/Urun';
import { UrunGorsel } from '../models/UrunGorsel';
import { Uye } from '../models/Uye';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://localhost:44376/api/';
  siteUrl = 'https://localhost:44376/';

  constructor(public http: HttpClient) {}

  // Oturum İşlemleri
  tokenAl(kullaniciAdi: string, sifre: string) {
    var data =
      'username=' +
      kullaniciAdi +
      '&password=' +
      sifre +
      '&grant_type=password';

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(this.apiUrl + '/token', data, { headers: reqHeader });
  }

  oturumKontrol() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem('uyeYetkileri'));
    var sonuc: boolean = false;

    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element)>-1) {
          sonuc=true;
          return false;
        }
      });
    }

    return sonuc;
  }





  //Kategori Servis
  KategoriListe() {
    return this.http.get(this.apiUrl + 'kategoriliste');
  }

  KategoriById(katId: number) {
    return this.http.get(this.apiUrl + 'kategoribyid/' + katId);
  }

  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + 'kategoriekle', kat);
  }

  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + 'kategoriduzenle', kat);
  }

  KategoriSil(katId: number) {
    return this.http.delete(this.apiUrl + 'kategorisil/' + katId);
  }

  //Araçlar Servis

  AracListe() {
    return this.http.get(this.apiUrl + 'aracliste');
  }


  AracById(aracId: number) {
    return this.http.get(this.apiUrl + 'aracbyid/' + aracId);
  }

  AracEkle(arc: Urun) {
    return this.http.post(this.apiUrl + 'aracekle', arc);
  }

  AracDuzenle(arc: Urun) {
    return this.http.put(this.apiUrl + 'aracduzenle', arc);
  }

  AracSil(aracId: number) {
    return this.http.delete(this.apiUrl + 'aracsil/' + aracId);
  }

  AracGorselGuncelle(urunGorsel: UrunGorsel) {
    return this.http.post(this.apiUrl + 'aracgorselguncelle', urunGorsel);
  }

  // Üye Servis

  UyeListe() {
    return this.http.get(this.apiUrl + 'uyeliste');
  }

  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + 'uyebyid/' + uyeId);
  }

  UyeEkle(uy: Uye) {
    return this.http.post(this.apiUrl + 'uyeekle', uy);
  }

  UyeDuzenle(uy: Uye) {
    return this.http.put(this.apiUrl + 'uyeduzenle', uy);
  }

  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + 'uyesil/' + uyeId);
  }

  // Sipariş Servis

  SiparisListe() {
    return this.http.get(this.apiUrl + 'siparisliste');
  }

  SiparisById(siparisId: number) {
    return this.http.get(this.apiUrl + 'siparisbyid/' + siparisId);
  }

  SiparisEkle(sprs: Siparis) {
    return this.http.post(this.apiUrl + 'siparisEkle', sprs);
  }

  SiparisDuzenle(sprs: Siparis) {
    return this.http.put(this.apiUrl + 'siparisduzenle', sprs);
  }

  SiparisSil(siparisId: number) {
    return this.http.delete(this.apiUrl + 'siparissil/' + siparisId);
  }

  // Marka Servis

  MarkaListe() {
    return this.http.get(this.apiUrl + 'markaliste');
  }

  MarkaById(markaId: number) {
    return this.http.get(this.apiUrl + 'markabyid/' + markaId);
  }

  MarkaEkle(mrk: marka) {
    return this.http.post(this.apiUrl + 'markaekle', mrk);
  }

  MarkaDuzenle(mrk: marka) {
    return this.http.put(this.apiUrl + 'markaduzenle', mrk);
  }

  MarkaSil(markaId: number) {
    return this.http.delete(this.apiUrl + 'markasil/' + markaId);
  }
}
