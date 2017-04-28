(function() {
    'use strict';

    function popUp() {
        return {
            restrict: 'E',
            scope: {
                modalClass: "=",
                popupDiv: "@"
            },
            link: function(scope, element, attr, controller) {

                scope.closePopup = function() {
                    var id = attr.id;
                    //scope.$parent.pdc.$destroy();
                    scope.$parent.main.closePopupFn();
                    // controller.$destroy();
                };
            },
            replace: true,
            transclude: true,
            templateUrl: settings.path.directives + 'popUp/popUpView.html'
        };
    }
    angular.module("App").directive('popUp', popUp);
    popUp.$inject = [];
})();
