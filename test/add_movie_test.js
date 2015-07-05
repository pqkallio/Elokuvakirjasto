describe('Add movie', function(){
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
              controller = $controller('NewMovieController', {
                $scope: scope,
                MovieService: FirebaseServiceMock
              });
            });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
            scope.addMovie({
                'name': 'movie7',
                'director': 'director7',
                'year': 2007,
                'description': 'movie7 is awesome'
            });
            
            expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
	});
    

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
            scope.addMovie({
                'director': 'director7',
                'year': 2007,
                'description': 'movie7 is awesome'
            });
            
            expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
            expect(FirebaseServiceMock.getMovies().length).toBe(6);
            
            scope.addMovie({
                'name': 'movie7',
                'year': 2007,
                'description': 'movie7 is awesome'
            });
            
            expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
            expect(FirebaseServiceMock.getMovies().length).toBe(6);
            
            scope.addMovie({
                'name': 'movie7',
                'director': 'director7',
                'description': 'movie7 is awesome'
            });
            
            expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
            expect(FirebaseServiceMock.getMovies().length).toBe(6);
            
            scope.addMovie({
                'name': 'movie7',
                'director': 'director7',
                'year': 2007,
            });
            
            expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
            expect(FirebaseServiceMock.getMovies().length).toBe(6);
	});
});