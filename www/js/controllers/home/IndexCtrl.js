/**
 * Created by Anker on 2017/3/18.
 */
define([], function () {
  'use strict';
  var ctrl = function ($state, $scope, ServiceUtil, $timeout,Chats) {
    $scope.chat = Chats.get(4);
    $scope.$on('$ionicView.beforeEnter', function () {
      var ls = ServiceUtil.getLocalStorage();
      $scope.user = ls.getObject('LoginUser');
      $scope.firstLogin = ls.get('firstLogin', true);
    })
    $timeout(function () {
      if ($scope.firstLogin=='false' || !$scope.firstLogin) {
        var verifier = ServiceUtil.getVerifier();
        if (verifier.isObjectEmpty($scope.user)) {
          $state.go('login')
        } else {
          $state.go('tab.home')
        }
      } else {
        $state.go('tour')
      }
    }, 3000)
  }
  ctrl.$inject = ['$state', '$scope', 'ServiceUtil', '$timeout','Chats']
  return ctrl;
})
