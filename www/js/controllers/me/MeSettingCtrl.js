/**
 * Created by Anker on 2017/3/27.
 */
define([], function () {
  'use strict';
  var ctrl = function ($scope, $ionicHistory, $cacheFactory, ServiceUtil, Chats, $ionicModal, $ionicActionSheet, $state) {
    $scope.chat = Chats.get(4);

    $ionicModal.fromTemplateUrl('view/settings/about.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.clearCache = function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      var login_cache = $cacheFactory.get('login_cache')
      if (!(null == login_cache || undefined == login_cache)) {
        login_cache.removeAll()
        login_cache.destroy()
      }
      var bar_cache = $cacheFactory.get('bar_cache');
      if (!(null==bar_cache ||undefined==bar_cache)) {
        bar_cache.removeAll()
        bar_cache.destroy()
      }
      ServiceUtil.showShortBottom('清除成功')
    }

    $scope.total = {pattern : '夜间'}

    // 切换模式
    $scope.changePattern = function () {

    }

    $scope.share = function () {
      $ionicActionSheet.show({
        buttons: [
          { text: '<center><p style="font-size: 18px;"><i class="iconfont icon-qq positive"></i> Q Q<p></center>' },
          { text: '<center><p style="font-size: 18px;text-align: center"><i class="iconfont icon-weibo assertive"></i> 微博</p></div>' },
          { text: '<center><p style="font-size: 18px;text-align: center" class="assertive"><i class="iconfont icon-weixin balanced"></i> 微信</p></center>' },
        ],
        buttonClicked: function(index) {
          //设置头像
          // SelectPicture.chooseSinglePicture(index, 120, 120, $scope);
          if (index != 2) {
            ServiceUtil.petCamera.getImg(index, function (file) {
              ServiceUtil.imgTransfer.uploadUser(file, function (data) {
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

    $scope.logout = function () {
      $scope.clearCache();
      var ls = ServiceUtil.getLocalStorage();
      ls.remove('LoginUser')
      $state.go('index')
    }
  }
  ctrl.$inject = ['$scope', '$ionicHistory', '$cacheFactory', 'ServiceUtil', 'Chats', '$ionicModal', '$ionicActionSheet', '$state']
  return ctrl;
})
