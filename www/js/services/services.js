/**
 * Service Container
 * Created by Anker on 2017/3/11.
 */
define(function(require){
  'use strict';
  var services = angular.module('starter.services', []);
  services.factory('ServiceUtil', require('services/ServiceUtil'))
  services.factory('MeService', require('services/me/MeService'))
  services.factory('AdddogService', require('services/pet/AdddogService'))
  services.factory('DogDetailService', require('services/pet/DogDetailService'))
  services.factory('DogIndexService', require('services/pet/DogIndexService'))
  services.factory('Chats', require('services/post/ChatsService'))
  services.factory('LoginService', require('services/user/LoginService'))
  services.factory('RegisterService', require('services/user/RegisterService'))
  services.factory('FindpwdService', require('services/user/FindpwdService'))
  services.factory('BarService', require('services/post/BarService'))
  services.factory('PostService', require('services/post/PostService'))
  services.factory('ReplyService', require('services/post/ReplyService'))
  return services;
})
