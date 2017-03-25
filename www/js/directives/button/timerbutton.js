/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict'
  var directive = function ($timeout, $interval, FindpwdService) {
    return {
      restrict: 'AE',
      scope: {
        showTimer: '=',
        timeout: '=',
        email: '=',
        errorHandle:'&',
        successHandle:'&'
      },
      link: function(scope, element, attrs){
        scope.timer = false;
        scope.timeout = 60000;
        scope.timerCount = scope.timeout / 1000;
        scope.text = "获取验证码";

        scope.onClick = function() {
          FindpwdService.getResetCode(scope.email, function (data) {
            scope.showTimer = true;
            scope.timer = true;
            scope.text = "秒后重新获取";
            var counter = $interval(function () {
              scope.timerCount = scope.timerCount - 1;
            }, 1000);

            $timeout(function () {
              scope.text = "获取验证码";
              scope.timer = false;
              $interval.cancel(counter);
              scope.showTimer = false;
              scope.timerCount = scope.timeout / 1000;
            }, scope.timeout);
            scope.successHandle({data:data})
          }, function (err) {
            scope.errorHandle({error:err})
          })
        }
      },
      template: '<button on-tap="onClick()" class="button button-positive button-small" ' +
      'ng-disabled="timer"><span ng-if="showTimer">{{ timerCount }}</span>{{text}}</button>'
    };
  }

  directive.$inject = ['$timeout', '$interval', 'FindpwdService'];
  return directive;
})
