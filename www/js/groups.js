angular.module('starter.controllers')
.controller('GroupsCtrl', function ($scope, $http) {
    $scope.groups = [];
    $scope.getGroups = function () {
        $http({
            method: 'post',
            url: serverRootUrl + 'api/mobile/getGroups',
            data: {
                a: 5
            }
        }).success(function (data) {
            $scope.groups = data;
        });
    };
    $scope.getGroups();
});