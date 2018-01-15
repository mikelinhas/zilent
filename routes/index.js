//Routing files
var views = require('./views');
var auction = require('../database/auction');
//var general = require('../database/general');


module.exports = exports = function(app, db) {

	//var stock = new stockData(db);




	/** VIEWS */
	app.get('/', views.home);
	app.get('/auction', views.auction)
	app.get('/auction/:auctionID', views.auctionID);
	app.get('/about', views.about);


	// Load / Update / Delete stuff with MongoDB
	app.get('/db/queryItems', auction.getItems);
	app.get('/db/queryPrice', auction.getPrice);

	
	// Posts
	//app.post('/rest/stock/addproduct', stock.addproduct);


	// Delete
	//app.delete('/rest/stock/deleteproducts', stock.delete);
	//app.delete('/rest/database/deleteall', general.deleteall);


}