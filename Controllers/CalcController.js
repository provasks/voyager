/**
 * Created by provasks on 3/22/2016.
 */
voyagerApp.controller('CalcController', function ($scope, CalcService, defaultInput) {
    $scope.number = defaultInput;
//        $scope.result = CalcService.square($scope.number);

    $scope.square = function () {
        $scope.result = CalcService.square($scope.number);
    };
    $scope.sqrt = function () {
        $scope.result = CalcService.sqrt($scope.number);
    };
    $scope.fact = function () {
        $scope.result = CalcService.fact($scope.number);
    };

});
