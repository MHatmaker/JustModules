;
    "use strict";
    console.log("loading main.js");

    function onLoadLinkrClick(e,a) {
        console.log("onLoadLinkrClick");
        clientSideInclude('MapCol', '/views/partials/mapcol.html');
        wrapng.onLoadMapLinkr();
    }
// }.call(this));
