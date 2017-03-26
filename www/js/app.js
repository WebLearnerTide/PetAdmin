define(['services/services', 'controllers/controllers', 'directives/directives'], function () {
  var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.directives', 'TimePicker', 'ngCordova']);
  app.run(function($ionicPlatform, $rootScope, $ionicHistory, $location, $cordovaToast, $cordovaKeyboard,$timeout) {
    $rootScope.goBack = function () {
      $ionicHistory.goBack();
    }
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

  });
  //统一Android和iOS的风格。Android下Tab放到页面下
  app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('ios');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('ios');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  });
  // $http post
  app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var param = function(obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      for(name in obj) {
        value = obj[name];

        if(value instanceof Array) {
          for(i=0; i<value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object) {
          for(subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
      return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  });
  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    // 选项卡根页
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'view/tabs.html'
      })
      //登录界面
      .state('login',{
        url: '/login',
        templateUrl:'view/nav/login.html',
        controller: 'LoginCtrl'
      })
      .state('register',{
        url: '/register/:reg',
        templateUrl : 'view/nav/register.html',
        controller: 'RegisterCtrl'
      })
      .state('findpwd',{
        url: '/findpwd',
        templateUrl : 'view/nav/findpwd.html',
        controller : 'FindpwdCtrl'
      })
      .state('inputvalide',{
        url : '/inputvalide',
        templateUrl : 'view/nav/inputvalide.html',
        controller : 'ValideCtrl'
      })
      .state('resetpwd',{
        url: '/resetpwd',
        templateUrl : 'view/nav/resetpwd.html',
        controller : 'ResetCtrl'
      })
      // 首页

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'view/home/home_index.html',
            controller: 'DashCtrl'
          }
        }
      })
      //宠物
      .state('tab.dog', {
        url: '/dog',
        views: {
          'tab-dog': {
            templateUrl: 'view/dog/dog_index.html',
            controller: 'DogIndexCtrl'
          }
        }
      })
      //论坛
      .state('tab.post', {
        url: '/post',
        views: {
          'tab-post': {
            templateUrl: 'view/post/post_index.html'
          }
        }
      })
      //我
      .state('tab.me', {
        url: '/me',
        views: {
          'tab-me': {
            templateUrl: 'view/me/me_index.html',
            controller: 'MeCtrl'
          }
        }
      })
      //我的收藏界面
      .state('collect',{
        url: '/collect',
        templateUrl: 'view/me/me_collect.html',
        controller: 'MeCollectCtrl'

      })
      // 针对每一个宠物的页面
      .state('tab.dog.detail',{
        url: '/detail/:dogId',
        views:{
          'tab-dog-detail':{
            templateUrl: 'view/dog/dog_detail.html',
            controller: 'DogDetailCtrl'
          }
        }
      })
      //每一个具体功能的页面
      .state('tab.dog.detail.function',{
        url:'/detail/function',
        views:{
          'tab-dog-detail-function':{
            templateUrl:'view/dog/dog_detail_function.html'
          }

        }
      })
      //添加宠物狗
      .state('adddog',{
        url:'/adddog',
        templateUrl: 'view/dog/dog_add_dog.html',
        controller: 'AddDogCtrl'
      })
      //论坛中 热门 模块
      .state('tab.post.hot',{
        url:'/hot',
        views:{
          'tab-post-hot':{
            templateUrl: 'view/post/post_hot.html',
            controller:'PostHotCtrl'
          }
        }
      })
      //论坛中 关注 模块
      .state('tab.post.concern',{
        url:'/concern',
        views:{
          'tab-post-concern':{
            templateUrl: 'view/post/post_concern.html',
            controller : 'ConcernCtrl'
          }
        }

      })
      //论坛中 添加关注页面
      .state('addconcern',{
        url:'/addconcern',
        templateUrl: 'view/post/post_add_concern.html',
        controller: 'AddConcernCtrl'
      })
      //欢迎页
      .state('tour',{
        url: '/tour',
        templateUrl : 'view/nav/navigation.html',
        controller: 'NavCtrl'
      })
    //首页面
      .state('index', {
        url:'/index',
        templateUrl: 'view/nav/index.html',
        controller : 'IndexCtrl'
      })
      .state('barDetail', {
        url:'/bar_detail',
        templateUrl:'view/post/bar_detail.html',
        controller:'BarDetailCtrl'
      })
      .state('myPost', {
        url:'/myPost',
        templateUrl:'view/me/my_post.html',
        controller:'MyPostCtrl'
      })
      .state('postDetail', {
        url:'/postDetail/:pId',
        templateUrl:'view/post/post_detail.html',
        controller:'PostDetailCtrl'
      })
      .state('meReply', {
        url:'/meReply',
        templateUrl:'view/me/me_reply.html',
        controller:'MeReplyCtrl'
      })
      .state('meSetting',{
        url: '/meSetting',
        templateUrl : 'view/me/me_setting.html'
        // controller:'meSetting'
      })
      .state('introduction',{
        url:'/introduction',
        templateUrl: 'view/me/me_introduction.html',
        controller:'MeIntroCtrl'
      })
      .state('petLog', {
        url:'/petLog/:pId',
        templateUrl:'view/dog/dog_log.html',
        controller:'PetLogCtrl'
      })
    // 默认进入欢迎页
    $urlRouterProvider.otherwise('/index');

  });
  return app
})
