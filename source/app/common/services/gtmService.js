(function() {
    'use strict';

    function gtmService() {
        var gtm = this;

        function push(event, data) {
            setTimeout(function() {
                dataLayer.push({
                    event: event,
                    product: data
                });
            }, 100);
        }

        gtm.push = push;
    }
    angular.module(ngApp).service('gtmService', gtmService);
    gtmService.$inject = [];
})();
