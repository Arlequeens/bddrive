$(document).ready(function () {

    $("#btnConnexion").click(function () {
        connexion();
    });
});

// Connexion de l'utilisateur
function connexion() {

    var userConnected = false;
    var loginSaisi = document.getElementById("email").value;
    var mdpSaisi = document.getElementById("password").value;

    for (var [idCompte, compte] of comptes.entries()) {
        if (compte.login == loginSaisi && compte.mdp == mdpSaisi) {
            userConnected = true;
            break;
        }
    }

    if (userConnected) {
        sessionStorage.setItem("userConnected", "1");
        sessionStorage.setItem("loginPOW", loginSaisi);
        window.history.back();
    }
    else {
        $("#msgConnexionIncorrect").html("Identifiant ou mot de passe incorrect");
    }
}
