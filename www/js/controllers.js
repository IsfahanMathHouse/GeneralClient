var serverRootUrl = 'http://localhost/MathHouseServer/';

angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

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
    })

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
