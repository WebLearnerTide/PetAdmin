/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope,$state, $stateParams, $ionicHistory, RegisterService,$ionicLoading, $cacheFactory, ServiceUtil) {
    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.message = {
        mName:'',
        mPwd:'',
        msPwd:'',
        mEmail:''
      }
      var register = function () {
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

      var update = function () {
        var login_cache = $cacheFactory.get("login_cache");
        var thirdPart = login_cache.get('thirdPart');
        var type = thirdPart.type;
        if ('qq'==type) {
          $scope.message.qqId = thirdPart.userid
        } else if ('weibo' == type) {
          $scope.message.weiboId = thirdPart.userid
        } else if ('wechat' == type){
          $scope.message.weixinId = thirdPart.userid
        } else {
          return
        }
        RegisterService.doRegisterOk($scope.message, function (data) {
          // $ionicHistory.goBack();
          var ls = ServiceUtil.getLocalStorage();
          ls.setObject('LoginUser', data.master);
          ls.set('isLogin', true);
          ls.set("firstLogin", false);
          $state.go('tab.home')
        },function (err) {
          $ionicLoading.show({
            template: err.msg,
            duration: err.duration
          })
        })
      }

      $scope.type = $stateParams.reg;

      if ($scope.type==1) {
        $scope.btn = {
          text:'绑定账号',
          doSomething:update
        }
      } else {
        $scope.btn = {
          text:'立即注册',
          doSomething:register
        }
      }

    });

    $scope.registerNow = function () {
      $scope.btn.doSomething()
    }

  }
  ctrl.$inject = ['$scope','$state', '$stateParams', '$ionicHistory', 'RegisterService','$ionicLoading', '$cacheFactory', 'ServiceUtil'];
  return ctrl;
})
