MovieApp.service('OmdbApiService', function($http) {
    this.findMovie = function(name, year) {
        return $http.get('http://www.omdbapi.com', { params: { s: name, y: year } });
    };
});