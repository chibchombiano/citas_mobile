angular.module('starter.controllers')
.controller('MainCtrl', function ($scope, $rootScope, inicializarServicios, dataTableStorageFactory, $ionicLoading, $state) {
	
	$scope.profileData = {};
	$scope.clinicas = [];

	$scope.nuevaCita = function(item){
		$rootScope.clinica = item;
		$state.go("nuevaCita");
	}

	function inicializar(){
		$ionicLoading.show();
		if($rootScope.profileData){			
			$scope.profileData = $rootScope.profileData;			
			inicializarServicios.inicializar($scope.profileData.email);
			listarClinicas();
		}
	}

	function listarClinicas(){
		dataTableStorageFactory.getTableByRowKey('TmDatosClinica', 1)
		.success(function(data){
			$scope.clinicas = data;
			$ionicLoading.hide();
		})
		.error(function(err){
			console.log(err);
			$ionicLoading.hide();
		})
	}


	inicializar();
})