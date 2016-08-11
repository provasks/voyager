voyagerApp = voyagerApp || {}
voyagerApp.service('GeolocatorService', function ($q, $http) {
    var API_URL = 'http://jjperezaguinaga.webscript.io/waymate?term=';
    this.searchFlight = function(term) {
        var deferred = $q.defer();
        $http.get(API_URL+term).then(function(flights){
            var _flights = {};
            var flights = flights.data;
            for(var i = 0, len = flights.length; i < len; i++) {
                _flights[flights[i].name] = flights[i].country;
            }
            deferred.resolve(_flights);
        }, function() {
            deferred.reject(arguments);
        });
        return deferred.promise;
    } 
})