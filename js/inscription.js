$(document).ready(function () {

    

    $('#btnInscription').click(function () {

        var nom = document.getElementById('nom').value;
        var prenom = document.getElementById('prenom').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        if(validateSaisie(nom, prenom, email, password)) {
            var idNouveauCompte = comptes.size + 1;
            comptes.set(idNouveauCompte.toString(), { login: email , mdp: password});
            console.log(comptes);
            window.location = "connexion.html";
        }

    });

    $("#nom").keyup(function () {
        document.getElementById('nomHelp').innerHTML = "";
    });

    $("#prenom").keyup(function () {
        document.getElementById('prenomHelp').innerHTML = "";
    });

    $("#email").keyup(function () {
        document.getElementById('emailHelp').innerHTML = "";
    });

    $("#password").keyup(function () {
        document.getElementById('passwordHelp').innerHTML = "";
    });

});

//contrôle de saisie
function validateSaisie(nom, prenom, email, password) {

    var saisiCorrect = true;

    var regExp = new RegExp(/^[a-zA-Z]+([- ][a-zA-Z]+){0,2}$/);
    var regExpMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    var regExpPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

    document.getElementById('nomHelp').innerHTML = "";
    document.getElementById('prenomHelp').innerHTML = "";
    document.getElementById('emailHelp').innerHTML = "";
    document.getElementById('passwordHelp').innerHTML = "";

    if (!regExp.test(nom)) {
        document.getElementById('nomHelp').innerHTML = "Nom invalide";
        saisiCorrect = false;
    }
    if (!regExp.test(prenom)) {
        document.getElementById('prenomHelp').innerHTML = "Prénom invalide";
        saisiCorrect = false;
    }
    if (!regExpMail.test(email)) {
        document.getElementById('emailHelp').innerHTML = "Mail invalide";
        saisiCorrect = false;
    }
    else if (verifCompteExistant(email)) {
        document.getElementById('emailHelp').innerHTML = "Mail déjà utilisé";
        saisiCorrect = false;
    }
    if (!regExpPassword.test(password)) {
        document.getElementById('passwordHelp').innerHTML = "Mot de passe invalide";
        saisiCorrect = false;
    }

    return saisiCorrect;
}

// Verification que le compte existe
// IN : email
// OUT: true si le compte existe déjà
function verifCompteExistant(mail) {

    for (var [idCompte, compte] of comptes.entries()) {

        if(compte.login === mail) {
            return true;
        }
    }
    return false;
}