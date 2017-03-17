/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $ionicLoading, PostService) {

    $scope.page = {
      page:1,
      pageSize:20
    }

    $scope.hots = [];

    $scope.getHotPost = function () {
      PostService.getHotPost($scope.page, function (data) {
        if (data.empty) {
          $scope.hots = [];
          $scope.hots.push({pTitle:'暂无热门', hide:false})
        } else {
          $scope.hots = data.hotPostList
        }
      }, function (err) {
        $ionicLoading.show({
          template:err.msg,
          duration:err.duration
        })
      })
    }
  }
  ctrl.$inject = ['$scope', '$ionicLoading', 'PostService'];
  return ctrl;
})
