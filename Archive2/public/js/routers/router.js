// router code lives here

ccApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'ccAppController'
        }).when('/product/:id', {
            templateUrl: 'templates/product.html',
            controller: 'ccAppController'
        }).when('/cart', {
            templateUrl: 'templates/cart.html',
            controller: 'ccAppController'
        }).otherwise({
            redirectTo: '/'
        });
});
