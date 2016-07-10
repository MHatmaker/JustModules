
var wrapng = (function () {
    "use strict";

    var moduleRt,
        moduleA,
        moduleB,
        selfMethods = {};

    console.log("Loading maplinkr outer script");
    moduleA = angular.module("MyModuleA", []);
    moduleA.controller("MyControllerA", ['$scope', function ($scope) {
        $scope.name = "Bob A";

        $scope.$on("BroadcastEvent", function(evt, args) {
            console.log("BroadcastEvent in A");
        });
    }]);

    moduleB = angular.module("MyModuleB", []);
    moduleB.controller("MyControllerB", ['$scope', function ($scope) {
        $scope.name = "Steve B";

        $scope.clickB = function() {
            console.log("ClickB");
            $scope.$emit("BClickerEvent");
        }
    }]);

    moduleRt = angular.module("RtMod", []);
    moduleRt.config(['$controllerProvider'], function ($controllerProvider) {

    });
    moduleRt.controller("RtCtrl", ['$scope', function ($scope) {
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
        selfMethods.sfApl = safeApply;
    }]);

    moduleRt.value('initMe', {
        whatsthis : 'Whats this',
        setMe : function(v) {
            whatsthis = v;
        },
        getMe : function() {
            return "whatsthis is set to " + whatsthis;
        }
    });
    moduleRt.run(function(){
        setMe("uninteresting tidbit");
        console.log(getMe());
    });

    moduleRt.factory("LinkrService", function () {
        var lnkrdiv = document.getElementById('linkerDirectiveId');

    });

    function onLoadMapLinkr() {
        var elMapHolder,
            elNGHolder,
            lnkrScope,
            rtCtrl,
            rtRef;

        console.log("onLoadMapLinkr called from main");
        elMapHolder = document.getElementById('idMapLinkrHolder');
        elNGHolder = angular.element(elMapHolder);

        console.debug(elNGHolder);
        lnkrScope = elNGHolder.scope();

        //rtRef = angular.module('rtMod');
        rtCtrl = moduleRt.controller();
        console.debug(rtCtrl);
        // selfMethods.sfApl();
        //rtCtrl.safeApply();
        //console.debug(rtRef);
        // lnkrScope.safeApply();
    }
    return {
        onLoadMapLinkr : onLoadMapLinkr
    }

})();
