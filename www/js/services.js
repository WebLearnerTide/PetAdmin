angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

  //登录
.factory('LoginService', function ($http) {
  return {
    doLogin:function (master, success, error) {
      $http({
        url:'http://localhost:8080/petServer/user/login',
        method:'GET',
        params:{
          mName:master.mName,
          mPwd:master.mPwd
        }
      }).then(success, error)
    }

  }
})
  .factory('VService', function () {
    return {
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
  })
  //注册
  .factory('RegisterService',function ($http) {
    return{
      doRegisterOk: function (message, success, error) {
        $http(
          {
            url:'http://localhost:8080/petServer/user/register',
            method: 'GET',
            params : message
          }
        ).then(success,error)
      }
    }
  })
  .factory('AdddogService',function ($http) {
    return{
      doAddDog: function (dog, success, error) {
        $http({
          url:'http://localhost:8080/petServer/pet/addpet',
          method:'POST',
          data:{
            petName: dog.pNickname,
            petGender: dog.pGender,
            petBirthStr: dog.pBirth,
            petDateStr: dog.pAdoptdate,
            mId:dog.mId,
            petcId:dog.petcId
            // pPetclass: dog.pPetclass
        }
        }).then(success,error)
      }
    }
  })
  .factory('LocalStorage',['$window',function($window){
    return{
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
  }])
.factory('DogIndexService', ['$http', function ($http) {
  return {
    getDogs:function (mId, success, error) {
      var url = 'http://localhost:8080/petServer/pet/getPetsByMaster/' + mId
      $http.get(url).success(success).error(error);
    }
  }

}])
  .factory('DogDetailService', ['$http', function ($http) {
    return {
      getPet:function (petId, success, error) {
        var url = 'http://localhost:8080/petServer/pet/getById/' + petId
        $http.get(url).success(success).error(error);
      }
    }
  }])
  .factory('MeService',['$http', '$q', function ($http, $q) {
    return {
      updateInfo:function (me, success, error) {
        var defered = $q.defer();
        $http({
          url:'http://localhost:8080/petServer/user/getByMId',
          data:{
            mId:me.mId
          },
          method:'POST'
        }).then(function (resp) {
          var data = resp.data;
          if (data.success) {
            defered.resolve(data.master);
          } else {
            defered.reject(data)
          }
        }, function (err) {
          err.msg = '更新失败'
          defered.reject(err)
        })
        defered.promise.then(success, error)
      }
    }
  }])
