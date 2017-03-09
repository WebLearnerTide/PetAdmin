/**
 * 添加宠物Ctrl
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope,$ionicLoading,$ionicHistory, AdddogService, $state) {

    $scope.dog = {
      pNickname:'',
      pGender:'男狗狗',
      pBirth:'',
      pAdoptdate:'',
      pPetclass:'',
      mId:'',
      petcId:''
    }
    $scope.$on('selectPetClass', function (e, d) {
      console.log('select', d);
      $scope.dog.petcId = d.petcId;
    })
    $scope.doAddDog = function () {
      AdddogService.doAddDog($scope.dog,function (resp) {
        console.log('callback', resp)
        $ionicHistory.goBack()
      },function (err) {
        $ionicLoading.show({
          template: err.msg,
          duration: 1000
        })
        if (err.toLogin) {
          $state.go('login')
        }
      })
    }

    $scope.changeGander = function () {
      console.log('gender', $scope.dog)
    }

    // timepicker 回调
    $scope.callback = function (result) {
      $scope.dog.birth = result;
      console.log('dog', $scope.dog)
    }
  }
  ctrl.$inject = ['$scope','$ionicLoading','$ionicHistory', 'AdddogService', '$state'];
  return ctrl;
})
