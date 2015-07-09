angular.module('starter.controllers')
.controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	
	$scope.profileData = {};

	function inicializar(){
		$scope.profileData = $rootScope.profileData;
	}


	inicializar();
}])