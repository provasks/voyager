/**
 * Created by provasks on 3/24/2016.
 */
voyagerApp.controller('SearchController', ['$scope', 'SearchService', 'UtilityService', 'travelInfo',
    function ($scope, SearchService, UtilityService, travelInfo) {
        $scope.filteredResult = []
       , $scope.currentPage = 1
       , $scope.numPerPage = 20
       , $scope.maxSize = 5
       , $scope.pageOptions = [
            {
                name: '10',
                value: '10'
            },
            {
                name: '20',
                value: '20'
            },
            {
                name: '50',
                value: '50'
            },
            {
                name: '100',
                value: '100'
            }
        ];


        $scope.searchMode = SearchService.getSearchMode();
        $scope.searchResultCount = 0;
        $scope.searchResult = {};
        $scope.forms = {};
        $scope.travelInfo = travelInfo;
        $scope.reverse = false;
        $scope.searchHotel = function () {
            alert('Searching ' + $scope.searchMode);
        };
        $scope.searchFlight = function () {
            $scope.$watch('frmSearch', function (frmSearch) {
                if (frmSearch.$dirty) {
//                    var url = 'itinerary.json';
                    var url = '/WebServices/SearchService.asmx/SearchFlight';
                    if (!SearchService.validateData($scope.travelInfo)) return;
                    location.href = "#/flightSearchResult";
                    UtilityService.callPostAPI(url, $scope.travelInfo, $scope.setSearchResult);
                    frmSearch.$setPristine();
                }
            });
        };
        $scope.getSeatMap = function () {
            var url = '/WebServices/SearchService.asmx/GetSeatMap';
            //if (!SearchService.validateData($scope.travelInfo)) return;
            location.href = "#/seatMap";
            UtilityService.callPostAPI(url, $scope.travelInfo, $scope.setSeatMap);
        };
        $scope.setSeatMap = function (response) {
            var a = '';
        };
        $scope.getFromAirports = function (keyword) {
            SearchService.getAirports(keyword, $scope.setFromAirports);
        };
        $scope.setFromAirports = function (response) {
            try {
                var json = UtilityService.removeXML(response.data);
                if (typeof json.response == 'undefined') return;
                $scope.travelInfo.fromAirports = SearchService.mergeAirports(json.response);
            }
            catch (err) {
                alert('No airport found with the query');
            }
        };
        $scope.getToAirports = function (keyword) {
            SearchService.getAirports(keyword, $scope.setToAirports);
        };
        $scope.setToAirports = function (response) {
            try {
                var json = UtilityService.removeXML(response.data);
                if (typeof json.response == 'undefined') return;
                $scope.travelInfo.toAirports = json.response.airports;
            }
            catch (err) {
                alert('No airport found with keyword.');
            }

        };
        $scope.sortResult = function (objId) {
            var val = $("#" + objId + " option:selected").val();
            if (objId=='ddlPrice') {
                $scope.property = "AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount";
                $scope.reverse = (val == "asc") ? true : false; //the logic seems not correct but working properly
            }
            else if (objId == 'ddlDepTime') {
                $scope.property = "AirItinerary.OriginDestinationOptions.OriginDestinationOption.FlightSegments[0].DepartureDateTime";
                $scope.reverse = (val == "asc") ? false : true;
            }
        };
        $scope.setSearchResult = function (response) {
            //response.data = dataItinerary;  //should be commented
            try {
                var json = UtilityService.removeXML(response.data);
                SearchService.setSearchResult(json.soapEnvelope.soapBody.wmLowFarePlusResponse, $scope.travelInfo.oneway);
            }
            catch (err) {
                alert('NO ITINERARY FOUND FOR REQUESTED SEGMENT ');
            }
            
        };

        $scope.setSearchMode = function (mode) {
            SearchService.setSearchMode(mode);
            $scope.searchMode = SearchService.getSearchMode();
        };
        $scope.setItemsPerPage = function (num) {
            $scope.numPerPage = (num === parseInt(num, 10)) ? num:20;
            $scope.currentPage = 1; //reset to first paghe
        }
        $scope.$on('update', function () {
            var r = SearchService.getSearchResult();
            if (r.OTA_AirLowFareSearchPlusRS.Errors) {
                r.OTA_AirLowFareSearchPlusRS.PricedItineraries = [];
                $scope.searchResult = r;
                $scope.searchResultCount = 0;
                alert('Sorry, NO ITINERARY FOUND');
            }
            else {
                $scope.searchResult = r.OTA_AirLowFareSearchPlusRS.PricedItineraries.PricedItinerary;
                $scope.searchResultCount = $scope.searchResult.length;
            }
        });

        $scope.getLogo = function (code) {
            switch (code) {
                //case 'F9': return 'http://airlinelogos.aero/classic/FrontierAirlines01.jpg';
                //case 'UA': return 'http://airlinelogos.aero/classic/UnitedAirlines01.jpg';
                //case 'DL': return 'http://airlinelogos.aero/classic/DeltaAirLines01.jpg';
                //case 'BA': return 'https://www.seeklogo.net/wp-content/uploads/2015/07/british-airways-logo-vector-download.jpg';
                //case 'IB': return 'http://travel4free.com.au/wp-content/uploads/2014/06/iberia_logo_729.jpg';
                //case 'AF': return 'http://airlinelogos.aero/classic/AirFrance_new01.jpg';
                //case 'UX': return 'http://aiglesias.com/wp-content/uploads/2015/07/logo-AirEuropa.png';
                //case 'AV': return 'https://thedesignair.files.wordpress.com/2013/01/logo2.png';
                //case 'TK': return 'http://image.airlineratings.com/logos/logoturkish.gif';
                //case 'TP': return 'http://www.aircargonews.com/FT11/logo_tap.jpg';
                //case 'KL': return 'http://wpdi.org/sites/default/files/klm_logo.jpg';
                //case 'AY': return 'https://gallery.finnair.com/images/cache/e1435f014e8afa5e8e393cc957ecaa97_270x180c.jpg';
                //case 'AZ': return 'http://beta.alitalia.com/il_il/Images/timone-1_tcm63-19376.jpg';
                //case 'AR': return 'http://airlinelogos.aero/classic/AerolineasArgentinas01.jpg';
                //case 'AC': return 'https://pbs.twimg.com/profile_images/459043050761621505/26D4Qt5X.png';
                //case 'LH': return 'http://voyage.rusverlag.de/wp-content/uploads/2010/09/lufthansa-logo.png';
                //case 'LA': return 'http://www.ch-aviation.com/portal/stock/1793.jpg';
                //case 'JJ': return 'http://www.fotosdigitalesgratis.com/noticias/fotos/TAM-Logo.jpg';
                ////case 'AF': return 'http://airlinelogos.aero/classic/AirFrance_new01.jpg';
                ////case 'AF': return 'http://airlinelogos.aero/classic/AirFrance_new01.jpg';
                ////case 'AF': return 'http://airlinelogos.aero/classic/AirFrance_new01.jpg';
                ////case 'AF': return 'http://airlinelogos.aero/classic/AirFrance_new01.jpg';
                ////case 'AF': return 'http://airlinelogos.aero/classic/AirFrance_new01.jpg';
                ////case 'AF': return 'http://airlinelogos.aero/classic/AirFrance_new01.jpg';
                    
                //   // 
                //case 'AA': return 'http://airlinelogos.aero/classic/AmericanAirlines01.jpg';
                default: return '//images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/s/' + code + '_sq.jpg';
            }
        };

        $scope.minDepartureDate = new Date().toISOString().split('T')[0];
        $scope.minReturnDate = $scope.minDepartureDate;

        $scope.showDate = function (text) {
            return SearchService.flightTime(text);
        };
        $scope.updateTravelInfo = function () {
            travelInfo.returnDate = travelInfo.departureDate;
            $scope.minReturnDate = travelInfo.departureDate.toISOString().split('T')[0];
        }

    } ]).value('travelInfo',{
        flyFrom: "",
        fromAirports:[],
        flyTo: "",
        toAirports:[],
        departureDate: (new Date()).addDays(1),
        returnDate: (new Date()).addDays(3),
        adult: 1,
        child: 0,
        oneway:true
    });