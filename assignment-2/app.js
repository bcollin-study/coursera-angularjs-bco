(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
	.filter('nameFilter', nameFilter);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var b = this;
		
		b.itemList = ShoppingListCheckOffService.buyList;
		
		b.buyItem = function(e) {
			ShoppingListCheckOffService.buyItem(e);
			ShoppingListCheckOffService.data.counter++;
		};
	};
	
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var b = this; 

		b.itemList = ShoppingListCheckOffService.boughtList;

		b.data = ShoppingListCheckOffService.data;
	};
	
	function ShoppingListCheckOffService() {
		this.buyList = [
			{'name': 'bread', 'name_plural': 'loaves of bread', 'qty': 1},
			{'name': 'cheese', 'name_plural': 'cheeses', 'qty': 1},
			{'name': 'beer', 'name_plural': 'beers', 'qty': 5},
			{'name': 'milk', 'name_plural': 'cartons of milk', 'qty': 1},
			{'name': 'apple', 'name_plural': 'apples', 'qty': 10},
			{'name': 'onion', 'name_plural': 'onions', 'qty': 15},
			{'name': 'butter', 'name_plural': 'packs of butter', 'qty': 1},
			{'name': 'potato', 'name_plural': 'potatoes', 'qty': 25},
			{'name': 'jam', 'name_plural': 'jars of jam', 'qty': 1},
			{'name': 'coffee', 'name_plural': 'coffees', 'qty': 1}
		];
		
		this.boughtList = [];
		
		this.buyItem = function (idx) {
			if (this.buyList[idx] !== undefined) {
				// As I was rereading the assignment to see if I had
				// missed anything, I realised that there is literally
				// a push method for arrays. Anyway, this works too.
				this.boughtList[this.boughtList.length] = this.buyList[idx];
				this.buyList.splice(idx,1);
			}
			else {
				console.log('Item does not exist.');
			}
		};

		this.data = {counter: 0};
	};
	
	function nameFilter() {
		return function(input) {
			if (input.qty === 1) {
				return input.name;
			}
			else {
				return input.name_plural;
			}
		};
	};
})();