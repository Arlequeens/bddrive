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
                $("#validationCommandeMessage").html("Votre commande a bien été prise en compte !");
                $("#validationCommandeModal").modal('show');

                // Abonnement bouton fermer modal
                $("#boutonFermerModal").click(function () {
                    $(location).attr('href',"home.html");
                });
            }
            else {
                // Redirection vers la page de connexion
                $(location).attr('href',"connexion.html");
            }
        }
        else {
            $("#validationCommandeMessage").html("Votre panier est vide");
            $("#validationCommandeModal").modal('show');
        }
    });

});

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
            $('#liste-BD-panier').prepend(cloneArticlePanier(album, nbreArticle));

            // Abbonement à un évènement pour chaque image de BD du panier
            (function(cle) {
                $('#liste-BD-panier').children().first().children().children().first().click(function() {
                    $(location).attr('href',"article.html");

                    // Enregistrement de la BD choisi dans le session storage
                    sessionStorage.setItem("idBD", cle);
                });
            })(idAlbum);

            // Abbonement à un évènement pour augmenter le nombre d'article pour un album
            (function(cle) {
                $('#liste-BD-panier').children().first().find('.plus-article').click(function () {
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
                $('#liste-BD-panier').children().first().find('.moins-article').click(function () {
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
                $('#liste-BD-panier').children().first().find('.suppr-article').click(function () {
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
            $('.liste-BD-panier-simplifie').prepend(cloneAlbumPanierSimplifie(album));
            // Abbonement à un évènement pour chaque image de BD du panier simplifié
            (function(cle) {
                $('.liste-BD-panier-simplifie').children().first().children().children().first().click(function() {
                    $(location).attr('href',"article.html");

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

// Transforme le panier du local storage en tableau
function toTabPanierLocal(panierLocal) {

    var tabPanier = [];
    var pairs = panierLocal.split(",");
    for (i in pairs) {
        if(pairs[i] !== "") {
            tabPanier.push(pairs[i].split(":"));
        }
    }
    return tabPanier;
}

// Ecrit la valeur du localStorage "panierBD" à partir du tableau
function majPanierLocal(tabPanier) {
    panierLocal = genereValeurPanierLocal(tabPanier);
    localStorage.setItem('panierBD',panierLocal);
}

// Génère la valeur du localStorage "panierBD" à partir du tableau
function genereValeurPanierLocal(tabPanier) {
    var pairs = [];
    if (tabPanier.lenght !== 0) {
        for (i in tabPanier) {
            pairs.push(tabPanier[i].join(':'));
        }
    }
    return pairs.join(',');
}

// Ajout d'un album au panier dans le tableau
function ajoutPanier(idAlbum, tabPanier) {
    
    var alreadyExist = false;
    for (i in tabPanier) {

        // Incrémente le nombre d'article si l'article existe déjà
        if(tabPanier[i][0] === idAlbum) {
            var nbreArticle = parseInt(tabPanier[i][1]);
            nbreArticle += 1;
            tabPanier[i][1] = nbreArticle.toString();
            alreadyExist = true;
        }
    }
    if(!alreadyExist) {
        var pair = [idAlbum, "1"];
        tabPanier.push(pair);
    }
}

// Obtient le nombre d'article pour un article du panier localStorage
function getArticleNbrePanier(idArticle) {
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        if (tabPanier[i][0] === idArticle.toString()) {
            return tabPanier[i][1];
        }
    }
}

// Attribut le nombre d'article pour un article dans le panier localStorage
function setArticleNbrePanier(idArticle, nbArticle) {
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        if (tabPanier[i][0] === idArticle.toString()) {
            tabPanier[i][1] = nbArticle;
            break;
        }
    }
    majPanierLocal(tabPanier);
}

// Supprime un article du panier localStorage
function deleteArticlePanier(idArticle) {
    var newTabPanier = [];
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        if (tabPanier[i][0] !== idArticle.toString()) {
            newTabPanier.push(tabPanier[i]);
        }
    }
    majPanierLocal(newTabPanier);
}

// Calcul le total du panier à partir du panier localStorage
function calculTotalPanier() {
    var totalPanier = 0;
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        totalPanier += calculTotalPrixArticle(tabPanier[i][0], parseInt(tabPanier[i][1]));
    }
    return totalPanier;
}

// Calcul le total du prix d'un article avec son nombre
function calculTotalPrixArticle(idAlbum, nbArticle) {
    return parseFloat(albums.get(idAlbum).prix) * nbArticle;
}

// Calcul le nombre total d'articles à partir du panier localStorage
function calculNbreArticleTotal() {
    var nbreArticleTotal = 0;
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        nbreArticleTotal += parseInt(tabPanier[i][1]);
    }
    return nbreArticleTotal;
}

// Génération de la div pour une BD du panier détaillé
// IN: album, nbre d'article
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

// Génération de la div pour une BD du panier simplifié
// IN: album
function cloneAlbumPanierSimplifie (album) {
    var titre = album.titre;
    var auteur = auteurs.get(album.idAuteur).nom;
    var prix = album.prix + "€";
    var srcImage = sourceImageMini(album);

    return   '<div class="card col-3 col-lg-12 border-0 mb-3 px-1">'
            +'    <div class="row no-gutters">'
            +'        <div class="col-lg-6">'
            +'            <img src="'+ srcImage +'" class="card-img rounded" alt="">'
            +'        </div>'
            +'        <div class="col-lg-6">'
            +'            <div class="card-body d-none d-lg-block">'
            +'                <h1 class="card-title h5">'+ titre +'</h2>'
            // +'                <h2 class="card-subtitle mb-2 text-muted h6">'+ auteur +'</h2>'
            // +'                <p class="card-text">'+ prix +'</p>'
            +'            </div>'
            +'        </div>'
            +'    </div>'
            +'</div>';
}