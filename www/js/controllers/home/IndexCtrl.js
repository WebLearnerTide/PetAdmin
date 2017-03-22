/**
 * Created by Anker on 2017/3/18.
 */
define([], function () {
  'use strict';
  var ctrl = function ($state, $scope, ServiceUtil) {
    var ls = ServiceUtil.getLocalStorage();
    var firstLogin = ls.get('firstLogin', true);
    if (firstLogin==true || firstLogin=='true') {
      $state.go('tour')
    } else {
      $state.go('tab.home')
    }
  }
  ctrl.$inject = ['$state', '$scope', 'ServiceUtil']
  return ctrl;
})
