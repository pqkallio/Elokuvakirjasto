MovieApp.controller('NewMovieController', function($scope, MovieService, $location) {
    $scope.addMovie = function() {
        MovieService.addMovie({
            'name': $scope.name,
            'director': $scope.director,
            'year': $scope.year,
            'description': $scope.description
        });
        
        $scope.name = '';
        $scope.director = '';
        $scope.year = '';
        $scope.description = '';
        
        $location.path('/');
    };
});