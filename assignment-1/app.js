(function(){
	'use strict';
	
	angular.module('LunchCheck', []).controller('LunchCheckController', dietController); 
	
	dietController.$inject = ['$scope'];
	function dietController($scope) {
		$scope.itemListString = '';
		$scope.items = [];
		$scope.hasError = false;
		$scope.errorMsg = '';
		$scope.hasResult = false;
		$scope.resultType = '';
		$scope.resultMsg = '';
		
		$scope.checkIfTooMuch = function() {
			$scope.items = splitter($scope.itemListString);

			var sum = $scope.items.length;

			$scope.hasError = false;
			$scope.hasResult = false;

			if (sum === 0) {
				$scope.hasError = true;
				$scope.errorMsg = 'Please enter data first';
			}
			
			if (sum > 0) {
				$scope.hasResult = true;
			}
			
			if (sum < 4) {
				$scope.resultType = 'good';
				$scope.resultMsg = 'Enjoy!';				
			}
			
			if (sum > 3) {
				$scope.resultType = 'bad';
				$scope.resultMsg = 'Too much!';
			}
		}
		
		// Trim 'n' split a string.
		function splitter(inString) {
			var pattern = /\s*,\s*/g;
			var trimmedListString = inString.replace(pattern, ',');
			return trimmedListString.split(',').filter(n => n);
		}
		
		// Copy a sample value to the input field.
		$scope.fillField = function(e) {
			$scope.itemListString = e.target.innerText;
		}
	}
})();
