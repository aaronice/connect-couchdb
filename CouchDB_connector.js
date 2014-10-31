var config = require('./config.json'),
	util = require('./util'),
	http = require('http'),
	fs = require('fs'),
	nano = require('nano');

// Database connection using nano
var conn = nano('http://localhost:5984'),
db = conn.use(config.db);

//Read files
for (var csvfile in config.csv){
	console.log(config.csv[csvfile]);
	
	fs.readFile(config.csv[csvfile], function(err, data){
		var docs = util.CSVToJSON(data.toString());
		console.log("Uploading...");
		for (var row in docs){
			var doc = docs[row];
//			console.log(doc);	// Displaying each JSON files uploaded
			
			//Database insertion to local database
			db.insert(doc, function(err, body) {
				if (!err){console.log(body);}	
				else {
					console.log("Break!");
				}
			});
		}
	});
	
}
