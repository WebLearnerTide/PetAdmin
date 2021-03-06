/**
 * Created by Anker on 2017/3/26.
 */
define([], function () {
  var ctrl = function ($scope, $state, PetLogService, ServiceUtil, $stateParams, $ionicModal, $ionicLoading) {

    $ionicModal.fromTemplateUrl('view/dog/add_pet_log.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeLog = function() {
      $scope.modal.hide();
    };

    $scope.logs = [];

    $scope.refreshLogs = function () {
      PetLogService.getLogs($stateParams.pId, function (data) {
        $scope.logs = data;
      })
    }

    $scope.log = {
      plogTitle:'',
      plogContent:'',
      plogImgFile:'',
      petId:$stateParams.pId
    }

    // Open the new post modal
    $scope.openLog = function() {
      $scope.log = {
        plogTitle:'',
        plogContent:'',
        plogImgFile:'',
        petId:$stateParams.pId
      }
      $scope.modal.show();
    };

    $scope.addLog = function () {
      PetLogService.addLog($scope.log, function (data) {
        ServiceUtil.showLongBottom('添加成功');
        $scope.refreshLogs()
        $scope.closeLog();
      })
    }

    $scope.chooseImg = function (type) {
      ServiceUtil.petCamera.getOptionsImg(type, function (data) {
        $scope.log.plogImgFile = data
      }, function (err) {
        ServiceUtil.showLongBottom(err.message)
      })
    }
  }
  ctrl.$inject = ['$scope', '$state', 'PetLogService', 'ServiceUtil', '$stateParams', '$ionicModal', '$ionicLoading'];
  return ctrl
})
