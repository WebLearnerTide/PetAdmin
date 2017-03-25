/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $stateParams,$ionicLoading, Chats, ServiceUtil, MeService, $state, $ionicActionSheet) {
    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.btn = {
        name:'签到',
        ctrl:false
      }

      $scope.replyCount = {}

      MeService.getReplyCount(function (data) {
        $scope.replyCount = data
      }, function () {
        $state.go('login')
      })
      $scope.updateMaster = function () {
        var ls = ServiceUtil.getLocalStorage();
        var verifier = ServiceUtil.getVerifier();
        $scope.chat = Chats.get(0);
        $scope.me = ls.getObject('LoginUser');

        var today = ServiceUtil.dateFormat(new Date(), 'yyyy-MM-dd');
        MeService.updateInfo($scope.me, function (resp) {
          $scope.me  = resp;
          if (verifier.isObjectEmpty($scope.me.mDate)) {
            $scope.me.mDate = ServiceUtil.dateFormat(new Date(1900,1,1), 'yyyy-MM-dd');
          }
          if (verifier.isEmpty($scope.me.mScore)) {
            $scope.me.mScore = 0;
          }
          ls.setObject('LoginUser', resp);
          if ($scope.me.mDate < today) {
            $scope.btn = {
              name:'签到',
              ctrl:false
            }
          } else {
            $scope.btn = {
              name:'已签到',
              ctrl:true
            }
          }
        }, function (err) {
          $ionicLoading.show({
            template:err.msg,
            duration:1000
          })
        })
      }
      $scope.updateMaster();
    })


    $scope.doSign = function () {
      var ls = ServiceUtil.getLocalStorage();
      var date = new Date();
      var today = ServiceUtil.dateFormat(date, 'yyyy-MM-dd');
      if ($scope.me.mDate < today) {
        MeService.doSign(function (data) {
          var score = $scope.me.mScore;
          $scope.me = data.master;
          ls.setObject('LoginUser', data.master)
          $scope.btn = {
            name:'已签到',
            ctrl:true
          }
          ServiceUtil.showShortBottom('积分 +' + (data.master.mScore - score))
        }, function (err) {
          ServiceUtil.showShortBottom(err.msg)
        });
      } else {
        ServiceUtil.showShortBottom('已签到')
      }
    }

    $scope.selectAvatar = function(){
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
              ServiceUtil.imgTransfer.upload(0, file, function (data) {
                  var code = data.responseCode;
                  if (code == 200) {
                    $scope.updateMaster();
                  }

              }, function (e) {
                ServiceUtil.showLongBottom(e.message)
              })
            }, function (err) {
              ServiceUtil.showLongBottom(err)
            })
          }
          return true;
        }
      });
    }
  }
  ctrl.$inject = ['$scope', '$stateParams','$ionicLoading', 'Chats', 'ServiceUtil', 'MeService', '$state', '$ionicActionSheet'];
  return ctrl;
})
