(function(){
	'use strict';

	angular.module('newsApp', [])
	.controller('newsController', newsController)
	.controller('oldsController', oldsController)
	.service('newsService', newsService)
	.directive('newsItem', newsItemDirective)
	.directive('comments', commentsDirective);
	
	function commentsDirective() {
		var ddo = {
			templateUrl: 'comments-template.html',
			restrict: 'E'
		};
		
		return ddo;
	};
	
	function newsItemDirective() {
		var ddo = {
			scope: {
				story: '=itemid',
				title: '@heading' // just to demonstrate the diff between @ and =
			},
			template: `
				<h3>{{title}}</h3> 
				
				<div class=\"story\">{{story.body}}</div>
			`,
			restrict: 'E'
		};
		return ddo;
	};
	
	newsController.$inject = ['$scope', 'newsService'];
	function newsController($scope, newsService){
		var ct = this;
		ct.news = newsService.news.items[0];
		$scope.title = ct.news.title;
		$scope.item = {
			title: ct.news.title,
			body: ct.news.story,
			comments: ct.news.comments
		};
		
		ct.newComment = '';
		
		ct.addComment = function() {
			newsService.addComment(0, ct.newComment);
			ct.newComment = '';
		}
		
		console.log(ct);
	};
	
	oldsController.$inject = ['$scope', 'newsService'];
	function oldsController($scope, newsService){
		var ct = this;
		ct.news = newsService.news.items[1];
		$scope.title = ct.news.title;
		$scope.item = {
			title: ct.news.title,
			body: ct.news.story,
			comments: ct.news.comments
		};
		
		ct.newComment = '';
		
		ct.addComment = function() {
			newsService.addComment(1, ct.newComment);
			ct.newComment = '';
		}
	};
	
	function newsService(){
		var sv = this;
		var startidx = 0;
		
		sv.news = {
			items: [
				{
					id: startidx++,
					title: 'item 1',
					story: 'story 1',
					comments: [{text: 'cool story, bro', date: '2023-05-01'},{text: 'turgid tale, comrade', date: '2023-07-03'}]
				},
				{
					id: startidx++,
					title: 'item 2',
					story: 'story 2',
					comments: [{text: 'sus story, sis', date: '2023-06-02'}]
				}
			],
		};
		
		sv.addComment = function(idx, comment) {
			if (sv.news.items[idx] !== undefined && comment !== undefined && comment !== '') {
				var now = new Date();
				var commentObj = {text: comment, date: now.toISOString().substr(0,10)};
				sv.news.items[idx].comments.push(commentObj);
			}
		};
	};

})();