angular.module('auth')
.controller('signInController', 
	['$scope','signFactoryService','$state', 'users', 'varsFactoryService', 'validarNavegacionService',  '$timeout', 'stripeService', 'inicializarServicios', 'messageService',
	function ($scope, signFactoryService, $state, users, varsFactoryService, validarNavegacionService,  $timeout,  stripeService, inicializarServicios, messageService) {
	
	$scope.loginData= {};	

	$scope.doSign = function(){	
		var data = $scope.loginData;
		signFactoryService.sign(data).then(success, error);
	}

	function success(data){
		 $state.go("app.main");
		 inicializarServicios.inicializar($scope.loginData.username);
	}

	function error(data){
		messageService.notify('Error al ingresar verifique su nombre de usuario y contraseña', 'danger');	
	}

}]);