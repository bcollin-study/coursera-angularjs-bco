(function(){
	'use strict';
	
	angular.module('nameCalculator', []).controller('calculatorController', calculatorController).filter('space', spaceFilterFactory); 
	
	calculatorController.$inject = ['$scope', '$filter', 'spaceFilter'];
	function calculatorController($scope, $filter, spaceFilter) {
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
	
	function spaceFilterFactory() {
		return function(input) {
			var out = '';
			for (var i=0; i<input.length; i++) {
				out += input[i];
				out += ' ';
			}
			return out;
		}
	}
})();
