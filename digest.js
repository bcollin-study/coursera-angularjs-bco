(function(){
	'use strict';
	
	angular.module('theApp', [])
	.controller('theCounterController', theCounterController);
	
	theCounterController.$inject = ['$scope', '$timeout'];
	function theCounterController($scope, $timeout){
		$scope.onceCounter = 1;
		$scope.counter = 0;
		$scope.name = 'say my name';
		$scope.oneway = 'potato';
		$scope.onetime = 'fruit fly';

		console.log($scope);
		
		var addVisitor =  function() {
			$scope.visitorCount++;
		}
		
		$scope.multipleCounter = function() {
			$timeout(function(){
				$scope.counter++;
				console.log('counter incremented');		
			}, 1000);
		}
		
		$scope.$watch(function(){
			console.log('Fired!');
		});
		
	}
	
})();