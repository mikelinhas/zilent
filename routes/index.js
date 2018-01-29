//Routing files
var views = require('./views');
var auction = require('../database/auction');
//var general = require('../database/general');


module.exports = exports = function(app, sse, db) {

	//var stock = new stockData(db);




	/** VIEWS */
	app.get('/', views.home);
	app.get('/auction', views.auction)
	app.get('/auction/:auctionID', views.auctionID);
	app.get('/about', views.about);


	// Load / Update / Delete stuff with MongoDB
	app.get('/db/queryItems', auction.getItems);

	
	// Posts
	app.post('/db/addBid', auction.addBid);
	//app.post('/rest/stock/addproduct', stock.addproduct);

	// SSE
	app.get('/auction/updates', sse(), auction.broadcastBids)
	// Delete
	//app.delete('/rest/stock/deleteproducts', stock.delete);
	//app.delete('/rest/database/deleteall', general.deleteall);



	/** LOADER IO **/
	app.get('/loaderio-8cad0eb724256d9c95a5e5f31df5de5b/',  function(req,res) {
		res.send('loaderio-8cad0eb724256d9c95a5e5f31df5de5b');
	});
}