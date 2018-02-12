//Routing files
var views = require('./views');
var auction = require('../database/auction');


module.exports = exports = function(app, db) {

	/** VIEWS */
	app.get('/', views.auction);
	//app.get('/auction', views.auction)
	//app.get('/auction/:auctionID', views.auctionID);
	//app.get('/about', views.about);

	// Load auction items with MongoDB
	app.get('/db/queryItems', auction.getItems);

	// Place bid coming from user
	app.post('/db/addBid', auction.addBid);

}