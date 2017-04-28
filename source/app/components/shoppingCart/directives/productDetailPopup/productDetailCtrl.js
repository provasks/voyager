(function() {
    'use strict';

    function productDetailCtrl($scope, apiRequest, cs) {
        var pdc = this;

        function getColorBoxes() {
            return document.getElementsByClassName("box");
        }

        function selectColor(color) {
            var boxes = getColorBoxes();

            for (var index = 0, len = boxes.length; index < len; index++) {
                var element = angular.element(boxes[index]);
                var rgb = element.css('background-color');
                var hex = cs.rgb2hex(rgb);
                if (hex.toUpperCase() === color.hexcode) {
                    element.addClass('selected');
                } else {
                    element.removeClass('selected');
                }
            }
        }

        function init() {
            pdc.product = cs.product;
            // var colorBoxesWidth = pdc.product.p_available_options.colors.length * (20 + 3);
            // var boxes = getColorBoxes();
            // boxes.css({
            //     "width": colorBoxesWidth
            // });
        }
        init();

        pdc.selectColor = selectColor;
    }

    angular.module('App').controller('productDetailCtrl', productDetailCtrl);
    productDetailCtrl.$inject = ['$scope', 'apiRequest', 'commonService'];
})();
