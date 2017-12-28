/*
 * PYTHON CREATES?
 */

var fs = require('fs');
var opn = require('opn');
var python = require('python-shell');
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req,file,callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now());
	}
});

var upload = multer({ storage : storage}).single('userFile');

exports.uploadFile = function (req,res) {

	console.log("received something....");
	upload(req,res, function(err) {
		if(err) {
			return res.send("Error uploading file.");
		}
		res.send("File is uploaded")
	});

}; 

exports.graph = function (req,res) {
	python.run('./python/endika.py', function (err) {
		if (err) throw err;
    	console.log("I did the graph!  ...yah right");
    	opn('http://localhost:3000/graphs/1');
	});
}; 