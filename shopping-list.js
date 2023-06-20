(function(){
	'use strict';

	var shoppingList1 = ['apple', 'pear', 'strawberry'];
	
	var shoppingList2 = [
			{name: 'giant table', qty: '1'},
			{name: 'spoon', qty: '50'},
			{name: 'fork',  qty: '30'},
			{name: 'knife', qty: '70'},
			{name: 'plate', qty: '50'},
		];

	angular.module('shoppingList', [])
	.controller('shoppingListController', shoppingListController);
	
	shoppingListController.$inject = ['$scope'];
	function shoppingListController($scope) {
		$scope.shoppingList1 = shoppingList1;
		$scope.shoppingList2 = shoppingList2;
		$scope.newItem = '';
		
		$scope.addItem = function(){
			if ( $scope.newItem !== '') {
				var count = $scope.shoppingList2.length;
				$scope.shoppingList2[count] = { name: $scope.newItem, qty: 50 };
			}
		}
		
		$scope.multiplier = function(val) {
			if (val > 1) { return 's'; }
		}
	}
	
	
})()