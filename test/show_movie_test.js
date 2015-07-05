describe('Show movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MovieApp');

    	FirebaseServiceMock = (function(){
                var movies = [
                    {
                        'id': 'abc123',
                        'name': 'movie1',
                        'director': 'director1',
                        'year': 2001,
                        'description': 'movie1 is awesome'
                    },
                    {
                        'id': 'def456',
                        'name': 'movie2',
                        'director': 'director2',
                        'year': 2002,
                        'description': 'movie2 is awesome'
                    },
                    {
                        'id': 'ghi789',
                        'name': 'movie3',
                        'director': 'director3',
                        'year': 2003,
                        'description': 'movie3 is awesome'
                    },
                    {
                        'id': 'jkl012',
                        'name': 'movie4',
                        'director': 'director4',
                        'year': 2004,
                        'description': 'movie4 is awesome'
                    },
                    {
                        'id': 'mno345',
                        'name': 'movie5',
                        'director': 'director5',
                        'year': 2005,
                        'description': 'movie5 is awesome'
                    },
                    {
                        'id': 'pqr678',
                        'name': 'movie6',
                        'director': 'director6',
                        'year': 2006,
                        'description': 'movie6 is awesome'
                    }
                ];

                return {
                    getMovies: function() {
                        return movies;
                    },

                    addMovie: function(movie) {
                        if (movie['name'] && movie['director'] 
                                && movie['year'] && movie['description']
                                && movie['name'].length > 0
                                && movie['director'].length > 0
                                && movie['year'] > 1877
                                && movie['description'].length > 0) {
                            movies.push(movie);
                        }
                    },

                    removeMovie: function(movie) {
                        movies.splice(movies.indexOf(movie), 1);
                    },
                    
                    editMovie: function(movie) {
                        if (movie['id'] && movie['name'] && movie['director'] 
                                && movie['year'] && movie['description']
                                && movie['id'].length > 0
                                && movie['name'].length > 0
                                && movie['director'].length > 0
                                && movie['year'] > 1877
                                && movie['description'].length > 0) {
                            var movieToReplace = movies.filter(function(m) {
                                m.id = movie.id;
                            });
                            
                            movies[movies.indexOf(movieToReplace[0])] = movie;
                        }
                    },
                    
                    getMovie: function(key, done) {
                        if (key == 'abc123') {
                            done(movies[0]);
                        } else {
                            done(null);
                        }
                    }
                };
            })();

            RouteParamsMock = (function(){
                return {
                    key: 'abc123'
                };
            })();

		// Lisää vakoilijat
	    // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
            spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
            spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
            spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
            spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();
            spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('ShowController', {
	        $scope: scope,
	        MovieService: FirebaseServiceMock,
	       	$routeParams: RouteParamsMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/* 
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should show current movie from Firebase', function(){
            expect(scope.movie.name).toBe('movie1');
            expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
	});
});