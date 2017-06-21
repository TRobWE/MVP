angular.module('app')
  .controller('searchResultsCtrl', function ($http) {
    console.log($http);
    // $scope.title =
    this.games = allGames;
    this.results = () => {
    };
    this.getGameData = function () {
      console.log(this.data, "adADfAJF");
      $http.get(`/search/${this.data}`)
        .then((res) => {
          console.log(res, "HIT ME BABBABBABAY");
        })
        .catch((err) => err);
    }
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
