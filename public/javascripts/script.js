/*global console */
/*global angular */

var wrapng = (function () {
    "use strict";

    var moduleRt,
        moduleA,
        moduleB,
        MyControllerB;

    console.log("Loading maplinkr outer script");

    moduleRt = angular.module("RtMod", ['MyModuleA', 'MyModuleB'])
        .value('initMe', {
            whatsthis : 'Whats this',
            setMe : function (v) {
                this.whatsthis = v;
            },
            getMe : function () {
                return "whatsthis is set to " + this.whatsthis;
            }
        })
        .factory('pubsubService', ['initMe', function (initMe) {
            this.data = {
                msg : "default msg"
            };
            return {
                getMsg : function () {
                    return initMe.getMe();
                }
            };
        }])
        .controller("RtCtrl", ['$scope', 'pubsubService', function ($scope, pubsubService) {
            // var safeApply;
            $scope.name = "Root";
            $scope.msg = pubsubService.getMsg();

            $scope.showLinkr = function () {
                console.log("Clicked on Show Linkr");
            };

            $scope.$on("BClickerEvent", function () {
                console.log("BClickerEvent caught in Root");
                $scope.$broadcast("BroadcastEvent");
            });
            //
            // $scope.safeApply = function (fn) {
            //     var phase;
            //     if (this.$root) {
            //         phase = this.$root.$$phase;
            //         if (phase === '$apply' || phase === '$digest') {
            //             if (fn && (typeof fn === 'function')) {
            //                 fn();
            //             }
            //         } else {
            //             this.$apply(fn);
            //         }
            //     }
            // };
            // safeApply = function () {
            //     $scope.safeApply();
            // }
            // selfMethods.sfApl = safeApply;
        }]);

    // moduleRt.value('initMe', {
    //     whatsthis : 'Whats this',
    //     setMe : function(v) {
    //         this.whatsthis = v;
    //     },
    //     getMe : function() {
    //         return "whatsthis is set to " + this.whatsthis;
    //     }
    // });
    moduleRt.run(['initMe', function (initMe) {
        initMe.setMe("uninteresting tidbit");
        console.log(initMe.getMe());
    }]);
    // console.debug(ModuleRt);

    // moduleRt.service('pubsubsvc', function pubSubSvc() {
    //     this.data = {
    //         msg : "default msg"
    //     }
    // });
    // moduleRt.factory("LinkrService", function () {
    //     var lnkrdiv = document.getElementById('linkerDirectiveId');
    //
    // });

    moduleA = angular.module("MyModuleA", ['RtMod'])
        .controller("MyControllerA", ['$scope', 'pubsubService', function ($scope, pubsubService) {
            $scope.name = "Bob A";
            $scope.msg = pubsubService.getMsg();

            $scope.$on("BroadcastEvent", function (evt, args) {
                console.log("received BroadcastEvent in A");
            });
        }]);
        .run(['initMe', function (initMe) {
            console.log(initMe.getMe());
        }]);

    moduleB = angular.module("MyModuleB", ['RtMod'])
        .controller('MyControllerB', ['$scope', 'pubsubService', function ($scope, pubsubService) {
            $scope.name = "Steve B";

            $scope.msg = pubsubService.getMsg();
            // this.$apply(function () {
            //     console.log("apply in MyControllerB");
            // });

            $scope.clickB = function () {
                console.log("ClickB");
                $scope.$emit("BClickerEvent");
            };
        }]);

    function onLoadMapLinkr() {
        console.log("onLoadMapLinkr");
        /*
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
        */
    }
    return {
        onLoadMapLinkr : onLoadMapLinkr
    };

}());
