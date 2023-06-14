(function(){
	'use strict';
	
	angular.module('renameThisPlease', [])
	
	.controller('renameThisController', function($scope) {
		$scope.name = 'Branko';
		$scope.sayHello = function () {
			return "Hello studs!";
		}
	});
})();
