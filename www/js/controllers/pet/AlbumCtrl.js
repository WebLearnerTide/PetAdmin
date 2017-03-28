/**
 * Created by Anker on 2017/3/27.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $stateParams, $ionicLoading, AlbumService, $timeout, ServiceUtil) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.rows = []
      $scope.petId = $stateParams.petId;

      $scope.param = {
        page:1,
        tryMore:true,
        petId : $stateParams.petId
      }

      $scope.doRefresh = function () {
        $scope.param.page = 1;
        AlbumService.getAlbum($scope.param, function (data) {
          $ionicLoading.hide()
          $scope.rows = []
          while (data.album.length) {
            var row = data.album.splice(0, 4);
            $scope.rows.push({pic:row})
          }
          $scope.param.tryMore = data.tryMore
          console.log('data', data)
          $scope.$broadcast('scroll.refreshComplete');
        }, function () {
          $scope.$broadcast('scroll.refreshComplete');
        })
      }


      $ionicLoading.show()
      $scope.doRefresh()
    })

    $scope.album = []
    $scope.loadMore = function () {
      //这里使用定时器是为了缓存一下加载过程，防止加载过快
      // console.log('进入loadMore', $scope.param)
      $timeout(function () {
        if (!($scope.param.tryMore == 'true' || $scope.param.tryMore)) {
          $ionicLoading.hide();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          AlbumService.getAlbum($scope.param, function (data) {
            $ionicLoading.hide();
            $scope.album = data.album;
            while (data.album.length) {
              var row = data.album.splice(0, 4);
              $scope.rows.push({pic:row, index:index})
            }
            $scope.param.tryMore = data.tryMore

            if ($scope.param.tryMore) {
              $scope.param.page = $scope.param.page + 1;
            } else {
              // ServiceUtil.showShortBottom('没有更多帖子了')
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function () {
            $ionicLoading.hide()
            // $state.go('login')
          })
        }
      }, 1500);
    };

    $scope.chooseImg = function (type) {
      ServiceUtil.petCamera.getOptionsImg(type, function (data) {
        var param = {
          img:data,
          petId:$scope.petId
        }
        $ionicLoading.show()
        AlbumService.addAlbumImg(param, function () {
          $scope.doRefresh()
        }, function () {
          $ionicLoading.hide()
        })
      }, function (err) {
        ServiceUtil.showLongBottom(err.message)
      })
    }

    $scope.showBig = false;
    $scope.bigUrl = ''
    $scope.showPic = function (url) {
      $scope.bigUrl = url
      $scope.showBig = true
    }
    $scope.hidePic = function () {
      $scope.showBig = false
    }
  }
  ctrl.$inject = ['$scope', '$stateParams', '$ionicLoading', 'AlbumService', '$timeout', 'ServiceUtil']
  return ctrl
})
