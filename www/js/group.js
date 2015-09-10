angular.module('starter.controllers')
.controller('GroupCtrl', function ($scope, $stateParams, $http) {
    $scope.group = {};
    $scope.newMessage = {
        messageText: ""
    };
    $scope.getGroupInfo = function () {
        $http({
            method: 'post',
            url: serverRootUrl + 'api/mobile/DownloadGroupInfo',
            data: {
                groupId: parseInt($stateParams.groupId, 10)
            }
        }).success(function (data) {
            $scope.group = data;
        });
    };

    $scope.sendMessage = function () {
        $http({
            method: 'post',
            url: serverRootUrl + 'api/mobile/SendMessage',
            data: {
                groupId: parseInt($stateParams.groupId, 10),
                message: $scope.newMessage.messageText
            }
        }).success(function (data) {
            $scope.getNewMessages();
        });
    };

    $scope.getNewMessages = function () {
        var lastMessageId = -1;
        for (var i = 0; i<$scope.group.messages.length; i++){
            if ($scope.group.messages[i].messageId > lastMessageId){
                lastMessageId = $scope.group.messages[i].messageId;
            }
        }
        $http({
            method:'post',
            url:serverRootUrl+'/api/mobile/GetNewMessages',
            data:{
                groupId:parseInt($stateParams.groupId, 10),
                lastMessageId:lastMessageId
            }
        }).success(function (data) {
            for (var i = 0; i< data.length; i++){
                $scope.group.messages.push(data[i]);
            }
        });
    };

    $scope.getGroupInfo();
});