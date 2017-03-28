/**
 * Created by Anker on 2017/3/27.
 */
define([], function () {
  var factory = function ($http, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var imgTransfer = ServiceUtil.imgTransfer;
    return {
      getAlbum:function(params, success, error) {
        $http({
          url : baseUrl + '/album/getPetAlbum',
          method:'GET',
          params:params
        }).then(function (resp) {
          var data = resp.data;
          if (data.success) {
            if (data.empty) {
              data.album = []
              data.tryMore = false;
            } else {
              if (data.page<data.total) {
                data.tryMore = true;
                data.page+=1;
              } else {
                data.tryMore = false;
              }
            }
            success(data)
          } else {
            ServiceUtil.showLongBottom(data.msg)
            error();
          }
        }, function (e) {
          ServiceUtil.showLongBottom(e.message)
          error()
        })
      },
      addAlbumImg:function (param, success, error) {
        imgTransfer.uploadAlbumImg(param.img, function (resp) {
          if (resp.responseCode==200) {
            success()
          } else {
            ServiceUtil.showLongBottom(resp.responseCode)
          }
        }, function (err) {
          ServiceUtil.showLongBottom(err)
          error()
        }, param)
      }
    }
  }
  factory.$inject = ['$http', 'ServiceUtil'];
  return factory

})
