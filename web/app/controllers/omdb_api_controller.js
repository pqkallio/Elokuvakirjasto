MovieApp.controller('OmdbApiController', function($scope, OmdbApiService) {
    $scope.movies = '';
    $scope.searchOn = false;
    
    $scope.findMovie = function() {
        $scope.searchOn = true;
        
        OmdbApiService.findMovie($scope.name, $scope.year).success(function(movies) {
            $scope.movies = movies['Search'];
            $scope.name = "";
            $scope.year = "";
            $scope.searchOn = false;
        });
    };
});