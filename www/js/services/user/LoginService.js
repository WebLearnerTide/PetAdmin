/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var factory = function ($http, $q, ServiceUtil) {

    var baseUrl = ServiceUtil.getBaseUrl();
    var verify = ServiceUtil.getVerifier();
    var ls = ServiceUtil.getLocalStorage();
    return {
      doLogin:function (master, success, error) {
        var defer = $q.defer();
        var err = {
          msg:'',
          duration:1000
        }
        if((verify.isEmpty(master.mName)) || (verify.isEmpty(master.mPwd))){
          err.msg = '名字和密码要输入的哟'
          defer.reject(err);
        } else {
          $http({
            url:baseUrl + '/user/login',
            method:'POST',
            data:{
              mName:master.mName,
              mPwd:master.mPwd
            }
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              ls.setObject('LoginUser', data.master);
              ls.set('isLogin', true);
              ls.set("firstLogin", false);
              defer.resolve(data);
            } else {
              err.msg = data.msg
              defer.reject(err);
            }
          }, function (err) {
            err.msg = err.message
            err.duration = 1000
            defer.reject(err);
          })
        }
        defer.promise.then(success, error)
      }

    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory;
})
