MovieApp.service('AuthenticationService', function($firebase, $firebaseAuth) {
    var firebaseRef = new Firebase('https://boiling-inferno-2411.firebaseio.com');
    var firebaseAuth = $firebaseAuth(firebaseRef);
    
    this.logUserIn = function(email, password) {
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
    };
    
    this.logUserOut = function() {
        firebaseAuth.$unauth();
    };
    
    this.getUserLoggedIn = function() {
        return firebaseAuth.$getAuth();
    };
    
    this.createUser = function(email, password) {
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });
    };
    
    this.checkLoggedIn = function() {
        return firebaseAuth.$waitForAuth();
    };
});