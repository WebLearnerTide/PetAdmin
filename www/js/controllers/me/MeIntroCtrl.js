/**
 * Created by 30723 on 2017/3/25.
 */
define([],function () {
  'use Strict';

  var ctrl = function ($scope, Chats) {
    $scope.chat = Chats.get(4);
  }
  ctrl.$inject= ['$scope', 'Chats'];
  return ctrl;
})
