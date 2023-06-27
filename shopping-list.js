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
				throw new Error("Max items (" + maxItems + ") reached, stop adding items or delete some items first.");
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
	.provider('shoppingListService', shoppingListServiceProvider)
	.config(Config);
	
	Config.$inject = ['shoppingListServiceProvider'];
	function Config(shoppingListServiceProvider) {
		shoppingListServiceProvider.config.maxItems = 4;
	}

	shoppingListController.$inject = ['shoppingListService'];
	function shoppingListController(shoppingListService) {
		var ctrl = this;
		
		ctrl.errorMessage = '';
		
		shoppingListService.init();
		ctrl.shoppingList = shoppingListService.getItems();
		
		ctrl.multiplier = function(val) {
			if (val > 1) { return 's'; }
		};
		
		ctrl.removeItem = function(idx) {
			shoppingListService.removeItem(idx); 
		};

		ctrl.newItem = '';
		ctrl.newQty = '';
		
		ctrl.addItem = function(){
			if ( ctrl.newItem !== '') {
				if (ctrl.newQty === '') { 
					ctrl.newQty = '1'; 
					ctrl.errorMessage = '';
				}
				try {
					shoppingListService.addItem(ctrl.newItem, ctrl.newQty);
				} catch (error) {
					ctrl.errorMessage = error.message;
				}
			}
		}
	}
	
	function shoppingListServiceProvider() {
		var provider = this;
		
		provider.config = {
			maxItems: 6
		};

		// This is the factory.
		provider.$get = function () {
			var service = new shoppingListService(provider.config.maxItems);
			return service;
		};
	}
		
})()