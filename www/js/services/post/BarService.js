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
      msg: '',
      duration: 1000,
      goLogin: false
    }
    var user = ls.getObject("LoginUser");
    return {
      getFollowBar:function (success, error) {
        var defer = $q.defer();

        if (verifier.isObjectEmpty(user)) {
          err.msg = '尚未登录';
          err.goLogin = true;
          defer.reject(err);
        } else {
          $http({
            method:'GET',
            params:{mId:user.mId},
            url: baseUrl + '/postBar/follow'
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              defer.resolve(data)
            } else {
              err.msg = data.msg;
              err.goLogin = false;
              defer.reject(err);
            }
          }, function (e) {
            err.msg = e.message;
            err.goLogin = false;
            defer.reject(err);
          })
        }
        defer.promise.then(success, error)
      },
      getUnFollowBar: function (success, error) {
        var defer = $q.defer();
        if (verifier.isObjectEmpty(user)) {
          err.msg = '';
          err.goLogin = true;
          defer.reject(err);
        } else {
          $http({
            method:'GET',
            params:{mId:user.mId},
            url: baseUrl + '/postBar/unFollow'
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              defer.resolve(data)
            } else {
              err.msg = data.msg;
              err.goLogin = false;
              defer.reject(err);
            }
          }, function (e) {
            err.msg = e.message;
            err.goLogin = false;
            defer.reject(err);
          })
        }
        defer.promise.then(success, error)
      },
      addFollow:function (follow, success, error) {
        var defer = $q.defer();

        if (verifier.isObjectEmpty(user)) {
          err.msg = '尚未登录';
          err.goLogin = true;
          defer.reject(err);
        } else {
          follow.mId = user.mId
          $http({
            method:'POST',
            data:follow,
            url: baseUrl + '/postBar/addFollow'
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              defer.resolve(data)
            } else {
              err.msg = data.msg;
              err.goLogin = false;
              defer.reject(err);
            }
          }, function (e) {
            err.msg = e.message;
            err.goLogin = false;
            defer.reject(err);
          })
        }
        defer.promise.then(success, error);
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory;
})
