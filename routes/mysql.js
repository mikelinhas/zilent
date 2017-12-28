/*
 * CONNECTIONS AND QUERIES TO MYSQL DATABASE
 */


var mysql = require('mysql');

const CLEARDB_HOST = "us-cdbr-iron-east-05.cleardb.net";
const CLEARDB_USER = "b224a86eb02e8d";
const CLEARDB_PASSWORD = "593366fa";
const CLEARDB_DATABASE = "heroku_af3c6419a4bcf7a";

const JAWSDB_HOST = "h40lg7qyub2umdvb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
const JAWSDB_USER = "spl8291nxtn0rkqa";
const JAWSDB_PASSWORD = "fisl10w9zpn76fr5";
const JAWSDB_DATABASE = "i0lfiapv4xyl0wnd";



exports.connect = function (req,res) {

	var connection = mysql.createConnection({
		host     : CLEARDB_DATABASE,
		user     : CLEARDB_USER,
		password : CLEARDB_PASSWORD,
		database : CLEARDB_DATABASE
	});

	console.log("connecting...");
	connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
		if (error) throw error;
		console.log('The solution is: ', results[0].solution);
		res.send(results[0].solution);
	});

	console.log("... ending connection.");
	connection.end();

};