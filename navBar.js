// Evénements navBar
$(".nav-item").on("click", function(){
    updateNavBar($(this));
});

function updateNavBar(navElement) {
    navElement.addClass("active");
    navElement.siblings().removeClass("active");
}