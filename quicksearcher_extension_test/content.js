$(function () {
    if (window == window.parent) {
        $('<iframe src="https://wispy-field-6339.spearly.app/" allowtransparency="true" class="quicksearcher hide" frameborder="0" style="border: none; background:transparent;color-scheme: light; "></iframe>')
            .appendTo("body")
            .css({
                "border": "none",
                "color-scheme": "light"
            })
            .addClass("quicksearcher hide")

    }

    chrome.runtime.onMessage.addListener((request) => {
        if (request.name === "show") {
            $("#searcher").removeClass("hide")
            $("body").removeClass("quicksearcher")
            $("progressive-blur").addClass("show")
            return false
        }
        if (request.name === 'close') {
            $("iframe.quicksearcher").addClass("hide")
            $("#searcher").addClass("hide")
            $("progressive-blur").removeClass("show")
        } else {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
            $("iframe.quicksearcher").toggleClass("hide")
            $("#searcher").toggleClass("hide")
            $('#searcher input').focus()
        }
    })


    if (window != window.parent) {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#searcher') && $("body").hasClass("quicksearcher")) {
                chrome.runtime.sendMessage({
                    name: "close"
                })
            }
        })
        $("#searcher").keydown(function (e) {
            if (e.key === 'Escape') {
                if ($("iframe.quicksearcher").hasClass("hide")) {
                    return false;
                }
                chrome.runtime.sendMessage({
                    name: "close"
                })
            }
        })
        document.addEventListener('click', (e) => {
            if (e.target.closest('#suggest ul:not(.command)')) {
                chrome.runtime.sendMessage({
                    name: "close"
                })
            }
        })

        $("form").submit(function () {
            if ($("#search-bar input").val().length === 0) {
                return false
            }
            chrome.runtime.sendMessage({
                name: "close"
            })
        })
    }
    $('body').click(function (evt) {
        if ((evt.ctrlKey && !evt.metaKey) || (!evt.ctrlKey && evt.metaKey)) {
            evt.preventDefault();
            if (evt.detail === 2) {
                chrome.runtime.sendMessage({
                    name: "toggle"
                })
            }
        }
    });
});