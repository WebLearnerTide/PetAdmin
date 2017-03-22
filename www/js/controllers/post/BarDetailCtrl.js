/**
 * Created by Anker on 2017/3/20.
 */
define([], function () {
  var ctrl = function ($scope,$state, $ionicHistory, $stateParams, BarService, $ionicModal, PostService) {

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.postClasses = [{pcId:-1,pcName:'请选择'}];
      $scope.post = {
        pContent:'',
        pTitle:'',
        postClass:$scope.postClasses[0]
      }
      $scope.bar = BarService.getCurrentBar();
      PostService.getPostClasses(function (data) {
        for (var i in data) {
          $scope.postClasses.push(data[i]);
        }
      })
    })

    $ionicModal.fromTemplateUrl('view/post/add_post.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.callSelect = function () {
      console.log('post', $scope.post)
    }

    $scope.closeNewPost = function() {
      $scope.modal.hide();
    };

    // Open the new post modal
    $scope.openNewPost = function() {
      $scope.modal.show();
    };

    // Perform the add action
    $scope.doAddPost = function() {
      $scope.post.barId = $scope.bar.barId
      $scope.post.pcId = $scope.post.postClass.pcId
      PostService.addPost($scope.post, function () {
        //跳转到我的帖子
      }, function () {
        $state.go('login')
      })
    };

    $scope.goBack = function () {
      $ionicHistory.goBack()
    }
  }
  ctrl.$inject = ['$scope','$state', '$ionicHistory', '$stateParams', 'BarService', '$ionicModal', 'PostService'];
  return ctrl;
})
