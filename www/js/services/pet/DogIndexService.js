/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var ls = ServiceUtil.getLocalStorage();
    var loginUser = ls.getObject("LoginUser");
    return{
      getDogs:function (success, error) {
        var url = baseUrl + '/pet/getPetsByMaster/' + loginUser.mId
        $http.get(url).success(success).error(error);
      }
    }
  }
  factory.$inject = ['$http', 'ServiceUtil']
  return factory
})
