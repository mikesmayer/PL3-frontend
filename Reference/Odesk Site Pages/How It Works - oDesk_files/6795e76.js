(function () {
    "use strict";
    (function ($) {
        $.fn.oStickyHeader = function (options) {
            var settings = $.extend({
                onToggle: function () {}
            }, options);
            var stickyHeader = this,
                pivot = $(stickyHeader.data("pivot")),
                $window = $(window),
                init = function () {
                    $window.on("scroll", toggle);
                    $window.on("resize", function () {
                        if ($window.width() < 640) {
                            $window.off("scroll", toggle)
                        } else {
                            $window.on("scroll", toggle)
                        }
                    })
                },
                toggle = function () {
                    stickyHeader.removeClass("visible hidden");
                    if ($window.scrollTop() > getOffsetTop()) {
                        "function" === typeof settings.onToggle && settings.onToggle(true);
                        stickyHeader.addClass("slide-down").slideDown(300, function () {
                            $(this).removeClass("slide-down").addClass("visible")
                        })
                    } else {
                        "function" === typeof settings.onToggle && settings.onToggle(false);
                        stickyHeader.addClass("slide-up").slideUp(300, function () {
                            $(this).removeClass("slide-up").addClass("hidden")
                        })
                    }
                },
                getOffsetTop = function () {
                    return pivot.offset().top
                };
            init();
            return this
        }
    })(jQuery);
    jQuery(function ($) {
        $(".oStickyHeader").oStickyHeader()
    })
}).call(this);