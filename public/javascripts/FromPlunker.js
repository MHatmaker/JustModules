
angular.module('firstModule', ['secondModule'])
  .controller('FirstController', ['$scope', 'sharedData', function($scope, sharedData) {
    this.data = sharedData.data;
  }])
  .service('sharedData', SharedData);


function SharedData() {

  this.data = {
    value: 'default value'
  }

}
angular.module('secondModule', [])
  .controller('SecondController', ['$scope', 'sharedData', function($scope, sharedData)
     {
      this.data = sharedData.data;
  }]);

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>AngularJS Plunker</title>
  <script>
    document.write('<base href="' + document.location + '" />');
  </script>
  <link rel="stylesheet" href="style.css" />
  <script data-require="angular.js@1.2.x" src="http://code.angularjs.org/1.2.15/angular.js" data-semver="1.2.15"></script>
  <script src="app.js"></script>
</head>


<body>
  <div ng-app="firstModule">

    <div ng-controller="FirstController as vm">
      First Controller in module firstModule<br>
      <input type=text ng-model="vm.data.value" />
    </div>

    <div ng-controller="SecondController as vm">
      Second Controller in module secondModule<br>
      {{vm.data.value}}
    </div>
  </div>

</body>

</html>
