/**
 * Created by Anker on 2017/3/27.
 */
define([], function () {
  'use strict';
  var factory = function ($http, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
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
      }
    }
  }
  factory.$inject = ['$http', 'ServiceUtil']
  return factory
})
