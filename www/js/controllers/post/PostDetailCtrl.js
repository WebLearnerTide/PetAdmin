/**
 * Created by Anker on 2017/3/23.
 */
define([], function () {
  var ctrl = function ($scope, $state, $stateParams, PostService, ServiceUtil, $timeout, $ionicModal, ReplyService, $ionicLoading) {
    $scope.$on('$ionicView.beforeEnter', function () {

      $scope.postDetails = [];

      $scope.isCollect = false;

      $scope.param = {
        tryMore:true,
        page:1,
        total:0,
        pId:$stateParams.pId
      }

      $scope.curPost = {}

      $scope.loadDetail = function (param) {
        $timeout(function () {
          if (!($scope.param.tryMore == 'true' || $scope.param.tryMore)) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            PostService.getPostDetail(param, function (data) {
              $scope.postDetails = [];
              var list = data.postDetail;
              for (var i in list) {
                var item = list[i];
                var height = 190;
                if (item.pTitle!=null&&item.pTitle!=undefined&&item.pTitle!='')
                  height+=45;
                if (item.fId!=null&&item.fId!=undefined&&item.fId!='')
                  height += 65;
                item.height = height
                $scope.postDetails.push(item)
              }
              $scope.param.page = data.page;
              $scope.param.total = data.total;
              $scope.param.tryMore = data.tryMore

              if (data.page==1) {
                $scope.curPost = data.postDetail[0];
              }
            })
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
          $scope.$broadcast('scroll.refreshComplete');
        }, 1500)
      }

      PostService.isCollect($stateParams.pId, function () {
        $scope.isCollect = true;
      }, function () {
        $state.go('login')
      })

      $scope.loadDetail($scope.param);
    })

    // 评论模态框
    $ionicModal.fromTemplateUrl('view/post/add_comment.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // 打开评论模态框
    $scope.showReply = function (item) {
      $scope.reply = arguments[0]?item:$scope.curPost;
      $scope.reply.rContent = ''
      $scope.modal.show();
    }

    $scope.closeReply = function () {
      $scope.reply = {};
      $scope.modal.hide();
    }

    $scope.doReply = function () {
      ReplyService.addReply($scope.reply, function () {
        // do success
        $scope.closeReply()
      }, function () {
        // do error
        $scope.closeReply()
        $state.go('login')
      })
    }

    $scope.prePage = function () {
      if (--$scope.param.page<1) {
        ServiceUtil.showShortBottom('已经是第一页了');
        $scope.param.page=1
        $scope.param.tryMore = true
        // $scope.$broadcast('scroll.refreshComplete');
        // return;
      }
      $scope.loadDetail($scope.param)
    }

    $scope.nextPage = function () {
      if (!$scope.param.tryMore) {
        ServiceUtil.showShortBottom('没有更多了');
        return
      }
      $scope.param.page++;
      $scope.loadDetail($scope.param)
    }

    $scope.doCollect = function () {
      $ionicLoading.show()
      var successMsg = $scope.isCollect?'取消收藏成功':'收藏成功'
      var param = {
        pId:$stateParams.pId,
        isCollect:$scope.isCollect
      }
      PostService.doCollect(param, function (status) {
        $scope.isCollect = status
        $ionicLoading.hide()
        ServiceUtil.showShortBottom(successMsg)
      }, function () {
        $ionicLoading.hide()
        $state.go('login')
      })
    }
  }
  ctrl.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'ServiceUtil', '$timeout', '$ionicModal', 'ReplyService', '$ionicLoading']
  return ctrl;
})
