;
    "use strict";
    console.log("loading main.js");

    function onLoadLinkrClick(e,a) {
        console.log("onLoadLinkrClick");
        clientSideInclude('MapLinkrHolder', '/views/partials/maplinkrplugin.html', 'append');
        setTimeout(function () {
            // wrapng.onLoadMapLinkr();
            var rtMapLinkr = document.getElementById('rtML');
            ngmodswrap.initMods(rtMapLinkr);
        }, 300);
    }
// }.call(this));
