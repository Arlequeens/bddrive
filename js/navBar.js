// Evènements navBar
$(".nav-item").on("click", function(){
    updateNavBar($(this));
});

// Rendre actif le menu selectionné
function updateNavBar(navElement) {
    navElement.addClass("active");
    navElement.siblings().removeClass("active");
}