(function() {
    'use strict';

    function apiRequest($http, cs, $state, $timeout) {
        var instance = this;


        // set loading indicator handler
        function setLoadingHandler(handler) {
            instance.loadingHandler = handler;
        }

        // http service error callback handler.
        function errorCallBackFn(data, status, headers, config) {
            var error, errMsg;
            switch (status) {
                case 400:
                    cs.alertMsg(lang.errorTxt, lang.badRequest);
                    break;
                case 401:
                    break;
                case 403:
                    break;

                case 409:
                case 400:
                case 404:
                case 500:
                    cs.alertMsg(lang.errorTxt, lang.internalServerError);
                    break;
                case 413:
                    cs.alertMsg(lang.errorTxt, lang.fileToLargeTxt);
                    break;
                case 0:
                    break;
                default:
                    //cs.alertMsg(lang.errorTxt, lang.networkError);
            }
        }


        function apiRequestHandler(isFormData, inMethod, inUrl, inParam, inData, inheader, callBackFn, errorCallBackFn, inCache) {
            var cacheEnable = false;
            if (inCache) {
                cacheEnable = inCache;
            }
            inheader.source = "Web";
            instance.loadingHandler(true);

            var config = {
                method: inMethod,
                url: inUrl,
                headers: inheader,
                params: inParam,
                data: inData,
                cache: cacheEnable
            };

            if (isFormData) {
                config.transformRequest = angular.identity;
                config.headers[settings.contentTypeTxt] = undefined;
            } else {
                //config.headers[settings.contentTypeTxt] = settings.contentType;
            }

            $http(config).then(function(response) {
                hideLoader();
                callBackFn(response);
            }, function(response) { //data, status
                hideLoader();
                if (errorCallBackFn) {
                    errorCallBackFn(response);
                } else {
                    instance.errorCallBackFn(response.data, response.status, response.headers, response.config);
                }
            });
        }
        //Hide loader
        function hideLoader() {
            if (!$http.pendingRequests.length) {
                instance.loadingHandler(false);
            }
        }

        // Common http get request handler.
        function getRequest(inUrl, inParam, inHeader, callBackFn, errorCallBackFn, inCache) {
            apiRequestHandler(false, 'GET', inUrl, inParam, {}, inHeader, callBackFn, errorCallBackFn, inCache);
        }
        // Common http post request handler.
        function postRequest(isFormData, inUrl, inData, inHeader, callBackFn, errorCallBackFn) {
            apiRequestHandler(isFormData, 'POST', inUrl, {}, inData, inHeader, callBackFn, errorCallBackFn);
        }
        // Common http put request handler.
        function putRequest(isFormData, inUrl, inData, inHeader, callBackFn, errorCallBackFn) {
            apiRequestHandler(isFormData, 'PUT', inUrl, {}, inData, inHeader, callBackFn, errorCallBackFn);
        }
        // Common http Delete request handler.
        function deleteRequest(inUrl, inParam, inHeader, callBackFn, errorCallBackFn) {
            apiRequestHandler(false, 'DELETE', inUrl, inParam, {}, inHeader, callBackFn, errorCallBackFn);
        }

        //function defination
        instance.setLoadingHandler = setLoadingHandler;
        instance.errorCallBackFn = errorCallBackFn;
        instance.getRequest = getRequest;
        instance.postRequest = postRequest;
        instance.putRequest = putRequest;
        instance.deleteRequest = deleteRequest;
        instance.loadingHandler = function() {};
    }

    angular.module('App').service('apiRequest', apiRequest);
    apiRequest.$inject = ['$http', 'commonService', '$state', '$timeout'];



})();
