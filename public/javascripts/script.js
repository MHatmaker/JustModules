
var wrapng = (function () {
    "use strict";

    var moduleRt,
        moduleA,
        moduleB,
        MyControllerB,
        selfMethods = {};

    console.log("Loading maplinkr outer script");
    moduleA = angular.module("MyModuleA", []).
        controller("MyControllerA", ['$scope', 'pubsubsvc', function ($scope, pubsubsvc) {
        $scope.name = "Bob A";

        $scope.$on("BroadcastEvent", function(evt, args) {
            console.log("received BroadcastEvent in A");
        });
    }]);

    moduleRt = angular.module("RtMod", ['MyModuleB'])
        .service('pubsubsvc', function pubSubSvc() {
            this.data = {
                msg : "default msg"
            }
        })
        .controller("RtCtrl", ['$scope', 'pubsubsvc', function ($scope, pubsubsvc) {
            var safeApply;
            this.pubsub = pubsubsvc.msg;
            $scope.name = "Root";
            this.pubsub = pubsubsvc.msg;

            $scope.showLinkr = function() {
                console.log("Clicked on Show Linkr");
            };

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
            this.whatsthis = v;
        },
        getMe : function() {
            return "whatsthis is set to " + this.whatsthis;
        }
    });
    moduleRt.run(['initMe', function(initMe){
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

    moduleB = angular.module("MyModuleB", [])
            .controller('MyControllerB', ['$scope', 'pubsubsvc', function ($scope, pubsubsvc) {
            $scope.name = "Steve B";

            $scope.clickB = function() {
                console.log("ClickB");
                $scope.$emit("BClickerEvent");
            }
        }]);

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
