/**
 * Created by Anker on 2017/3/18.
 */
define([], function () {
  'use strict';
  var ctrl = function ($state, $scope, ServiceUtil, $http) {
    var ls = ServiceUtil.getLocalStorage();
    var firstLogin = ls.get('firstLogin', true);
    if (firstLogin==true || firstLogin=='true') {
      $state.go('tour')
    } else {
      $state.go('tab.home')
    }
    $http.get('http://ctide.cn/petServer/cos?type=multi').then(function (data) {
      console.log('data', data);
    }, function (err) {

    })
  }
  ctrl.$inject = ['$state', '$scope', 'ServiceUtil', '$http']
  return ctrl;
})
