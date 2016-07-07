
var wrapng = (function () {
    "use strict";

    var moduleRt,
        moduleA,
        moduleB;

    console.log("Loading maplinkr outer script");
    moduleA = angular.module("MyModuleA", []);
    moduleA.controller("MyControllerA", function ($scope) {
        $scope.name = "Bob A";

        $scope.$on("BroadcastEvent", function(evt, args) {
            console.log("BroadcastEvent in A");
        });
    });

    moduleB = angular.module("MyModuleB", []);
    moduleB.controller("MyControllerB", function ($scope) {
        $scope.name = "Steve B";

        $scope.clickB = function() {
            console.log("ClickB");
            $scope.$emit("BClickerEvent");
        }
    });

    moduleRt = angular.module("RtMod", []);
    moduleRt.config(['$controllerProvider'], function ($controllerProvider) {

    });
    moduleRt.controller("RtCtrl", function ($scope) {
        var safeApply;
        
        $scope.name = "Root";

        $scope.$on("BClickerEvent", function(evt, args) {
            console.log("BClickerEvent caught in Root");
            $scope.$broadcast("BroadcastEvent");
        });

        $scope.safeApply = function (fn) {
            var phase;
            if (this.$root) {
                phase = this.$root.$$phase;
                if (phase === '$apply' || phase === '$digest') {
                    if (fn && (typeof fn === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            }
        };
        safeApply = function () {
            $scope.safeApply();
        }
    });

    moduleRt.factory("LinkrService", function () {
        var lnkrdiv = document.getElementById('linkerDirectiveId');

    });

    function onLoadMapLinkr() {
        var elMapCol,
            elNGCol,
            lnkrScope,
            rtCtrl,
            rtRef;

        console.log("onLoadMapLinkr called from main");
        elMapCol = document.getElementById('idMapCol');
        elNGCol = angular.element(elMapCol);

        console.debug(elNGCol);
        lnkrScope = elNGCol.scope();

        //rtRef = angular.module('rtMod');
        rtCtrl = moduleRt.controller();
        rtCtrl.safeApply();
        //console.debug(rtRef);
        // lnkrScope.safeApply();
    }
    return {
        onLoadMapLinkr : onLoadMapLinkr
    }

})();
