/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var factory = function ($http, $q, ServiceUtil, $cordovaToast) {

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
      },
      getMasterByQQ:function (userid, success, error) {
        $http.post(baseUrl + '/user/getByQQ/' + userid).then(success, error);
      },
      getMasterByWeiBo:function (userid, success, error) {
        $http.post(baseUrl + '/user/getByWeiBo/' + userid).then(success, error);
      },
      getMasterByWeChat:function (userid, success, error) {
        $http.post(baseUrl + '/user/getByWeChat/' + userid).then(success, error);
      },
      doQQLogin:function (success, error) {
        var __this = this;
        document.addEventListener("deviceready", function () {
          QQSDK.checkClientInstalled(function () {
            QQSDK.ssoLogin(function (args) {
              ls.set('tencent', args.access_token);
              var userid = args.userid;
              __this.getMasterByQQ(userid, function (resp) {
                var data = resp.data;
                if (data.success) {
                  ls.setObject('LoginUser', data.master);
                  ls.set('isLogin', true);
                  ls.set("firstLogin", false);
                  success(data);
                } else {
                  $cordovaToast.showShortBottom(data.msg).then(function(s) {
                    // success
                    error({userid:args.userid})
                  }, function (e) {
                    // error
                    error({userid:args.userid})
                  });
                }
              }, function (e) {
                error({userid:args.userid})
              })
              // alert("token is " + args.access_token);
              // alert("userid is " +args.userid);
              // alert("expires_time is "+ new Date(parseInt(args.expires_time)) + " TimeStamp is " +args.expires_time);
            }, function (failReason) {
              $cordovaToast.showShortBottom(failReason)
            });
          }, function () {
            $cordovaToast.showShortBottom('您似乎没有安装手机QQ')
          })

        }, false);
      },
      doWeiBoLogin:function (success, error) {
        var __this = this;
        document.addEventListener("deviceready", function () {
          YCWeibo.checkClientInstalled(function(){
            YCWeibo.ssoLogin(function(args){
              ls.set('tencent', args.access_token);
              var userid = args.userid;
              __this.getMasterByWeiBo(userid, function (resp) {
                var data = resp.data;
                if (data.success) {
                  ls.setObject('LoginUser', data.master);
                  ls.set('isLogin', true);
                  ls.set("firstLogin", false);
                  success(data);
                } else {
                  $cordovaToast.showShortBottom(data.msg).then(function(s) {
                    error({userid:args.userid})
                  }, function (e) {
                    error({userid:args.userid})
                  });
                }
              }, function (e) {
                error({userid:args.userid})
              })
            },function(failReason){
              $cordovaToast.showShortBottom(failReason)
            });
          },function(){
            $cordovaToast.showShortBottom('您似乎没有安装微博客户端')
          });
        },false);
      },
      doWeChatLogin:function (success, err) {
        var __this = this;
        document.addEventListener("deviceready", function () {
          //var userid = '0'
          // do wechat check
          var userid = '0'
          __this.getMasterByWeChat(userid, function (resp) {
            success(resp.data)
          }, function (e) {
            err(e)
          })
        },false);

      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil', '$cordovaToast'];
  return factory;
})
