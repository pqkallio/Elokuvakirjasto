describe('Movie list', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
            module('MovieApp');

            FirebaseServiceMock = (function(){
                var movies = [
                    {
                        'name': 'movie1',
                        'director': 'director1',
                        'year': 2001,
                        'description': 'movie1 is awesome'
                    },
                    {
                        'name': 'movie2',
                        'director': 'director2',
                        'year': 2002,
                        'description': 'movie2 is awesome'
                    },
                    {
                        'name': 'movie3',
                        'director': 'director3',
                        'year': 2003,
                        'description': 'movie3 is awesome'
                    },
                    {
                        'name': 'movie4',
                        'director': 'director4',
                        'year': 2004,
                        'description': 'movie4 is awesome'
                    },
                    {
                        'name': 'movie5',
                        'director': 'director5',
                        'year': 2005,
                        'description': 'movie5 is awesome'
                    },
                    {
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
                        movies.push(movie);
                    },

                    removeMovie: function(movie) {
                        movies.splice(movies.indexOf(movie), 1);
                    }
                };
            })();

            spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
            spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
            spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
                    // Lisää vakoilijat
                // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

            // Injektoi toteuttamasi kontrolleri tähän
            inject(function($controller, $rootScope) {
              scope = $rootScope.$new();
              // Muista vaihtaa oikea kontrollerin nimi!
              controller = $controller('ListController', {
                $scope: scope,
                MovieService: FirebaseServiceMock
              });
            });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
	it('should list all movies from the Firebase', function(){
            expect(scope.movies.length).toBe(6);
            expect(scope.movies[0].name).toBe('movie1');
            expect(scope.movies[5].name).toBe('movie6');
            expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function(){
            var movie = scope.movies[0];
            scope.removeMovie(movie);
            expect(scope.movies.length).toBe(5);
            expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
	});
});