/**
 * Created by Anker on 2017/3/26.
 */
define([], function () {
  var directive = function (PetLogService) {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        petId: '=petId'
      },
      template:
      '<div id="cd-timeline" class="cd-container stable-bg">'+
      '<div class="cd-timeline-block" ng-repeat="line in lines">'+
      '<div class="cd-timeline-img positive-bg">'+
      '<img ng-src="css/heart.svg">'+
      '</div>'+
      '<div class="cd-timeline-content">'+
      '<h4>{{line.plogTitle}}</h4>'+
      '<p>{{line.plogContent}}</p>'+
      '<img ng-src="{{line.plogImg}}" ng-show="line.plogImg!=null && line.plogImg!=undefiled">'+
      '<span class="cd-date">{{line.plogTime}}</span>'+
      '</div></div></div>',
      link: function (scope, element, attrs) {
        // scope.lines = [];
        console.log('log', attrs)
        PetLogService.getLogs(scope.petId, function (data) {
          scope.lines = data;
        })
      }
    }
  }
  directive.$inject = ['PetLogService'];
  return directive
})
