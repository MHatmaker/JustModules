
(function () {
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
        $scope.safeApply();
    });

    moduleRt.factory("LinkrService", function () {
        var lnkrdiv = document.getElementById('linkerDirectiveId');


    function addLinkrDiv() {}
        var mlbody = angular.element("rtDiv");
        var $div = $('<div ng-controller="linkerDirectiveId">{{content.label}}</div>');
        $(document.body).append($div);

        angular.element(document).injector().invoke(function($compile) {
          var scope = angular.element($div).scope();
          $compile($div)(scope);
        });
    });

}.call(this));


function onLoadMapLinkr() {
    var elMapCol,
        elNGCol,
        lnkrScope,
        $inj,

        addLinkrDivOuter = function() {
            var mlbodyDoc = document.getElementById('rtDiv');
            var mlbody = angular.element(mlbodyDoc);
            var lnkdiv = '<div ng-controller="linkerDirectiveId">{{content.label}}</div>';
            mlbody.append(lnkdiv);
            $inj = angular.injector(['RtMod']);

            $inj.invoke(function($compile) {
              var scope = angular.element(lnkdiv).scope();
              $compile(lnkdiv)(scope);
            });
        }
    console.log("onLoadMapLinkr called from main");
    elMapCol = document.getElementById('idMapCol');
    elNGCol = angular.element(elMapCol);
    addLinkrDivOuter();

    console.debug(elNGCol);
    // lnkrScope = elNGCol.scope();
    // lnkrScope.safeApply();
}
