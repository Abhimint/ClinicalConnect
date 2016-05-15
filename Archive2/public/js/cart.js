// shopping cart
function cartItem(product_id, name, price, quantity){
	this.product_id = product_id;
	this.name = name,
	this.price = price * 1;
	this.quantity = quantity * 1;
}

function Cart(cartName){
	this.cartName = cartName;
	this.clearCart = false;
	this.checkoutParameters = {};
	this.items = [];

	this.loadItems();

	var self = this;
	$(window).unload(function(){
		if(self.clearCart){
			self.clearItems();
		}
		self.saveItems();
		self.clearCart = false;
	});
}

Cart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.product_id != null && item.name != null && item.price != null && item.quantity != null) {
                    item = new cartItem(item.product_id, item.name, item.price, item.quantity);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}

// save items to local storage
Cart.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
}


// adds an item to Cart
Cart.prototype.addItem = function(product_id, name, price, quantity, quantityInStock){
	quantity = this.toNumber(quantity);

	if(quantity > quantityInStock){
		alert("You Suck! We're out of stock!");
	}

	if (quantity != 0){
		// TODO: update quantity for existing items

		var found = false;
		for (var i=0; i < this.items.length && !found; i++){
			var item = this.items[i];
			if (item.product_id == product_id){

				found = true;
				item.quantity = this.toNumber(item.quantity)+quantity;
			}
		}

		// new item, add to cart

		if (!found){
			var item = new cartItem(product_id, name, price, quantity);
			this.items.push(item);
		}

		// save to localStorage

		this.saveItems();
	}

}

Cart.prototype.getTotalPrice = function(product_id){
	var total = 0;
	for (var i=0; i < this.items.length; i++){
		var item = this.items[i];
		if (product_id == null || item.id == product_id){
			total += this.toNumber(item.quantity * item.price);
		}
	}
	return total;
}

Cart.prototype.getTotalCount = function(product_id){
	var count = 0;
	for (var i=0; i < this.items.length; i++){
		var item = this.items[i];
		if (product_id == null || item.id == product_id){
			count += this.toNumber(item.quantity);
		}
	}
	return count;
}

Cart.prototype.removeItems = function(product_id){
	for(var i = 0; i < this.items.length; i++){
		if(this.items[i].product_id === product_id)
		{
			this.items.splice(i,1);
			break; // this just ensures that we don't continue to loop through the elements
		}
	}
	this.saveItems();
}

Cart.prototype.removeItem = function(product_id, quantity){
	quantity = this.toNumber(quantity);
	console.log("Removing : " + product_id);

	// TODO: update quantity for existing items

	var found = false;
	for (var i=0; i < this.items.length && !found; i++){
		var item = this.items[i];
		if (item.product_id == product_id){
			found = true;
			item.quantity = this.toNumber(item.quantity)+quantity;
		}
		if(item.quantity === 0){
			this.items.splice(i,1);
			break;
		}
	}
	this.saveItems();
}

Cart.prototype.clearItems = function(){
	this.items = [];
	this.saveItems();
}

Cart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}
