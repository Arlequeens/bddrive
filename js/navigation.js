$(document).ready(function () {

    // Si connecté, affichage du login
    var userConnected = sessionStorage.getItem("userConnected");
    var login = sessionStorage.getItem("loginPOW");
    if(login != null && userConnected=="1")
    {
        $("#navSeConnecter span").html(login);
        $("#userDisconnect").removeClass("d-none");
        $("#navSeConnecter").addClass("active");
        $("#spanConnexion").addClass("text-muted");
        $("#logoConnexion").addClass("text-muted");
    }

    // Evenement deconnexion
    $("#userDisconnect").click(function () {
        deconnexion();
    });

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

    // Si non connecter, abonnement du bouton se connecté
    if(login == null || userConnected == "0")
    {
        $("#navSeConnecter").click(function () {
            document.location.href = "connexion.html";
        });
    }

    // Abonnement évènement pour le logo
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

    // Abbonement pour le bouton recherche du menu catalogue
    $("#rechercheButtonCatalogue").click(function () {
        recherche = $("#rechercheInputCatalogue").val();
        sessionStorage.setItem("recherche", recherche);
        $(location).attr('href',"recherche.html");
    });

});

function goBack() {
    window.history.back();
}

// Deconnexion de l'utilisateur
function deconnexion() {
    sessionStorage.setItem("userConnected", "0");
    sessionStorage.setItem("loginPOW", "");
    document.location.href = "home.html";
}