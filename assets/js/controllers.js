angular.module('wheresMyNpr.controllers', [])
  .controller('StationFinderCtrl', ['$scope', '$http', 'geolocation', function($scope, $http, geolocation) {
    $scope.toggleLoading = function() {
      $scope.loading = !$scope.loading;
      $scope.loaded = !$scope.loading;
    };

    $scope.findBestStation = function(params) {
      $scope.bestStation = $scope.errorMessage = null;

      $http.get('/best_station', params).success(function(response) {
        if(!response) {
          $scope.errorMessage = "We couldn't find any member stations in your area.";
        }
        else {
          $scope.bestStation = response;
        }

        $scope.toggleLoading();
      });
    };

    $scope.findByZip = function() {
      $scope.toggleLoading();
      $scope.findBestStation({params: {zipcode: $scope.zipcode}});
    };

    $scope.findByLocation = function() {
      $scope.toggleLoading();

      geolocation.getPosition().then(function(result) {
        if ('error' in result) {
          $scope.toggleLoading();
          $scope.errorMessage = 'There was a problem determining your current geolocation.';

          return;
        }

        $scope.findBestStation({params: result});
      });
    };
  }]);
