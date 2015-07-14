angular.module('starter.controllers')
.controller('LoginCtrl', function ($rootScope, $scope, $cordovaOauth, $localStorage, $location, getProfile, $state, signFactoryService, $ionicLoading) {	
	
    $scope.login = function() {
     var item;
     var user;
     $ionicLoading.show();

     var yalogueado = ($localStorage.hasOwnProperty("accessToken") === true);
     if(yalogueado){
        getProfile.getFbProfile().then(function(data){
            registroHefesoft();
        })
     }
     else{
        login();
     }
        
    };

    function login(){        
        $cordovaOauth.facebook("1665259377039481", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;            
            getProfile.getFbProfile().then(function(){
                registroHefesoft();
            })
        }, function(error) {
            $ionicLoading.hide();
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    }


    //Valida que el usuario este en el servicio de hefesoft
    function registroHefesoft(){
        item = $rootScope.profileData;
        user = {username : item.email, password : item.id };        
        signFactoryService.validateUser(user.username).then(registrarUsuario,loguearUsuario);
    }

    function registrarUsuario(data){
        signFactoryService.signUp(user).then(successRegister, error);
    }

    function loguearUsuario(data){        
        signFactoryService.sign(user)
        .then(successLogin, error);
    }

    function successRegister(data){
        signFactoryService.sign(data)
        .then(successLogin, error);        
    }

    function successLogin(data){
        $ionicLoading.hide();
        $state.go('main');
    }

    function error(data){
        console.log(data);
    }

})