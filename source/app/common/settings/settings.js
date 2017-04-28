"use strict";
var ApiBaseUrl = "";
var ngApp = "App";
//uncomment below for local
var src = "app/";
var linkInitial = "/"; //without hash
var img = "assets/img/";
var dataPath = "assets/data/";
var settings = {
    contentTypeTxt: "Content-Type",
    contentType: "application/json; charset=UTF-8",
    links: {
        home: linkInitial + 'home',

    },
    api: {
        dataUrl: dataPath + "cart.json"
    },
    requestMethod: {
        get: 'GET',
        post: 'POST'
    },
    path: {
        components: src + 'components/',
        sharedComponents: src + 'components/shared/',
        directives: src + 'common/directives/',
    },
    imgBase: "assets/img/",
    urlEncodePattern: /[^A-Z0-9]+/ig
};
