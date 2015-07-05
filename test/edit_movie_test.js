describe('Edit movie', function(){
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
                            movies[0] = movie;
                        }
                    },
                    
                    getMovie: function(key, done) {
                        if (key == 'abc123') {
                            done(movies.slice(0,1)[0]);
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
	      controller = $controller('EditController', {
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
  	* Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should fill the edit form with the current information about the movie', function(){
            expect(scope.name).toBe(scope.movie.name);
            expect(scope.description).toBe(scope.movie.description);
            expect(scope.director).toBe(scope.movie.director);
            expect(scope.year).toBe(scope.movie.year);
            expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
  	});

  	/* 
  	* Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to edit a movie by its name, director, release date and description', function(){
            scope.name = "test name";
            scope.director = "test director";
            scope.year = 1990;
            scope.description = "test description";
            
            scope.editMovie();
            
            var editedMovie = FirebaseServiceMock.getMovies()[0];
            
            expect(editedMovie.name).toBe("test name");
            expect(editedMovie.director).toBe("test director");
            expect(editedMovie.year).toBe(1990);
            expect(editedMovie.description).toBe("test description");
            expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
	});

	/*
	* Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  	* käyttämällä not.toBeCalled-oletusta.
	*/
	it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
            scope.name = '';
            scope.director = "test director";
            scope.year = 1990;
            scope.description = "test description";
            
            scope.editMovie();
            
            var editedMovie = FirebaseServiceMock.getMovies()[0];
            
            expect(editedMovie['name']).toBe('movie1');
            expect(editedMovie['director']).toBe('director1');
            expect(editedMovie['year']).toBe(2001);
            expect(editedMovie['description']).toBe('movie1 is awesome');
            expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
            
            scope.name = 'test name';
            scope.director = "";
            scope.year = 1990;
            scope.description = "test description";
            
            scope.editMovie();
            
            var editedMovie = FirebaseServiceMock.getMovies()[0];
            
            expect(editedMovie['name']).toBe('movie1');
            expect(editedMovie['director']).toBe('director1');
            expect(editedMovie['year']).toBe(2001);
            expect(editedMovie['description']).toBe('movie1 is awesome');
            expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
            
            scope.name = 'test name';
            scope.director = "test director";
            scope.year = null;
            scope.description = "test description";
            
            scope.editMovie();
            
            var editedMovie = FirebaseServiceMock.getMovies()[0];
            
            expect(editedMovie['name']).toBe('movie1');
            expect(editedMovie['director']).toBe('director1');
            expect(editedMovie['year']).toBe(2001);
            expect(editedMovie['description']).toBe('movie1 is awesome');
            expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
            
            scope.name = 'test name';
            scope.director = "test director";
            scope.year = 1990;
            scope.description = "";
            
            scope.editMovie();
            
            var editedMovie = FirebaseServiceMock.getMovies()[0];
            
            expect(editedMovie['name']).toBe('movie1');
            expect(editedMovie['director']).toBe('director1');
            expect(editedMovie['year']).toBe(2001);
            expect(editedMovie['description']).toBe('movie1 is awesome');
            expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
	});
});