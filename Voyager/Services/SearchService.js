/**
 * Created by provasks on 3/22/2016.
 */
voyagerApp.service('SearchService', function ($rootScope) {
    var searchMode = "flight";
    var searchResult = null;
    this.setSearchMode = function (mode) {
        searchMode = mode;
    };
    this.getSearchMode = function () {
        return searchMode;
    };
    this.setSearchResult = function (result, oneway) {
        searchResult = result;
        if (typeof searchResult.OTA_AirLowFareSearchPlusRS.PricedItineraries == 'undefined') {
            $rootScope.$broadcast('update'); return;
        };
        for (index in searchResult.OTA_AirLowFareSearchPlusRS.PricedItineraries.PricedItinerary) {
            var itinerary = searchResult.OTA_AirLowFareSearchPlusRS.PricedItineraries.PricedItinerary[index];
            if(oneway)
                this.setODOption( itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption);
            else
                for (i in itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption) 
                    this.setODOption(itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption[i]);
        }
        $rootScope.$broadcast('update');
    };
    this.setODOption = function (option) {
        option.FlightSegments = new Array();
        var segment = option.FlightSegment;

        if (segment.length == undefined)
            option.FlightSegments.push(segment);
        else
            option.FlightSegments = segment;
        option.FlightSegment = undefined;
    }
    this.getSearchResult = function () {
        return searchResult;
    };
    this.validateData = function (travelInfo) {
        travelInfo.adult = travelInfo.adult || 0;
        travelInfo.child = travelInfo.child || 0;
        if (travelInfo.flyFrom == '' || travelInfo.flyTo == '') {
            alert('Please enter the Source and Destination Airport');
            return false;
        }
        if (travelInfo.adult + travelInfo.child == 0) {
            alert('You should select at least one person');
            return false;
        }
        if (!this.validateDate(this.dateOnly(travelInfo.departureDate))) {
            alert('Please enter valid departure date');
            return false;
        }
        if (!travelInfo.oneway) {
            if (!this.validateDate(this.dateOnly(travelInfo.returnDate))) {
                alert('Please enter valid return date');
                return false;
            }
            if (this.dateOnly(travelInfo.departureDate) > this.dateOnly(travelInfo.returnDate)) {
                alert('Departure date must be less than or equal to Return date');
                return false;
            }
        }
        return true;
    };
    this.dateOnly = function (d) {
        return new Date(d.setHours(0, 0, 0, 0));
    }
    this.validateDate = function (text) {
        try{
            var temp = this.calenderDate(text);
            return text >= this.dateOnly(new Date());
        }
        catch (err) {
            return false;
        }
    };
    this.calenderDate = function (text) {
        var dd = text.getDay();
        dd = dd < 10 ? "0" + dd : dd;
        var mm = text.getMonth();
        mm = mm < 10 ? "0" + mm : mm;
        var yyyy = text.getFullYear();
        return mm + '/' + dd + '/' + yyyy;
    };
});

