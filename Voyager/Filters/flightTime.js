voyagerApp.filter('flightTime', function () {
    return function (input) {
        var date = new Date(Date.parse(input));
        //https://www.datejs.com/test/date_and_time/index.html
        return date.toString("dddd, MMMM dd, yyyy h:mm tt");
       // return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();
    };
});

voyagerApp.filter('unique', function () {
    return function (arr, field) {
        if (typeof arr == 'undefined') return;
        var o = {}, i, l = arr.length, r = [];
        for (i = 0; i < l; i += 1) {
            o[arr[i][field]] = arr[i];
        }
        for (i in o) {
            r.push(o[i]);
        }
        return r;
    };
});