/**
 * Created by Anker on 2017/3/11.
 */
define(['app'], function(app) {
  'use strict';
  // 方案1:如果不好理解下面的内容可以直接
  // angular.bootstrap(document, [app.name]);
  // 这部分是方案1的内容

  //方案2
  angular.element(document).ready(function () {
    //console.log("bootstrap ready");

    var startApp = function () {
      //console.log("app", app);
      angular.bootstrap(document, [app.name]);
    }

    var onDeviceReady = function () {
      //console.log("on deviceready");
      angular.element().ready(function () {
        startApp();
      });
    }

    if (typeof cordova === 'undefined') {
      startApp();
    } else {
      document.addEventListener("deviceready", onDeviceReady, false);
    }
    //这一部分是方案2的内容
  });
})
