MovieApp.service('MovieService', function($firebase) {
    var firebaseRef = new Firebase('https://boiling-inferno-2411.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();
    
    this.getMovies = function() {
        return movies;
    };
    
    this.addMovie = function(movie) {
        if (movie['name'] && movie['director'] 
                && movie['year'] && movie['description'] 
                && movie['name'].length > 0
                && movie['director'].length > 0
                && movie['year'] > 1877
                && movie['description'].length > 0) {
            movies.$add(movie);
        }
    };
    
    this.removeMovie = function(movie) {
        movies.$remove(movie);
    };
    
    this.editMovie = function(movie) {
        movies.$save(movie);
    };
    
    this.getMovie = function(key, done) {
        movies.$loaded(function() {
            done(movies.$getRecord(key));
        });
    };
});