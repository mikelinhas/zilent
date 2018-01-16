var mongodb = require('./mongo')
var auctionCollection = "auction0"
var userCollection = "users0"

// GET
	
	exports.getItems = function (req,res) {
		mongodb.findAll(auctionCollection, function (err,result) {
			if (err){
				console.log(err);
				res.status(500).send({});
			} else {
				res.status(200).send(result);
			}
		});
	}

	exports.addBid = function (req,res) {

		var user = req.body.user;
		var code = req.body.code;
		var amount = req.body.amount;
		var date = req.body.date;
		var name = req.body.name;

		var bid = {"date": date, "bidder": user, "amount": amount};

		var error = [
			{"type": 0, "message": "Empty user"},
			{"type": 1, "message": "User doesn't exist"},
			{"type": 2, "message": "Code is incorrect"},
			{"type": 3, "message": "Name doesn't exist"},
			{"type": 4, "message": "Insufficient amount"}
		];


		//Check if anything is empty
		if (user) {
		
	    //FIRST CHECK USER
	    mongodb.findByUser(userCollection, user, function (err,result) {

				if (err){
					res.status(500).send({});
				} else {

					//CHECK IF WE HAD A RESULT
					if (result==null) {
						console.log("user doesn't exist");
						res.status(500).send(error[1]);
					} else {

						var dbCode = result.code;
						console.log(result);
						
						//NOW CHECK IF USER CODE IS CORRECT
						if (code === dbCode) {

							//NOW CHECK IF BID IS BIGGER THAN CURRENTBID
							mongodb.findByName(auctionCollection, name, function (err,result) {

								//CHECK IF WE FOUND THE NAME IN THE AUCTION
								if (result==null) {
									console.log("name doesn't exist");
									res.status(500).send(error[3]);
								} else {
									var currentAmount = result.currentBid.amount;

									//CHECK IF AMOUNT IS LARGER THAN CURRENT AMOUNT
									if (amount > currentAmount) {

										//UPDATE CURRENT BID
										mongodb.updateCurrentBid(auctionCollection, name, amount, user, function (err,result){
											if (err) {
												res.status(500).send({});
											} else {

												//PUSH BID TO BIDS ARRAY
												mongodb.updateBids(auctionCollection, name, bid, function (err,result) {
													if (err) {
														res.status(500).send({});
													} else {
														res.status(200).send(bid);	
													}
												})
											}
										})

									} else {
										console.log("amount is insufficient");
										error[4].currentBid = result.currentBid;
										res.status(500).send(error[4]);
									}

								}
							})

						} else {
							console.log("code is incorrect");
							res.status(500).send(error[2]);
						}
							
					};
				}
			});	
  
		} else {
			console.log("emtpy user");
			res.status(500).send(error[0])
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