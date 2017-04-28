(function() {
    'use strict';

    function commonService($window, $timeout) {
        var cs = this;
        cs.product = {};
        cs.mode = "edit";

        cs.padZero = function(n) {
            return (n < 10) ? ("0" + n) : n;
        };

        cs.rgb2hex = function(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        };
    }
    angular.module(ngApp).service('commonService', commonService);
    commonService.$inject = ['$window', '$timeout'];
})();
