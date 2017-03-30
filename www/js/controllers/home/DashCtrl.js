/**
 * DashController
 * Created by Anker on 2017/3/11.
 */

define([], function () {
  'use strict';
  var ctrl = function ($scope, DashService, $state, ServiceUtil, $ionicSlideBoxDelegate, $timeout) {

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

    var ls = ServiceUtil.getLocalStorage();

    $scope.detail = function (pId) {
      if (!(null == pId || undefined == pId || pId=='')) {
        $state.go('postDetail', {pId:pId})
      }
    }
    $scope.news = []

    $scope.tryMore = true;

    $scope.doRefresh = function () {
      DashService.getNews(function (data) {
        $scope.news = data.list;
        $scope.tryMore = data.tryMore
        $scope.$broadcast('scroll.refreshComplete');
      }, function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
    }


    // $scope.doRefresh();


    $scope.loadMore = function () {
      $timeout(function () {
        if (!$scope.tryMore) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return
        }
        DashService.getNews(function (data) {
          console.log('detail', data)
          var myPostList = data.list;
          for (var i in myPostList) {
            $scope.news.push(myPostList[i])
          }
          $scope.tryMore = data.tryMore
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }, 1500);
    }

    $scope.goNewsDetail = function (item) {
      $state.go('baikeDetail', {newsId:item.newsId})
    }
  }
  ctrl.$inject = ['$scope', 'DashService', '$state', 'ServiceUtil', '$ionicSlideBoxDelegate', '$timeout'];
  return ctrl;
})
