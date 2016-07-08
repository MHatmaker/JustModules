;
    "use strict";
    console.log("loading main.js");

    function onLoadLinkrClick(e,a) {
        var rtMapLinkr;
        console.log("onLoadLinkrClick");
        clientSideInclude('MapCol', '/views/partials/mapcol.html');
        setTimeout(function () {
            rtMapLinkr = document.getElementById('rtML');
            wrapng.onLoadMapLinkr();
            ngmodswrap.initMods(rtMapLinkr);
        }, 500);
    }
// }.call(this));
