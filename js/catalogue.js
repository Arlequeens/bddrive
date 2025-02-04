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

// Génération de la div pour une BD dans une div horizontale
// IN: album
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