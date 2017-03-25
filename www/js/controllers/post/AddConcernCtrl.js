/**
 * 添加关注Ctrl
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state, $ionicLoading, BarService, $ionicHistory, ServiceUtil) {
    $scope.goBackPost = function () {
      $ionicHistory.goBack()
    }

    $scope.petType = [];
    $scope.showPetType = false;

    $scope.lifeHealth = [];
    $scope.showLifeHealth = false;

    $scope.otherFollow = [];
    $scope.showOtherFollow = false;

    $scope.loadUnFollow = function () {
      BarService.getUnFollowBar(function (data) {
        if (data.empty) {
          $scope.petType = [{barId:-1, barName:'还没有添加关注哦', showBtn:false}]
        } else {
          $scope.petType = [];
          $scope.showPetType = false;

          $scope.lifeHealth = [];
          $scope.showLifeHealth = false;

          $scope.otherFollow = [];
          $scope.showOtherFollow = false;
          for (var i in data.barList) {
            var item = data.barList[i];
            item.showBtn = true;
            if (item.barType=='pet_type') {
              $scope.petType.push(item);
              $scope.showPetType = true;
            } else if (item.barType=='life_health') {
              $scope.lifeHealth.push(item);
              $scope.showLifeHealth = true;
            } else {
              $scope.otherFollow.push(item)
              $scope.showOtherFollow = true;
            }
          }
        }
      }, function (err) {
        ServiceUtil.showLongBottom(err.msg)
        if (err.goLogin) {
          $state.go('login')
        }
      })
    }

    $scope.addConcern = function (barId) {
      var follow = {
        barId:barId
      }
      BarService.addFollow(follow, function (data) {
        ServiceUtil.showShortBottom(data.msg)
        $scope.loadUnFollow();
      }, function (err) {
        ServiceUtil.showLongBottom(err.msg)
        if (err.goLogin) {
          $state.go('login')
        }
      })
    }
  }
  ctrl.$inject = ['$scope', '$state', '$ionicLoading', 'BarService', '$ionicHistory','ServiceUtil'];
  return ctrl;
})
