voyagerApp.filter('flightTime', function () {
    return function (input) {
        var date = new Date(Date.parse(input));
        //https://www.datejs.com/test/date_and_time/index.html
        return date.toString("dddd, MMMM dd, yyyy h:mm tt");
       // return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();
    };
});