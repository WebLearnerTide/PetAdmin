/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var verifier = ServiceUtil.getVerifier();
    var err = {
      msg:'',
      duration:1000
    }
    return{
      doRegisterOk: function (message, success, error) {
        var defer = $q.defer();

        //判断输入框不为空
        if(verifier.isEmpty(message.mName) ||  verifier.isEmpty(message.mPwd)
          || verifier.isEmpty(message.mEmail)){
          err.msg = '都要输入的哟';
          defer.reject(err);
        }
        //规定密码长度不得小于6位
        else if(!verifier.isCorrect(message.mPwd)){
          err.msg = '密码0-9位包含字母和数字';
          defer.reject(err);
        }
        //判断两次密码输入是否一致
        else if(!verifier.isEqual(message.mPwd,message.msPwd)){
          err.msg = '两次输入密码要一致的哟';
          defer.reject(err);
        }
        //判断邮箱格式是否符合条件
        else if(!verifier.isEmail(message.mEmail)){
          err.msg = '您输入的邮箱格式不正确';
          defer.reject(err);
        } else {
          $http({
              url: baseUrl + '/user/register',
              method: 'POST',
              data: message
            }
          ).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              defer.resolve(data)
            } else {
              err.msg = data.msg;
              defer.reject(err);
            }
          }, function (e) {
            err.msg = e.message
            defer.reject(err)
          })
        }
        defer.promise.then(success, error)
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory
})
