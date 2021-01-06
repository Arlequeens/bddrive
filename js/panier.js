$(document).ready(function () {

    var panierLocal = localStorage.getItem('panierBD');
    var tabPanier = toTabPanierLocal(panierLocal);
    var totalPrix = 0;
    var nbreArticleTotal = 0;

    $('article').empty();
    for (i in tabPanier) {

        // Récupère album et nombre d'article correspondant
        var album = albums.get(tabPanier[i][0]);
        var nbreArticle = tabPanier[i][1];

        // Incrémente le nombre d'article total du panier
        nbreArticleTotal += parseInt(nbreArticle);

        // Incrémente le prix total du panier
        totalPrix += parseFloat(album.prix);

        // Affiche l'album
        $('article').append(cloneArticlePanier(album, nbreArticle));

        // $('article').children().last().click( function () {

        // });
    }

    $("#prixTotal").html(totalPrix.toFixed(2) + "€")
    $("#nbreArticles").html(nbreArticleTotal + " article(s)")

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
            +'                            <div class="input-group-prepend">'
            +'                                <span class="input-group-text">-</span>'
            +'                            </div>'
            +'                            <input type="text" class="form-control text-center" placeholder="'+ nbreArticle +'">'
            +'                            <div class="input-group-append">'
            +'                               <span class="input-group-text">+</span>'
            +'                           </div>'
            +'                       </div>'
            +'                   </div>'
            +'                   <i class="col-2 fa fa-trash fa-lg"></i>'
            +'               </div>'
            +'           </div>'
            +'       </div>'
            +'   </div>'
            +'</div>';
}