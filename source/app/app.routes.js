(function() {
    'use strict';

    function config(stateProvider, urlRouterProvider, locationProvider, $qProvider, $uiViewScrollProvider) {
        $qProvider.errorOnUnhandledRejections(false); // for Possibly unhandled rejection: {} bug in angular js

        var componentPath = settings.path.components,
            sharedComponentPath = settings.path.sharedComponents;

        urlRouterProvider.otherwise('home');


        var commomObj = {
            header: {
                templateUrl: sharedComponentPath + 'header/headerView.html'
            },
            footer: {
                templateUrl: sharedComponentPath + 'footer/footerView.html'
            }
        };

        stateProvider
            //Level -1
            .state('base', {
                views: {
                    header: commomObj.header,
                    content: {
                        template: '<div ui-view="main" autoscroll="true"></div>',
                    },
                    footer: commomObj.footer
                }
            })
            //Level - 2
            // .state('cart', {
            //     url: settings.links.cart,
            //     parent: "base",
            //     views: {
            //         main: {
            //             templateUrl: componentPath + 'shoppingCart/shoppingCartView.html',
            //             controller: 'shoppingCartCtrl',
            //             controllerAs: 'scc'
            //         }
            //     }
            // });
            .state('home', {
                url: settings.links.home,
                parent: "base",
                views: {
                    main: {
                        templateUrl: componentPath + 'home/homeView.html',
                        controller: 'homeCtrl',
                        controllerAs: 'hc'
                    }
                }
            });

        // locationProvider.html5Mode(true);
        //
        //
        // var scrollable = document.querySelector("html");
        // lazyImgConfigProvider.setOptions({
        //     offset: 50, // how early you want to load image (default = 100)
        //     errorClass: 'error', // in case of loading image failure what class should be added (default = null)
        //     successClass: 'success', // in case of loading image success what class should be added (default = null)
        //     onError: function(image) {}, // function fired on loading error
        //     onSuccess: function(image) {}, // function fired on loading success
        //     //  container: angular.element(scrollable) // if scrollable container is not $window then provide it here
        // });
        $uiViewScrollProvider.useAnchorScroll();

    }

    angular
        .module(ngApp)
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider', '$uiViewScrollProvider'];

})();
