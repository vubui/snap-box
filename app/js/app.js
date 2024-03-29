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
}


$( window ).ready(function() {
	positionBtn();
});
$( window ).resize(positionBtn);