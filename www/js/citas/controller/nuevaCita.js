angular.module('starter.controllers')
.controller('nuevaCitaCtrl', ['$scope', '$ionicPopup', 'dataTableStorageFactory', '$ionicLoading', '$rootScope', '$state', '$cordovaDialogs', 'conexionSignalR',
  function ($scope, $ionicPopup, dataTableStorageFactory, $ionicLoading, $rootScope, $state, $cordovaDialogs, conexionSignalR) {
	
	  $scope.slots = [
      {epochTime: 12600, step: 15, format: 12}      
    ];

    $scope.currentDate = new Date();
    $scope.pastDate = new Date(1521199764000);
    $scope.title = 'Fecha cita';
    $scope.time;
    $scope.fecha;
    $scope.habilitarHora;
    $scope.habilitarGuardar;

    var horaSeleccionada;
    var fechaSeleccionada;

    $scope.timePickerCallback = function (val, hourString, time) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        console.log('Selected time is : ', val);        
        $scope.time = hourString;
        horaSeleccionada = time;
        
        if (time.meridian === "AM") {
          fechaSeleccionada.hour(time.hours);
        } else if (time.meridian === "PM") {
          fechaSeleccionada.hour(parseInt(time.hours)+12);
        }

        fechaSeleccionada.minute(time.minutes);
        $scope.habilitarGuardar = true;
      }
    };

    $scope.datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {        
        $scope.fecha = moment(val).format('DD/MM/YY');         
        console.log('Selected date is : ', val)
        fechaSeleccionada = moment(val);
        $scope.habilitarHora = true;
      }

    };

    $scope.solicitarCita = function(){            
       $cordovaDialogs.confirm('Esta seguro de realizar la solicitud de la cita', 'Mensaje de confirmacion', ['Solicitar cita','Cancelar'])
      .then(function(buttonIndex) {
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        var btnIndex = buttonIndex;
        if(btnIndex == 1){
          solicitarCita();
        }
      });
    }

    function solicitarCita(){
      $ionicLoading.show();
      var data = {clinica: JSON.stringify($rootScope.clinica), paciente: JSON.stringify($rootScope.profileData), fecha: fechaSeleccionada};
      data.PartitionKey = $rootScope.clinica.email;
      data.RowKey = $rootScope.profileData.email;
      data.nombreTabla = "TMNuevaCita";      
      dataTableStorageFactory.saveStorage(data).then(success);
    }

    function success(result){
      $ionicLoading.hide();
      
      debugger
      //para, de, tipo, mensaje, accion
      var mensaje = "Nueva cita solicitada";
      conexionSignalR.procesarMensaje($rootScope.clinica.email, $rootScope.profileData.email, 'mensaje', mensaje);

      $state.go("main");

       $cordovaDialogs.alert('La cita ha sido solicitada pronto recibira un correo electronico con la respuesta del profesional de la salud', 'Cita solicitada', 'Aceptar')
       .then(function() {
          // callback success
       });
    }

}])