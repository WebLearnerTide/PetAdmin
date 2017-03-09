/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var verifier = ServiceUtil.getVerifier();
    var ls = ServiceUtil.getLocalStorage();
    var err = {
      msg:'',
      duration:1000
    }
    return{
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil']
  return factory
})
