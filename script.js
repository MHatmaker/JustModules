var moduleA = angular.module("MyModuleA", []);
moduleA.controller("MyControllerA", function($scope) {
    $scope.name = "Bob A";
});

var moduleB = angular.module("MyModuleB", []);
moduleB.controller("MyControllerB", function($scope) {
    $scope.name = "Steve B";
});
