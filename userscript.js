var mongo = require('mongodb');
var mongodb = require('./database/mongo');

var items = 
[
	{"_id":"mike","user":"Mike","code":"123"},
	{"_id":"steph","user":"Steph","code":"123"},
	{"_id":"ree","user":"Ree","code":"123"},
	{"_id":"tessie","user":"Tessie","code":"123"},
	{"_id":"majo","user":"Majo","code":"123"},
	{"_id":"sonia","user":"Sonia","code":"123"},
	{"_id":"arantxa","user":"Arantxa","code":"123"},
	{"_id":"natasha","user":"Natasha","code":"123"},
	{"_id":"ana","user":"Ana","code":"123"},
	{"_id":"xavi","user":"Xavi","code":"123"},
	{"_id":"xavo","user":"Xavo","code":"123"},
	{"_id":"jordi","user":"Jordi","code":"123"},
	{"_id":"neil","user":"Neil","code":"123"}
]

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")

	    mongodb.insert('users', items, function (err, result) {
	    	if (err) {
	    		console.log (err);
	    		res.status(500).send({});
	    	} else {
	    		console.log(result);
	    		console.log ("items were added to users collection.. check them out");
	    	}
	    });		
	}
});


