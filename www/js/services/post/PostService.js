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
    var param = {
      page:1,
      tryMore:true,
      list:[]
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
      },
      getPostClasses:function (success) {
        $http.get(baseUrl + '/postClass/getAllClass').then(function (resp) {
          var data = resp.data
          if (data.success) {
            success(data.postClassList)
          } else {
            ServiceUtil.showLongBottom(data.msg)
          }
        }, function (err) {
          ServiceUtil.showLongBottom(err.message)
        })
      },
      addPost:function (post, success, error) {
        var user = ls.getObject('LoginUser');
        if (verifier.isObjectEmpty(user)) {
          ServiceUtil.showLongBottom('您好像还没登录哦')
          error()
        } else {
          post.mId = user.mId;
          $http({
            url:baseUrl + '/post/addPost',
            method:'POST',
            data:post
          }).then(function (resp) {
            var data = resp.data
            if (data.success) {
              ServiceUtil.showShortBottom('添加成功');
            } else {
              ServiceUtil.showShortBottom(data.msg);
            }
          }, function (err) {
            ServiceUtil.showShortBottom(err.message);
          })
        }
      },
      getMyPost:function (params, success, error) {
        var user = ls.getObject('LoginUser');
        if (verifier.isObjectEmpty(user)) {
          ServiceUtil.showLongBottom('您好像还没登录哦')
          params.tryMore = false;
          error()
        } else {
          params.mId = user.mId
          $http({
            method:'POST',
            url:baseUrl + '/post/myPosts',
            data:params
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              if (data.empty) {
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
            }
          }, function (err) {
            ServiceUtil.showLongBottom(err.message)
          })
        }
      },
      param:param
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory;
})
