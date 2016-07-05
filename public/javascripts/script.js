
(function () {
    "use strict";

    var moduleRt,
        moduleA,
        moduleB;

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
    moduleRt.controller("RtCtrl", function ($scope) {
        $scope.name = "Root";

        $scope.$on("BClickerEvent", function(evt, args) {
            console.log("BClickerEvent caught in Root");
            $scope.$broadcast("BroadcastEvent");
        });
    });

    moduleRt.factory("LinkrService", function () {
        var lnkrdiv = document.getElementById('linkerDirectiveId'),

    function addLinkrDiv() {}
        var mlbody = angular.element("rtDiv");
        var $div = $('<div ng-controller="linkerDirectiveId">{{content.label}}</div>');
        $(document.body).append($div);

        angular.element(document).injector().invoke(function($compile) {
          var scope = angular.element($div).scope();
          $compile($div)(scope);
        });
    }

}());
