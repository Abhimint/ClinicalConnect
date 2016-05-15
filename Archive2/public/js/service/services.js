// create a data service that provides a store and a shopping cart
// that will be shared with all the views

ccApp.factory('DataService', function($resource){

	var products = $resource('/products').query();

	var cart = new Cart("AngularStore");

	return {
		products: products,
		cart: cart
	};

});
