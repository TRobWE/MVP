const app = angular.module('app', []);

app.directive('app', function () {
  return {
    scope: {},
    controller: 'appCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '',
  };
});

// app.service()
