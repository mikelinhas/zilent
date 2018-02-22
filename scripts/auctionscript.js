var mongo = require('mongodb');
var mongodb = require('../database/mongo');

var items = 
[
	{"_id":"Calo",
	"artist":"Calo Carratalá",
	"name":"Pescador en las playas de Bogamoyo",
	"image":"Calo",
	"bids": [{"bidder": "","amount": 750}]
	},

	{"_id":"Girbes",
	"artist":"Antonio Girbés",
	"name":"Trampantojo XIII",
	"image":"Girbes",
	"bids": [{"bidder": "","amount": 2000}]
	},

	{"_id":"Marti1",
	"artist":"Jorge Martí",
	"name":"Menina con flor roja",
	"image":"Marti1",
	"bids": [{"bidder": "","amount": 300}]
	},

	{"_id":"Marti2",
	"artist":"Jorge Martí",
	"name":"Menina con pañuelo",
	"image":"Marti2",
	"bids": [{"bidder": "","amount": 300}]
	},

	{"_id":"Unsain",
	"artist":"Tere Unsaín",
	"name":"Cielo África",
	"image":"Unsain",
	"bids": [{"bidder": "","amount": 340}]
	},

	{"_id":"Txillida",
	"artist":"Pedro Txillida",
	"name":"B. De la serie Abecedario",
	"image":"Txillida",
	"bids": [{"bidder": "","amount": 250}]
	},

	{"_id":"Torres",
	"artist":"Fernando Torres",
	"name":"Camiseta At. Madrid firmada",
	"image":"Torres",
	"bids": [{"bidder": "","amount": 300}]
	},

	{"_id":"Charles",
	"artist":"John Charles",
	"name":"TA and Wally",
	"image":"Charles",
	"bids": [{"bidder": "","amount": 150}]
	},

	{"_id":"Jaques",
	"artist":"Isabel Jaques",
	"name":"Desnudo sobre cubo",
	"image":"Jaques",
	"bids": [{"bidder": "","amount": 200}]
	},

	{"_id":"Mencheta",
	"artist":"Consuelo Mencheta",
	"name":"El Estanque de la Hiedra",
	"image":"Mencheta",
	"bids": [{"bidder": "","amount": 680}]
	},

	{"_id":"Michavila",
	"artist":"Carmen Michavila",
	"name":"Lugares y Juegos",
	"image":"Michavila",
	"bids": [{"bidder": "","amount": 360}]
	},

	{"_id":"Quintana",
	"artist":"Ángel Luis Quintana",
	"name":"Concierto Violoncello Privado",
	"image":"Quintana",
	"bids": [{"bidder": "","amount": 200}]
	},

	{"_id":"FCBarcelona",
	"artist":"FC Barcelona",
	"name":"Camiseta FCB firmada por los jugadores",
	"image":"FCBarcelona",
	"bids": [{"bidder": "","amount": 300}]
	},

	{"_id":"ATMadrid",
	"artist":"AT Madrid",
	"name":"Camiseta ATM firmada por los jugadores",
	"image":"ATMadrid",
	"bids": [{"bidder": "","amount": 300}]
	},

	{"_id":"Iniesta",
	"artist":"Andrés Iniesta",
	"name":"Camiseta FCB firmada por Iniesta",
	"image":"Iniesta",
	"bids": [{"bidder": "","amount": 300}]
	},

	{"_id":"Corbalan",
	"artist": "Juan Antonio Corbalán",
	"name": "Camiseta vintage R. Madrid baloncesto",
	"image": "Corbalan",
	"bids": [{"bidder": "", "amount": 300}]
	},

	{"_id":"Ronaldo",
	"artist":"Cristiano Ronaldo",
	"name":"Camiseta RM firmada por Ronaldo",
	"image": "Ronaldo",
	"bids": [{"bidder": "", "amount": 300}]
	},

	{"_id":"Oyarzabal",
	"artist":"Mikel Oyarzabal",
	"name":"Camiseta R. Sociedad firmada por Oyarzabal",
	"image": "Oyarzabal",
	"bids": [{"bidder": "", "amount": 300}]
	}
]

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")

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



