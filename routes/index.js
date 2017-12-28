//Routing files
var views = require('./views');
var stock = require('../database/stock');
//var general = require('../database/general');


module.exports = exports = function(app, db) {

	//var stock = new stockData(db);




	/** VIEWS */
	app.get('/', views.home);
	app.get('/stock', views.stock);
	app.get('/sales', views.sales);
	app.get('/production', views.production);
	//app.get('/stock/:productID', views.productID);


	// Load / Update / Delete stuff with MongoDB
	app.get('/rest/stock/allstock', stock.getstock);
	//app.get('/rest/stock/stockquery', stock.querystock);
	//app.get('/rest/stock/product_id', stock.getOneproduct);

	
	// Posts
	//app.post('/rest/stock/addproduct', stock.addproduct);


	// Delete
	//app.delete('/rest/stock/deleteproducts', stock.delete);
	//app.delete('/rest/database/deleteall', general.deleteall);


}