(function(){
	'use strict';
	
	angular.module('nameCalculator', []).controller('calculatorController', ['$scope', '$filter', calculatorController]); 
	
	function calculatorController($scope, $filter) {
		$scope.name = '';
		
		$scope.sum = function () {
			var totalNameValue = 0;
			
			for (var i = 0; i < $scope.name.length; i++) {
				totalNameValue += $scope.name.charCodeAt(i);
			}
			return totalNameValue;
		}
		
		$scope.upper = function() {
			var upCase = $filter('uppercase');
			$scope.name = upCase($scope.name);
		}
	}
})();
