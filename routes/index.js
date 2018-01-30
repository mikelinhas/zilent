//Routing files
var views = require('./views');
var auction = require('../database/auction');
//var general = require('../database/general');


module.exports = exports = function(app, db, io) {

	/** SOCKETS */
	io.on('connection', function(socket){
		console.log('a user connected');
			socket.on('disconnect', function() {
				console.log("user disconnected");
			});
	    socket.on('chat', function (msg) {
	    	socket.broadcast.emit('chat', msg);
	    });
	});



	/** VIEWS */
	app.get('/', views.home);
	app.get('/auction', views.auction)
	app.get('/auction/:auctionID', views.auctionID);
	app.get('/about', views.about);


	// Load / Update / Delete stuff with MongoDB
	app.get('/db/queryItems', auction.getItems);

	
	// Posts
	app.post('/db/addBid', auction.addBid);



	/** LOADER IO **/
	//app.get('/loaderio-8cad0eb724256d9c95a5e5f31df5de5b/',  function(req,res) {
	//	res.send('loaderio-8cad0eb724256d9c95a5e5f31df5de5b');
	//});
}