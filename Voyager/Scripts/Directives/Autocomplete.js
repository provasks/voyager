voyagerApp = voyagerApp || {}
voyagerApp.directive('autoComplete', function ($timeout, $http, SearchService) {
    return {
        restrict: 'AEC',
        scope: {
            title: '@',
            retkey: '@',
            displaykey: '@',
            modeldisplay: '=',
            subtitle: '@',
            modelret: '='
        },

        link: function (scope, elem, attrs) {
            scope.current = 0;
            scope.selected = false;
            scope.changed = function (code) {
                if (code.length < 3) return;
                SearchService.getAirports(code, function (response) {
                    var json = scope.removeXML(response.data);
                    if (typeof json.response == 'undefined') return;
                    scope.TypeAheadData = SearchService.mergeAirports(json.response);
                });
            }

            scope.handleSelection = function (key, val) {
                scope.modelret = key;
                scope.modeldisplay = val;
                scope.current = 0;
                scope.selected = true;
            }

            scope.isCurrent = function (index) {
                return scope.current == index;
            }

            scope.setCurrent = function (index) {
                scope.current = index;
            }
            scope.removeXML = function (data) {
                return JSON.parse(data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1));
            };

        },
        templateUrl:"Views/airport.html"
        //template: '<input type="text" ng-model="modelret" ng-KeyPress="da(modelret)" ng-keydown="selected=false"' +
        //            'class="form-control custom-control" aria-describedby="basic-addon2" placeholder="City or Airport Name">' +
        //            '<div class="list-group table-condensed overlap" ng-hide="!modeldisplay.length || selected">' +
        //                '<a href="javascript:void();" ng-repeat="item in TypeAheadData|unique:model  track by $index" ' +
        //                   'ng-click="handleSelection(item[retkey],item[displaykey])" style="cursor:pointer" ' +
        //                   'ng-class="{active:isCurrent($index)}" ' +
        //                   'ng-mouseenter="setCurrent($index)">' +
        //                     ' {{item[title]}} ' +
        //                     '<i>{{item[subtitle]}} </i>' +
        //                '</a> ' +
        //            '</div>' +
        //            '</input>'
    };
});