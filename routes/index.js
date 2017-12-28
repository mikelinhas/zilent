

module.exports = exports = function(app) {

	//var stock = new stockData(db);


/** VIEWS */

var views = require('./views');

	app.get('', views.home);
	app.get('/', views.home);
	app.get('/database', views.database);
	app.get('/faes', views.faes);
	app.get('/sandbox', views.sandbox);
	app.get('/graphs', views.graphs);
	app.get('/graphs/:graphID', views.graphID);



/** CRUD - create, read, update, delete stuff from REST calls */

var crud = require('./crud')
	
	//Gets
	app.get('/rest/graph', crud.graph);


	// Posts
	app.post('/rest/upload', crud.uploadFile);


	// Deletes
	//app.delete('/rest/postgresdb/delete', postgresdb.delete);
	//app.delete('/rest/database/deleteall', general.deleteall);




/** DATABASE calls */

var postgres = require('./postgres') 
	
	//Gets
	app.get('/db/connect', postgres.connect); //connect to LOCALHOST database
	app.get('/db/hconnect', postgres.hconnect); //connect to HEROKU database


	// Posts
	app.post('/db/addmessage', postgres.addMessage);
	//app.post('/db/upload', mysql.uploadFile);


	// Deletes
	//app.delete('/db/postgresdb/delete', postgresdb.delete);
	//app.delete('/db/database/deleteall', general.deleteall);

}