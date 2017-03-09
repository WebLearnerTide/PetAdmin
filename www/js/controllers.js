angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('LoginCtrl', function ($scope, $state, Chats, LoginService, $ionicLoading, VService, LocalStorage) {
    $scope.master = {
      mName:'',
      mPwd:''
    }
    $scope.chat = Chats.get(0)
    $scope.doLogin = function () {
      console.log('master', $scope.master);

      // 输入框的输入信息为空时
      if((VService.isEmpty($scope.master.mName)) || (VService.isEmpty($scope.master.mPwd))){
        $ionicLoading.show({
          template:'名字和密码要输入的哟',
          duration:1000
        })
      } else {
        //调用LoginService的doLogin方法完成登录
        LoginService.doLogin($scope.master, function (resp) {
          console.log('Login', resp)
          var data = resp.data;
          if (data.success) {
            LocalStorage.setObject('LoginUser', data.master);
            LocalStorage.set('isLogin', true);
            LocalStorage.set("firstLogin", false);
            $state.go('tab.home')
          } else {
            $ionicLoading.show({
              template: data.msg,
              duration: 1000
            })
          }
          // $state.go('tab.home')
        }, function (err) {
          $ionicLoading.show({
            template: '失败',
            duration: 1000
          })
        })
      }
    }
    $scope.doRegister = function () {
      //进入注册页面
      $state.go('register')
    }
    $scope.doFind = function () {
      //进入找回密码页面
      $state.go('findpwd')
    }
  })
  .controller('RegisterCtrl',function ($scope,$state,$ionicHistory, RegisterService,$ionicLoading,VService) {

    $scope.message = {
      mName:'',
      mPwd:'',
      msPwd:'',
      mEmail:''
    }


    $scope.registerNow = function () {
      //判断输入框不为空
      if(VService.isEmpty($scope.message.mName) ||  VService.isEmpty($scope.message.mPwd)
        || VService.isEmpty($scope.message.mEmail)){
        $ionicLoading.show({
          template:'都要输入的哟',
          duration:1000
        })
      }
      //规定密码长度不得小于6位
      else if(!VService.isCorrect($scope.message.mPwd)){
        $ionicLoading.show({
          template: '密码0-9位包含字母和数字',
          duration: 1000
        })
      }
      //判断两次密码输入是否一致
      else if(!VService.isEqual($scope.message.mPwd,$scope.message.msPwd)){
        $ionicLoading.show({
          template:'两次输入密码要一致的哟',
          duration:1000
        })
      }
      //判断邮箱格式是否符合条件
      else if(!VService.isEmail($scope.message.mEmail)){
        $ionicLoading.show({
          template: '您输入的邮箱格式不正确',
          duration:1000
        })

      }
      else{
        //注册成功返回登录
        RegisterService.doRegisterOk($scope.message,function (resp) {
          var data = resp.data;
          if (data.success) {
            $ionicHistory.goBack();
          } else {
            $ionicLoading.show({
              template: data.msg,
              duration: 1000
            })
          }
        },function (err) {
          $ionicLoading.show({
            template: '失败',
            duration: 1000
          })
        })
      }
    }
  })
  //找回密码
  .controller('FindpwdCtrl',function ($scope,$state,VService,$ionicLoading) {
    $scope.passwords = {
      m_pwd:'',
      m_rpwd:''
    }
    $scope.doNext = function () {
      //找回密码-输入验证码
      // $state.go('resetpwd')
      if(VService.isEqual($scope.passwords.m_pwd,$scope.passwords.m_rpwd)){
        $ionicLoading.show({
          template: '修改成功',
          duration: 1000
        })
        $state.go('resetpwd');
      }
      else{
        $ionicLoading.show({
          template: '两次密码要一致',
          duration: 1000
        })
      }
    }

  })
  .controller('ResetCtrl',function ($scope,$state) {
    $scope.doBack = function () {
      //找回密码成功返回登录
      $state.go('login')
    }
  })
.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('MeCtrl', function($scope, $stateParams,$ionicLoading, Chats, LocalStorage, MeService) {

  $scope.chat = Chats.get(0);
  $scope.me = LocalStorage.getObject('LoginUser');
  $scope.updateInfo = function () {
    MeService.updateInfo($scope.me, function (resp) {
      $scope.me  = resp;
      LocalStorage.setObject('LoginUser', resp)
    }, function (err) {
      $ionicLoading.show({
        template:err.msg,
        duration:1000
      })
    })
  }
})
  .controller('DogDetailCtrl', function ($scope, $state,$stateParams, DogDetailService) {
    var petId = $stateParams.dogId;
    $scope.pet = {}

    // 获取宠物
    DogDetailService.getPet(petId, function (resp) {
      if (resp.success) {
        $scope.pet = resp.pet;
      }
    }, function (err) {

    })
    // 添加狗狗
    $scope.goToAdd = function () {
      $state.go('adddog')
    }


  })
  .controller('ConcernCtrl', function ($scope,$state) {
    //添加关注贴吧
    $scope.ToaddConcern = function () {
      $state.go('addconcern')
    }
  })
  .controller('AddConcernCtrl',function ($scope, $state) {

    $scope.goBackPost = function () {
      $state.go('tab.post.concern')
    }
  })
  /**添加狗狗Ctrl*/
  .controller('AddDogCtrl', function ($scope,$ionicLoading,$ionicHistory, AdddogService, $state, VService, LocalStorage) {
    $scope.dog = {
      pNickname:'',
      pGender:'男狗狗',
      pBirth:'',
      pAdoptdate:'',
      pPetclass:'',
      mId:'',
      petcId:''
    }
    $scope.$on('selectPetClass', function (e, d) {
      console.log('select', d);
      $scope.dog.petcId = d.petcId;
    })
    $scope.doAddDog = function () {
      var loginUser = LocalStorage.getObject('LoginUser');
      if (LocalStorage.get('isLogin', false) && !VService.isObjectEmpty(loginUser)) {
        $scope.dog.mId = loginUser.mId;
      } else {
        $ionicLoading.show({
          template: '您需要登陆哦',
          duration: 1000
        })
        $state.go('login');
        return
      }
      //判断狗的性别
      $scope.dog.pGender = $scope.dog.pGender=='男狗狗'?1:0
      if (VService.isEmpty($scope.dog.petcId)) {
        $ionicLoading.show({
          template: '请选择犬种',
          duration: 1000
        })
        return
      }
      AdddogService.doAddDog($scope.dog,function (resp) {
        var data = resp.data;
        if (data.success) {
          $ionicHistory.goBack()
        } else {
          $ionicLoading.show({
            template: data.msg,
            duration: 1000
          })
        }
      },function (err) {
        $ionicLoading.show({
          template: '失败',
          duration: 1000
        })
      })
    }

    $scope.changeGander = function () {
      console.log('gender', $scope.dog)
    }

    // timepicker 回调
    $scope.callback = function (result) {
      $scope.dog.birth = result;
      console.log('dog', $scope.dog)
    }
  })

.controller('DogIndexCtrl', function ($scope, $state,$ionicPopup, $ionicLoading,LocalStorage, DogIndexService) {
  $scope.goToAdd = function () {
    $state.go('adddog')
  }

  $scope.showPopup = function() {
    $scope.data = {}

    // 自定义弹窗
    var myPopup = $ionicPopup.show({
      template: '<center>客官，加个小宠物呗？</center>',
      title: '添加宠物',
      scope: $scope,
      buttons: [
        { text: '不了',
          type:'button-assertive',
         onTap: function (e) {
           $state.go('tab.home')
         }},
        {
          text: '好的',
          type: 'button-positive',
          onTap: function(e) {
            $state.go('adddog')
          }
        },
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  $scope.pets = []
  var loginUser = LocalStorage.getObject("LoginUser");

  $scope.getDogsTabs = function () {
    console.log('调用加载tab')
    var mId = loginUser.mId;
    DogIndexService.getDogs(mId, function (resp) {
      if (resp.success) {
        if (resp.petList.length != 0) {
          $scope.pets = resp.petList;
          $state.go('tab.dog.detail', {dogId:$scope.pets[0].petId});
        } else {
          $scope.showPopup();

        }

      }
    }, function (err) {
      // $scope.showConfirm();
      $scope.showPopup();
    })
  }
})
;
