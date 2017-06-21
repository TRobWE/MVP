// import igdb from 'igdb-api-node';

// const igdb = require('igdb-api-node').default;

// import igdb from '';

// const client = igdb(process.env.IGDB_KEY);

angular.module('app')
.service('searchNar', function ($http) {
    return {
      searchDar: (query, callback) => {
        console.log(query);
        $http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games', {
          params: {
            field: 'name,summary,release_dates,cover',
            offset: 0,
            limit: 10,
            search: query,
          },
          headers: {
            'X-MASHAPE-KEY': 'E7XAmqA2rzmshBzYfsp4hfSBOgAYp1dyjImjsny1jgPBKH3uin',
          }
        })
          .then((data) => {
            callback(data);
          });
      }
    }
})
  .controller('searchCtrl', function ($scope, searchNar, $http) {
    $scope.testt = function() {
      console.log('THIS IS A TEST');
    }
    $scope.getGameData = function () {
      console.log($scope.data, "adADfAJF");
      $http.get(`/search/${$scope.data}`)
        .then((res) => {
          console.log(res, "HIT ME BABBABBABAY");
        })
        .catch((err) => err);
    };
    $scope.searchBar = (query) => {
      console.log(query);
      searchNar.searchDar(query, (data) => {
        console.log(data);
      })
    };
  })
  .directive('search', function () {
    return {
      // scope: {},
      controller: 'searchCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: './../search.html',
    };
  });

// $http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/games/', {
//   params: {
//     field: 'name,summary,release_dates,cover',
//     offset: 0,
//     limit: 10,
//     'X-MASHAPE-KEY': process.env.IGDB_KEY,
//     search: query,
//   }
// })
// .then(function ({ data }) {
//   if (callback) {
//     callback(data.items);
//   }
// })
// .catch(function ({ data }) {
//   data.error.errors.forEach(function(err) {
//     console.error(err.message);
//   });
// });

// client.games({
//   fields: '*', // Return all fields
//   limit: 5, // Limit to 5 results
//   offset: 15,
//   search: query, // Index offset for results
// }).then((res) => {
//   console.log(res.body)
//   // response.body contains the parsed JSON response to this query
// }).catch((error) => {
//   throw error;
// });

// html to angular to server to api to server back to angular where i can render it to the page
