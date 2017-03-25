/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state) {
    $scope.doBack = function () {
      //找回密码成功返回登录
      $state.go('login')
    }
  }
  ctrl.$inject = ['$scope', '$state'];
  return ctrl;
})
