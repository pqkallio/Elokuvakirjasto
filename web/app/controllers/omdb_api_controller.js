MovieApp.controller('OmdbApiController', function($scope, OmdbApiService, $interval) {
    $scope.movies = '';
    $scope.searchOn = false;
    $scope.searchTime = 0;
    
    $scope.findMovie = function() {
        $scope.searchOn = true;
        $scope.searchTime = 0;
        
        var count = $interval(function() {
            $scope.searchTime++;
        }, 1000);
        
        OmdbApiService.findMovie($scope.name, $scope.year).success(function(movies) {
            $scope.movies = movies['Search'];
            $scope.name = "";
            $scope.year = "";
            $scope.searchOn = false;
            $interval.cancel(count);
            $scope.searchTime = 0;
        });
    };
});