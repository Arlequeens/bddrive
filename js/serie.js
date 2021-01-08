$(document).ready(function () {

    var idSerie = sessionStorage.getItem("idSerie");

    $('#titreSerie').html(series.get(idSerie).nom);
    
    // Affichage de toutes les BD de la série et génération des évenements pour chaque BD
    $('.liste-BD-serie').empty();
    // Recherche des albums de la série
    for (var [idAlbum, album] of albums.entries()) {
        if (album.idSerie == idSerie) {
            $('.liste-BD-serie').append(cloneAlbum(album));
            
            // Abbonement à un évènement pour chaque BD
            (function(cle) {
                $('.liste-BD-serie').children().last().click(function() {
                        $(location).attr('href',"article.html");

                        // Enregistrement de la BD choisi dans le session storage
                        sessionStorage.setItem("idBD", cle);
                });
            })(idAlbum);
        }
    }
    
});