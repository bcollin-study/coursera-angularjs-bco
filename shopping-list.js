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
	
	function shoppingListService() {
		var service = this;
		var items = [];
		
		service.init = function() {
			items = shoppingList2;
		};
		
		service.addItem = function(item, qty) {
			var item = {
				name: item,
				qty: qty
			};
			items.push(item);
		};
		
		service.removeItem = function(idx) {
			items.splice(idx, 1);
		};
		
		service.getItems = function() {
			return items;
		};
		
		service.getItem = function(idx) {
			return items[idx];
		};
		
		service.setItem = function(idx, val) {
			items[idx] = val;
			console.log(items);
		}
	}
	
	console.log(numberList.filter(removeSmallerThanFive));
	
	console.log('Filtered for ' + searchValue + ', product list = ', shoppingList1.filter(containsFilter));

	angular.module('shoppingList', [])
	.controller('shoppingListController', shoppingListController)
	.controller('shoppingListAddController', shoppingListAddController)
	.controller('parentController', parentController)
	.controller('child1Controller', child1Controller)
	.controller('child2Controller', child2Controller)
	.service('shoppingListService', shoppingListService);
	
	shoppingListController.$inject = ['shoppingListService'];
	function shoppingListController(shoppingListService) {
		var show = this;
		
		show.shoppingList1 = shoppingList1;
		shoppingListService.init();
		show.shoppingList2 = shoppingListService.getItems();
		console.log('Initial shopping list: ', show.shoppingList2);
		
		show.multiplier = function(val) {
			if (val > 1) { return 's'; }
		};
		
		show.removeItem = function(idx) {
			shoppingListService.removeItem(idx); 
		};
	}
	
	shoppingListAddController.$inject = ['shoppingListService'];
	function shoppingListAddController(shoppingListService) {
		console.log('Service: ', shoppingListService);
		var ia = this;
		
		ia.newItem = '';
		ia.newQty = '';
		
		ia.firstQty = shoppingListService.getItem(0).qty;
		
		ia.addItem = function(){
			if ( ia.newItem !== '') {
				if (ia.newQty === '') { ia.newQty = '1'; }
				shoppingListService.addItem(ia.newItem, ia.newQty);
			}
		}
		
		ia.setFirstQty = function() {
			item = shoppingListService.getItem(0);
			item.qty = ia.firstQty;
			shoppingListService.setItem(0, item);
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