/**
 * Created by provasks on 3/22/2016.
 */
voyagerApp.service('CalcService', function (MathService) {
    this.square = function (a) {
        return MathService.multiply(a, a);
    };
    this.sqrt = function (a) {
        return MathService.sqrt(a);
    };
    this.fact = function (a) {
        return MathService.fact(a);
    };
});

