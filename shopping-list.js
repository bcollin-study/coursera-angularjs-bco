(function(){
	'use strict';

	var shoppingList1 = ['apple', 'pear', 'strawberry', 'cherry', 'grape'];
	
	var shoppingList2 = [
			{name: 'giant table', qty: '1'},
			{name: 'spoon', qty: '50'},
			{name: 'fork',  qty: '30'},
			{name: 'knife', qty: '70'},
			{name: 'plate', qty: '50'},
		];

	var numberList = [0,1,2,3,4,5,6,7,8,9];
	
	var removeSmallerThanFive = function(value) {
		return value > 5;
	}
	
	var searchValue = 'apple';
	function containsFilter(value) {
		return value.indexOf(searchValue) !== -1; 
	}
	
	console.log(numberList.filter(removeSmallerThanFive));
	
	console.log('Filtered for ' + searchValue + ', product list = ', shoppingList1.filter(containsFilter));

	angular.module('shoppingList', [])
	.controller('shoppingListController', shoppingListController)
	.controller('parentController', parentController)
	.controller('child1Controller', child1Controller)
	.controller('child2Controller', child2Controller);
	
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
	
	parentController.$inject = ['$scope'];
	function parentController($scope) {
		var parent = this;
		$scope.parentValue = parent.parentValue = 5;
		$scope.pc = this;
		$scope.pc.parentValue = 3;
	}
	
	child1Controller.$inject = ['$scope'];
	function child1Controller($scope) {
		var child1 = this;
		console.log('$scope.parentValue: ', $scope.parentValue);
		console.log('CHILD $scope', $scope);
		$scope.pc.parentValue = 20;
		$scope.parentValue = child1.parentValue = 30;
		
	}
	
	child2Controller.$inject = ['$scope'];
	function child2Controller($scope) {
	}
	
})()