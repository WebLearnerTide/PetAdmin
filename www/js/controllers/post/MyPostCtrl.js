/**
 * Created by Anker on 2017/3/22.
 */
define([], function () {
  var ctrl = function ($scope, $state, $timeout, PostService) {
    $scope.posts = []
    $scope.param = {
      page:1,
      tryMore:true
    }

    $scope.doRefresh = function () {
      $scope.param.page = 1;
      PostService.getMyPost($scope.param, function (data) {
        $scope.posts = data.myPostList;
        console.log('data', data)
        $scope.$broadcast('scroll.refreshComplete');
      }, function () {
        $scope.$broadcast('scroll.refreshComplete');
        // $state.go('login')
      })
    }
    $scope.loadMore = function () {
      //这里使用定时器是为了缓存一下加载过程，防止加载过快
      console.log('param', $scope.param)
      $timeout(function () {
        if (!$scope.param.tryMore) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }

        PostService.getMyPost($scope.param, function (data) {
          console.log('recieve', data)
          var myPostList = data.myPostList;
          $scope.param.tryMore = data.tryMore
          for (var i in myPostList) {
            $scope.posts.push(myPostList[i]);
          }
          if ($scope.param.tryMore) {
            $scope.param.page = $scope.param.page + 1;
          }
        }, function () {
          $state.go('login')
        })
        // $scope.articles.push(FinancList.getList())
        // FinancList.param.curPage++;
      }, 1500);
    };
    //控制列表是否允许其加载更多
    $scope.tryMoreCanBeLoaded = function () {
      return $scope.param.tryMore;
    }
  }
  ctrl.$inject = ['$scope', '$state', '$timeout', 'PostService']
  return ctrl
})
