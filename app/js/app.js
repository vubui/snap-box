'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

// js hack to position the connect btn on the main page
function positionBtn() {
	var pageHeight = $('.log-in').height();
	var pageWidth = $('.log-in').width();
	
	var $btn = $('#loginDropbox');
	var buttonHeight = $btn.height();
	var buttonWidth = $btn.width();

	$btn.css('margin-top', (pageHeight - buttonHeight)/2);
	$btn.css('margin-left', (pageWidth - buttonWidth)/2);
}


$( window ).ready(function() {
	positionBtn();/*
	$('#basic_example_1').datetimepicker(); */	
});
$( window ).resize(positionBtn);