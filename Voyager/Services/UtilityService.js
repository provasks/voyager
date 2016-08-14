voyagerApp.service('UtilityService', function ($http) {

    this.callPostAPI = function (url, data, successCallback) {
        $('#loading').show();
        $http({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: data
        }).then(
       function (response) {
           $('#loading').hide();
           return successCallback(response);
       },
       function (response) {
           $('#loading').hide();
           console.log(response);
       });
    };

    this.callGetAPI = function (url, successCallback) {
        $('#loading').show();
        $http({
            method: 'GET',
            url: url,
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //transformRequest: function (obj) {
            //    var str = [];
            //    for (var pz  in obj)
            //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //    return str.join("&");
            //}
        }).then(
       function (response) {
           $('#loading').hide();
           return successCallback(response);
       },
       function (response) {
           $('#loading').hide();
           console.log(response);
        });

        //$http.get('airports.json').success(function (data) {
        //    // you can do some processing here
        //    var content = data;
        //});

    };

    this.removeXML = function (data) {
        return JSON.parse(data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1));
    };
});