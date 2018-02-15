var mongo = require('mongodb');
var mongodb = require('./database/mongo');

var items = 
[
	{"_id":"Calo",
	"artist":"Calo Carratalá",
	"name":"Pescador en las playas de Bogamoyo",
	"image":"Pescador",
	"bids": [{"bidder": "","amount": 10}]
	},

	{"_id":"Charles",
	"artist":"John Charles",
	"name":"TA and Wally",
	"image":"Charles",
	"bids": [{"bidder": "","amount": 10}]
	},

	{"_id":"Mencheta",
	"artist":"Consuelo Mencheta",
	"name":"El Estanque de la Hiedra",
	"image":"Mencheta",
	"bids": [{"bidder": "","amount": 10}]
	},

	{"_id":"Girbes",
	"artist":"Antonio Girbés",
	"name":"Trampantojo XIII",
	"image":"Girbes",
	"bids": [{"bidder": "","amount": 10}]
	},

	{"_id":"Michavila",
	"artist":"Carmen Michavila",
	"name":"Lugares y Juegos",
	"image":"Michavila",
	"bids": [{"bidder": "","amount": 10}]
	},

	{"_id":"Quintana",
	"artist":"Ángel Luis Quintana",
	"name":"Concierto Privado",
	"image":"Quintana",
	"bids": [{"bidder": "","amount": 10}]
	},

	{"_id":"Unsain",
	"artist":"Tere Unsaín",
	"name":"Cielo África",
	"image":"Unsain",
	"bids": [{"bidder": "","amount": 10}]
	}
];

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")

		var collection = db.collection("auction");

	    mongodb.insert('auction', items, function (err, result) {
	    	if (err) {
	    		console.log (err);
	    		res.status(500).send({});
	    	} else {
	    		console.log(result);
	    		console.log ("items were added to auction collection.. check them out");
	    	}
	    });		
	}
});



