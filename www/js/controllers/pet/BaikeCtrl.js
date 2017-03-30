/**
 * Created by Anker on 2017/3/29.
 */
define([], function () {
  'use strict';
  var ctrl = function ($stateParams, $scope, $state, DashService, $timeout, ServiceUtil, $ionicLoading) {

    $scope.news = []

    $scope.tryMore = true;

    $scope.doRefresh = function () {
      DashService.getBaike($stateParams.petcId, function (data) {
        $scope.news = data.list;
        $scope.tryMore = data.tryMore
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('stopLoading');
      }, function () {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('stopLoading');
      })
    }

    $ionicLoading.show();

    $scope.doRefresh();

    $scope.$on('stopLoading', function () {
      $ionicLoading.hide();
    })


    $scope.loadMore = function () {
      $timeout(function () {
        DashService.getBaike($stateParams.petcId, function (data) {
          var myPostList = data.list;
          for (var i in myPostList) {
            $scope.news.push(myPostList[i])
          }
          $scope.tryMore = data.tryMore
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('stopLoading');
        }, function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('stopLoading');
        })
      }, 1500);
    }

    $scope.detail = function (item) {
      $state.go('baikeDetail', {newsId:item.newsId})
    }
  }
  ctrl.$inject = ['$stateParams', '$scope', '$state', 'DashService', '$timeout', 'ServiceUtil', '$ionicLoading'];
  return ctrl
})
