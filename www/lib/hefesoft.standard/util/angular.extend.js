window.Hefesot = {};
var Hefesoft  = window.Hefesot;

Hefesot.aListado = function(listado){
  	 var esString = (!angular.isUndefined(listado) && listado !== null && typeof listado === 'string');

  	 if(esString){
  	 	listado = JSON.parse(listado);
  	 }

  	 return listado;
  }

Hefesot.convertirListasAString = function(item){
    for (var i in item)
    {
        var n = i.indexOf("arrayHefesoft");
        var m = i.indexOf("objectHefesoft");

        if(n >=0 || m >=0){
            item[i] = JSON.stringify(item[i]);
        }          
    }

    return item;
}

Hefesot.convertirstringAListas = function (item){
    try{
        for (var i in item)
        {
            var nombrePropiedad = i;
            var n = nombrePropiedad.indexOf("arrayHefesoft");
            var m = nombrePropiedad.indexOf("objectHefesoft");

            if(n >=0 || m >=0){
                if(angular.isString(item[i])){
                    item[i] = validarYaEsObjeto(item[i]);
                }
            }          
        }
    }
    catch(ex){
        throw('error al parsear convertirstringAListas' + ex);
    }

    return item;
}


Hefesot.procesarList = function (data){
    if(!angular.isUndefined(data)){
        var esObjeto = (!angular.isUndefined(data) && data !== null && typeof data === 'object');

        if(esObjeto){
            var esArray = (Array.isArray(data));
            if(esArray){
                for (x in data) {
                    var item = data[x];
                    data[x] = Hefesoft.convertirstringAListas(item);
                }               
            }
            else{
                data = Hefesoft.convertirstringAListas(data);
            }
        }
    }

    return data;
}

Hefesot.listTostring = function(elemento, method){
     var aplicarTransformarObjetos = (!angular.isUndefined(elemento) && method === "POST");

     if(aplicarTransformarObjetos){
        var esArray = (Array.isArray(elemento));
        if(esArray){
            for (x in elemento) {
                var data = elemento[x];
                elemento[x] = Hefesot.convertirListasAString(data);
            }               
        }
        else{
            elemento = Hefesot.convertirListasAString(elemento);
        }
    }

    return elemento; 
}

function validarYaEsObjeto(item){

    while(angular.isString(item)){
       item = JSON.parse(item);
    }

    return item;
}

