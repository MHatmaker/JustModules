// Code goes here



(function () {
    "use strict";

    var moduleRt,
        moduleA,
        moduleB;

    moduleA = angular.module("MyModuleA", []);
    moduleA.controller("MyControllerA", function ($scope) {
        $scope.name = "Bob A";
    });

    moduleB = angular.module("MyModuleB", []);
    moduleB.controller("MyControllerB", function ($scope) {
        $scope.name = "Steve B";
    });

    moduleRt = angular.module("RtMod", []);
    moduleRt.controller("RtCtrl", function ($scope) {
        $scope.name = "Root";
    });

}());
