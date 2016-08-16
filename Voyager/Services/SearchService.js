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
        //if (typeof result.OTA_AirLowFareSearchPlusRS.Errors != 'undefined') {
        //    searchResult.OTA_AirLowFareSearchPlusRS.PricedItineraries.PricedItinerary = [];
        //    alert(result.OTA_AirLowFareSearchPlusRS.Errors.Error.value);
        //    $rootScope.$broadcast('update');
        //    return;
        //}
        if (typeof searchResult.OTA_AirLowFareSearchPlusRS.PricedItineraries == 'undefined') {
            $rootScope.$broadcast('update'); return;
        };
        for (index in searchResult.OTA_AirLowFareSearchPlusRS.PricedItineraries.PricedItinerary) {
            var itinerary = searchResult.OTA_AirLowFareSearchPlusRS.PricedItineraries.PricedItinerary[index];
            if(oneway)
                this.setODOption( itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption);
            else
                for (i in itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption) {
                    this.setODOption(itinerary.AirItinerary.OriginDestinationOptions.OriginDestinationOption[i]);
                }
        }
        $rootScope.$broadcast('update');
    };
    this.setODOption = function (option) {
        option.FlightSegments = new Array();
        var segment = option.FlightSegment;

        if (segment.length == undefined) {
            option.FlightSegments.push(segment);
        }
        else
            option.FlightSegments = segment;
        // odOption.FlightSegments[0].DepartureDateTime = odOption.FlightSegments[0].DepartureDateTime.replace(/T|:|-/g, '');
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
        if (!this.validateDate(travelInfo.departureDate)) {
            alert('Please enter valid departure date');
            return false;
        }
        if(!travelInfo.oneway)
        if (!this.validateDate(travelInfo.returnDate)) {
            alert('Please enter valid return date');
            return false;
        }
        return true;
    };
    this.validateDate = function (text) {
        try{
            text = this.calenderDate(text);
            return true;
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

