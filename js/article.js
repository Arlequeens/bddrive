$(document).ready(function () {

    // var old = localStorage.getItem('panier');
    // if (old === null) {
    //     var arr = [item]; //Create ARRAY
    //     localStorage.setItem('panier', JSON.stringify(arr));
    // } else {
    //     old = JSON.parse(old);
    //     localStorage.setItem('panier', JSON.stringify(old.concat(item)));
    // }


    var idAlbum = sessionStorage.getItem("idBD");

    var old = localStorage.getItem('Panier',idAlbum);
    $("#btnAjoutPanier").click(function () {

        localStorage.setItem('Panier',idAlbum);
    });

});