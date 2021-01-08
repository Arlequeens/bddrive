$(document).ready(function () {

    var idAlbum = sessionStorage.getItem("idBD");
  
    var album = albums.get(idAlbum);
    console.log(album);
    var auteur = auteurs.get(album.idAuteur);
    var serie = series.get(album.idSerie);

    $("#titreAlbum").html(album.titre);
    $("#auteurAlbum").html(auteur.nom);
    $("#serieAlbum").html(serie.nom);
    $("#prixAlbum").html(album.prix + " €");
    $("#imageAlbum").attr("src", sourceImage(album));

    $('.liste-BD-vignette').empty();
    // Affichage des albums de la même série et abbonement au évenement
    var albumMemeSerieExist = false;
    for (var [idAlbm, albm] of albums.entries()) {
        if (albm.idSerie == album.idSerie && idAlbum != idAlbm) {
            albumMemeSerieExist = true;

            $('.liste-BD-vignette').append(cloneAlbumVignette(albm));

            // Abbonement à un évènement pour chaque BD
            (function(cle) {
                $('.liste-BD-vignette').children().last().click(function() {
                        $(location).attr('href',"article.html");

                        // Enregistrement de la BD choisi dans le session storage
                        sessionStorage.setItem("idBD", cle);
                });
            })(idAlbm);
        }
    }
    // Si aucun album de la même série existe, affiche un message
    if(!albumMemeSerieExist)
        $('.liste-BD-vignette').append('<p class="ml-3">Pas d\'autre album disponible pour cette série</p>');


    // Abbonement évenement ajout au panier
    $("#btnAjoutPanier").click(function () {
        
        var panierLocal = localStorage.getItem('panierBD');
        if (panierLocal === null) {

            panierLocal = idAlbum + ":1,";
            localStorage.setItem('panierBD',panierLocal);
        }
        else {

            // Transformation du panierLlocal en un tableau
            var tabPanier = toTabPanierLocal(panierLocal);

            // Ajout de l'album au panier
            ajoutPanier(idAlbum, tabPanier);

            // Génère la valeur du localStorage panierLocal
            panierLocal = genereValeurPanierLocal(tabPanier);
            localStorage.setItem('panierBD',panierLocal);
        }
        // Met à jour le panier simplifié
        majPanier();
    });

    $("#voirPlusSerie").click(function () {
        sessionStorage.setItem("idSerie", album.idSerie);
        $(location).attr('href',"serie.html");
    });

});