jQuery(document).ready(function ($) {

    var recherche = "";
    recherche = sessionStorage.getItem("recherche");
    if(recherche != null) {
        $("#rechercheInput").val(recherche);
    }
    rechercheAlbumParTitre(recherche);

    $("#rechercheButton").click(function () {
        recherche = $("#rechercheInput").val();
        sessionStorage.setItem("recherche", recherche);
        // if(window.location.pathname.includes("catalogue.html")) {
        //     $(location).attr('href',"recherche.html");
        // }
        $('#listeBDRecherche').empty();
        rechercheAlbumParTitre(recherche);
    });

    

    // // Liste des albums dont le titre de l'album contient "coeurs"
    // for(var [idAlbum, album] of albums.entries()) {
    //     if(serie.nom.includes(recherche)) {
    //         for (var [idAlbum, album] of albums.entries()) {
    //             if (album.idSerie == idSerie) {
    //                 console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
    //             }
    //         }
    //     }
    // }

    // // Liste des albums dont le nom de la serie contient "Spirou"
    // for(var [idSerie, serie] of series.entries()) {
    //     if(serie.nom.includes(recherche)) {
    //         for (var [idAlbum, album] of albums.entries()) {
    //             if (album.idSerie == idSerie) {
    //                 console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
    //             }
    //         }
    //     }
    // }

    // // Liste des albums dont le nom de l'auteur contient "Herge"
    // for(var [idAuteur, auteur] of auteurs.entries()) {
    //     if(auteur.nom.includes("Herge")) {
    //         for (var [idAlbum, album] of albums.entries()) {
    //             if (album.idAuteur == idAuteur) {
    //                 console.log(auteur.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
    //             }
    //         }
    //     }
    // }

});

function rechercheAlbumParTitre(recherche) {
    // Affichage de toutes les BD qui correspondent à la recherche
    for (var [idAlbum, album] of albums.entries()) {
        album.titre.toLowerCase()

        if(album.titre.toLowerCase().includes(recherche.toLowerCase()) && recherche !== "") { 
            $('#listeBDRecherche').append(cloneAlbum(album));

            // Abbonement à un évènement pour chaque BD
            (function(cle) {
                $('#listeBDRecherche').children().last().click(function() {
                        $(location).attr('href',"article.html");

                        // Enregistrement de la BD choisi dans le session storage
                        sessionStorage.setItem("idBD", cle);
                });
            })(idAlbum);
        }
    }
}