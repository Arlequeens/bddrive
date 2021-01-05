$(document).ready(function () {

    $("#tuiles").children().children().click(function () {
        $(location).attr('href',"theme.html");
        sessionStorage.setItem("choixTheme", $(this).children().children().html());
    });

});