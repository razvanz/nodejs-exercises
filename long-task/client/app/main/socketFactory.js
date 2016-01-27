(function () {
  angular.module('web-server')
    .factory('socketSvc', function (socketFactory) {
      return socketFactory();
    });
})();
