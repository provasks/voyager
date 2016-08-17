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
    return function (arr, code) {
        var i,  r = [];
        if (typeof code == 'undefined' || code == null)
            return arr;
        else {
            var l = arr.length;
            for (i = 0; i < l; i++) {
                if(arr[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption.FlightSegments[0].MarketingAirline.Code===code)
                    r.push(arr[i]);
            }
            return r;
        }
        
    };
});

