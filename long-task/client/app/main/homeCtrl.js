(function () {
  angular.module('web-server')
    .controller('homeCtrl', ['user', 'socketSvc', 'toastr', homeCtrl]);

  function homeCtrl(user, socketSvc, toastr) {
    var ctrl = this;

    ctrl.user = user;

    ctrl.count = 1;
    ctrl.host = '127.0.0.1';

    ctrl.output = '';

    ctrl.triggerPing = function () {
      socketSvc.emit('start:ping', {
        count: ctrl.count,
        host: ctrl.host
      });
      toastr.info('Ping has been initiated!');
    };

    socketSvc.on('ping:success', function (output) {
      toastr.success('Ping has successfully completed!');
      ctrl.output = output;
    });

    socketSvc.on('ping:error', function (message) {
      toastr.error('Ping has failed!');
      ctrl.output = message;
    });
  }
})();
