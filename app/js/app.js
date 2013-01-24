'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/session/:sessType/:token', {templateUrl: 'partials/session.html', controller: SessionCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
