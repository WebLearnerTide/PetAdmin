/**
 * Created by Anker on 2017/3/29.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $sce, $stateParams, DashService, ServiceUtil, $rootScope) {
    $scope.$on('$ionicView.beforeEnter', function () {
      var param = {
        newsId:$stateParams.newsId
      }
      $scope.news = {}

      DashService.getNewsBaikeDetail(param, function (data) {
        $scope.news = data.news
        $scope.news.newsContent = $sce.trustAsHtml($scope.news.newsContent)
      }, function () {
        $rootScope.goBack();
        ServiceUtil.showShortBottom('获取详情失败')
      })
    })

  }
  ctrl.$inject = ['$scope', '$sce', '$stateParams', 'DashService', 'ServiceUtil', '$rootScope']
  return ctrl;
})
