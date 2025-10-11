   //yang penting jadi...😍:)

    // 📢 ========== !!!!!!!! VARIABEL YANG PERLU DI ISI !!!!!!!! =================
    const PASS_JEMAAT = '########'; //💡 ISI PASSWORD JEMAAT
    const GS_ID = '#######################################'; //💡 ISI ID Google Sheets file data_aplikasi
    const EMAIL_JEMAAT = '########'; // 💡 ISI EMAIL


// 📢 ========================== ⬇️⬇️⬇️ JANGAN DIUBAH ⬇️⬇️⬇️===============================
var   kjemaat = EMAIL_JEMAAT.toLowerCase();
const ejemaat = kjemaat
function doGet(e) {

  const j = e.parameter.RUNFUNC;
  if (j === 'tabel') return ceksheet(e);
  if (j === 'buletin') return buletin(e);
  if (j === 'ibadah') return ibadah(e);
  if (j === 'warta') return warta(e);
  if (j === 'profil') return profiljemaat(e);

  // bisa tambahkan default handling
  return ContentService.createTextOutput("RUNFUNC tidak dikenal");
}


function convertToLowerCase() {
  var originalString = "Hello World!";
  var lowerCaseString = originalString.toLowerCase();

  Logger.log("Original String: " + originalString);
  Logger.log("Lowercase String: " + lowerCaseString); // Output: hello world!
}

// 📢 Fungsi untuk menyimpan Update (memberi tanda ke App Android untuk Update Informasi terbaru
function simpanUpdatenya(versinya, kodeupdate, e) {
    var ss = SpreadsheetApp.openById(GS_ID);
    var sm = ss.getSheetByName("update");
    var lt = sm.getLastRow();
    for (var i = 1; i <= lt; i++) {
        var m_kode = sm.getRange(i, 1).getValue();
        if (m_kode == versinya) {
            sm.getRange(i, 2).setValue(kodeupdate);
        }
    }
}

//📢 Fungsi untuk membaca isi tabel berdasarkan nama sheet
function readTabel(namash) {
      var ss = SpreadsheetApp.openById(GS_ID);
        var sh = ss.getSheetByName(namash)
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';
        }
        return data
}

//📢 Fungsi untuk beberapa perintah dari Aplikasi Informasi Jemaat di Windows
function ceksheet(e) {
    var ss =  SpreadsheetApp.openById(GS_ID);
    //📢 Membaca isi tabel dari sheet
    if (e.parameter.func == "Read") {
        var sh = ss.getSheetByName(e.parameter.SH)
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';
        }
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }

    //📢 Membaca semua sheet sekaligus,saat aplikasi dibuka (jika diaktifkan refresh saat aplikasi dibuka)
    if (e.parameter.func == "ReadSemua") {
      var isibuletin = readTabel('Buletin');
      var isiibadah = readTabel('Ibadah');
      var isialbum = readTabel('Album');
      var isiumum = readTabel('Pengumuman');
      var isiupdate = readTabel('update');
      result = isibuletin + "|SPLIT|" + isiibadah + "|SPLIT|" + isialbum + "|SPLIT|" + isiumum + "|SPLIT|" + isiupdate
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);
    }
}

// 📢 Fungsi untuk membuat daftar FileID dari file-file yang ada di dalam folder Google Drive
function bikindaftar(FolderId) {
    const folder = DriveApp.getFolderById(FolderId);
    const files = folder.getFiles();
    var data = "";
    var i = 1;
    while (files.hasNext()) {
        var file = files.next();
        var flname = file.getName();
        var jmltx = flname.length;
        var aku = flname.substring(jmltx - 4, jmltx);
        var akuku = aku.toLowerCase();
        if (akuku == ".jpg" || akuku == ".png" || akuku == "webp" || akuku == "jpeg" || akuku == ".mp4") {
            if (i == 1) {
                data += file.getId();
            } else {
                data += "|" + file.getId();
            }
            i = i + 1;
        }
    }
    return data;
}

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️  BULETIN  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
function buletin(e){
  var ss =  SpreadsheetApp.openById(GS_ID);
  var sh = ss.getSheetByName('Buletin');
  var kodenya = e.parameter.KODENYA;
  var nourut = e.parameter.URUT;
  var judul = e.parameter.JUDUL;
  var edisi = e.parameter.EDISI;
  var download = e.parameter.DOWNLD;
  var baca = e.parameter.BACA;
  var gambar = e.parameter.GAMBAR;
    // ✅ CREATE NEW 
    if (e.parameter.func == "Baru" + PASS_JEMAAT + ejemaat) {
         var data = false
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                data = true;
            }
        }
        if (data) {
            var result = "Kode Sudah Ada";
        } else {
            simpanUpdatenya('VersiBuletin', kodenya, e);
            var rowdata = sh.appendRow([kodenya, nourut, judul, edisi, download, baca, gambar]);
            var rg = sh.getDataRange().getValues();
            var result = "";
            for (var row = 1; row < rg.length; ++row) {
                result += rg[row].join(',') + '\n';
            }
        }
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);
    }

    // 📝 EDIT 
    if (e.parameter.func == "Edit" + PASS_JEMAAT + ejemaat) {
        var kodeupdate = e.parameter.UPDATECODE;
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.getRange(i, 2).setValue(nourut);
                sh.getRange(i, 3).setValue(judul);
                sh.getRange(i, 4).setValue(edisi);
                sh.getRange(i, 5).setValue(download);
                sh.getRange(i, 6).setValue(baca);
                sh.getRange(i, 7).setValue(gambar);
                break;
            }
        }
        simpanUpdatenya('VersiBuletin', kodeupdate, e);
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';
        }
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }

    // ❌ HAPUS 
    if (e.parameter.func == "Hapus" + PASS_JEMAAT + ejemaat) {
        var sh = ss.getSheetByName('Buletin');
        var kodenya = e.parameter.KODENYA;
        var kodeupdate = e.parameter.UPDATECODE;

        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.deleteRow(i);
                break;
            }
        }
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';
        }
        simpanUpdatenya('VersiBuletin', kodeupdate, e);
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }

 
}


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️  JADWAL IBADAH  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
function ibadah(e){
        var ss =  SpreadsheetApp.openById(GS_ID);
        var sh = ss.getSheetByName('Ibadah');
        var kodenya = e.parameter.KODENYA;
        var nourut = e.parameter.URUT;
        var judul = e.parameter.JUDUL;
        var tanggal = e.parameter.TANGGAL;
        var jam = e.parameter.JAM;
        var tempat = e.parameter.TEMPAT;
        var pelayan = e.parameter.PELAYAN;
        var keterangan = e.parameter.KETERANGAN;
        var tagalx = e.parameter.TGLX;
        var kodeupdate = '="' + e.parameter.KODENYA + '"&D3';

    //✅ CREATE NEW 
    if (e.parameter.func == "Baru" + PASS_JEMAAT + ejemaat) {
        var data = false;
        var lst = sh.getLastRow() + 1;
        status = '=if(J' + lst + '>=today();"NEW";"OLD")';
        tgltxt = '=text(J' + lst + ';"dd/MM/yyyy")';
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                data = true;
                break;
            }
        }
        if (data) {
            var result = "Kode Sudah Ada";
        } else {
            simpanUpdatenya('VersiIbadah', kodeupdate, e);
            var rowdata = sh.appendRow([kodenya, nourut, judul, tanggal, jam, tempat, pelayan, keterangan, status, tagalx, tgltxt]);
            var rg = sh.getDataRange().getValues();
            var result = "";
            for (var row = 1; row < rg.length; ++row) {
                result += rg[row].join(',') + '\n';
            }
        }
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);
    }
    //📝 EDIT 
    if (e.parameter.func == "Edit" + PASS_JEMAAT + ejemaat) {
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.getRange(i, 2).setValue(nourut);
                sh.getRange(i, 3).setValue(judul);
                sh.getRange(i, 4).setValue(tanggal);
                sh.getRange(i, 5).setValue(jam);
                sh.getRange(i, 6).setValue(tempat);
                sh.getRange(i, 7).setValue(pelayan);
                sh.getRange(i, 8).setValue(keterangan);
                sh.getRange(i, 10).setValue(tagalx);
                break;
            }
        }
        simpanUpdatenya('VersiIbadah', kodeupdate, e); //SIMPAN UPDATE
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';
        }
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }
    // ❌ HAPUS 
    if (e.parameter.func == "Hapus" + PASS_JEMAAT + ejemaat) {
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.deleteRow(i);
                break;
            }
        }
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';
        }
        simpanUpdatenya('VersiIbadah', kodeupdate, e); //SIMPAN UPDATE    
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }
}

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️  WARTA JEMAAT  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
function warta(e){
        var ss =  SpreadsheetApp.openById(GS_ID);
        var sh = ss.getSheetByName('Pengumuman');
        var kodenya = e.parameter.KODENYA;
        var nourut = e.parameter.URUT;
        var isi = e.parameter.ISI;
        var kodeupdate = e.parameter.UPDATECODE;

    //✅ CREATE NEW 
    if (e.parameter.func == "Baru" + PASS_JEMAAT + ejemaat) {
        var data = false
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                data = true;
                break;
            }
        }
        if (data) {
            var result = "Kode Sudah Ada";
        } else {
            var rowdata = sh.appendRow([kodenya, nourut, isi]);
            var rg = sh.getDataRange().getValues();
            var result = "";
            for (var row = 1; row < rg.length; ++row) {
                result += rg[row].join(',') + '\n';

            }
            simpanUpdatenya('VersiPengumuman', kodeupdate, e); //SIMPAN UPDATE    
        }
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);
    }
    //📝 EDIT 
    if (e.parameter.func == "Edit" + PASS_JEMAAT + ejemaat) {
        var kodeupdate = e.parameter.UPDATECODE;
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.getRange(i, 2).setValue(nourut);
                sh.getRange(i, 3).setValue(isi);
                break;
            }
        }
        simpanUpdatenya('VersiPengumuman', kodeupdate, e); //SIMPAN UPDATE 
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';

        }
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }
    // ❌ HAPUS 
    if (e.parameter.func == "Hapus" + PASS_JEMAAT + ejemaat) {

        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.deleteRow(i);
                break;
            }
        }
                var rg = sh.getDataRange().getValues();
                var data = "";
                for (var row = 1; row < rg.length; ++row) {
                    data += rg[row].join(',') + '\n';
                }
                simpanUpdatenya('VersiPengumuman', kodeupdate, e); //SIMPAN UPDATE 
                return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }

}

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️  ALBUM  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
function album(){
  var ss =  SpreadsheetApp.openById(GS_ID);
  var sh = ss.getSheetByName('Album');
  var kodenya = e.parameter.KODENYA;
  var nourut = e.parameter.URUT;
  var judul = e.parameter.JUDUL;
  var keterangan = e.parameter.KET;
  var file_id = e.parameter.FILE_ID;
  var kodeupdate = e.parameter.UPDATECODE;
    //✅ CREATE NEW 
  if (e.parameter.func == "Baru" + PASS_JEMAAT + ejemaat) {
    var data = false;
    var lr = sh.getLastRow();
    var datalengkap = bikindaftar(file_id);
    for (var i = 1; i <= lr; i++) {
      var data_kode = sh.getRange(i, 1).getValue();
      if (data_kode == kodenya) {
          data = true;
          break;
      }
    }
    if (data) {
        var result = "Kode Sudah Ada";
    } else {
        var rowdata = sh.appendRow([kodenya, nourut, judul, keterangan, file_id, datalengkap]);
        var rg = sh.getDataRange().getValues();
        var result = "";
        for (var row = 1; row < rg.length; ++row) {
            result += rg[row].join(',') + '\n';
        }
        simpanUpdatenya('VersiAlbum', kodeupdate, e); //SIMPAN UPDATE    
    }
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);
    }

    //📝 EDIT 
  if (e.parameter.func == "Edit" + PASS_JEMAAT + ejemaat) {
        var datalengkap = bikindaftar(file_id);
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.getRange(i, 2).setValue(nourut);
                sh.getRange(i, 3).setValue(judul);
                sh.getRange(i, 4).setValue(keterangan);
                sh.getRange(i, 5).setValue(file_id);
                sh.getRange(i, 6).setValue(datalengkap);
                break;
            }
        }
        simpanUpdatenya('VersiAlbum', kodeupdate, e); //SIMPAN UPDATE 
        var rg = sh.getDataRange().getValues();
        var data = "";
        for (var row = 1; row < rg.length; ++row) {
            data += rg[row].join(',') + '\n';

        }
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }

    // ❌ HAPUS 
    if (e.parameter.func == "Hapus" + PASS_JEMAAT + ejemaat) {
        var sh = ss.getSheetByName('Album');
        var kodenya = e.parameter.KODENYA;
        var kodeupdate = e.parameter.UPDATECODE;
        var lr = sh.getLastRow();
        for (var i = 1; i <= lr; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            if (data_kode == kodenya) {
                sh.deleteRow(i);
                break;
            }
        }
                var rg = sh.getDataRange().getValues();
                var data = "";
                for (var row = 1; row < rg.length; ++row) {
                    data += rg[row].join(',') + '\n';
                }
                simpanUpdatenya('VersiAlbum', kodeupdate, e); //SIMPAN UPDATE 
                return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.TEXT);
    }
}

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️  ALBUM  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
function profiljemaat(e){
  var ss =  SpreadsheetApp.openById(GS_ID);
  var sh = ss.getSheetByName('update');
    // ☑️ SAVE PROFIL JEMAAT
    if (e.parameter.func == "UpdateFileHTML" + PASS_JEMAAT  + ejemaat) {
        var kodeupdate = e.parameter.UPDATECODE;
        const isilengkap = e.parameter.FILE_ID;
        var bagisatu = isilengkap.split("|SPLIT|");
        var xxsatu = bagisatu[0];
        var xxsatux = xxsatu.split("|");
        var xxdua = bagisatu[1];
        var sejarah = xxsatux[0];
        var statjemaat = xxsatux[1];
        var infolayanan = xxsatux[2];
        var organisasi = xxsatux[3]
        var webjemaat = xxdua;
        var appscriptjemaat = bagisatu[2];
        sh.getRange(6, 3).setValue(sejarah);
        sh.getRange(7, 3).setValue(statjemaat);
        sh.getRange(8, 3).setValue(infolayanan);
        sh.getRange(9, 3).setValue(organisasi);
        sh.getRange(10, 3).setValue(webjemaat);
        sh.getRange(11, 3).setValue(appscriptjemaat)
        var lr = sh.getLastRow();
        for (var i = 6; i <= 11; i++) {
            var data_kode = sh.getRange(i, 1).getValue();
            sh.getRange(i, 2).setValue(kodeupdate);
        }
        return ContentService.createTextOutput('Update Sukses').setMimeType(ContentService.MimeType.TEXT);
    }
    // 💻 MENAMPILKAN DAFTAR FILE HTML KE APP WINDOWS
    if (e.parameter.func == "ReadHTMLFile") {
        var sejarah = sh.getRange(6, 3).getValue();
        var statjemaat = sh.getRange(7, 3).getValue();
        var infolayanan = sh.getRange(8, 3).getValue();
        var organisasi = sh.getRange(9, 3).getValue();
        var infjemaat = sh.getRange(10, 3).getValue();
        var apscriptjemaat = sh.getRange(11, 3).getValue();
        return ContentService.createTextOutput(sejarah + '|' + statjemaat + '|' + infolayanan + '|' + organisasi +
            "|SPLIT|" + infjemaat + "|SPLIT|" + apscriptjemaat).setMimeType(ContentService.MimeType.TEXT);
    }
}

