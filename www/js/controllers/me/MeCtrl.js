/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $stateParams,$ionicLoading, Chats, ServiceUtil, MeService) {
    var ls = ServiceUtil.getLocalStorage();
    var verifier = ServiceUtil.getVerifier();
    $scope.chat = Chats.get(0);
    $scope.me = ls.getObject('LoginUser');
    $scope.btn = {
      name:'',
      ctrl:{'border-color': '#387ef5',
        'background': 'transparent',
        'color': '#387ef5'}
    }
    $scope.updateInfo = function () {
      var date = new Date();
      var today = ServiceUtil.dateFormat(date, 'yyyy-MM-dd');
      if ($scope.me.mDate < today) {
        $scope.btn = {
          name:'签到',
          ctrl:{}
        }
      } else {
        $scope.btn = {
          name:'已签到',
          ctrl:{'border-color': '#387ef5',
            'background': 'transparent',
            'color': '#387ef5'}
        }
      }
      MeService.updateInfo($scope.me, function (resp) {
        $scope.me  = resp;
        ls.setObject('LoginUser', resp);
        if ($scope.me.mDate < today) {
          $scope.btn = {
            name:'签到',
            ctrl:{}
          }
        } else {
          $scope.btn = {
            name:'已签到',
            ctrl:{'border-color': '#387ef5',
              'background': 'transparent',
              'color': '#387ef5'}
          }
        }
      }, function (err) {
        $ionicLoading.show({
          template:err.msg,
          duration:1000
        })
      })
    }

    $scope.doSign = function () {
      var date = new Date();
      var today = ServiceUtil.dateFormat(date, 'yyyy-MM-dd');
      if ($scope.me.mDate < today) {
        MeService.doSign(function (data) {
          var score = $scope.me.mScore;
          $scope.me = data.master;
          ls.setObject('LoginUser', data.master)
          $scope.btn = {
            name:'已签到',
            ctrl:{'border-color': '#387ef5',
              'background': 'transparent',
              'color': '#387ef5'}
          }
          $ionicLoading.show({
            template:'积分 +' + (data.master.mScore - score),
            duration:1000
          })
        }, function (err) {
          $ionicLoading.show({
            template: err.msg,
            duration: 1000
          })
        });
      }
    }
  }
  ctrl.$inject = ['$scope', '$stateParams','$ionicLoading', 'Chats', 'ServiceUtil', 'MeService'];
  return ctrl;
})
