MovieApp.controller('ListController', function($scope, MovieService) {
    $scope.movies = MovieService.getMovies();
    
    $scope.removeMovie = function(movie) {
        MovieService.removeMovie(movie);
    };
});