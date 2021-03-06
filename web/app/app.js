var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

MovieApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'ListController',
        templateUrl: 'app/views/list.html'
    })
    .when('/movies', {
        controller: 'ListController',
        templateUrl: 'app/views/list.html'
    })
    .when('/movies/new', {
        controller: 'NewMovieController',
        templateUrl: 'app/views/new_movie.html',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkLoggedIn();
            }
        }
    })
    .when('/movies/:key', {
        controller: 'ShowController',
        templateUrl: 'app/views/show.html'
    })
    .when('/movies/:key/edit', {
        controller: 'EditController',
        templateUrl: 'app/views/edit.html',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkLoggedIn();
            }
        }
    })
    .when('/omdb_search', {
        controller: 'OmdbApiController',
        templateUrl: 'app/views/omdb_search.html'
    })
    .when('/login', {
        controller: 'UserController',
        templateUrl: 'app/views/login.html',
        resolve: {
            currentAuth: function(AuthenticationService) {
                return AuthenticationService.checkLoggedIn();
            }
        }
    })
    .otherwise({
        redirectTo: '/'
    });
});

MovieApp.run(function(AuthenticationService, $rootScope, $window) {
    $rootScope.logOut = function() {
        AuthenticationService.logUserOut();
        $window.location.reload();
    };
    
    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});

MovieApp.directive('publicationyear', function() {
    var now = new Date();
    var thisYear = now.getFullYear();
    
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.year = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(viewValue)) {
                    return true;
                }
                
                if (parseInt(viewValue) < 1878) {
                    return false;
                }
                
                if (parseInt(viewValue) > thisYear) {
                    return false;
                }
                
                return true;
            };
        }
    };
});