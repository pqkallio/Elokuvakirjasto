MovieApp.controller('UserController', function($scope, currentAuth, $location, AuthenticationService, $window) {
    if (currentAuth) {
        $location.path('/movies');
    }
    
    $scope.logIn = function() {
        AuthenticationService.logUserIn($scope.email, $scope.password)
        .then(function() {
            $window.location.reload();
            $location.path('/movies');
        })
        .catch(function() {
            $scope.message = 'Väärä sähköpostiosoite tai salasana!';
        });
    };
    
    $scope.register = function() {
        AuthenticationService.createUser($scope.email, $scope.password)
        .then(function() {
            AuthenticationService.logUserIn($scope.email, $scope.password)
            .then(function() {
                $window.location.reload();
                $location.path('/movies');
            });
        })
        .catch(function() {
            $scope.message = 'Tapahtui virhe! Yritä uudestaan';
        });
    };
});