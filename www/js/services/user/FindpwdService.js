/**
 * Created by Anker on 2017/3/16.
 */
define([], function () {
  'use strict';
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var verify = ServiceUtil.getVerifier();
    var err = {
      msg : '',
      duration : 1000
    }
    return {
      getResetCode: function (email, success, error) {
        var defer = $q.defer();
        if (verify.isEmpty(email)) {
          err.msg = '邮箱不能为空哦'
          defer.reject(err)
        } else if (!verify.isEmail(email)) {
          err.msg = '您的邮箱不合法哦';
          defer.reject(err);
        } else {
          $http({
            method: 'POST',
            url: baseUrl + '/sendMail/reset',
            data: {email: email}
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              defer.resolve(data);
            } else {
              err.msg = data.msg
              defer.reject(err)
            }
          }, function (e) {
            err.msg = e.message
            defer.reject(err)
          });
        }
        defer.promise.then(success, error)
      }
    }

  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory;
})
