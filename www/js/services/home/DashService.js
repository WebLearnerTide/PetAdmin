/**
 * Created by Anker on 2017/3/27.
 */
define([], function () {
  'use strict';
  var factory = function ($http, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var ls = ServiceUtil.getLocalStorage();
    var verifier = ServiceUtil.getVerifier();
    return {
      getLatest:function (success) {
        $http.get(baseUrl + '/ad/latest').then(function (resp) {
          var data = resp.data
          if (data.success) {
            console.log('latest', data.latest)
            success(data.latest);
          } else {
            success([{
              pId:'',
              title:'暂无广告',
              adImg:'img/default.jpg'
            }]);
          }
        }, function () {
          ServiceUtil.showLongBottom('查询失败')
        })
      },
      getNews:function (success, error) {
        var user = ls.getObject('LoginUser');
        $http({
          method:'GET',
          url:baseUrl + '/news/list',
          params:{mId:user.mId}
        }).then(function (resp) {
          var data = resp.data
          if (!verifier.isObjectEmpty()) {
            data.tryMore = false;
          } else {
            data.tryMore = true;
          }
          success(data)
        }, error)
      },
      getBaike:function (petcId, success, error) {
        $http({
          method:'GET',
          url:baseUrl + '/news/getByPetClass',
          params:{petcId:petcId}
        }).then(function (resp) {
          var data = resp.data
          if (!verifier.isObjectEmpty()) {
            data.tryMore = false;
          } else {
            data.tryMore = true;
          }
          success(data)
        }, error)
      },
      getNewsBaikeDetail:function (param, success, error) {
        $http({
          method:'GET',
          url:baseUrl + '/news/getDetail',
          params:param
        }).then(function (resp) {
          var data = resp.data
          console.log('data', data)
          success(data)
        }, error)
      }
    }
  }
  factory.$inject = ['$http', 'ServiceUtil']
  return factory
})
