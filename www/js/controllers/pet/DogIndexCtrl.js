/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state,$ionicPopup, $ionicLoading, DogIndexService) {
    $scope.goToAdd = function () {
      $state.go('adddog')
    }

    $scope.showPopup = function() {
      $scope.data = {}

      // 自定义弹窗
      var myPopup = $ionicPopup.show({
        template: '<center>客官，加个小宠物呗？</center>',
        title: '添加宠物',
        scope: $scope,
        buttons: [
          { text: '不了',
            type:'button-assertive',
            onTap: function (e) {
              $state.go('tab.home')
            }},
          {
            text: '好的',
            type: 'button-positive',
            onTap: function(e) {
              $state.go('adddog')
            }
          },
        ]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
    };

    $scope.pets = []


    $scope.getDogsTabs = function () {
      console.log('调用加载tab')
      DogIndexService.getDogs(function (resp) {
        if (resp.success) {
          if (resp.petList.length != 0) {
            $scope.pets = resp.petList;
            $state.go('tab.dog.detail', {dogId:$scope.pets[0].petId});
          } else {
            $scope.showPopup();

          }

        }
      }, function (err) {
        // $scope.showConfirm();
        $scope.showPopup();
      })
    }
  }
  ctrl.$inject = ['$scope', '$state', '$ionicPopup', '$ionicLoading', 'DogIndexService'];
  return ctrl;
})
