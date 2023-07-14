(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var b = this;
		
		b.itemList = ShoppingListCheckOffService.buyList;
		
		b.buyItem = function(e) {
			ShoppingListCheckOffService.buyItem(e);
		};
	};
	
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var b = this; 

		b.itemList = ShoppingListCheckOffService.boughtList;		
	};
	
	function ShoppingListCheckOffService() {
		this.buyList = [
			{'name': 'bread', 'qty': 1},
			{'name': 'cheese', 'qty': 1},
			{'name': 'beer', 'qty': 5},
			{'name': 'milk', 'qty': 1},
			{'name': 'apple', 'qty': 10},
			{'name': 'onion', 'qty': 15},
			{'name': 'butter', 'qty': 1},
			{'name': 'potato', 'qty': 25},
			{'name': 'jam', 'qty': 1},
			{'name': 'coffee', 'qty': 1}
		];
		
		this.boughtList = [];
		
		this.buyItem = function (idx) {
			if (this.buyList[idx] !== undefined) {
				this.boughtList[this.boughtList.length] = this.buyList[idx];
				this.buyList.splice(idx,1);
			}
			else {
				console.log('Item does not exist.');
			}
		};			
	};
})();