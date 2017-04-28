(function() {
    'use strict';

    function productDetailPopup() {
        return {
            restrict: 'E',

            controller: "productDetailCtrl",
            controllerAs: "pdc",

            link: function(scope, element, attr) {
                scope.title = lang.thankYouTxt;
                scope.msg = lang.notifySoonTxt;
            },

            /*link: function(scope, element, attr) {

            },*/
            //replace: true,
            //transclude: true,
            templateUrl: settings.path.components + 'shoppingCart/directives/productDetailPopup/productDetailPopupView.html'
        };

    }
    angular.module('App').directive('productDetailPopup', productDetailPopup);
    productDetailPopup.$inject = [];
})();
