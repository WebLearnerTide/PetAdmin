/**
 * Created by Anker on 2017/3/11.
 */
define(function (require) {
  'use strict';
  var directives = angular.module('starter.directives', []);
  directives.directive('petClassSelect', require('directives/select/petClass'));
  directives.directive('timerbutton', require('directives/button/timerbutton'));
  directives.directive('expandingTextArea', require('directives/textarea/expandingTextArea'));
  return directives;
})
