/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  'use strict';
  var factory = function ($window, $cordovaToast, $cordovaDatePicker, $cordovaImagePicker, $ionicLoading, $cordovaCamera, $cordovaFileTransfer) {
    var server = {
      protocol:'http',
      host:'pet.ngrok.zyee.me',
      content:'petServer',
      port:80
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

    var camera = {
      getImg:function (type, success, error) {
        document.addEventListener('deviceready', function () {
          var source;
          if (0==type) {
            source = Camera.PictureSourceType.CAMERA
          } else {
            source = Camera.PictureSourceType.PHOTOLIBRARY
          }
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: source,
            allowEdit: true,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
          };
          console.log('options', options)
          $cordovaCamera.getPicture(options).then(success, error)
        } , false);
      },
      getOptionsImg:function (type, success, error, options) {
        document.addEventListener('deviceready', function () {
          options = arguments[3]?options:{}
          var source;
          if (0 == type) {
            source = Camera.PictureSourceType.CAMERA
          } else {
            source = Camera.PictureSourceType.PHOTOLIBRARY
          }
          var defaultOptions = {
            quality: options.quality ? options.quality : 50,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: source,
            allowEdit: (options.allowEdit == null || options.allowEdit == undefined) ? true : options.allowEdit,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: options.targetWidth ? options.targetWidth : 800,
            targetHeight: options.targetHeight ? options.targetHeight : 500,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
          };
          $cordovaCamera.getPicture(defaultOptions).then(success, error)
        }, false);
      }
    }

    var imgTransfer = {
      uploadUser:function (file, success, error) {
        document.addEventListener('deviceready', function () {
          var param = {}
          var user = localStorage.getObject('LoginUser');
          var url = encodeURI(server.protocol + '://' + server.host + ':'+ server.port + '/' + server.content + '/upload/masterImg');
          var options = {
            fileKey : "file",
            fileName : 'tmp',
            mimeType : 'image/jpeg',
            params : user
          }
          $cordovaFileTransfer.upload(url, file, options).then(success, error)
        } , false);
      },
      uploadPetLog:function (file, success, error, param) {
        document.addEventListener('deviceready', function () {
          var url = encodeURI(server.protocol + '://' + server.host + ':'+ server.port + '/' + server.content + '/petLog/add');
          var options = {
            fileKey : "file",
            fileName : 'tmp',
            mimeType : 'image/jpeg',
            params : param
          }
          $cordovaFileTransfer.upload(url, file, options).then(success, error)
        } , false);
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
      },
      petCamera:camera,
      imgTransfer:imgTransfer
    }
  }
  factory.$inject = ['$window', '$cordovaToast', '$cordovaDatePicker', '$cordovaImagePicker', '$ionicLoading', '$cordovaCamera', '$cordovaFileTransfer'];
  return factory;
})
