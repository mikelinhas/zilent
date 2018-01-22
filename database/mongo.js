var mongo  = require("mongodb");
//var log    = require("./utilities").log;
var n      = "[ mongo.js] ";
var Server = mongo.Server;
var Db     = mongo.Db;
var BSON   = mongo.BSONPure;
var MongoClient = mongo.MongoClient;
var MONGOHQ_URL="mongodb://mike:123@ds245287.mlab.com:45287/heroku_p2gfj1kc";
var db;

// Init
    exports.init = function(cb){
            //db.open(cb);
            console.log("connecting to MongoDB...");
            MongoClient.connect(MONGOHQ_URL, 
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


// Pass collection to model for a custom operation
    exports.getCollection = function(collectionName, cb){
        db.collection(collectionName, cb);
    };

// Generic
    exports.findAll = function(collectionName, cb){
        db.collection(collectionName, function(err, collection) {
            collection.find({},{}).toArray(cb);
        });
    };

    exports.findAll2 = function(collectionName, cb){
        db.collection(collectionName, function(err, collection) {
            collection.aggregate([
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

    exports.findAllfiltered = function(query, cb){
        db.collection(collectionName, function(err, collection) {
            collection.find({},{}).toArray(cb);
        });
    };

    exports.findByName = function(collectionName, name, cb){
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'name': name}, cb );
        });
    };

    exports.findByName2 = function(collectionName, name, cb){
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

    exports.findById = function(collectionName, id, cb){
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id)}, cb );
        });
    };

    exports.updateBids = function(collectionName, name, bid, cb){  //same as insert

        db.collection(collectionName, function(err, collection) {
            collection.update({'name': name }, { $addToSet: {"bids": bid}}, {safe:true}, cb);
        });

    };

    exports.updateCurrentBid = function(collectionName, name, amount, user, cb){  //same as insert

        db.collection(collectionName, function(err, collection) {
            collection.update({'name': name}, {$set: {"currentBid.amount": amount, "currentBid.bidder":user}}, {safe:true, upsert:false}, cb);
        });
    };

    exports.create = function(collectionName, data, cb){  //same as insert
            data.updatedAt = new Date();
            data.createdAt = data.updatedAt;
            db.collection(collectionName, function(err, collection) {
                collection.insert(data, {safe:true}, cb);
            });
    };
