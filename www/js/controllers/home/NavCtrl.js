/**
 * Created by 30723 on 2017/3/25.
 */
define([],function () {
  'use Strict';

  var ctrl = function ($scope, Chats) {
    $scope.nav = Chats.all();

    // $scope.currentSlide = function (index) {
    //
    // }

    $scope.current = 0;
  }
  ctrl.$inject= ['$scope', 'Chats'];
  return ctrl;
})
