MovieApp.controller('ShowController', function($scope, MovieService, $routeParams) {
    MovieService.getMovie($routeParams.key, function(data) {
        $scope.movie = data;
    });
});