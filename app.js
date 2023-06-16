(function(){
	'use strict';
	
	angular.module('nameCalculator', []).controller('calculatorController', calculatorController); 
	
	calculatorController.$inject = ['$scope', '$filter'];
	function calculatorController($scope, $filter) {
		$scope.name = '';
		$scope.light_state = 'off';
		$scope.state_other = 'on';
		var costPerChar = .0085; // price of a character in USD.
		$scope.cost = 0;
		
		
		$scope.sum = function () {
			var totalNameValue = 0;
			
			for (var i = 0; i < $scope.name.length; i++) {
				totalNameValue += $scope.name.charCodeAt(i);
			}
			
			$scope.cost = totalNameValue * costPerChar;
			return totalNameValue;
		}
		
		$scope.upper = function() {
			var output = $filter('uppercase')($scope.name);
			$scope.name = output;
		}
		
		$scope.lightToggle = function() {
			if ($scope.light_state === 'on') { 
				$scope.light_state = 'off'; 
				$scope.state_other = 'on';
				} else {
				$scope.light_state = 'on';
				$scope.state_other = 'off';
			}
		}
	}
})();
