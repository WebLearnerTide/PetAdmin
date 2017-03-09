/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state, Chats, LoginService, $ionicLoading) {
    $scope.master = {
      mName:'',
      mPwd:''
    }
    $scope.chat = Chats.get(0)
    $scope.doLogin = function () {
      console.log('master', $scope.master);
      //调用LoginService的doLogin方法完成登录
      LoginService.doLogin($scope.master, function (data) {
        console.log('Login', data)
        $state.go('tab.home')
      }, function (err) {
        $ionicLoading.show({
          template: err.msg,
          duration: err.duration
        })
      })
    }
    $scope.doRegister = function () {
      //进入注册页面
      $state.go('register')
    }
    $scope.doFind = function () {
      //进入找回密码页面
      $state.go('findpwd')
    }
  }
  ctrl.$inject = ['$scope', '$state', 'Chats', 'LoginService', '$ionicLoading'];
  return ctrl;
})
