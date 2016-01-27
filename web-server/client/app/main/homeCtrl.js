(function(){
  angular.module('web-server')
    .controller('homeCtrl', ['user', homeCtrl]);

    function homeCtrl(user) {
      var ctrl = this;

      ctrl.user = user;
    }
})();
