(function(){
	'use strict';
	
	angular.module('itemDiet', []).controller('dietController', dietController); 
	
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
			$scope.splitter();

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
			
			if (sum > 0 && sum < 4) {
				$scope.resultType = 'good';
				$scope.resultMsg = 'Enjoy!';				
			}
			
			if (sum > 3) {
				$scope.resultType = 'bad';
				$scope.resultMsg = 'Too much!';
			}
		}
		
		$scope.splitter = function () {
			var pattern = /\s*,\s*/g;
			var trimmedListString = $scope.itemListString.replace(pattern, ',');
			$scope.items = trimmedListString.split(',').filter(n => n);
			console.log($scope.items);
		}
		
		$scope.fillField = function(e) {
			$scope.itemListString = e.target.innerText;
		}
	}
})();
