/**
 * DashController
 * Created by Anker on 2017/3/11.
 */

define([], function () {
  'use strict';
  var ctrl = function ($scope, DashService, $state, ServiceUtil, $ionicSlideBoxDelegate) {

    $scope.$on('$ionicView.beforeEnter', function () {
      var ls = ServiceUtil.getLocalStorage();
      $scope.ads = [{title:'', adImg:'img/default.jpg'},{title:'', adImg:'img/default.jpg'},{title:'', adImg:'img/default.jpg'}]
      DashService.getLatest(function (data) {
        for (var i in data) {
          $scope.ads[i] = data[i]
        }
        $ionicSlideBoxDelegate.update();
      })
    })

    $scope.detail = function (pId) {
      if (!(null == pId || undefined == pId || pId=='')) {
        $state.go('postDetail', {pId:pId})
      }
    }
  }
  ctrl.$inject = ['$scope', 'DashService', '$state', 'ServiceUtil', '$ionicSlideBoxDelegate'];
  return ctrl;
})
