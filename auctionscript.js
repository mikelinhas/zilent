var mongo = require('mongodb');
var mongodb = require('./database/mongo');

var items = 
[
	{"_id":"PAINTING1",
	 "artist":"Natasha Collen", 
	 "name": "Welo",
	 "info": {
	 	"street": "Calle Barcas",
	 	"number": 54,
	 	"city": "Valencia",
	 	"postal code": "46001",
	 	"country": "Spain"
	 },
	 "bids": [
	 	{
	 		"date": Date.now(),
	 		"amount": 85,
	 		"bidder": "MZG"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 95,
	 		"bidder": "JIM"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 105,
	 		"bidder": "NLC"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 200,
	 		"bidder": "MZG"
	 	}
	 ]
	},
	{"_id":"PAINTING2",
	 "artist":"Neil Collen", 
	 "name": "Yess",
	 "info": {
	 	"street": "Calle Barcas",
	 	"number": 54,
	 	"city": "Valencia",
	 	"postal code": "46001",
	 	"country": "Spain"
	 },
	 "bids": [
	 	{
	 		"date": Date.now(),
	 		"amount": 85,
	 		"bidder": "MZG"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 95,
	 		"bidder": "JIM"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 105,
	 		"bidder": "NLC"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 200,
	 		"bidder": "MZG"
	 	}
	 ]
	},
	{"_id":"PAINTING3",
	 "artist":"Ree Gillett", 
	 "name": "Elbis",
	 "info": {
	 	"street": "Calle Barcas",
	 	"number": 54,
	 	"city": "Valencia",
	 	"postal code": "46001",
	 	"country": "Spain"
	 },
	 "bids": [
	 	{
	 		"date": Date.now(),
	 		"amount": 85,
	 		"bidder": "MZG"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 95,
	 		"bidder": "JIM"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 105,
	 		"bidder": "NLC"
	 	},
	 	{
	 		"date": Date.now(),
	 		"amount": 200,
	 		"bidder": "MZG"
	 	}
	 ]
	}
];

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")

	    mongodb.create('auction0', items, function (err, result) {
	    	if (err) {
	    		console.log (err);
	    		res.status(500).send({});
	    	} else {
	    		console.log(result);
	    		console.log ("items were added to auction0 collection.. check them out");
	    	}
	    });		
	}
});



