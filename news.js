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
			template: `
				{{poep}}
				<h3>{{story.title}}</h3> 
				
				<div class=\"story\">{{story.story}}</div>
			`,
			restrict: 'E'
		};
		return ddo;
	};
	
	newsController.$inject = ['newsService'];
	function newsController(newsService){
		var ct = this;
		ct.news = newsService.news.items[0];
		ct.title = ct.news.title;
		ct.story = ct.news.story;
		ct.comments = ct.news.comments;
		
		ct.poep = 'poep';
		
		ct.newComment = '';
		
		ct.addComment = function() {
			newsService.addComment(0, ct.newComment);
			ct.newComment = '';
		}
	};
	
	oldsController.$inject = ['newsService'];
	function oldsController(newsService){
		var ct = this;
		ct.news = newsService.news.items[1];
		ct.title = ct.news.title;
		ct.story = ct.news.story;
		ct.comments = ct.news.comments;
		
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