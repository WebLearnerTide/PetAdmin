/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $stateParams,$ionicLoading, Chats, ServiceUtil, MeService) {
    var ls = ServiceUtil.getLocalStorage();
    $scope.chat = Chats.get(0);
    $scope.me = ls.getObject('LoginUser');
    $scope.updateInfo = function () {
      MeService.updateInfo($scope.me, function (resp) {
        $scope.me  = resp;
        ls.setObject('LoginUser', resp)
      }, function (err) {
        $ionicLoading.show({
          template:err.msg,
          duration:1000
        })
      })
    }
  }
  ctrl.$inject = ['$scope', '$stateParams','$ionicLoading', 'Chats', 'ServiceUtil', 'MeService'];
  return ctrl;
})
