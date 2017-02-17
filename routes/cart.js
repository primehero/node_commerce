const routes = require("express").Router();
const Product = require("../models/product.js");


// SHOW CART route
routes.get("/", (req, res) => {
	res.render("cart");
});

// ADD TO CART route
routes.get("/:id", (req, res) => {
	req.app.locals.cart.addItem(req.params.id, req.query.q)
	.then(o => {
		req.flash("success", "Added " + o.itemName + " to your cart.");
		res.redirect("/products");
	})
	.catch((err) => {
		console.error(err);
	});
})

module.exports = routes;
