/*
 * RENDER views.
 */

exports.home = function(req, res) {
    res.render('views/home');
};

exports.database = function(req, res) {
    res.render('views/database');
};

exports.faes = function(req, res) {
    res.render('views/faes');
};

exports.sandbox = function(req, res) {
    res.render('views/sandbox');
};

exports.graphs = function(req, res) {
    res.render('views/graphs');
};

exports.graphID = function(req, res) {
	res.send("finished")
}


