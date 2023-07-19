(function(){
	'use strict';

	angular.module('shoppingList', [])
	.controller('shoppingListController', shoppingListController)
	.service('isHealthyService',isHealthyService)
	.constant('apiURL', 'http://localhost/experiments/healthy-snacks/');

	shoppingListController.$inject = ['$scope', '$q', 'isHealthyService'];
	function shoppingListController($scope, $q, isHealthyService) {
		var ctrl = this;
		
		ctrl.itemList = ['potato', 'pea', 'carrot'];
		
		ctrl.whiteList = ['empty'];
		
		ctrl.getWhiteList = function(){
			var promise = isHealthyService.getWhiteList();
			promise
			.then(function(response){
				console.log(response.data);
				if (response.data.whitelist !== undefined && Array.isArray(response.data.whitelist)) {
					ctrl.whiteList = response.data.whitelist;
				}
			})
			.catch(function(reason){
				ctrl.error = 'Error: ' + reason;
			});
		}();
		
		ctrl.addItem = function() {
			ctrl.error = '';
			if (ctrl.newItem !== '') {
				var promise = isHealthyService.checkSnack(ctrl.newItem);
//				console.log(promise);
				promise.then(function(result){
					console.log(result.data);
					if (result.data.error === '') {
						if (result.data.result === 'OK') {
							ctrl.itemList.push(ctrl.newItem);
						} else {
							ctrl.error = ctrl.newItem.charAt(0).toUpperCase() + ctrl.newItem.substr(1) + ' is a bad snack!';
						}
					}
					else {
						ctrl.error = 'Error: ' + result.data.error + '. I have added the item with a warning!';
						ctrl.itemList.push(ctrl.newItem + ' (BAD SNACK?)');
					}
					ctrl.newItem = '';
				}).catch(function(reason){
					ctrl.error = 'Server could not be reached. I have added the item with a warning!';
					ctrl.itemList.push(ctrl.newItem + ' (BAD SNACK?)');
					ctrl.newItem = '';
				});
			}
		};
		
		ctrl.removeItem = function(idx) {
			if (undefined !== ctrl.itemList[idx]) {
				ctrl.itemList.splice(idx, 1);
			}
		};
		
		ctrl.copyItem = function(idx) {
			if (undefined !== ctrl.itemList[idx]) {
				ctrl.itemList.push(ctrl.itemList[idx]);
			}			
		};
		
		ctrl.addWhitelistedItem = function(idx) {
			if (ctrl.whiteList[idx] !== undefined) {
				ctrl.newItem = ctrl.whiteList[idx];
				ctrl.addItem();
			}
		}
	};
	
	isHealthyService.$inject = ['$http', 'apiURL'];
	function isHealthyService($http, apiURL) {
		var url = apiURL;
		// var url = "http://localhost/experiments/healthy-snackz/";
		
		var config = {
			method: "GET",
			url: url,
			params: {key: '01010101', compare: ''}
		};
		
		this.checkSnack = function(snack) {
			config.params.compare = snack;
			var response = $http(config);
			return response;
		};
		
		this.getWhiteList = function() {
			var response = $http(config);
			return response;
		};
	};
	
			
})()