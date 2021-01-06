$(document).ready(function () {

    // Evènements navBar
    $(".nav-item").on("click", function(){
        updateNavBar($(this));
    });

    // Rendre actif le menu selectionné
    function updateNavBar(navElement) {
        navElement.addClass("active");
        navElement.siblings().removeClass("active");
    }

    // Abonnement aux évènements pour les boutons de la barre de navigation
    $("#navSelections").click(function () {
        document.location.href = "selections.html";
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

    // Abonnement évènement pour le bouton dans le message de Bienvenu
    $("#ParcourirCtlg").click(function () {
        document.location.href = "catalogue.html";
    });

    //  Abbonement de l'évènement pour chaque tuiles du menu catalogue
    $("#tuiles").children().children().click(function () {
        $(location).attr('href',"theme.html");

        // Enregitrement du choix du thème dans le session.storage
        sessionStorage.setItem("choixTheme", $(this).children().children().html());
    });

    // Abonnement évènement pour le bouton "Toutes les BD" du menu catalogue
    $("#btnToutesBD").click(function () {
        document.location.href = "toutesLesBD.html";
    });

});

function goBack() {
    window.history.back();
}