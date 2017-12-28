var mongodb = require('./mongo')
var collectionName = "stock"

// GET
	
	exports.getstock = function (req,res) {
		mongodb.findAll(collectionName, function (err,result) {
			if (err){
				console.log(err);
				res.status(500).send({});
			} else {
				res.status(200).send(result);
			}
		});
	}

	exports.getOneproduct = function (req,res) {
		var id = req.query.id;
		console.log(id);
		mongodb.findById(collectionName, id, function (err,result) {
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