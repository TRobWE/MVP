angular.module('app')
  .controller('searchCtrl', function () {
    this.searchBar = () => { console.log('HIT ME BABY'); };
  })
  .directive('search', function () {
    return {
      scope: {},
      controller: 'searchCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: './../public/search.html',
    };
  });
