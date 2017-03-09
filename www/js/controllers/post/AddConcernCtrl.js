/**
 * 添加关注Ctrl
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state) {
    $scope.goBackPost = function () {
      $state.go('tab.post.concern')
    }
  }
  ctrl.$inject = ['$scope', '$state'];
  return ctrl;
})
