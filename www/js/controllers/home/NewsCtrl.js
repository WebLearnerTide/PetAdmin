/**
 * Created by Anker on 2017/3/29.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, ServiceUtil, $sce) {
    $scope.$on('$ionicView.beforeEnter', function () {
      var ls = ServiceUtil.getLocalStorage();
      $scope.news = ls.getObject('news');
      $scope.news.newsContent = $sce.trustAsHtml($scope.news.newsContent)
    })

  }
  ctrl.$inject = ['$scope', 'ServiceUtil', '$sce']
  return ctrl;
})
