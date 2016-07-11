;
    "use strict";
    console.log("loading main.js");

    function onLoadLinkrClick(e,a) {
        console.log("onLoadLinkrClick");
        clientSideInclude('MapLinkrHolder', '/views/partials/mapcol.html', 'append');
        setTimeout(function () {
            // wrapng.onLoadMapLinkr();
            var rtMapLinkr = document.getElementById('rtML');
            ngmodswrap.initMods(rtMapLinkr);
        }, 500);
    }
// }.call(this));
