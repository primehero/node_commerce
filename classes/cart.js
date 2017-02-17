const Product = require("../models/product.js");

// Constructor 
const Cart = function() {
	this.items = [];
	this.numItems = 0;
	this.total = 0;
};

Cart.prototype.isDup = function(id) {
	this.items.forEach((i, indx) => {
		if (i._id === id) {
			return indx;
		}
	});
	return false;
};

Cart.prototype.addItem = function(id, q) {
	return new Promise((resolve, reject) => {
		Product.findById(id, (err, foundItem) => {
			if (err) reject(err);

			var pos = this.isDup(id);

			// If there are no duplicates.
			if ( ! pos ) {
				var shallowItem = foundItem;
				shallowItem.quantity = q;
				this.items.push(shallowItem);
				resolve({ itemName: shallowItem.name, q: q});
			} else {
				this.items[pos].quantity += q;
				resolve({ itemName: items[pos].name, q: q});
			}
			
			this.total += (foundItem.price * q);
			this.numItems += parseInt(q);
		});		
	});

};

Cart.prototype.removeItem = function(id) {
	this.items.forEach(i => {
		if (i._id === id) {
			this.items.splice(i, 1);
		}
	})
};

module.exports = Cart;