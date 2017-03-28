/**
 * Created by Anker on 2017/3/27.
 */
define([], function () {
  'use strict';
  var factory = function ($http, $q, ServiceUtil) {

    var baseUrl = ServiceUtil.getBaseUrl();
    var ls = ServiceUtil.getLocalStorage();
    var verifier = ServiceUtil.getVerifier();
    var user = ls.getObject('LoginUser');
    var imgTransfer = ServiceUtil.imgTransfer;


    return {
      addAd:function (ad, success, error) {
        if (verifier.isObjectEmpty(user)) {
          error()
        } else {
          // ad.mId = user.mId
          if (verifier.isEmpty(ad.title)) {
            ad.title = ad.pTitle
          }
          imgTransfer.uploadAdImg(ad.img, function (resp) {
            if (resp.responseCode==200) {
              success();
            }
          }, function (err) {
            ServiceUtil.showLongBottom(err.message)
          }, ad)
        }
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil'];
  return factory
})
