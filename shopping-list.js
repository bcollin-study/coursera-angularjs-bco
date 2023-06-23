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
	
	function shoppingListService(maxItems) {
		var service = this;
		var items = [];
		
		service.init = function() {
			items = shoppingList2;
		};
		
		service.addItem = function(item, qty) {
			console.log('Max items: ', maxItems);
			if (maxItems === undefined || items.lenght < maxItems) {
				var item = {
					name: item,
					qty: qty
				};
				
				console.log(items);
				items.push(item);
				console.log(items);
			}
			else {
				console.log('number of items exceeds limit');
				throw new Error("Max items (" + maxItems + ") reached, stop adding items!");
			}
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
		}
	}
	
	angular.module('shoppingList', [])
	.controller('shoppingList1Controller', shoppingList1Controller)
	.controller('shoppingList2Controller', shoppingList2Controller)
	.factory('shoppingListFactory', shoppingListFactory);
	
	shoppingList1Controller.$inject = ['shoppingListFactory'];
	function shoppingList1Controller(shoppingListFactory) {
		var ctrl = this;
		var service = shoppingListFactory(3, 'list1');
		
		service.init();
		ctrl.shoppingList = service.getItems();
		
		ctrl.multiplier = function(val) {
			if (val > 1) { return 's'; }
		};
		
		ctrl.removeItem = function(idx) {
			service.removeItem(idx); 
		};

		ctrl.newItem = '';
		ctrl.newQty = '';
		
		ctrl.addItem = function(){
			if ( ctrl.newItem !== '') {
				if (ctrl.newQty === '') { ctrl.newQty = '1'; }
				try {
					service.addItem(ctrl.newItem, ctrl.newQty);
				} catch (error) {
					ctrl.errorMessage = error.message;
				}
			}
		}
	}
	
	shoppingList2Controller.$inject = ['shoppingListFactory'];
	function shoppingList2Controller(shoppingListFactory) {
		var ctrl2 = this;
		var service = shoppingListFactory();
		
		service.init();
		ctrl2.shoppingList = service.getItems();
		
		ctrl2.multiplier = function(val) {
			if (val > 1) { return 's'; }
		};
		
		ctrl2.removeItem = function(idx) {
			service.removeItem(idx); 
		};
		
		ctrl2.newItem = '';
		ctrl2.newQty = '';
		
		ctrl2.addItem = function(){
			if ( ctrl2.newItem !== '') {
				if (ctrl2.newQty === '') { ctrl2.newQty = '1'; }
				service.addItem(ctrl2.newItem, ctrl2.newQty);
			}
		}
		
	}
	
	function shoppingListFactory() {
		var factory = function(maxItems) {
			return new shoppingListService(maxItems);
		};
		
		return factory;
	}
})()