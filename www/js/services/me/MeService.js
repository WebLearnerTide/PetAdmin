/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var ls = ServiceUtil.getLocalStorage();
    var verifier = ServiceUtil.getVerifier();
    var user = ls.getObject("LoginUser");
    var err = {
      msg:'',
      duration:1000,
      goLogin:false
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
      },
      doSign:function (success, error) {
        var defer = $q.defer();
        if (verifier.isObjectEmpty(user)) {
          err.msg = '您还没有登录';
          err.goLogin = true;
          defer.reject(err);
        } else {
          $http({
            method:'POST',
            url:baseUrl + '/user/sign',
            data:{mId:user.mId}
          }).then(function (resp) {
            var data = resp.data;
            defer.resolve(data);
          }, function (e) {
            err.msg = e.message;
            defer.reject(err);
          })
        }
        defer.promise.then(success, error)
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil']
  return factory
})
