(function () {
  angular.module('web-server')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/main/home.html',
          controller: 'homeCtrl',
          controllerAs: 'vm',
          resolve: {
            user: ['$q', '$http', '$location', function ($q, $http, $location) {
              return $http.get('/api/me')
                .then(function (res) {
                  return res.data;
                })
                .catch(function (e) {
                  $location.url('/error');
                  return $q.reject(e);
                });
            }]
          }
        })
        .when('/error', {
          templateUrl: 'app/main/error.html'
        })
        .otherwise({
          redirectTo: '/error'
        });
  }]);
})();
