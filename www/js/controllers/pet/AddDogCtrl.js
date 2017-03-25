/**
 * 添加宠物Ctrl
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope,$ionicLoading,$ionicHistory, AdddogService, $state, ServiceUtil, $cordovaDatePicker) {
    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.dog = {
        pNickname: '',
        pGender: '男狗狗',
        pBirth: new Date(),
        pBirthText: ServiceUtil.dateFormat(new Date(), 'yyyy年MM月dd日'),
        pAdoptdate: new Date(),
        pAdoptdateText: ServiceUtil.dateFormat(new Date(), 'yyyy年MM月dd日'),
        pPetclass: '',
        mId: '',
        petcId: ''
      }
    });

    $scope.selectBirth = function () {
      var options = {
        date:$scope.dog.pBirth
      }
      document.addEventListener("deviceready", function () {
        $cordovaDatePicker.show(options).then(function (date) {
          $scope.dog.pBirth = date
          $scope.dog.pBirthText=ServiceUtil.dateFormat(date, 'yyyy年MM月dd日')
        })
      },false);
    }

    $scope.selectAddDate= function () {

      var options = {
        date:$scope.dog.pAdoptdate
      }
      document.addEventListener("deviceready", function () {
        $cordovaDatePicker.show(options).then(function (date) {
          $scope.dog.pAdoptdate = date
          $scope.dog.pAdoptdateText=ServiceUtil.dateFormat(date, 'yyyy年MM月dd日')
        })
      },false);
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
  ctrl.$inject = ['$scope','$ionicLoading','$ionicHistory', 'AdddogService', '$state', 'ServiceUtil', '$cordovaDatePicker'];
  return ctrl;
})
