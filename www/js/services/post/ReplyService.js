/**
 * Created by Anker on 2017/3/23.
 */
define([], function () {
  var  factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var ls = ServiceUtil.getLocalStorage();
    var verifier = ServiceUtil.getVerifier();

    return {
      addReply:function (param, success, error) {
        var user = ls.getObject('LoginUser');
        if (verifier.isObjectEmpty(user)) {
          ServiceUtil.showLongBottom('您似乎没有登录哦')
          error();
        } else {
          var reply = {
            mId : user.mId,
            pId : param.pId,
            rContent : param.rContent
          }
          if (!verifier.isEmpty(param.rId)) {
            reply.rIded = param.rId
          }
          $http({
            url:baseUrl + '/reply/add',
            data:reply,
            method:'POST'
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              ServiceUtil.showShortBottom('评论成功');
              success()
            } else {
              ServiceUtil.showLongBottom(data.msg);
            }
          }, function (err) {
            ServiceUtil.showLongBottom(err.message);
          })
        }
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory
})
