/**
 * Created by Anker on 2017/3/26.
 */
define([], function () {
  var factory = function (ServiceUtil, $http) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var verifier = ServiceUtil.getVerifier();
    var imgUploader = ServiceUtil.imgTransfer;
    return {
      getLogs:function (pId, success) {
        var url = baseUrl + '/petLog/getLogsByPet/' + pId
        $http.get(url).success(function (resp) {
          if (resp.success) {
            success(resp.logs)
          } else {
            ServiceUtil.showLongBottom(resp.msg)
          }
        }).error(function (err) {
          ServiceUtil.showLongBottom(err.message)
        });
      },
      addLog:function (log, success) {
        console.log('log', log)
        if (!verifier.isEmpty(log.plogImgFile)) {
          imgUploader.uploadPetLog(log.plogImgFile, function (data) {
            var code = data.responseCode;
            ServiceUtil.showLongBottom('添加成功')
            if (code==200) {
              success()
            }
          }, function (err) {
            ServiceUtil.showLongBottom(err.message)
          }, log)
        } else {
          $http({
            url:baseUrl + '/petLog/add',
            method:'POST',
            data:log
          }).then(function (resp) {
            var data = resp.data;
            success(data);
          }, function (err) {
            ServiceUtil.showLongBottom(err.message)
          })
        }
      }
    }
  }
  factory.$inject = ['ServiceUtil', '$http'];
  return factory;
})
