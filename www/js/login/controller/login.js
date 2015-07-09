angular.module('starter.controllers')
.controller('LoginCtrl', function ($scope, $cordovaOauth, $localStorage, $location, getProfile, $state) {	
	

    $scope.login = function() {
     
     var yalogueado = ($localStorage.hasOwnProperty("accessToken") === true);
     if(yalogueado){
        getProfile.getFbProfile().then(function(data){
            $state.go('main');
        })
     }
     else{
        login();
     }
        
    };

    function login(){
        $cordovaOauth.facebook("1665259377039481", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            debugger
            getProfile.getFbProfile();
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    }

})