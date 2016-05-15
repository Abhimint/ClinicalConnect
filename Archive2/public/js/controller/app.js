// our controllers go here

var ccApp = angular.module('ccApp', ['ngRoute', 'ngResource']); //[] are for dependencies


ccApp.controller('ccAppController', function($scope, $routeParams, DataService){
	// constants
	$scope.headerSrc = 'templates/header.html';

	// fetch product data from server
	$scope.products = DataService.products;
	$scope.cart = DataService.cart;


	allProducts = $scope.products;


	$scope.getProduct = function(id){
		var products = $scope.products;
		for (var i=0; i < products.length; i++){
			if (products[i].id == id){
				$scope.currProduct = products[i];
			}
		}
	};

	$scope.getCategory = function(category_name){

		var products = allProducts;

		var categoryProducts = [];

		if (category_name != ''){
			for (var i=0; i < products.length; i++){
				for (var c=0; c < products[i].categories.length; c++){
					if(products[i].categories[c] == category_name){
						// found products with a category
						console.log('Found products with category: ' + category_name);

						categoryProducts.push(products[i]);

					}
				}
			}
		} else {
			categoryProducts = allProducts;
		}

		$scope.products = categoryProducts;
	}


});
