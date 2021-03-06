(function () {
  angular.module('web-server', [
  'ngRoute',
  'btford.socket-io',
  'toastr'])
    .config(function (toastrConfig) {
      angular.extend(toastrConfig, {
        extendedTimeOut: 2000,
        maxOpened: 4,
        positionClass: 'toast-top-center',
        preventOpenDuplicates: true
      });
    })
    .run(function () {});
})();
