(function() {
    'use strict';

    function homeCtrl($scope, apiRequest, cs) {
        /***********************************************
            Variables
        ***********************************************/
        var hc = this;

    }

    angular.module('App').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', 'apiRequest', 'commonService'];
})();
