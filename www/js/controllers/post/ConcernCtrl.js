/**
 * 贴吧关注模块
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope,$state) {
    //添加关注贴吧
    $scope.ToaddConcern = function () {
      $state.go('addconcern')
    }
  }
  ctrl.$inject = ['$scope','$state'];
  return ctrl;
})
