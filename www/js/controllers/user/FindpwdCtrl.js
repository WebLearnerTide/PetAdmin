/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope,$state,ServiceUtil,$ionicLoading) {
    var verifier = ServiceUtil.getVerifier();
    $scope.passwords = {
      vCode:'',
      sVCode:''
    }

    $scope.resetCode = '';

    $scope.errorHandle = function (error) {
      $ionicLoading.show({
        template: error.msg,
        duration: error.duration
      })
    }

    $scope.successHandle = function (data) {
      console.log('data', data)
      $scope.passwords.sVCode = data.resetCode
    }

    $scope.doNext = function () {
      //找回密码-输入验证码
      // $state.go('resetpwd')
      if (verifier.isEmpty($scope.passwords.sVCode)) {
        $ionicLoading.show({
          template: '请输入验证码',
          duration: 1000
        })
      } else if (verifier.isEmpty($scope.passwords.vCode)) {
        $ionicLoading.show({
          template: '获取服务器验证码失败',
          duration: 1000
        })
      }else if(verifier.isEqual($scope.passwords.vCode, $scope.passwords.sVCode)){
        $ionicLoading.show({
          template: '修改成功',
          duration: 1000
        })
        $state.go('resetpwd');
      }
      else{
        $ionicLoading.show({
          template: '验证码不正确',
          duration: 1000
        })
      }
    }
  }
  ctrl.$inject = ['$scope','$state','ServiceUtil','$ionicLoading'];
  return ctrl;
})
