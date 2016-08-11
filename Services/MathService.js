/**
 * Created by provasks on 3/22/2016.
 */
//voyagerApp.config(function ($provide) {
//    $provide.provider('MathService', function () {
//        this.$get = function () {
//            var factory = {};
//
//            factory.multiply = function (a, b) {
//                return a * b;
//            };
//            factory.sqrt = function (a) {
//                return Math.sqrt(a);
//            };
//            return factory;
//        };
//    });
//});

voyagerApp.value("defaultInput", 5);

voyagerApp.factory('MathService', function () {
    var factory = {};

    factory.multiply = function (a, b) {
        return a * b;
    };
    factory.sqrt = function (a) {
        return Math.sqrt(a);
    };
    factory.fact = function (a) {
        if (a == 0 || a == 1) return 1;
        return a * this.fact(a - 1);
    };
    return factory;
});

