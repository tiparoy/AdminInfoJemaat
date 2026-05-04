function doGet(e) {
    var j = e.parameter.RUNFUNC;
    if  (j == 'tabel') {
        return cheksheet(e);
    } else {}
}

    // UNTUK MEMBUKA FILE HTML DI GOOGLE DRIVE (Organisasi, Layanan, Stat Jemaat, dan Sejarah) ke Aplikasi Android
function cheksheet(e){
    if (e.parameter.func == "AmbilAlbum") {
        var file_id = e.parameter.FILE_ID;
        var file = DriveApp.getFileById(file_id);
        var docContent = file.getBlob().getDataAsString();
        return ContentService.createTextOutput(docContent).setMimeType(ContentService.MimeType.TEXT);
    }
}
