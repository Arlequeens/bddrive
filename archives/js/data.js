jQuery(document).ready(function ($) {
    
    // Affiche le nom de série du premier album
    console.log(series.get(albums.get("1").idSerie).nom);

    // Liste des albums par série
    console.log("\nListe des albums par série");
    for(var [idSerie, serie] of series.entries()) {
        // Recherche des albums de la série
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerie) {
                console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
            }
        }
    }

    // Aficher toutes les séries Spirou
    // v1
    console.log("\nListe des séries Spirou");
    series.forEach(serie => {
        if(serie.nom.includes("Spirou"))
	        console.log(serie.nom);
    });

    // Aficher toutes les séries
    console.log("\nListe des séries");
    series.forEach(serie => {
	    console.log(serie.nom);
	});
    
});