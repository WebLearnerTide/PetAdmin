/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    return{
      getPet:function (petId, success, error) {
        var url = baseUrl + '/pet/getById/' + petId
        $http.get(url).success(success).error(error);
      }
    }
  }
  factory.$inject = ['$http', 'ServiceUtil']
  return factory
})
