$(document).ready(function () {

    // Afficher et abonner les évenement au panier et panier simplifié
    majPanier();

    // Abonner évenement pour la validation de la commande
    $("#btnValidationCommande").click(function () {
        var connected = sessionStorage.getItem("userConnected");
        var panierLocal = localStorage.getItem('panierBD');
        if (panierLocal != null && panierLocal != "") {
            if(connected != null && connected == "1") {

                // Remise à zero du panier
                localStorage.setItem('panierBD', "");

                // Message de confirmation
                alert("Votre commande a bien été prise en compte");

                // Redirection vers la page d'accueil
                $(location).attr('href',"index.html");
            }
            else {
                // Redirection vers la page de connexion
                $(location).attr('href',"html/connexion.html");
            }
        }
        else {
            alert("Votre panier est vide");
        }
        
    });
});

function cloneArticlePanier (album, nbreArticle) {
    var titre = album.titre;
    var auteur = auteurs.get(album.idAuteur).nom;
    var prix = (parseFloat(album.prix) * nbreArticle).toFixed(2);
    var srcImage = sourceImage(album);

    return   '<div class="card mb-3">'
            +'   <div class="row no-gutters">'
            +'        <div class="col-4">'
            +'            <img src="'+ srcImage +'" class="card-img rounded" alt="">'
            +'        </div>'
            +'        <div class="col-8">'
            +'            <div class="card-body d-flex flex-column justify-content-between align-items-start h-100">'
            +'                <div>'
            +'                    <h1 class="card-title h5">'+ titre +'</h2>'
            +'                    <h2 class="card-subtitle mb-2 text-muted h6">'+ auteur +'</h2>'
            +'                </div>'
            +'                <div class="row d-flex align-items-center">'
            +'                    <p class="col-5 mb-0">'+ prix +' €</p>'
            +'                    <div class="col-5 pl-0">'
            +'                        <div class="input-group input-group-sm">'
            +'                            <div class="input-group-prepend cursor-pointer moins-article">'
            +'                                <span class="input-group-text">-</span>'
            +'                            </div>'
            +'                            <input type="text" class="form-control text-center bg-transparent" disabled placeholder="'+ nbreArticle +'">'
            +'                            <div class="input-group-append cursor-pointer plus-article">'
            +'                               <span class="input-group-text">+</span>'
            +'                            </div>'
            +'                       </div>'
            +'                   </div>'
            +'                   <i class="col-2 fa fa-trash fa-lg cursor-pointer suppr-article"></i>'
            +'               </div>'
            +'           </div>'
            +'       </div>'
            +'   </div>'
            +'</div>';
}

// Afficher et abonner les évenement au panier et panier simplifié
function majPanier () {

    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = [];
    if (panierLocal !== null) {
        tabPanier = toTabPanierLocal(panierLocal);
    }

    $('#liste-BD-panier').empty();
    $('.liste-BD-panier-simplifie').empty();
    if(tabPanier.length !== 0) {
        for (i in tabPanier) {

            // Récupère album et nombre d'article correspondant
            var idAlbum = tabPanier[i][0];
            var album = albums.get(idAlbum);
            var nbreArticle = tabPanier[i][1];

            // Affiche l'album dans le panier
            $('#liste-BD-panier').append(cloneArticlePanier(album, nbreArticle));

            // Abbonement à un évènement pour chaque image de BD du panier
            (function(cle) {
                $('#liste-BD-panier').children().last().children().children().first().click(function() {
                    $(location).attr('href',"html/article.html");

                    // Enregistrement de la BD choisi dans le session storage
                    sessionStorage.setItem("idBD", cle);
                });
            })(idAlbum);

            // Abbonement à un évènement pour augmenter le nombre d'article pour un album
            (function(cle) {
                $('#liste-BD-panier').children().last().find('.plus-article').click(function () {
                    var nbArticle = parseInt(getArticleNbrePanier(cle));
                    if(nbArticle < 9) {
                        nbArticle +=1;
                        setArticleNbrePanier(cle, nbArticle);
                        
                        // Mise à jour de l'affichage des informations du panier pour l'article
                        $(this).prev().attr("placeholder", nbArticle);
                        $(this).parent().parent().prev().html(calculTotalPrixArticle(cle,nbArticle).toFixed(2));

                        // Mise à jour des information globale du panier
                        $("#prixTotal").html(calculTotalPanier().toFixed(2) + "€");
                        $("#nbreArticles").html(calculNbreArticleTotal() + " article(s)");
                    }
                });
            })(idAlbum);

            // Abbonement à un évènement pour diminuer le nombre d'article pour un album
            (function(cle) {
                $('#liste-BD-panier').children().last().find('.moins-article').click(function () {
                    var nbArticle = parseInt(getArticleNbrePanier(cle));
                    if(nbArticle > 1) {
                        nbArticle -=1;
                        setArticleNbrePanier(cle, nbArticle);
                        
                        // Mise à jour de l'affichage des informations du panier pour l'article
                        $(this).next().attr("placeholder", nbArticle);
                        $(this).parent().parent().prev().html(calculTotalPrixArticle(cle,nbArticle).toFixed(2));

                        // Mise à jour des information globale du panier
                        $("#prixTotal").html(calculTotalPanier().toFixed(2) + "€");
                        $("#nbreArticles").html(calculNbreArticleTotal() + " article(s)");
                    }
                });
            })(idAlbum);

            // Abbonement à un évènement pour supprimer l'article du panier
            (function(cle) {
                $('#liste-BD-panier').children().last().find('.suppr-article').click(function () {
                    deleteArticlePanier(cle);

                    // Supprimer l'affichage dans le panier de l'article suprrimé
                    $(this).parentsUntil(".card").parent().remove();

                    // Mise à jour des information globale du panier
                    $("#prixTotal").html(calculTotalPanier().toFixed(2) + "€");
                    $("#nbreArticles").html(calculNbreArticleTotal() + " article(s)");

                    // Si panier devient vide, afficher le message
                    if(localStorage.getItem('panierBD') == "") {
                        $('#liste-BD-panier').append('<p>Votre panier est vide</p>');
                        $("#nbreArticles").html("0 article");
                    }
                });
            })(idAlbum);

            // Affiche l'album dans le panier simplifie
            $('.liste-BD-panier-simplifie').append(cloneAlbumPanierSimplifie(album));
            // Abbonement à un évènement pour chaque image de BD du panier simplifié
            (function(cle) {
                $('.liste-BD-panier-simplifie').children().last().children().children().first().click(function() {
                    $(location).attr('href',"html/article.html");

                    // Enregistrement de la BD choisi dans le session storage
                    sessionStorage.setItem("idBD", cle);
                });
            })(idAlbum);
        }
        $("#prixTotal").html(calculTotalPanier().toFixed(2) + "€");
        $("#nbreArticles").html(calculNbreArticleTotal() + " article(s)");
    }
    else {
        // $("#prixTotal").empty();
        $("#nbreArticles").html("0 article");
        $('#liste-BD-panier').append('<p>Votre panier est vide</p>');
        $('.liste-BD-panier-simplifie').append('<p class="mb-3 ml-3">Votre panier est vide</p>');
    }
}