'use strict';

/* Controllers */


function HomeCtrl($scope) {
    $scope.token = Math.random().toString(36).substring(7);

}
//HomeCtrl.$inject = [];


function SessionCtrl() {
}
SessionCtrl.$inject = [];
