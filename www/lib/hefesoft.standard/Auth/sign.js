angular.module('auth').
  factory('signFactoryService', ['$http', 'urlServicioFactory','transformRequestAsFormPost','$localstorage','tokenService','$q', 'dataTableStorageFactory',
    	function($http, urlServicioFactory, transformRequestAsFormPost, $localstorage, tokenService, $q, dataTableStorageFactory) {

    var signFactory ={}; 

    signFactory.sign = function(item){
		var dfd = $q.defer();
		var urlBase = urlServicioFactory.getUrlBase();
		var data = item;
		data.grant_type = 'password';


		var request = $http({
					method: "post",
					url: urlBase + "token",
					transformRequest: transformRequestAsFormPost,
					data: data
				});
		
		request.success(function(data) {					
			$localstorage.setObject('authorizationData', data);
			$localstorage.setObject('user', item);

			tokenService.setTokenDocument(data.access_token);
			console.log("sign in");
			dfd.resolve(data);
		});

		request.error(function(data){
			dfd.reject(data);
		});

		return dfd.promise;
	
	}

	signFactory.signUp = function(item){
		var dfd = $q.defer();
		var urlBase = urlServicioFactory.getUrlService();
		var data = item;
		data.email = item.username;

		$http.post(urlBase + "SignUp", data).
			success(function (data) {
				
				if(data.Succeeded){
		              dfd.resolve(item);
		          }
		        else{
		        	dfd.reject(data);
		        }
            })
            .error(function (error) {
              dfd.reject(); 
            });

        return dfd.promise; 
	}

	signFactory.validateUser = function(username){
		var def = $q.defer();
        dataTableStorageFactory.existeUsuario('validateUser', {name: username})
          .success(function (data) {
              if(data){
                def.reject();  
               }
              else{
                def.resolve();  
               }
            })
            .error(function (error) {
               def.reject();   
            });

        return def.promise;
	}


	return signFactory;
    
}]);