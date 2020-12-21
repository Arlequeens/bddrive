// Evénements navBar
$(".navbar-nav > li").each(function(index) {
    $(this).on("click", function(){
        updateNavBar($(this));
    });
});

function updateNavBar(navElement) {
    navElement.addClass("active");
    navElement.siblings().removeClass("active");
}