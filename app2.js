class Kisi {
    constructor(ad, soyad, mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}
 
class Util {
    static bosAlanlariKontrolEt(...alanlar) {
        let sonuc = true;
        alanlar.forEach(alan => {
            if (alan.length === 0) {
                sonuc = false;
                return false;
            }
        });
        return sonuc;
    }
}
 
class Ekran {
    constructor() {
        this.ad = document.getElementById("ad");
        this.soyad = document.getElementById("soyad");
        this.mail = document.getElementById("mail");
        this.ekleGuncelleButon = document.querySelector(".kaydetGuncelle");
        this.form = document.getElementById("form-rehber").addEventListener("submit", this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector(".kisi-listesi");
        this.kisiListesi.addEventListener("click", this.guncelleVeyaSil.bind(this));
        // local storagge islemeri için kullanılır
        this.depo = new Depo();
        // uptade ve delete butonlarına basıldığnda
        // ilgili tr elemanı burada tutulur
        this.secilenSatir = undefined;
        this.kisileriEkranaYazdir();
    }
    
    alanlariTemizle(){
        this.ad.value="";
        this.soyad.value="";
        this.mail.value="";
    }
 
    guncelleVeyaSil(e) {
        const tiklanmaYeri = e.target;
        if (tiklanmaYeri.classList.contains("btn--delete")) {
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.kisiyiEkrandanSil();
        } else if (tiklanmaYeri.classList.contains("btn--edit")) {
            console.log("güncellenecek");
        } else { }
    }
 
    kisiyiEkrandanSil() {
        this.secilenSatir.remove();
        const silinecekMail = this.secilenSatir.cells[2].textContent;
        console.log(silinecekMail);
        this.depo.kisiyiSil(silinecekMail);
        this.alanlariTemizle();
    }
 
    kisileriEkranaYazdir() {
        this.depo.tumKisiler.forEach(kisi => {
            this.kisiyiEkranaEkle(kisi);
        })
    }
 
    kisiyiEkranaEkle(kisi) {
        const olusturulanTr = document.createElement("tr");
        olusturulanTr.innerHTML = `
        <td> ${kisi.ad}</td>
        <td> ${kisi.soyad}</td>
        <td> ${kisi.mail}</td>
        <td>
            <button class="btn btn--edit"> <i class="far fa-edit"></i> </button> 
            <button class="btn btn--delete"> <i class="far fa-trash-alt"></i> </button>    
        </td>`;
 
        this.kisiListesi.appendChild(olusturulanTr);
 
    }
    kaydetGuncelle(e) {
        e.preventDefault();
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value);
        const sonuc = Util.bosAlanlariKontrolEt(kisi.ad, kisi.soyad, kisi.mail);
 
        // tüm alnlar doldurulmuşsa true doldurulmamaışsa false
        if (sonuc) {
            // kisiyi ekrana ekler
            this.kisiyiEkranaEkle(kisi);
 
            // kisiyi local storage a kaydeder
            this.depo.kisiEkle(kisi);
            this.alanlariTemizle();
        } else {
            console.log("boş alana bırakmayınız");
        }
    }
}
 
 
class Depo {
 
    // UYGULAMA İLK AÇILDIPINDA VERİLER GETİRİLİR 
    constructor() {
        this.tumKisiler = this.kisileriGetir();
    }
 
    kisileriGetir() {
        let tumKisilerLocal;
        if (localStorage.getItem("tumKisiler") === null) {
            tumKisilerLocal = [];
        } else {
            tumKisilerLocal = JSON.parse(localStorage.getItem("tumKisiler"));
        };
        return tumKisilerLocal;
    }   
 
    kisiEkle(kisi) {
        this.tumKisiler.push(kisi);
        localStorage.setItem("tumKisiler", JSON.stringify(this.tumKisiler));
    }
 
    kisiyiSil(mail) {
        console.log("burada");
        this.tumKisiler.forEach((kisi, index) => {
            
            if (kisi.mail.trim() === mail.trim()) {
                console.log("burada2");
                this.tumKisiler.splice(index, 1)
            }
        });
        console.log("burada3");
        localStorage.setItem("tumKisiler", JSON.stringify(this.tumKisiler));
    }
 
    kisiGuncelle(guncellenmisKisi, mail) {
        this.tumKisiler.forEach((kisi, index) => {
            if (kisi.mail === mail) {
                this.tumKisiler[index] === guncellenmisKisi;
            }
        });
        localStorage.setItem("tumKisiler", JSON.stringify(this.tumKisiler));
    }
}
 
 
document.addEventListener("DOMContentLoaded", function (e) {
    const ekran = new Ekran();
});