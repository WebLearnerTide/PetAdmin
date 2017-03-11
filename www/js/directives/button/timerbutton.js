/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict'
  var directive = function ($timeout, $interval) {
    return {
      restrict: 'AE',
      scope: {
        showTimer: '=',
        timeout: '='
      },
      link: function(scope, element, attrs){
        scope.timer = false;
        scope.timeout = 60000;
        scope.timerCount = scope.timeout / 1000;
        scope.text = "获取验证码";

        scope.onClick = function(){
          scope.showTimer = true;
          scope.timer = true;
          scope.text = "秒后重新获取";
          var counter = $interval(function(){
            scope.timerCount = scope.timerCount - 1;
          }, 1000);

          $timeout(function(){
            scope.text = "获取验证码";
            scope.timer = false;
            $interval.cancel(counter);
            scope.showTimer = false;
            scope.timerCount = scope.timeout / 1000;
          }, scope.timeout);
        }
      },
      template: '<button on-tap="onClick()" class="button button-positive button-small" ' +
      'ng-disabled="timer"><span ng-if="showTimer">{{ timerCount }}</span>{{text}}</button>'
    };
  }

  directive.$inject = ['$timeout', '$interval'];
  return directive;
})
