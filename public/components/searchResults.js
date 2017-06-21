app.module('app')
  .controller('searchCtrl', function () {
    // $scope.title =
    this.games = allGames;
    this.results = () => {
    };
  })
  .directive('search', function () {
    return {
      // scope: {},
      controller: 'searchResultsCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: './../searchResults.html',
    };
  });
