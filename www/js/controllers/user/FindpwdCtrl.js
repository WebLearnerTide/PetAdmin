/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope,$state,ServiceUtil,$ionicLoading) {
    var verifier = ServiceUtil.getVerifier();
    $scope.passwords = {
      m_pwd:'',
      m_rpwd:''
    }
    $scope.doNext = function () {
      //找回密码-输入验证码
      // $state.go('resetpwd')
      if(verifier.isEqual($scope.passwords.m_pwd,$scope.passwords.m_rpwd)){
        $ionicLoading.show({
          template: '修改成功',
          duration: 1000
        })
        $state.go('resetpwd');
      }
      else{
        $ionicLoading.show({
          template: '两次密码要一致',
          duration: 1000
        })
      }
    }
  }
  ctrl.$inject = ['$scope','$state','ServiceUtil','$ionicLoading'];
  return ctrl;
})
