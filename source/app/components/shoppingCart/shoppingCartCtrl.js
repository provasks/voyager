(function() {
    'use strict';

    function shoppingCartCtrl($scope, apiRequest, cs) {
        /***********************************************
            Variables
        ***********************************************/
        var scc = this;
        scc.isFreeShipping = true;

        /***********************************************
            Callback function of getData()
        ***********************************************/
        function getDataCallback(resp) {
            scc.cart = resp.data;
        }

        /***********************************************
            Get JSON data using API
        ***********************************************/
        function getData() {
            apiRequest.getRequest(settings.api.dataUrl, {}, {}, getDataCallback, '', false);
        }

        /***********************************************
            this function is responsible to pad zero
            when the number is single digit
        ***********************************************/
        function padZero(n) {
            return cs.padZero(n);
        }

        /***********************************************
            Return shippingCost from SubTotal
        ***********************************************/
        function getShippingCost(subtotal) {
            if (subtotal <= 50) {
                scc.isFreeShipping = false;
                return $scope.main.lang.shippingCost.toFixed(2);
            }
            return 0;
        }

        /***********************************************
            Discount Algorithm
        ***********************************************/
        function getDiscount(count, subTotal) {
            var discount = 0;
            if (count === 3) {
                discount = subTotal * 5 / 100;
            } else if (count >= 3 && count <= 6) {
                discount = subTotal * 10 / 100;
            } else if (count > 10) {
                discount = subTotal * 25 / 100;
            } else {
                discount = 0;
            }
            return discount.toFixed(2);
        }

        /***********************************************
            Calculate Total
        ***********************************************/
        function getTotal() {
            return (scc.subTotal - parseFloat(scc.discount) + parseFloat(scc.shippingCost)).toFixed(2);
        }

        /***********************************************
            Subtotal Algorithm
        ***********************************************/
        function getSubtotal(cart) {
            if (!cart) {
                return;
            }
            var subTotal = 0;
            for (var i = 0, len = cart.length; i < len; i++) {
                subTotal += cart[i].p_price * cart[i].p_quantity;
            }
            scc.subTotal = subTotal;
            scc.discount = getDiscount(cart.length, scc.subTotal);
            scc.shippingCost = getShippingCost(scc.subTotal);
            scc.total = getTotal();
            return scc.subTotal.toFixed(2);
        }

        /***********************************************
            Variables
        ***********************************************/
        function showEditPopup(product) {
            cs.product = product;
            cs.mode = "edit";
            $scope.main.showProductDetial = true;
            setTimeout(function() {
                $scope.main.openPopUp('productDetailPopup');
            }, 100);
            var data = {
                'name': product.p_name,
                'color': product.p_selected_color.name,
                'style': product.p_style
            };
            // gtm.push('ProductViewed', data);
        }

        function updateCart(oldValue, currentValue) {
            console.log("Old Value: ", oldValue, "Current Value: " + currentValue);
            getSubtotal();
        }

        function removeItem(product) {
            var index = scc.cart.productsInCart.indexOf(product);
            scc.cart.productsInCart.splice(index, 1);
            var data = {
                'name': product.p_name,
            };
            // gtm.push('RemovedFromCart', data);
        }

        function addToCart(product) {
            var data = {
                name: product.p_name,
                quantity: product.p_quantity,
                price: product.p_quantity * product.p_price
            };
            // gtm.push('AddToCart', data);
        }

        function init() {
            getData();
        }
        init();

        scc.padZero = padZero;
        scc.getSubtotal = getSubtotal;
        scc.showEditPopup = showEditPopup;
        scc.updateCart = updateCart;
        scc.removeItem = removeItem;
        scc.addToCart = addToCart;
    }

    angular.module('App').controller('shoppingCartCtrl', shoppingCartCtrl);
    shoppingCartCtrl.$inject = ['$scope', 'apiRequest', 'commonService'];
})();
