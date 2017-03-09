/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope,$state,$ionicHistory, RegisterService,$ionicLoading) {
    $scope.message = {
      mName:'',
      mPwd:'',
      msPwd:'',
      mEmail:''
    }


    $scope.registerNow = function () {
      //注册成功返回登录
      RegisterService.doRegisterOk($scope.message,function (data) {
          $ionicHistory.goBack();
      },function (err) {
        $ionicLoading.show({
          template: err.msg,
          duration: err.duration
        })
      })
    }
  }
  ctrl.$inject = ['$scope','$state','$ionicHistory', 'RegisterService','$ionicLoading'];
  return ctrl;
})
