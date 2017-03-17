/**
 * 添加关注Ctrl
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state, $ionicLoading, BarService, $ionicHistory) {
    $scope.goBackPost = function () {
      $ionicHistory.goBackPost();
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
        $ionicLoading.show({
          template:err.msg,
          duration:err.duration
        })
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
        $ionicLoading.show({
          template:data.msg,
          duration:1000
        })
        $scope.loadUnFollow();
      }, function (err) {
        $ionicLoading.show({
          template:err.msg,
          duration:err.duration
        })
        if (err.goLogin) {
          $state.go('login')
        }
      })
    }
  }
  ctrl.$inject = ['$scope', '$state', '$ionicLoading', 'BarService', '$ionicHistory'];
  return ctrl;
})
