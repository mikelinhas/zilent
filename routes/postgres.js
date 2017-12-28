/*
 * CONNECTIONS AND QUERIES TO MYSQL DATABASE
 */

 // Note: no idea how to use pools, i am creating pools everytime which must be wrong :(

var pg = require('pg');

const HEROKU_POSTGRESQL_RED_URL='postgres://trsalfzlrvhgay:68a5d507e8ed549390e0d9e7e851d8335e6ea6ddc78a0a9bec429a1c42975ba4@ec2-107-21-205-25.compute-1.amazonaws.com:5432/dajqubeuqh2ngd'

const HDB_CONFIG = {
			  host: 'ec2-107-21-205-25.compute-1.amazonaws.com',
              user: 'trsalfzlrvhgay', // name of the user account
              password: '68a5d507e8ed549390e0d9e7e851d8335e6ea6ddc78a0a9bec429a1c42975ba4',
              database: 'dajqubeuqh2ngd', // name of the database,
              port: '5432',
              max: 10, // max number of clients in the pool
              idleTimeoutMillis: 30000 
            }

const DB_CONFIG = {
              user: 'zarco', // name of the user account
              password: '123',
              database: 'hendricks', // name of the database
              max: 10, // max number of clients in the pool
              idleTimeoutMillis: 30000 
            }

exports.connect = function (req,res) {

	var pool = new pg.Pool(DB_CONFIG)

	pg.defaults.ssl = true;

	console.log(process.env.DATABASE_URL);

	pool.connect( function(err, client, done) {
		if (err) throw err;
			console.log('Connected to postgres! Getting schemas...');

		client
			.query('SELECT table_schema,table_name FROM information_schema.tables;', function (err, result) {
				done();
				if (err) throw err;

				res.send("yay! connected correctly to the local POSTGRES database");
			})
			
	});

};

exports.hconnect = function (req,res) {

	var pool = new pg.Pool(HDB_CONFIG)

	pg.defaults.ssl = true;

	pool.connect(function(err, client, done) {
		if (err) throw err;
		
		console.log('Connected to postgres! Getting schemas...');

		client
			.query('SELECT table_schema,table_name FROM information_schema.tables;', function (err, result) {
				done();
				if (err) throw err;
				console.log(result);
				res.send("yay! connected propperly to the remote POSTGRESS database");
			})
			
	});

};

exports.addMessage = function (req,res) {

	var pg_text = 'INSERT INTO messages (name, message, date) VALUES($1, $2, $3) RETURNING *'
	var values = [req.body.name, req.body.message, req.body.date];

	var pg_stuff = 'SELECT * FROM pg_catalog.pg_tables';

	var pool = new pg.Pool(DB_CONFIG)
	pg.defaults.ssl = true;

	pool.connect(/*HEROKU_POSTGRESQL_RED_URL,*/ function(err, client, done) {
	
		if (err) throw err;
		
		console.log('Connected to postgres! Adding message...');
		

		client.query(pg_stuff, (error, response) => {
		  if (err) {
		    console.log(err.stack);
		    throw err;
		  } else {
		    console.log(response);
		    res.send(response);
		  }
		})
		
		/*
		client.query(pg_text, values, (err, res) => {
		  if (err) {
		    console.log(err.stack);
		    throw err;
		  } else {
		    console.log(res.rows[0]);
		    res.send(res.rows[0]);
		  }
		})
		*/	
	});

};