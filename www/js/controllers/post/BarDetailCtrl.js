/**
 * Created by Anker on 2017/3/20.
 */
define([], function () {
  var ctrl = function ($scope,$state, $ionicHistory, $stateParams, BarService, $ionicModal, PostService, $cordovaImagePicker, ServiceUtil, $ionicLoading, $timeout) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.postClasses = [{pcId:-1,pcName:'请选择'}];
      $scope.post = {
        pContent:'',
        pTitle:'',
        postClass:$scope.postClasses[0]
      }
      $scope.bar = BarService.getCurrentBar();
      $scope.param = {
        page:1,
        tryMore:true,
        barId:$scope.bar.barId
      }

      $scope.barPost = [];
      $scope.topPost = [];


      $scope.doRefresh = function () {
        $scope.param.page = 1;
        PostService.getBarPost($scope.param, function (data) {
          $ionicLoading.hide()
          // $scope.barPost = data.barPost;

          for (var i in data.barPost) {
            var item = data.barPost[i];
            var count = Math.ceil(screen.width / 14)
            var content = parseFloat(item.pContent.length);
            var lines = Math.ceil(content / count);
            item.height = 80 + 80 + lines*40
            $scope.barPost.push(item)
          }

          $scope.param.tryMore = data.tryMore
          console.log('data', data)
          $scope.$broadcast('scroll.refreshComplete');
        })
      }


      $ionicLoading.show()
      $scope.doRefresh()

      $scope.loadTop = function () {
        PostService.getTopPost($scope.bar.barId, function (data) {
          if (!data.empty) {
            $scope.topPost = data.topPost
          }
        })
      }

      $scope.loadTop()
    })

    PostService.getPostClasses(function (data) {
      for (var i in data) {
        $scope.postClasses.push(data[i]);
      }
    })

    $scope.loadMore = function () {
      //这里使用定时器是为了缓存一下加载过程，防止加载过快
      // console.log('进入loadMore', $scope.param)
      $timeout(function () {
        if (!($scope.param.tryMore == 'true' || $scope.param.tryMore)) {
          $ionicLoading.hide();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          PostService.getBarPost($scope.param, function (data) {
            $ionicLoading.hide();
            var myPostList = data.barPost;
            $scope.param.tryMore = data.tryMore
            for (var i in myPostList) {
              var item = myPostList[i];
              var count = Math.ceil(screen.width / 14)
              var content = parseFloat(item.pContent.length);
              var lines = Math.ceil(content / count);
              item.height = 70 + lines*14
              $scope.barPost.push(item)
            }

            if ($scope.param.tryMore) {
              $scope.param.page = $scope.param.page + 1;
            } else {
              ServiceUtil.showShortBottom('没有更多帖子了')
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 1500);
        }
      })
    }

    $scope.detail = function (post) {
      $state.go('postDetail', {pId:post.pId})
    }

    $ionicModal.fromTemplateUrl('view/post/add_post.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.callSelect = function () {
      console.log('post', $scope.post)
    }

    $scope.closeNewPost = function() {
      $scope.modal.hide();
    };

    // Open the new post modal
    $scope.openNewPost = function() {
      $scope.modal.show();
    };

    // Perform the add action
    $scope.doAddPost = function() {
      $scope.post.barId = $scope.bar.barId
      $scope.post.pcId = $scope.post.postClass.pcId
      PostService.addPost($scope.post, function () {
        //跳转到我的帖子
      }, function () {
        $state.go('login')
      })
    };

    $scope.chooseImg = function () {
      var options = {
        maximumImagesCount: 10,
        width: 800,
        height: 800,
        quality: 80
      };
      if (typeof cordova === 'undefined') {
        ServiceUtil.showLongBottom('攻城狮正在开发中')
      } else {
        document.addEventListener("deviceready", function () {
          $cordovaImagePicker.getPictures(options).then(function (results) {
            // $cordovaToast.showLongBottom(date)
            ServiceUtil.showLongBottom(JSON.stringify(results))
          }, function (e) {
            ServiceUtil.showLongBottom(JSON.stringify(e))
          })
        },false);
      }
    }

  }
  ctrl.$inject = ['$scope','$state', '$ionicHistory', '$stateParams', 'BarService', '$ionicModal', 'PostService', '$cordovaImagePicker', 'ServiceUtil', '$ionicLoading', '$timeout'];
  return ctrl;
})
