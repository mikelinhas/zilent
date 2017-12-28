var mongo = require('mongodb');
var mongodb = require('./database/mongo');

var products = 
[
	{"name":"triangle bra", 
	 "category": "bras",
	 "colors":[
		{"color":"peach",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		},
		{"color":"black",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		},
		{"color":"transparent black",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		}
	]},
	{"name":"awesome brief", 
	 "category": "briefs",
	 "colors":[
		{"color":"peach",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		},
		{"color":"black",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		},
		{"color":"transparent black",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		}
	]},
	{"name":"slim bodysuit", 
	 "category": "bodysuits",
	 "colors":[
		{"color":"peach",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		},
		{"color":"black",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		},
		{"color":"transparent black",
		 "sizes":[
			{"size":"L",
			 "quantity":""
			},
			{"size":"M",
			 "quantity":""
			},
			{"size":"S",
			 "quantity":""
			},
			{"size":"XS",
			 "quantity":""
			}
			]
		}
	]}
];

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")

	    mongodb.create('stock', products, function (err, result) {
	    	if (err) {
	    		console.log (err);
	    		res.status(500).send({});
	    	} else {
	    		console.log(result);
	    		console.log ("products were added to mongodb.. check them out");
	    	}
	    });		
	}
});



