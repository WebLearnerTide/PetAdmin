/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict'
  var directive = function () {
    var TAG = 'petClassSelectDirective';
    return {
      restrict: 'EA',
      scope: {
        default: '=defaultdata',
        petClassResult:'='
      },
      replace: true,
      transclude: true,
      template: '<span style="float: right;" ng-click="toSetDefaultPosition();">' +
      '{{selectedAddress.province+">" +selectedAddress.city}}' +
      '</span>',
      controller: function ($scope, $element, $attrs, $ionicModal, $http, $ionicSlideBoxDelegate, $timeout, $rootScope, $ionicScrollDelegate) {
        var selectedAddress = {};
        var addressData;
        this.$onInit = function () {
          selectedAddress = {};
          $scope.selectedAddress = {province:'请选择'};


          $http.get('http://localhost:8080/petServer/petClass/getBuild').success(function (res) {//调取接口获取数据
            addressData = res;
            console.log('build', res)
            if (addressData.success) {
              $scope.buildData = addressData.buildList;
            } else {
              console.log('area_datas err = ' + res.msg);
            }

          }).error(function (err) {
            console.log('area_datas err = ' + angular.toJson(err));
          });

          $ionicModal.fromTemplateUrl('1.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.PCTModal = modal;
          })
        };

        $scope.lockSlide = function () {
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').enableSlide(false);
        };

        $scope.$watch('default', function (newValue) {
          if (newValue) {
            $scope.selectedAddress = newValue;
          }
        });

        $scope.toSetDefaultPosition = function () {
          $scope.showBackBtn = false;
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').slide(0);
          $ionicScrollDelegate.$getByHandle('PCTSelectProvince').scrollTop();
          $scope.PCTModal.show();
        };

        //选择犬型
        $scope.chooseProvince = function (selectedProvince) {
          var selectedProvinceIndex;
          var type;

          angular.forEach($scope.buildData, function (item, index) {
            if (item === selectedProvince) {
              selectedProvinceIndex = item.petcBuild;
              type=item.petcBuildName;
              return;
            }
          });


          selectedAddress = {};
          $scope.showBackBtn = true;
          $http.get('http://localhost:8080/petServer/petClass/getByBuild?petcBuild='+selectedProvinceIndex).success(function (resp) {
            console.log('build', resp)
            if (resp.success) {
              $scope.classData = resp.classList;
            } else {
              $scope.classData = [];
            }
          }).error(function (err) {
            console.log('build', err)
          })

          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').next();
          $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').update();
          $ionicScrollDelegate.$getByHandle('PCTSelectCity').scrollTop();
          selectedAddress.province = selectedProvince.petcBuildName;
        };

        //选择品种
        $scope.chooseCity = function (selectedCity) {
          var selectedCityIndex;

          selectedAddress.city = selectedCity.petcName;
          $scope.selectedAddress = selectedAddress;
          $rootScope.$broadcast('PCTSELECT_SUCCESS', {result: $scope.selectedAddress});
          $rootScope.$broadcast('selectPetClass', {petcId:selectedCity.petcId});
          $timeout(function () {
            $scope.PCTModal.hide();
          }, 200);
        };

        //slide返回上一级
        $scope.goBackSlide = function () {
          var currentIndex = $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').currentIndex();
          if (currentIndex > 0) {
            $ionicSlideBoxDelegate.$getByHandle('PCTSelectDelegate').previous();
          }
          if (currentIndex === 1) {
            $scope.showBackBtn = false;
          }
        };

        $scope.$on('$destroy', function () {
          $scope.PCTModal.remove();
        });
      }
    };
  }

  return directive;
})
