angular.module('starter.controllers')
.controller('nuevaCitaCtrl', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
	
	  $scope.slots = [
      {epochTime: 12600, step: 15, format: 12}      
    ];

    $scope.currentDate = new Date();
    $scope.pastDate = new Date(1521199764000);
    $scope.title = 'Fecha cita';
    $scope.time;
    $scope.fecha;

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
      }
    };

    $scope.datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {        
        $scope.fecha = moment(val).format('DD/MM/YY');         
        console.log('Selected date is : ', val)
        fechaSeleccionada = moment(val);
      }

    };

}])