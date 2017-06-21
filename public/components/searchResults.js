angular.module('app')
  .controller('searchResultsCtrl', function ($http) {
    console.log($http);
    // $scope.title =
    this.games = allGames;
    this.results = () => {
    };
  })
  .directive('searchResults', function () {
    return {
      // scope: {},
      controller: 'searchResultsCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: './../searchResults.html',
    };
  });
