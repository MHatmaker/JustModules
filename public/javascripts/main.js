;
    "use strict";
    console.log("loading main.js");

    function onLoadLinkrClick(e,a) {
        console.log("onLoadLinkrClick");
        clientSideInclude('MapCol', '/views/partials/mapcol.html');
        setTimeout(function () {
            var rtMapLinkr = document.getElementById('rtML');
            wrapng.onLoadMapLinkr();
            ngmodswrap.initMods(rtMapLinkr);
        }, 500);
    }
// }.call(this));
