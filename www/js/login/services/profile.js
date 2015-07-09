angular.module('starter.controllers')
.service('getProfile', function ($localStorage, $http, $rootScope, $state, $q) {
	
	var dataFactory = {};


	dataFactory.getFbProfile = function(){
        var deferred = $q.defer();

		 if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                $rootScope.profileData = result.data;
                deferred.resolve(result.data);
            }, function(error) {                
                deferred.reject(error);
            });
        } else {            
            $state.go("login");
        }

        return deferred.promise;
	}


	return dataFactory;
})