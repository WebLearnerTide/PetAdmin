/**
 * Created by Anker on 2017/3/11.
 */
define([], function () {
  var factory = function ($http, $q, ServiceUtil) {
    var baseUrl = ServiceUtil.getBaseUrl();
    var verifier = ServiceUtil.getVerifier();
    var ls = ServiceUtil.getLocalStorage();
    var err = {
      msg:'',
      duration:1000,
      toLogin:false
    }
    return{
      doAddDog: function (dog, success, error) {
        var defer = $q.defer();
        var loginUser = ls.getObject('LoginUser');
        if (!ls.get('isLogin', false) || verifier.isObjectEmpty(loginUser)) {
          err.msg = '您需要登陆哦'
          err.toLogin = true
          defer.reject(err)
        } else if (verifier.isEmpty(dog.petcId)) {
          err.msg = '请选择犬种'
          err.toLogin = false
          defer.reject(err)
        } else {
          dog.pGender = dog.pGender=='男狗狗'?1:0;
          $http({
            url: baseUrl + '/pet/addpet',
            method: 'POST',
            data: {
              petName: dog.pNickname,
              petGender: dog.pGender,
              petBirthStr: ServiceUtil.dateFormat(dog.pBirth, 'yyyy-MM-dd'),
              petDateStr: ServiceUtil.dateFormat(dog.pAdoptdate, 'yyyy-MM-dd'),
              mId: loginUser.mId,
              petcId: dog.petcId
              // pPetclass: dog.pPetclass
            }
          }).then(function (resp) {
            var data = resp.data;
            if (data.success) {
              defer.resolve(data);
            } else {
              err.msg = data.msg
              err.toLogin = false
              defer.reject(err)
            }
          }, function (e) {
            err.msg = e.message
            err.toLogin = false;
            defer.reject(err);
          })
        }
        defer.promise.then(success, error);
      }
    }
  }
  factory.$inject = ['$http', '$q', 'ServiceUtil']
  return factory
})
