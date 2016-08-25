voyagerApp.filter('flightTime', function () {
    return function (input) {
        var date = new Date(Date.parse(input));
        //https://www.datejs.com/test/date_and_time/index.html
        return date.toString("dddd, MMMM dd, yyyy h:mm tt");
    };
});

voyagerApp.filter('unique', function () {

    return function (arr, field) {
        if (typeof arr == 'undefined') return;
        var o = {}, i, l = arr.length, r = [];
        for(i=0; i<l;i+=1) {
            o[arr[i][field]] = arr[i];
        }
        for(i in o) {
            r.push(o[i]);
        }
        return r;
    };
});

voyagerApp.filter('uniqueFlight', function () {
    return function (arr, field) {
        if (typeof arr == 'undefined') return;

        var o = {}, i, l = arr.length, r = [];
        for (i = 0; i < l; i += 1) {
            var airlineCode = arr[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption.FlightSegments[0].MarketingAirline.Code;
            if (!o[airlineCode]) {
                o[airlineCode] = true;
                r.push(arr[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption.FlightSegments[0].MarketingAirline);
            }
        }
        return r;
    };
});

voyagerApp.filter('airlines', function () {
    return function (arr, code, $scope) {
        var i, filteredResult = [];
        if (typeof $scope.searchResult.length == 'undefined') return filteredResult;
        if (typeof code == 'undefined' || code == null)
            filteredResult = $scope.searchResult;
        else {
            var l = $scope.searchResult.length;
            for (i = 0; i < l; i++) {
                if ($scope.searchResult[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption.FlightSegments[0].MarketingAirline.Code === code)
                    filteredResult.push($scope.searchResult[i]);
            }
        }
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredResult = filteredResult;
        return filteredResult.slice(begin, end);
    };
});

voyagerApp.filter('sort', function () {
    return function (array, key, reverse) {
        if (reverse)
            return array.sort(function (a, b) {
                var x = eval('a' + '.' + key);
                var y = eval('b' + '.' + key);
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        else
            return array.sort(function (a, b) {
                var x = eval('a' + '.' + key);
                var y = eval('b' + '.' + key);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
    };
});
