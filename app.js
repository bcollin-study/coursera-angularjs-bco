(function(){
	'use strict';
	
	angular.module('nameCalculator', [])
	
	.controller('calculatorController', function($scope) {
		$scope.name = '';
		$scope.sum = function () {
			var totalNameValue = 0;
			
			for (var i = 0; i < $scope.name.length; i++) {
				totalNameValue += $scope.name.charCodeAt(i);
			}
			return totalNameValue;
		}
	});
})();
