var app = angular.module('AngularUIBucketApp', [
    "ngRoute",
    "ngTouch",
    "mobile-angular-ui",
    "firebase"
]);

app.controller('MainController', ['$scope','$firebaseSimpleLogin','$location','$rootScope',
    function($scope,$firebaseSimpleLogin,$location,$rootScope) {

        var ref = new Firebase("https://burning-fire-1723.firebaseio.com");
        var auth = $firebaseSimpleLogin(ref);

        // Initialized the user object
        $scope.user = {
            username: "",
            password: ""
        };

	$scope.logout = function() {
    $scope.loggedIn = false;   // to toggle display of SignUp/Logout
    $scope.user = {            // re init the user object
        username: "",
        password: ""
    };
    $location.path('/');       // redirect to home page after logout    
}

var login={};

$scope.login=login;

$scope.showSignUp = function() {
    $scope.user = {            // re init the user object
        username: "",
        password: ""
    };
    $location.path('/signUp'); // redirect to SignUp page 
}

$scope.showSignIn = function() {
    $rootScope.toggle('myOverlay', 'off');
    $scope.user = {
        username: "",
        password: ""
    };
    $location.path('/');
}

$scope.signUp = function() {
    login.loading = true;
    var email = $scope.user.username;
    var password = $scope.user.password;
    
    if (email && password) {
		// if non-empty email and password
        auth.$createUser(email, password)
            .then(function(user) {
                // do things if success
                console.log(user);
                login.loading = false;
		$scope.signUpMessage = "User Registration Successful. Please SignIn :)";
		$rootScope.toggle('myOverlay', 'on');
            }, function(error) {
                // do things if failure
                login.loading = false;
                console.log(error);
            });
    }
}

        // Sign In auth function
        $scope.signin = function() {
	login.loading = true;
	console.log('m dsd');
    var email = $scope.user.username;
    var password = $scope.user.password;
    if (email && password) {
	console.log('me in');
        // Sign In Logic
        auth.$login('password', {
                email: email,
                password: password
            })
            .then(function(user) {
                // On success callback
		login.loading = false;
                console.log('Username and password found');
		$scope.loggedIn = true;
                $scope.userEmailId = user.email;
$location.path('/userHome');
            }, function(error) {
                // On failure callback
                login.loading = false;
                console.log('Username and password not found');
            });
    }
}

    }
]);

app.directive('uiLadda', [function () {
    return {
        link: function(scope, element, attrs) {
            var Ladda = window.Ladda, ladda = Ladda.create(element[0]);
            scope.$watch(attrs.uiLadda, function(newVal, oldVal){
		if(newVal){
			ladda.start();			
		}
		else{
			ladda.stop();
		}
            });
        }
    };
}]);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: "signIn.html"
    });
    $routeProvider.when('/userHome', {
    templateUrl: 'userHome.html'
});
    $routeProvider.when('/signUp', {
    templateUrl: 'signUp.html'
});
});
