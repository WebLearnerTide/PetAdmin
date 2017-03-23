/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var factory = function ($window, $cordovaToast, $cordovaDatePicker, $cordovaImagePicker, $ionicLoading) {
    var server = {
      protocol:'http',
      host:'localhost',
      content:'petServer',
      port:8090
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
      },
      remove:function (key) {
        $window.localStorage.removeItem(key)
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
      },
      dateFormat : function (date, fmt) {
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      },
      getDatePicker: function (success, error, options) {
        var defaultOptions = {
          date: new Date(),
          mode: 'date', // or 'time'
          minDate: new Date(1900,0,1),
          allowOldDates: true,
          allowFutureDates: false,
          doneButtonLabel: '确定',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: '取消',
          cancelButtonColor: '#000000'
        }

        var err = {
          msg:'攻城狮正在努力开发中',
          duration:'1000'
        }

        options = arguments[2] ? arguments[2]: defaultOptions;
        if (typeof cordova === 'undefined') {
          error(err)
        } else {
          document.addEventListener("deviceready", function () {
            $cordovaDatePicker.show(options).then(function (date) {
              // $cordovaToast.showLongBottom(date)
              success(date)
            })
          },false);
        }
      },
      showImagePicker:function (success, error, options) {
        var defaultOptions = {
          maximumImagesCount: 10,
          width: 800,
          height: 800,
          quality: 80
        };
        var err = {
          msg:'攻城狮正在努力开发中',
          duration:'1000'
        }
        options = arguments[2] ? arguments[2]: defaultOptions;
        if (typeof cordova === 'undefined') {
          error(err)
        } else {
          document.addEventListener("deviceready", function () {
            $cordovaImagePicker.getPictures(options).then(function (results) {
              // $cordovaToast.showLongBottom(date)
              success(results)
            }, function (e) {
              $cordovaToast.showLongBottom(JSON.stringify(e))
            })
          },false);
        }
      },
      showLongBottom:function (text) {
        if (typeof cordova === 'undefined') {
          $ionicLoading.show({
            template:text,
            duration:2000
          })
        } else {
          document.addEventListener("deviceready", function () {
            $cordovaToast.showLongBottom(text)
          },false);
        }
      },
      showShortBottom:function (text) {
        if (typeof cordova === 'undefined') {
          $ionicLoading.show({
            template:text,
            duration:1000
          })
        } else {
          document.addEventListener("deviceready", function () {
            $cordovaToast.showShortBottom(text)
          },false);
        }
      }
    }
  }
  factory.$inject = ['$window', '$cordovaToast', '$cordovaDatePicker', '$cordovaImagePicker', '$ionicLoading'];
  return factory;
})
