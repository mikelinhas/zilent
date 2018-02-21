var mongodb = require('./mongo')
var auctionCollection = "auction"
var userCollection = "users"

var deadline = new Date("2018-02-22T22:30:03Z");
// Note: must be one hour less than in Spain

var winston = require('winston');

const customLevels = { 
  error: 0, 
  info: 1, 
  warn: 2
}

var timestamp = function (date) {
	hour = doubledigit(date.getHours());
	mins = doubledigit(date.getMinutes());
	secs = doubledigit(date.getSeconds());
	return "[" + hour + ":" + mins + ":" + secs + "] - "
}

var doubledigit = function (value) {
	if(value.toString().length <= 1) {
        return "0"+value.toString();
    }
    return value.toString();
}


const logger = winston.createLogger({
	levels: customLevels,
    transports: [
	    new winston.transports.File({
	      filename: 'bids.log',
	      level: 'info'
	    }),
	    new winston.transports.File({
	      filename: 'errors.log',
	      level: 'warn'
	    })
    ]
});



// GET
	
	exports.getItems = function (req,res) {
		mongodb.findAll(auctionCollection, function (err,result) {
			if (err){
				logger.warn(timestamp(new Date) + "Can't query items")
				// DEBUG : console.log(err);
				res.status(500).send({});
			} else {
				res.status(200).send(result);
			}
		});
	}

	// This function is way too messy... in the future should clean it up a bit
	exports.addBid = function (req,res) {

		var user = req.body.user;
		var code = req.body.code;
		var amount = +req.body.amount;
		var date = new Date();
		var name = req.body.name;
		var item_id = req.body.id;
		console.log(item_id);

		var bid = {"date": date, "bidder": user, "amount": amount};

		var error = [
			{"type": 0, "message": "Rellene el usuario"},
			{"type": 1, "message": "El usuario no existe"},
			{"type": 2, "message": "Contraseña incorrecta"},
			{"type": 3, "message": "Demasiado tarde, la subasta ha acabado"},
			{"type": 4, "message": "Cantidad insuficiente"}
		];


		//0 - Check if auction is still on
		if (date > deadline) {

			// DEBUG : console.log("bidding is over");
			res.status(500).send(error[3]);

		//1 - Check if anything is empty
		} else if (!user) {

			// DEBUG : console.log(error[0].message);
			res.status(500).send(error[0])

		} else {
	    //FIRST CHECK USER

 		var user_id = req.body.user.toLowerCase();
	    mongodb.findUserByID(userCollection, user_id, function (err,result) {

			if (err){
				res.status(500).send({});
			} else {

				//CHECK IF WE HAD A RESULT
				if (result==null) {
					logger.warn(timestamp(new Date()) + user + " : Este usuario no existe");
					// DEBUG : console.log("user doesn't exist");
					res.status(500).send(error[1]);
				} else {

					bid.bidder = result.user;
					var dbCode = result.code;
					
					//NOW CHECK IF USER CODE IS CORRECT
					if (code !== dbCode) {
						logger.warn(timestamp(new Date()) + user + " : " + code + " - contraseña incorrecta.");
						// DEBUG : console.log("code is incorrect");
						res.status(500).send(error[2]);
					}	else {

						//NOW CHECK IF BID IS BIGGER THAN CURRENTBID
						mongodb.findByName(auctionCollection, name, function (err,result) {

							var currentAmount = +result[0].bids[0].amount;

							//CHECK IF AMOUNT IS LARGER THAN CURRENT AMOUNT
							if (amount > currentAmount + 19.99) {

								//PUSH BID TO BIDS ARRAY
								mongodb.updateBids(auctionCollection, name, bid, function (err,result) {
									if (err) {
										res.status(500).send({});
									} else {
										res.status(200).send(bid);	
										logger.info(timestamp(new Date) + bid.bidder + " : " + bid.amount + "€ - " + item_id);
									}
								})

							} else {
								logger.warn(timestamp(new Date) + user + " : Puja insuficiente - " + item_id);
								// DEBUG : console.log("amount is insufficient");
								error[4].currentBid = result[0].bids[0];
								res.status(500).send(error[4]);
							}

						})
					} 	
				};
			}
		});	
  	
  	}     

	}



	exports.getOneproduct = function (req,res) {
		var id = req.query.id;
		console.log(id);
		mongodb.findById(auctionCollection, id, function (err,result) {
			if (err){
				console.log(err);
				res.status(500).send({});
			} else {
				res.status(200).send(result);
			}
		});
	}


// POST

exports.addproducts = function(req, res) {

	console.log(req);

    mongodb.create('articles', article, function (err, result) {
    	if (err) {
    		console.log (err);
    		res.status(500).send({});
    	} else {
    		var _id = result[0]._id;
    		console.log ("article was added to mongodb.. check it out");
    	}
    });

};


// DELETE

exports.delete = function (req, res) {
	console.log (req.body);
	var id = req.body.id;
	mongodb.delete ("articles", id, function (err,result) {
		if (err){
			console.log(err);
    		res.status(500).send({});
		} else {
			console.log(id + "was deleted from the mongoDB");
    		res.status(200).send({});
		}
	});
};

/*  

[0:07:35] Marios Georgiou: your middleware.js should look like

exports.findAll = function(req,res){
    log(n+"Returning all");
    model.siteFindAll('Rules', req.user.linkedDevices, function(err, result){
        if (err){
            log(err);
            res.send(500, {});
        } else {
            res.send(200, result);
        }
    });
    //res.end();
};

*/
