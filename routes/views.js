/*
 * RENDER views.
 */

exports.home = function(req, res) {
    res.render('views/home');
};

exports.auction = function(req, res) {
    res.render('views/auction');
};

exports.auctionID = function(req, res) {
    res.render('views/auctionID');
};

exports.about = function(req, res) {
    res.render('views/about');
};




