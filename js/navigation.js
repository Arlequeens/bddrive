$(document).ready(function () {

    $("#navSelections").click(function () {
        document.location.href = "selection.html";
    });

    $("#navCatalogue").click(function () {
        document.location.href = "catalogue.html";
    });

    $("#navMonPanier").click(function () {
        document.location.href = "panier.html";
    });

    $("#navSeConnecter").click(function () {
        document.location.href = "connexion.html";
    });

    $(".navbar-brand").click(function () {
        document.location.href = "home.html";
    });

    $(".detail").click(function () {
        document.location.href = "panier.html";
    });

    $("#ParcourirCtlg").click(function () {
        document.location.href = "catalogue.html";
    });

    $("#btnToutesBD").click(function () {
        document.location.href = "toutesLesBD.html";
    });

});

function goBack() {
    window.history.back();
}