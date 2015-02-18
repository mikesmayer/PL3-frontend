$(document.body).on('click', '.dropdown-menu li', function (event) {

    var $target = $(event.currentTarget);

    $target.closest('.inputGroup')
            .find('[data-bind="label"]').text($target.text());
//                        .end()
//                        .children('.dropdown-toggle').dropdown('toggle');
    $target.closest('.inputGroup')
            .children('.input-group-btn').toggleClass("open");

    return false;

});