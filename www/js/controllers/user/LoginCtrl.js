/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state,$ionicHistory, Chats, LoginService, $ionicLoading, $cacheFactory, $cordovaToast, $timeout) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $timeout(function(){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      },1000);
    })

    // LoginService.clearLoginInfo()

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
      $state.go('register', {reg:0})
    }
    $scope.doFind = function () {
      //进入找回密码页面
      $state.go('findpwd')
    }

    $scope.doQQLogin = function () {
      $ionicLoading.show();
      if (typeof cordova === 'undefined') {
        $ionicLoading.show({
          template:'攻城狮正在抓紧开发哦',
          duration:1000
        })
      } else {
        LoginService.doQQLogin(function (data) {
          $ionicLoading.hide()
          $state.go('tab.home')
        }, function (e) {
          $ionicLoading.hide()
          if (arguments[0]) {
            //缓存存储
            var login_cache = $cacheFactory.get('login_cache')
            if (null == login_cache || undefined == login_cache) {
              login_cache = $cacheFactory('login_cache');
            }
            e.type = 'qq';
            login_cache.put('thirdPart', e);
            $state.go('register', {reg: 1});
          }
        });
      }
    }

    $scope.doWeiBoLogin = function () {
      $ionicLoading.show();
      if (typeof cordova === 'undefined') {
        $ionicLoading.show({
          template:'攻城狮正在抓紧开发哦',
          duration:1000
        })
      } else {
        LoginService.doWeiBoLogin(function (data) {
          $ionicLoading.hide()
          $state.go('tab.home')
        }, function (e) {
          $ionicLoading.hide()
          if (arguments[0]) {
            //缓存存储
            var login_cache = $cacheFactory.get('login_cache')
            if (null == login_cache || undefined == login_cache) {
              login_cache = $cacheFactory('login_cache');
            }
            e.type = 'weibo';
            login_cache.put('thirdPart', e);
            $state.go('register', {reg: 1});
          }
        });
      }
    }

    $scope.doWeChatLogin = function () {
      $ionicLoading.show();
      if (typeof cordova === 'undefined') {
        $ionicLoading.show({
          template:'攻城狮正在抓紧开发哦',
          duration:1000
        })
      } else {
        LoginService.doWeChatLogin(function (data) {
          $ionicLoading.hide()
          if (data.success) {
            $state.go('tab.home')
          } else {
            $cordovaToast.showShortBottom('攻城狮正在抓紧开发哦')
          }
        }, function (e) {
          $ionicLoading.hide()
          //缓存存储
          // var login_cache = $cacheFactory('login_cache');
          // e.type = 'qq';
          // login_cache.put('thirdPart', e);
          // $state.go('register', {reg:1});
          $cordovaToast.showShortBottom('攻城狮正在抓紧开发哦')
        });
      }
    }
  }
  ctrl.$inject = ['$scope', '$state','$ionicHistory', 'Chats', 'LoginService', '$ionicLoading', '$cacheFactory', '$cordovaToast', '$timeout'];
  return ctrl;
})
