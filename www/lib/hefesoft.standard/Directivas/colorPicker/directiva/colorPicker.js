angular.module('directivas').
directive('colorPicker', ['$parse', '$timeout', function ($parse, $timeout) {
	
	var Attr;
	var Element;
	var Scope;

	return {
		require: ['ngModel'],
		restrict: 'E',
		scope: {
			
		},
		templateUrl : 'app/lib/hefesoft.standard/Directivas/colorPicker/templates/colorPicker.html',
		link: function (scope, element, attr, ngModelCtrl) {			
		  
		  var text = $(element[0]).find('.cp-value');
		  var colorPicker = $(element[0]).find('.color-picker');
		  var span = $(element[0]).find('.input-group-addon');

		  
		  
		  $.farbtastic(colorPicker, function(e){
		  	text.val(e);
		  	span.css("background-color", e);
		  	ngModelCtrl[0].$setViewValue(e);		  	
		  });
		  
		  ngModelCtrl[0].$render = function(){
		  	if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
		  		var valor = ngModelCtrl[0].$viewValue;	
		  		text.val(valor);
		  		span.css("background-color", valor);
            }
		  	
		  }
		}
	};
}])