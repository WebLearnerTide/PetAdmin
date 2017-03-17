/**
 * Created by Anker on 2017/3/17.
 */
define([], function () {
  'use strict';
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var verifier = ServiceUtil.getVerifier();
    var ls = ServiceUtil.getLocalStorage();
    var err = {
      msg:'',
      duration:1000
    }
    return {
      getHotPost:function (page, success, error) {
        var defer = $q.defer();
        $http({
          method:'GET',
          params:page,
          url:baseUrl + '/post/hot'
        }).then(function (resp) {
          var data = resp.data;
          if (data.success) {
            defer.resolve(data)
          } else {
            err.msg = data.msg
            defer.reject(err);
          }
        }, function (e) {
          err.msg = e.message
          defer.reject(err)
        })
        defer.promise.then(success, error)
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory;
})
