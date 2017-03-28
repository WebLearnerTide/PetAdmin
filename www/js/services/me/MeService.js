/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var ls = ServiceUtil.getLocalStorage();
    var verifier = ServiceUtil.getVerifier();
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
        var user = ls.getObject("LoginUser");
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
      },
      getReplyCount:function (success, error) {
        var user = ls.getObject('LoginUser');
        if (verifier.isObjectEmpty(user)) {
          ServiceUtil.showLongBottom('您好像还没登录哦')
          error()
        } else {
          $http({
            url:baseUrl + '/reply/getReplyCount',
            data:{mId:user.mId},
            method:'POST'
          }).then(function (resp) {
            var data = resp.data;
            if (0==data.count) {
              data.empty = true;
            } else {
              data.empty = false;
            }
            success(data);
          }, function (err) {
            var data = {
              empty:true,
              count:0
            }
            success(data);
          })
        }
      },
      getReply:function (params, success, error) {
        var user = ls.getObject('LoginUser');
        if (verifier.isObjectEmpty(user)) {
          ServiceUtil.showLongBottom('您好像还没登录哦')
          params.tryMore = false;
          error()
        } else {
          params.mId = user.mId
          $http({
            url:baseUrl + '/reply/getReply',
            data:params,
            method:'POST'
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
      readReply:function (error) {
        var user = ls.getObject('LoginUser');
        if (verifier.isObjectEmpty(user)) {
          ServiceUtil.showLongBottom('您好像还没登录哦')
          error()
        } else {
          $http({
            url:baseUrl + '/reply/readReply',
            data:{mId:user.mId},
            method:'POST'
          }).then(function (resp) {
            // 已读
          }, function (err) {
            // 已读
          })
        }
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil']
  return factory
})
