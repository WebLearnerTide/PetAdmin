/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }
  ctrl.$inject = ['$scope', 'Chats'];
  return ctrl;
})
