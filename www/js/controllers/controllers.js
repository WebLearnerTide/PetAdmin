/**
 * Controller Container
 * Created by Anker on 2017/3/11.
 */

define(function (require) {
  'use strict';

  // Controller Container (js/controllers.js)
  var controllers = angular.module('starter.controllers', []);
  controllers.controller('DashCtrl', require('controllers/home/DashCtrl'));
  controllers.controller('IndexCtrl', require('controllers/home/IndexCtrl'));
  controllers.controller('NavCtrl',require('controllers/home/NavCtrl'));
  controllers.controller('NewsCtrl',require('controllers/home/NewsCtrl'));
  controllers.controller('MeCtrl', require('controllers/me/MeCtrl'));
  controllers.controller('MeCollectCtrl', require('controllers/me/MeCollectCtrl'));
  controllers.controller('MeReplyCtrl', require('controllers/me/MeReplyCtrl'));
  controllers.controller('MeIntroCtrl',require('controllers/me/MeIntroCtrl'));
  controllers.controller('MeSettingCtrl',require('controllers/me/MeSettingCtrl'));
  controllers.controller('AddDogCtrl', require('controllers/pet/AddDogCtrl'));
  controllers.controller('DogDetailCtrl', require('controllers/pet/DogDetailCtrl'));
  controllers.controller('DogIndexCtrl', require('controllers/pet/DogIndexCtrl'));
  controllers.controller('PetLogCtrl', require('controllers/pet/PetLogCtrl'));
  controllers.controller('AlbumCtrl', require('controllers/pet/AlbumCtrl'));
  controllers.controller('BaikeCtrl', require('controllers/pet/BaikeCtrl'));
  controllers.controller('BaikeDetailCtrl', require('controllers/pet/BaikeDetailCtrl'));
  controllers.controller('AddConcernCtrl', require('controllers/post/AddConcernCtrl'));
  controllers.controller('PostHotCtrl', require('controllers/post/PostHotCtrl'));
  controllers.controller('ConcernCtrl', require('controllers/post/ConcernCtrl'));
  controllers.controller('BarDetailCtrl', require('controllers/post/BarDetailCtrl'));
  controllers.controller('MyPostCtrl', require('controllers/post/MyPostCtrl'));
  controllers.controller('PostDetailCtrl', require('controllers/post/PostDetailCtrl'));
  controllers.controller('FindpwdCtrl', require('controllers/user/FindpwdCtrl'));
  controllers.controller('LoginCtrl', require('controllers/user/LoginCtrl'));
  controllers.controller('RegisterCtrl', require('controllers/user/RegisterCtrl'));
  controllers.controller('ResetCtrl', require('controllers/user/ResetCtrl'));
  return controllers;
})
