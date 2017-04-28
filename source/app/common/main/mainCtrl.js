(function() {
    'use strict';

    function mainCtrl($scope, apiRequest, $timeout, cs, $window, $state, $stateParams) {
        var main = this;
        main.lang = lang;
        main.settings = settings;

        function openPopUp(id) {
            $timeout(function() {
                main.modal = document.getElementById(id);
                main.closePopup = document.getElementById('closePopup');
                angular.element(document.querySelector('body')).addClass('noscroll');
                main.modal.style.display = "block";
            }, 10);
        }

        function closePopupFn() {
            var scope = $scope;
            angular.element(document.querySelector('body')).removeClass('noscroll');
            if (main.modal) {
                main.modal.style.display = "none";
            }
            //main.showProductDetial = false;
        }

        main.closePopupFn = closePopupFn;
        main.openPopUp = openPopUp;

        function init() {
            // setUserData();
        }
        init();
    }

    angular.module('App').controller('mainCtrl', mainCtrl);
    mainCtrl.$inject = ['$scope', 'apiRequest', '$timeout', 'commonService', '$window', '$state', '$stateParams'];
})();
