/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $ionicLoading, PostService, $timeout,ServiceUtil, $state) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.hots = []
      $scope.param = {
        page:1,
        tryMore:true
      }
      $scope.doRefresh = function () {
        $scope.param.page=1;
        PostService.getHotPost($scope.param, function (data) {
          $ionicLoading.hide()
          if (data.empty) {
            $scope.hots = [];
            $scope.hots.push({pTitle:'暂无热门', hide:false})
            $scope.param.tryMore = false
          } else {
            $scope.hots = data.hotPostList
            $scope.param.tryMore = data.tryMore
          }
          $scope.$broadcast('scroll.refreshComplete');
        })
      }
      $ionicLoading.show()
      $scope.doRefresh()
    })

    $scope.loadMore = function () {
      //这里使用定时器是为了缓存一下加载过程，防止加载过快
      // console.log('进入loadMore', $scope.param)

      $timeout(function () {
        if (!($scope.param.tryMore == 'true' || $scope.param.tryMore)) {
          $ionicLoading.hide();
          ServiceUtil.showShortBottom('没有更多帖子了')
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          PostService.getHotPost($scope.param, function (data) {
            $ionicLoading.hide();
            var myPostList = data.hotPostList;
            $scope.param.tryMore = data.tryMore
            for (var i in myPostList) {
              $scope.hots.push(myPostList[i])
            }
            // $scope.hots.concat(myPostList);

            if ($scope.param.tryMore) {
              $scope.param.page = $scope.param.page + 1;
            }


            $scope.$broadcast('scroll.infiniteScrollComplete');
          })
        }
      }, 1500);
    };

    $scope.detail = function (post) {
      $state.go('postDetail', {pId:post.pId})
    }

  }
  ctrl.$inject = ['$scope', '$ionicLoading', 'PostService', '$timeout','ServiceUtil', '$state'];
  return ctrl;
})
