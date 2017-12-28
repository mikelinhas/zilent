var mongo = require('mongodb');
var mongodb = require('./database/mongo');

var clients = 
[
	{"name":"Natasha Collen", 
	 "email": "tasha@gmail.com",
	 "address": {
	 	"street": "Calle Barcas",
	 	"number": 54,
	 	"city": "Valencia",
	 	"postal code": "46001",
	 	"country": "Spain"
	 },
	 "purchases": [
	 	{
	 		"date": Date.now(),
	 		"paid": true,
	 		"sent": true,
	 		"price": 85,
	 		"shipping": 12,
	 		"items": [
	 			{"name":"triangle bra", "color": "transparent black", "size": "S", "quantity": 1}
	 		]
	 	},
	 	{
	 		"date": Date.now(),
	 		"paid": true,
	 		"sent": true,
	 		"price": 120,
	 		"shipping": 30,
	 		"items": [
	 			{"name":"triangle bra", "color": "peach", "size": "S", "quantity": 2}
	 		]
	 	},

	 ]
	}
];

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")

	    mongodb.create('sales', clients, function (err, result) {
	    	if (err) {
	    		console.log (err);
	    		res.status(500).send({});
	    	} else {
	    		console.log(result);
	    		console.log ("clients were added to sales collection.. check them out");
	    	}
	    });		
	}
});



