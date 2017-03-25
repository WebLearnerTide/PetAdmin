/**
 * Created by Anker on 2017/3/22.
 */
define([], function () {
  var directive = function () {
      return {
        restrict: 'A',
        controller: function ($scope, $element, $attrs, $timeout) {
          $element.css('min-height', '100px');
          $element.css('max-height', '100%');
          $element.css('resize', 'none');
          $element.css('overflow-y', 'hidden');
          setHeight(0);
          $timeout(setHeightToScrollHeight);

          function setHeight(height) {
            $element.css('height', height + 'px');
            // $element.css('max-height', height + 'px');
          }

          function setHeightToScrollHeight() {
            setHeight(0);
            var scrollHeight = angular.element($element)[0]
              .scrollHeight;
            if (scrollHeight !== undefined && scrollHeight > 100) {
              setHeight(scrollHeight);
            }
          }

          $scope.$watch(function () {
            return angular.element($element)[0].value;
          }, setHeightToScrollHeight);
        }
      };
  }
  directive.$inject = [];
  return directive
})
