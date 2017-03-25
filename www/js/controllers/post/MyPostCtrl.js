/**
 * Created by Anker on 2017/3/22.
 */
define([], function () {
  var ctrl = function ($scope, $state, $timeout, PostService, ServiceUtil, $ionicLoading) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.posts = []
      $scope.param = {
        page:1,
        tryMore:true
      }

      $scope.doRefresh = function () {
        $scope.param.page = 1;
        PostService.getMyPost($scope.param, function (data) {
          $ionicLoading.hide()
          $scope.posts = data.myPostList;
          $scope.param.tryMore = data.tryMore
          console.log('data', data)
          $scope.$broadcast('scroll.refreshComplete');
        }, function () {
          $scope.$broadcast('scroll.refreshComplete');
          // $state.go('login')
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
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          PostService.getMyPost($scope.param, function (data) {
            $ionicLoading.hide();
            var myPostList = data.myPostList;
            $scope.param.tryMore = data.tryMore
            for (var i in myPostList) {
              $scope.posts.push(myPostList[i])
            }

            if ($scope.param.tryMore) {
              $scope.param.page = $scope.param.page + 1;
            } else {
              ServiceUtil.showShortBottom('没有更多帖子了')
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function () {
            $ionicLoading.hide()
            $state.go('login')
          })
        }
      }, 1500);
    };

    //控制列表是否允许其加载更多
    $scope.tryMoreCanBeLoaded = function () {
      return $scope.param.tryMore;
    }

    $scope.detail = function (post) {
      $state.go('postDetail', {pId:post.pId})
    }
  }
  ctrl.$inject = ['$scope', '$state', '$timeout', 'PostService', 'ServiceUtil', '$ionicLoading']
  return ctrl
})
