//https://support.clevertap.com/docs/website/getting-started.html#

var clevertap = clevertap || {};
clevertap.notificationCallback = function(msg){
      //raise the notification viewed and clicked events in the callback
      // clevertap.raiseNotificationViewed();
      // console.log(JSON.stringify(msg));//your custom rendering implementation here
      // var $button = jQuery("<button></button>");//element on whose click you want to raise the notification clicked event
      // $button.click(function(){
      //    clevertap.raiseNotificationClicked();
      // });
};

(function() {
    'use strict';

    function cleverTapService($window, $timeout, cs) {
        var cts = this;

        cts.loadLibrary = function(id) {
            clevertap.event = [];
            clevertap.profile = [];
            clevertap.account = [];
            clevertap.customer = {};
            clevertap.addresses = [];

            clevertap.account.push({ "id": id });
            clevertap.enablePersonalization = true; // enables Personalization

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = ('https:' === document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/a.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(script, s);
        };

        cts.getCleverTapId = function(callback) {
            var id = settings.analytics.cleverTap.ID;
            if (typeof id === 'undefined' || id === "") {
                console.warn('CleverTap ID not found.');
            } else {
                callback(id);
            }
        };

        cts.pushEvent = function(event, object) {
            clevertap.event.push(event, object);
        };

        cts.registerCustomer = function(customer) {
            if (!customer) {
                customer = cts.getCustomerInfo();
            }
            customer.Identity = customer.Phone;
            // optional fields. controls whether the user will be sent email, push etc.
            customer["MSG-email"] = false; // Disable email notifications
            customer["MSG-push"] = true; // Enable push notifications
            customer["MSG-sms"] = true; // Enable sms notifications

            setTimeout(function() {
                clevertap.profile.push({ "Site": customer });
            }, 100);

        };

        cts.getCustomerInfo = function() {
            var userInfo = cs.getLocalStorageInfo(settings.userData);
            var addressInfo = cs.getSessionInfo('deliveryAddress');
            var storeInfo = cs.getSessionInfo('selectedStore');
            var customer = {
                Name: userInfo.ProfileName || "",
                Phone: '+91' + userInfo.PhoneNo, //Mandatory, as it will be treated as Identity
                Email: userInfo.EmailID || "",
                City: addressInfo.CityName || "",
                Store: storeInfo.Title || "",
                FlatNo: addressInfo.FlatNo || "",
                Building: addressInfo.BuildingName || "",
                Street: addressInfo.StreetName || "",
                Landmark: addressInfo.LandmarkName || ""
            };
            return customer;
        };

        cts.login = function() {
            setTimeout(function() {
                cts.registerCustomer(cts.getCustomerInfo());
            }, 100);
        };


        cts.init = function() {
            cts.getCleverTapId(cts.loadLibrary);
        };
        cts.init();
    }
    angular.module(ngApp).service('cleverTapService', cleverTapService);
    cleverTapService.$inject = ['$window', '$timeout', 'commonService'];
})();
