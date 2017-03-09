/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var err = {
      msg:'',
      duration:1000
    }
    return{
      updateInfo:function (me, success, error) {
        var defer = $q.defer();
        $http({
          url:baseUrl + '/user/getByMId',
          data:{
            mId:me.mId
          },
          method:'POST'
        }).then(function (resp) {
          var data = resp.data;
          if (data.success) {
            defer.resolve(data.master);
          } else {
            defer.reject(data)
          }
        }, function (e) {
          err.msg = '更新失败' + e.message
          defer.reject(err)
        })
        defer.promise.then(success, error)
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil']
  return factory
})
