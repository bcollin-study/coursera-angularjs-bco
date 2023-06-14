(function(){
	'use strict';
	
	angular.module('nameCalculator', []).controller('calculatorController', calculatorController); 
	
	calculatorController.$inject = ['$scope', '$filter'];
	function calculatorController($scope, $filter) {
		$scope.name = '';
		$scope.light_state = 'off';
		$scope.state_other = 'on';
		
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
