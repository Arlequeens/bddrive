$(document).ready(function () {

    var theme = sessionStorage.getItem("choixTheme");
    $("#titreTheme").html(theme);

    var data = new Map();
    datas = window[theme.replaceAll(/ /g, "").toLowerCase()];

    $('.liste-BD').empty();
    for (var [idAlbum, album] of albums.entries()) {
        for (var [idData, data] of datas.entries()) {
            if(album.idSerie == data.idSerie) {
                $('.liste-BD').append(cloneAlbum(idAlbum, album));

                (function(cle) {
                    $('.liste-BD').children().last().click(function() {
                            $(location).attr('href',"article.html");
                            sessionStorage.setItem("idBD", cle);
                    });
                })(idAlbum);
            }
        }
    }
});