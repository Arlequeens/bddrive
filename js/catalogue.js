$(document).ready(function () {

    // Affichage de toutes les BD et génération des évenements pour chaque BD
    $('.liste-BD').empty();
    for(var [idSerie, serie] of series.entries()) {
        // Recherche des albums de la série
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerie) {
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

    // Affichage des BD du panier simplifié
    $('.liste-BD-panier-simplifie').empty();
    
});

// Génération de la div pour une BD
// IN: album
function cloneAlbum(album) {

    var titre = album.titre;
    var auteur = auteurs.get(album.idAuteur).nom;
    var prix = album.prix + "€";
    var srcImage = sourceImage(album);

	return   '<div class="col-md-6 col-lg-4 mb-3 px-2" >'
            +'    <div class="card h-100 cursor-pointer">'
            +'        <div class="row no-gutters">'
            +'            <div class="col-6 d-flex align-items-center">'
            +'                <img src="' + srcImage +'" class="card-img rounded" alt="">'
            +'            </div>'
            +'            <div class="col-6">'
            +'                <div class="card-body d-flex flex-column justify-content-between align-items-start">'
            +'                    <div>'
            +'                        <h1 class="card-title h5">'+ titre +'</h1>'
            +'                        <h2 class="card-subtitle mb-2 text-muted h6">par '+ auteur +'</h2>'
            +'                    </div>'
            +'                    <p class="badge badge-success">En stock</p>'
            +'                    <div class="row d-flex align-items-center">'
            +'                        <p class="col-12 mb-0">'+ prix +'</p>'
            +'                    </div>'
            +'                </div>'
            +'            </div>'
            +'        </div>'
            +'    </div>'
            +'</div>';
}

function cloneAlbumVignette (album) {
    var titre = album.titre;
    var auteur = auteurs.get(album.idAuteur).nom;
    var prix = album.prix + "€";
    var srcImage = sourceImageMini(album);

    return   '<div class="card col-3 col-lg-2 border-0 px-1 px-lg-2">'
            +'<img src="'+ srcImage +'" class="card-img rounded cursor-pointer" alt="">'
            +'   <div class="card-body p-0">'
            +'        <h1 class="card-title h6">'+ titre +'</h2>'
            // +'        <h2 class="card-subtitle mb-2 text-muted h6">'+ auteur +'</h2>'
            // +'        <p class="card-text">'+ prix +'</p>'
            +'    </div>'
            +'</div>';
}

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

// Concaténation de la source de l'image
// IN: album
function sourceImage(album) {
    var regExp = /[\?\!\'\.\$\:"]/g;

    var src = "images/albums/";
    src += series.get(album.idSerie).nom.replaceAll(regExp , '') + "-";
    if(album.numero.lenght == 1) src += "0";
    src += album.numero + "-";
    src += album.titre.replaceAll(regExp , '') + ".jpg";

    return src;
}

// Concaténation de la source de l'image
// IN: album
function sourceImageMini(album) {
    var regExp = /[\?\!\'\.\$\:"]/g;

    var src = "images/albumsMini/";
    src += series.get(album.idSerie).nom.replaceAll(regExp , '') + "-";
    if(album.numero.lenght == 1) src += "0";
    src += album.numero + "-";
    src += album.titre.replaceAll(regExp , '') + ".jpg";

    return src;
}


///// PANIER ///////////////////////////

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

// Génère la valeur du localStorage panierLocal
function majPanierLocal(tabPanier) {
    panierLocal = genereValeurPanierLocal(tabPanier);
    localStorage.setItem('panierBD',panierLocal);
}

function genereValeurPanierLocal(tabPanier) {
    var pairs = [];
    if (tabPanier.lenght !== 0) {
        for (i in tabPanier) {
            pairs.push(tabPanier[i].join(':'));
        }
    }
    return pairs.join(',');
}

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

function getArticleNbrePanier(idArticle) {
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        if (tabPanier[i][0] === idArticle.toString()) {
            return tabPanier[i][1];
        }
    }
}

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

function calculTotalPanier() {
    var totalPanier = 0;
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        totalPanier += calculTotalPrixArticle(tabPanier[i][0], parseInt(tabPanier[i][1]));
    }
    return totalPanier;
}

function calculTotalPrixArticle(idAlbum, nbArticle) {
    return parseFloat(albums.get(idAlbum).prix) * nbArticle;
}

function calculNbreArticleTotal() {
    var nbreArticleTotal = 0;
    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    for (i in tabPanier) {
        nbreArticleTotal += parseInt(tabPanier[i][1]);
    }
    return nbreArticleTotal;
}