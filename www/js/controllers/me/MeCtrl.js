/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $stateParams,$ionicLoading, Chats, ServiceUtil, MeService) {
    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.btn = {
        name:'签到',
        ctrl:false
      }
      var ls = ServiceUtil.getLocalStorage();
      var verifier = ServiceUtil.getVerifier();
      $scope.chat = Chats.get(0);
      $scope.me = ls.getObject('LoginUser');

      var today = ServiceUtil.dateFormat(new Date(), 'yyyy-MM-dd');
      MeService.updateInfo($scope.me, function (resp) {
        $scope.me  = resp;
        if (verifier.isObjectEmpty($scope.me.mDate)) {
          $scope.me.mDate = new Date(1900,1,1);
        }
        if (verifier.isEmpty($scope.me.mScore)) {
          $scope.me.mScore = 0;
        }
        ls.setObject('LoginUser', resp);
        if ($scope.me.mDate < today) {
          $scope.btn = {
            name:'签到',
            ctrl:false
          }
        } else {
          $scope.btn = {
            name:'已签到',
            ctrl:true
          }
        }
      }, function (err) {
        $ionicLoading.show({
          template:err.msg,
          duration:1000
        })
      })
    })


    $scope.doSign = function () {
      var ls = ServiceUtil.getLocalStorage();
      var date = new Date();
      var today = ServiceUtil.dateFormat(date, 'yyyy-MM-dd');
      if ($scope.me.mDate < today) {
        MeService.doSign(function (data) {
          var score = $scope.me.mScore;
          $scope.me = data.master;
          ls.setObject('LoginUser', data.master)
          $scope.btn = {
            name:'已签到',
            ctrl:true
          }
          ServiceUtil.showShortBottom('积分 +' + (data.master.mScore - score))
        }, function (err) {
          ServiceUtil.showShortBottom(err.msg)
        });
      } else {
        ServiceUtil.showShortBottom('已签到')
      }
    }
  }
  ctrl.$inject = ['$scope', '$stateParams','$ionicLoading', 'Chats', 'ServiceUtil', 'MeService'];
  return ctrl;
})
