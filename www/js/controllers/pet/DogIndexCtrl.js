/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $state,$ionicPopup, $ionicLoading, DogIndexService, DogDetailService, ServiceUtil, $ionicActionSheet) {

    // $ionicLoading.show();

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


    $scope.getDogsTabs = function (index) {
      console.log('调用加载tab')
      DogIndexService.getDogs(function (resp) {
        if (resp.success) {
          if (resp.petList.length != 0) {
            $scope.pets = resp.petList;
            $scope.selectTab(index)
            $ionicLoading.hide();
          } else {
            $ionicLoading.hide();
            $scope.showPopup();
          }

        }
      }, function (err) {
        // $scope.showConfirm();
        $ionicLoading.hide();
        $scope.showPopup();
      })
    }
    $scope.pet = {}


    $scope.selectTab = function (index) {
      $scope.curTab = index
      // 获取宠物
      DogDetailService.getPet($scope.pets[index].petId, function (resp) {
        if (resp.success) {
          $scope.pet = resp.pet;
        }
      }, function (err) {

      })
    }

    $scope.selectAvatar = function(petId, cur){
      // 显示操作表
      $ionicActionSheet.show({
        buttons: [
          { text: '<center><p style="font-size: 18px;">拍照<p></center>' },
          { text: '<center><p style="font-size: 18px;text-align: center">从相册选择</p></div>' },
          { text: '<center><p style="font-size: 18px;text-align: center" class="assertive">取消</p></center>' },
        ],
        buttonClicked: function(index) {
          //设置头像
          // SelectPicture.chooseSinglePicture(index, 120, 120, $scope);
          if (index != 2) {
            ServiceUtil.petCamera.getImg(index, function (file) {
              var param = {
                petId:petId
              }
              ServiceUtil.imgTransfer.uploadPetImg(file, function (data) {
                var code = data.responseCode;
                if (code == 200) {
                  $scope.getDogsTabs(cur)
                }

              }, function (e) {
                ServiceUtil.showLongBottom(e.message)
              }, param)
            }, function (err) {
              ServiceUtil.showLongBottom(err)
            })
          }
          return true;
        }
      });
    }

  }
  ctrl.$inject = ['$scope', '$state', '$ionicPopup', '$ionicLoading', 'DogIndexService', 'DogDetailService', 'ServiceUtil', '$ionicActionSheet'];
  return ctrl;
})
