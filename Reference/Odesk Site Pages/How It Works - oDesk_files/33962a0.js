(function ($) {
    "use strict";
    var hiwClient = window.oDesk.HIWClient || {};
    hiwClient.HIWVideo = function () {
        var that = this;
        var init = function () {
            setupVideoModal()
        };
        var setupVideoModal = function () {
            $(document).on("opened.fndtn.reveal", "[data-reveal]", function (event, ui) {
                callPlayer("oDeskVideo", "playVideo")
            });
            $(document).on("closed.fndtn.reveal", "#oDeskVideoModal", function (event, ui) {
                callPlayer("oDeskVideo", "stopVideo")
            });
            $(".oHiringVideoDialog .oCloseBtn").on("click", function () {
                $("#oDeskVideoModal").foundation("reveal", "close")
            })
        };
        init();
        return this
    };

    function callPlayer(frame_id, func, args) {
        if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
        var iframe = document.getElementById(frame_id);
        if (iframe && iframe.tagName.toUpperCase() != "IFRAME") {
            iframe = iframe.getElementsByTagName("iframe")[0]
        }
        if (!callPlayer.queue) callPlayer.queue = {};
        var queue = callPlayer.queue[frame_id],
            domReady = document.readyState == "complete";
        if (domReady && !iframe) {
            window.console && console.log("callPlayer: Frame not found; id=" + frame_id);
            if (queue) clearInterval(queue.poller)
        } else if (func === "listening") {
            if (iframe && iframe.contentWindow) {
                func = '{"event":"listening","id":' + JSON.stringify("" + frame_id) + "}";
                iframe.contentWindow.postMessage(func, "*")
            }
        } else if (!domReady || iframe && (!iframe.contentWindow || queue && !queue.ready) || (!queue || !queue.ready) && typeof func === "function") {
            if (!queue) queue = callPlayer.queue[frame_id] = [];
            queue.push([func, args]);
            if (!("poller" in queue)) {
                queue.poller = setInterval(function () {
                    callPlayer(frame_id, "listening")
                }, 250);
                messageEvent(1, function runOnceReady(e) {
                    if (!iframe) {
                        iframe = document.getElementById(frame_id);
                        if (!iframe) return;
                        if (iframe.tagName.toUpperCase() != "IFRAME") {
                            iframe = iframe.getElementsByTagName("iframe")[0];
                            if (!iframe) return
                        }
                    }
                    if (e.source === iframe.contentWindow) {
                        clearInterval(queue.poller);
                        queue.ready = true;
                        messageEvent(0, runOnceReady);
                        var tmp = [];
                        while (tmp = queue.shift()) {
                            callPlayer(frame_id, tmp[0], tmp[1])
                        }
                    }
                }, false)
            }
        } else if (iframe && iframe.contentWindow) {
            if (func.call) return func();
            iframe.contentWindow.postMessage(JSON.stringify({
                event: "command",
                func: func,
                args: args || [],
                id: frame_id
            }), "*")
        }

        function messageEvent(add, listener) {
            var w3 = add ? window.addEventListener : window.removeEventListener;
            w3 ? w3("message", listener, !1) : (add ? window.attachEvent : window.detachEvent)("onmessage", listener)
        }
    }
    $(document).ready(function () {
        var videoSection = new hiwClient.HIWVideo
    })
})(jQuery);