/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state,$stateParams, DogDetailService) {
    var petId = $stateParams.dogId;
    $scope.pet = {}

    // 获取宠物
    DogDetailService.getPet(petId, function (resp) {
      if (resp.success) {
        $scope.pet = resp.pet;
      }
    }, function (err) {

    })
    // 添加狗狗
    $scope.goToAdd = function () {
      $state.go('adddog')
    }


  }
  ctrl.$inject = ['$scope', '$state','$stateParams', 'DogDetailService'];
  return ctrl;
})
