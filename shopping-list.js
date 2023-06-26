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
			if (maxItems === undefined || items.length < maxItems) {
				var item = {
					name: item,
					qty: qty
				};
				
				items.push(item);
			}
			else {
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
	.controller('shoppingListController', shoppingListController)
	.factory('shoppingListFactory', shoppingListFactory);
	
	shoppingListController.$inject = ['shoppingListFactory'];
	function shoppingListController(shoppingListFactory) {
		var ctrl = this;
		var service = shoppingListFactory(undefined, 'list1');
		
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
	
	function shoppingListFactory() {
		var factory = function(maxItems) {
			return new shoppingListService(maxItems);
		};
		
		return factory;
	}
})()