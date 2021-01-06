$(document).ready(function () {

    // Récupération du choix de thème dans le session storage
    var theme = sessionStorage.getItem("choixTheme");

    // Affichage du titre récupéré dans la page
    $("#titreTheme").html(theme);

    // Récupération de la data depuis le thème choisi
    var data = new Map();
    datas = window[theme.replaceAll(/ /g, "").toLowerCase()];

    // Affichage des BD pour ce thème et génération des évenements pour chaque BD
    $('.liste-BD').empty();
    for (var [idAlbum, album] of albums.entries()) {
        for (var [idData, data] of datas.entries()) {
            if(album.idSerie == data.idSerie) {
                $('.liste-BD').append(cloneAlbum(album));

                // Abbonement à un évènement pour chaque BD
                (function(cle) {
                    $('.liste-BD').children().last().click(function() {
                            $(location).attr('href',"article.html");

                            // Enregistrement de la BD choisi dans le session storage
                            sessionStorage.setItem("idBD", cle);
                    });
                })(idAlbum);
            }
        }
    }
});