(function(){
	'use strict';

	var shoppingList1 = ['apple', 'pear', 'strawberry'];
	
	var shoppingList2 = [
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
	}
	
	
})()