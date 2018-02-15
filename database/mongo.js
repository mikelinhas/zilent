var mongo  = require("mongodb");
//var log    = require("./utilities").log;
var n      = "[ mongo.js] ";
var Server = mongo.Server;
var Db     = mongo.Db;
var BSON   = mongo.BSONPure;
var MongoClient = mongo.MongoClient;
var MONGO_REMOTE="mongodb://mike:123@ds245287.mlab.com:45287/heroku_p2gfj1kc";
var MONGO_LOCAL="mongodb://127.0.0.1:27017/auctiondb";
var db;

// Init
    exports.init = function(cb){
            //db.open(cb);
            console.log("connecting to MongoDB...");
            MongoClient.connect(MONGO_LOCAL, 
                // {server: {
                //     auto_reconnect: true,
                //     socketOptions: {
                //         connectTimeoutMS: 3000,
                //         socketTimeoutMS:  3000,
                //         keepAlive:        3000
                //     }
                // }}, 
                function(err, dbinstance) {
                    if (err){
                        //log(err);
                        cb(err,0);
                    } else {
                        db = dbinstance;
                        cb(0,dbinstance);
                    }
            });
    };

// Generic
    exports.findAll = function(collectionName, cb){
        db.collection(collectionName, function(err, collection) {
            collection.aggregate([
                {$unwind: "$bids"},
                {$sort: { "_id": 1, "bids.amount": -1}},
                {$group: { 
                    "_id": "$_id",
                    "name": { "$first": "$name"},
                    "artist": { "$first": "$artist"},
                    "image": { "$first": "$image"},
                    "bids": {"$push": "$bids"}
                }}
            ]).toArray(cb);
        });
    };

    exports.findByName = function(collectionName, name, cb){
        db.collection(collectionName, function(err, collection) {
            collection.aggregate([
                {$match: {'name': name}},
                {$unwind: "$bids"},
                {$sort: { "_id": 1, "bids.amount": -1}},
                {$group: { 
                    "_id": "$_id",
                    "name": { "$first": "$name"},
                    "artist": { "$first": "$artist"},
                    "bids": {"$push": "$bids"}
                }}
            ]).toArray(cb);
        });
    };

    exports.findByUser = function(collectionName, user, cb){
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'user': user}, cb );
        });
    };


// Updates
    exports.updateBids = function(collectionName, name, bid, cb){  //same as insert

        db.collection(collectionName, function(err, collection) {
            collection.update({'name': name }, { $addToSet: {"bids": bid}}, {safe:true}, cb);
        });

    };


// Old
    exports.findByNameOld = function(collectionName, name, cb){
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'name': name}, cb );
        });
    };
    exports.findAllOld = function(collectionName, cb){
        db.collection(collectionName, function(err, collection) {
            collection.find({},{}).toArray(cb);
        });
    };
    exports.updateCurrentBidOld = function(collectionName, name, amount, user, cb){  //same as insert

        db.collection(collectionName, function(err, collection) {
            collection.update({'name': name}, {$set: {"currentBid.amount": amount, "currentBid.bidder":user}}, {safe:true, upsert:false}, cb);
        });
    };

    exports.insert = function(collectionName, documents, cb){
        db.collection(collectionName, function(err, collection) {
            collection.insert(documents, cb)
        });
    }
