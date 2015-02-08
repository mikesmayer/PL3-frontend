(function ($) {
    "use strict";
    $(function () {
        var $window = $(window);
        var needHelp = $(".oStickyNotice"),
            needHelpHeight = needHelp.outerHeight(),
            stopTop = 300,
            offsetTop = 0,
            stopBottom = 0;
        $window.on("resize load", function () {
            offsetTop = needHelp.position().top;
            stopBottom = $(document).height() - needHelpHeight - 400
        });
        $window.on("scroll.showNeedHelp load.showNeedHelp", function () {
            if ($window.width() < 1280) {
                return
            }
            var windowTop = $window.scrollTop(),
                positionTop = offsetTop + 30;
            if (windowTop >= stopTop - 120 && windowTop + offsetTop < stopBottom) {
                needHelp.css({
                    position: "fixed",
                    top: ""
                }).removeClass("affixTop").fadeIn(600)
            } else if (windowTop + offsetTop >= stopBottom) {
                needHelp.css({
                    position: "absolute",
                    top: stopBottom
                })
            }
        });
        needHelp.find(".close").on("click", function (e) {
            e.preventDefault();
            var width = needHelp.outerWidth();
            needHelp.animate({
                left: -width
            });
            $window.off("scroll.showNeedHelp load.showNeedHelp")
        })
    })
})(jQuery);