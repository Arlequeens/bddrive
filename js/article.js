$(document).ready(function () {

    var idAlbum = sessionStorage.getItem("idBD");
  
    var album = albums.get(idAlbum);
    console.log(album);
    var auteur = auteurs.get(album.idAuteur);

    $("#titreAlbum").html(album.titre);
    $("#auteurAlbum").html("Ecrit par " + auteur.nom);
    $("#prixAlbum").html(album.prix + " €");
    $("#imageAlbum").attr("src", sourceImage(album));

    $('.liste-BD-vignette').empty();
    // Recherche des albums de la même série
    for (var [idAlbm, albm] of albums.entries()) {
        if (albm.idSerie == album.idSerie && idAlbum != idAlbm) {

            // $("#memeSerie").html(album.titre);
            //console.log(albm.titre);
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


    $("#btnAjoutPanier").click(function () {
        
        var panierLocal = localStorage.getItem('panierBD');
        if (panierLocal === null) {

            panierLocal = idAlbum + ":1,";
            localStorage.setItem('panierBD',panierLocal);
        }
        else {

            // Transformation du panierLlocal en un tableau
            var tabPanier = toTabPanierLocal(panierLocal);

            // Ajout au de l'album au panier
            ajoutPanier(idAlbum, tabPanier);

            // Génère la valeur du localStorage panierLocal
            panierLocal = generePanierLocal(tabPanier);
            localStorage.setItem('panierBD',panierLocal);
        }
    });

});