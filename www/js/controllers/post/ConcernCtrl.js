/**
 * 贴吧关注模块
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state, BarService, $ionicLoading) {
    //添加关注贴吧
    $scope.ToaddConcern = function () {
      $state.go('addconcern')
    }

    $scope.petType = [];
    $scope.showPetType = false;

    $scope.lifeHealth = [];
    $scope.showLifeHealth = false;

    $scope.otherFollow = [];
    $scope.showOtherFollow = false;

    $scope.loadFollow = function () {
      BarService.getFollowBar(function (data) {

        if (data.empty) {
          $scope.petType = [{barId:-1, barName:'还没有添加关注哦'}]
        } else {
          $scope.petType = [];
          $scope.showPetType = false;

          $scope.lifeHealth = [];
          $scope.showLifeHealth = false;

          $scope.otherFollow = [];
          $scope.showOtherFollow = false;
          for (var i in data.barList) {
            var item = data.barList[i];
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

    $scope.barDetail = function (follow) {

    }
  }
  ctrl.$inject = ['$scope','$state', 'BarService', '$ionicLoading'];
  return ctrl;
})
