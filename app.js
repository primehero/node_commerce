const express      = require("express"),
	  app          = express(),
	  mongoose     = require("mongoose"),
	  cookieParser = require("cookie-parser"),
	  session	   = require("express-session"),
	  flash        = require("connect-flash");

const Product     = require("./models/product.js"),
	  seed        = require("./seed.js"),
	  Cart        = require("./classes/cart.js"),
	  indexRoutes = require("./routes"),
	  cartRoutes = require("./routes/cart.js");
	  productsRoutes = require("./routes/products.js");

// Define a new cart
app.locals.cart = new Cart();

mongoose.connect("mongodb://localhost/n_commerce");


app.set("view engine", "ejs");
app.use(cookieParser("secret"));
app.use(session({
	cookie: { maxAge: 60000 },
	saveUninitialized: true,
	resave: 'true',
	secret: 'secet'
}));
app.use(flash());
app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.failure = req.flash("failure");
	next();
});
app.use(express.static("public"));
app.use("/", indexRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productsRoutes);

app.use((req, res, next) => {
	res.locals.cart = app.locals.cart;
	next();
});




app.listen(1337, () => {
	console.log("Don't go to http://localhost:1337");
});