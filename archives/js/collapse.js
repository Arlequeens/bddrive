window.onresize = function(event) {
    $('#collapsePanier').collapse('show');
};

$('#collapsePanier').on('hide.bs.collapse', function () {
    $('.fa-angle-up').addClass('d-none');
    $('.fa-angle-down').removeClass('d-none');
})

$('#collapsePanier').on('show.bs.collapse', function () {
    $('.fa-angle-down').addClass('d-none');
    $('.fa-angle-up').removeClass('d-none');
})