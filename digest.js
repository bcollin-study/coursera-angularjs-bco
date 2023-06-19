(function(){
	'use strict';
	
	angular.module('theApp', [])
	.controller('theCounterController', theCounterController);
	
	theCounterController.$inject = ['$scope'];
	function theCounterController($scope){
		$scope.onceCounter = 1;
		$scope.counter = 0;
		$scope.name = 'say my name';

		console.log($scope);
		var addVisitor =  function() {
			$scope.visitorCount++;
		}
		
		$scope.multipleCounter = function() {
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.counter++;
					console.log('counter incremented');		
				});
			}, 1000);
		}
		$scope.$watch(function(){
			console.log('Fired!');
		});
		
	}
	
})();