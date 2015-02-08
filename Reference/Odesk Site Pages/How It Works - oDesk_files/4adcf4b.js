window.oDesk = function () {
    "use strict";
    var oDesk = window.oDesk || {},
        sessionCookieName = "sessionId";
    oDesk.getUrlParameterByName = function (name, url) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        url = url || location.search;
        var qs = url.split("?").slice(-1)[0],
            regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(url);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
    };
    oDesk.getCookie = function (name) {
        var cookieValue = null,
            cookies = document.cookie.split(";"),
            i, cookie;
        if (document.cookie && document.cookie !== "") {
            for (i = 0; i < cookies.length; i++) {
                cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return cookieValue
    };
    oDesk.setCookie = function (name, value, days) {
        var expires;
        if (days) {
            var date = new Date;
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
            expires = "; expires=" + date.toGMTString()
        } else {
            expires = ""
        }
        document.cookie = name + "=" + value + expires + "; path=/"
    };
    oDesk.incrementMixpanelProperty = function (propertyName) {
        var data = {},
            value;
        if (window.mixpanel && mixpanel.get_property) {
            value = mixpanel.get_property(propertyName) || 0;
            value += 1;
            data[propertyName] = value;
            mixpanel.register(data)
        } else {
            console.warn("Mixpanel has not loaded.")
        }
    };
    oDesk.runWithTimeout = function (functionToRun, callback, timeout) {
        if (!functionToRun || !callback) {
            return
        }
        try {
            functionToRun()
        } catch (ex) {}
        window.setTimeout(callback, timeout)
    };
    oDesk.getVisitorId = function () {
        var visitorIdCookie = "visitor_id",
            qtVisitorIdCookie = "qt_visitor_id";
        var cookieValue = oDesk.getCookie(qtVisitorIdCookie);
        if (cookieValue) {
            return cookieValue
        }
        return oDesk.getCookie(visitorIdCookie)
    };
    oDesk.isViewedOnMobile = function () {
        var target = navigator.userAgent || navigator.vendor || window.opera;
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(target) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(target.substr(0, 4))
    };
    oDesk.isNewSession = function () {
        var cookieValue = oDesk.getCookie(sessionCookieName);
        if (cookieValue) {
            return false
        }
        document.cookie = sessionCookieName + "=" + Date.now() + ";PATH=/";
        return true
    }();
    oDesk.isNullOrEmpty = function (val) {
        if (!val) {
            return true
        }
        var cleaned = val.replace(/\s+/, "");
        return cleaned.length == 0
    };
    oDesk.isTouchableDevice = function () {
        return "ontouchstart" in document.documentElement
    };
    oDesk.isUsingIOS7Safari = function () {
        var is_iOS = navigator.userAgent.match(/iphone|ipad|ipod/i) != null;
        var browserVersion = navigator.appVersion.match(/OS (\d)/);
        if (browserVersion) {
            browserVersion = parseInt(browserVersion[1], 10)
        }
        var iOS_7 = browserVersion != null && browserVersion >= 7;
        var is_Safari = navigator.userAgent.match(/safari/i) == "Safari";
        return is_iOS && is_Safari && iOS_7
    };
    return oDesk
}();
(function ($) {
    "use strict";
    $(document).ready(function () {
        $(".oSiteGlobalHeader .search .dropdown label").click(function () {
            var parent = $(this).parent();
            if (parent.hasClass("active")) {
                parent.removeClass("active")
            } else {
                parent.addClass("active");
                $("html").one("click", function () {
                    parent.removeClass("active")
                });
                parent.on("click", function (e) {
                    e.stopPropagation()
                })
            }
        });
        $(".oSiteGlobalHeader .search input[name=for]").change(function () {
            var self = $(this),
                form = self.parents("form"),
                q = form.find("input[name=q]");
            form.attr("action", self.data("action"));
            q.attr("placeholder", self.data("placeholder"))
        });
        $(".oSiteGlobalHeader .search form").submit(function () {
            $("input[type=radio]", this).attr("disabled", true)
        });
        $(".oSiteGlobalHeader .nav li:has(.subMenu) > a").on("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            var self = $(this);
            if (self.hasClass("active")) {
                self.removeClass("active")
            } else {
                var subMenu = self.siblings(".subMenu");
                self.addClass(function () {
                    $("html").one("click", function () {
                        self.removeClass("active")
                    });
                    subMenu.on("click", function (e) {
                        e.stopPropagation()
                    });
                    return "active"
                })
            }
        });
        $(".oSiteGlobalHeader .subMenu .tileTitle").click(function (e) {
            var parent = $(this).parent(),
                siblings = parent.siblings();
            parent.toggleClass("active");
            siblings.removeClass("active");
            e.preventDefault()
        });
        $(".oMobileSearch input[name=for]").change(function () {
            var self = $(this),
                form = self.parents("form"),
                q = form.find("input[name=q]");
            form.attr("action", self.data("action"));
            q.attr("placeholder", self.data("placeholder"))
        });
        $(".oMobileSearch form").submit(function () {
            $("input[type=radio]", this).attr("disabled", true)
        });
        $(".oSiteGlobalHeader .menuIcon").on("click touchstart", function (e) {
            $(".oMobileMenu").toggle();
            $(".oMobileMenu .active").removeClass("active");
            e.preventDefault()
        });
        $(".oMobileMenu .withSubmenu > a").on("click touchstart", function (e) {
            var self = $(this),
                li = self.parent();
            li.siblings().removeClass("active");
            li.toggleClass("active");
            e.stopPropagation();
            e.preventDefault()
        });
        $(".languageSelector > a").on("click touchstart", function (e) {
            var language = $(this).data("language");
            window.oDesk.setCookie("selected_lang", language, 1e4)
        })
    })
})(jQuery);
(function ($) {
    "use strict";

    function cancelZoom() {
        var d = document,
            viewport, content, maxScale = ",maximum-scale=",
            maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;
        if (!this.addEventListener || !d.querySelector) {
            return
        }
        viewport = d.querySelector('meta[name="viewport"]');
        content = viewport.content;

        function changeViewport(event) {
            viewport.content = content + (event.type == "blur" ? content.match(maxScaleRegex, "") ? "" : maxScale + 10 : maxScale + 1)
        }
        this.addEventListener("focus", changeViewport, true);
        this.addEventListener("blur", changeViewport, false)
    }
    $.fn.cancelZoom = function () {
        return this.each(cancelZoom)
    };
    $("input[type=text],input[type=search],select,textarea").cancelZoom()
})(jQuery);