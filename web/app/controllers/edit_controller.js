MovieApp.controller('EditController', function($scope, currentAuth, MovieService, $routeParams, $location) {
    if (!currentAuth) {
        $location.path('/login');
    }
    
    MovieService.getMovie($routeParams.key, function(data) {
        $scope.movie = data;
        $scope.name = data['name'];
        $scope.director = data['director'];
        $scope.year = data['year'];
        $scope.description = data['description'];
    });
    
    $scope.editMovie = function() {
        if ($scope.name && $scope.director 
                && $scope.year && $scope.description
                && $scope.name.length > 0
                && $scope.director.length > 0
                && $scope.year > 1877
                && $scope.description.length > 0) {
            $scope.movie.name = $scope.name;
            $scope.movie.director = $scope.director;
            $scope.movie.year = $scope.year;
            $scope.movie.description = $scope.description;

            MovieService.editMovie($scope.movie);

            $location.path('/movies/' + $scope.movie.$id);
        }
    };
});