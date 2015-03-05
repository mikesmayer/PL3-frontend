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

//jQuery(document).ready(function () {
//
////    jQuery("span.herolight").html();
//    value.forEach(function (entry) {
//        setTimeout(function () {
//            jQuery("span.herolight").html(entry)
//        }, 2000);
//    });
//
////    setTimeout( "jQuery('#div').hide();",3000 );
//});
var value = ['GLOBAL', 'LOCAL', 'REFERRAL', 'SALES', 'OVERSEAS', 'RESELLER', 'VAR', 'TECHNOLOGY', 'CLOUD', 'SAAS'];
var counter = 0;
setInterval(change, 3000);
function change() {
    jQuery("span.herolight").html(value[counter]);
    counter++;
    if (counter >= value.length) {
        counter = 0;
    }
}