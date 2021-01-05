jQuery(document).ready(function ($) {

    // Liste des albums dont le nom de la serie contient "Spirou"
    for(var [idSerie, serie] of series.entries()) {
        if(serie.nom.includes(recherche)) {
            for (var [idAlbum, album] of albums.entries()) {
                if (album.idSerie == idSerie) {
                    console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
                }
            }
        }
    }

    // Liste des albums dont le nom de la serie contient "Herge"
    for(var [idAuteur, auteur] of auteurs.entries()) {
        if(auteur.nom.includes("Herge")) {
            for (var [idAlbum, album] of albums.entries()) {
                if (album.idAlbum == idAlbum) {
                    console.log(auteur.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
                }
            }
        }
    }

});