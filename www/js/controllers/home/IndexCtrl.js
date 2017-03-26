/**
 * Created by Anker on 2017/3/18.
 */
define([], function () {
  'use strict';
  var ctrl = function ($state, $scope, ServiceUtil, $timeout,Chats) {
    $scope.chat = Chats.get(4);
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.ls = ServiceUtil.getLocalStorage();
      $scope.firstLogin = $scope.ls.get('firstLogin', true);
    })
    $timeout(function () {
      if ($scope.firstLogin) {
        $state.go('tour')
      } else {
        $state.go('tab.home')
      }
    }, 3000)
  }
  ctrl.$inject = ['$state', '$scope', 'ServiceUtil', '$timeout','Chats']
  return ctrl;
})
