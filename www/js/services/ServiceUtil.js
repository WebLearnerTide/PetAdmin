/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var factory = function ($window) {
    var server = {
      protocol:'http',
      host:'localhost',
      content:'petServer',
      port:8080
    }

    var verifier = {
      //判断是否为空
      isEmpty:function (string) {
        return (string == null  || string == '' || string == undefined);
      },
      //判断两个字符串是否一致
      isEqual:function (string1,string2) {
        return(string1 == string2);
      },
      //判断邮箱是否符合标准
      isEmail:function (email) {
        if (!this.isEmpty(email)) {
          var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
          //成功返回TRUE 失败返回FALSE
          return reg.test(email );
        };
      },
      //判断密码是否在0-9位并且同时含有数字和字母
      isCorrect:function (password) {
        if(!this.isEmpty(password)){
          var reg2 =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
          return reg2.test(password);
        }
      },
      isObjectEmpty:function (obj) {
        return null==obj||undefined==obj||{}==obj
      }
    }

    var localStorage = {
      //存储单个属性
      set :function(key,value){
        $window.localStorage[key]=value;
      },
      //读取单个属性
      get:function(key,defaultValue){
        return  $window.localStorage[key] || defaultValue;
      },
      //存储对象，以JSON格式存储
      setObject:function(key,value){
        $window.localStorage[key]=JSON.stringify(value);
      },
      //读取对象
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }

    return {
      getServer:function () {
        return server;
      },
      getBaseUrl:function () {
        return server.protocol + '://' + server.host + ':'+ server.port + '/' + server.content;
      },
      getVerifier:function () {
        return verifier;
      },
      getLocalStorage:function () {
        return localStorage
      }
    }
  }
  factory.$inject = ['$window'];
  return factory;
})
