App = (function (window, angular) {
    'use strict';

    var app = angular.module('trinder', [
        'ngAnimate',
        'ui.router',
        'ngPhotoswipe',
        'leaflet-directive',
        'rzModule'
    ]);

    app.config(function ($urlRouterProvider) {
        $urlRouterProvider.when('', '/people');
    });
    
    return app;
})(window, angular);
