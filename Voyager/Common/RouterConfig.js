/**
 * Created by provasks on 3/24/2016.
 */
voyagerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'views/Home.html',
                controller: 'HomeController'
            }).
            when('/flightSearchResult', {
                templateUrl: 'views/flight-search-result.html',
                controller: 'FlightSearchResultController'
            }).
            when('/SeatMap', {
                templateUrl: 'views/SeatMap.html'
            }).
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                controller: 'LoginController'
            }).
            when('/forgotpassword', {
                templateUrl: 'views/forgotpassword.html',
                controller: 'LoginController'
            }).
            when('/resetpassword', {
                templateUrl: 'views/resetpassword.html',
                controller: 'LoginController'
            }).
            when('/company', {
                templateUrl: 'views/company.html'
            }).
            when('/team', {
                templateUrl: 'views/team.html'
            }).
            when('/director', {
                templateUrl: 'views/director.html'
            }).
            when('/clients', {
                templateUrl: 'views/clients.html'
            }).
            when('/services', {
                templateUrl: 'views/services.html'
            }).
            when('/corporate', {
                templateUrl: 'views/corporate.html'
            }).
            when('/partners', {
                templateUrl: 'views/partners.html'
            }).
            when('/contact', {
                templateUrl: 'views/contact.html'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);
