/**
 * Created by provasks on 3/22/2016.
 */
var voyagerApp = voyagerApp || angular.module("voyagerApp", ['ngRoute']);
voyagerApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
