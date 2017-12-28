/*
 * RENDER views.
 */

exports.home = function(req, res) {
    res.render('views/home');
};

exports.stock = function(req, res) {
    res.render('views/stock');
};

exports.sales = function(req, res) {
    res.render('views/sales');
};

exports.production = function(req, res) {
    res.render('views/production');
};



