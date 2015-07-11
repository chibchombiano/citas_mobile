angular.module('starter.controllers')
.controller('nuevaCitaCtrl', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
	
	  $scope.slots = [
      {epochTime: 12600, step: 15, format: 12}      
    ];

    $scope.currentDate = new Date();
    $scope.pastDate = new Date(1521199764000);
    $scope.title = 'Fecha cita';

    $scope.timePickerCallback = function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        console.log('Selected time is : ', val);
      }
    };

    $scope.datePickerCallback = function (val) {
      console.log('ionic-datepicker callback');

      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val)
      }

    };

}])