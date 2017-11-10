// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var ObjectId 	   = require('mongodb').ObjectID;
var Album          = require('./app/models/Album');
// configuration ===========================================
	
// config files
var db = process.env.MONGODB_ADDON_URI;
console.log(process.env);
mongoose.connect(db, { useMongoClient: true }, function(err, db) {
	if (err) {
		console.log("error:", err);	
	} else {
  		console.log("Connected correctly to database", db.port);
  	}
});

var port = process.env.PORT || 3050; // set our port

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public')); 

app.get('/api/albums', function(req, res){
	Album.find(function(err, albums){
		if(err) console.log('error:', err);
		res.json(albums);
	});
});

app.get('/api/albums/:id', function(req, res){
	var id = req.params.id;
	console.log(id); 
	Album.findById( id, function (err, photo) {
  		if (err) console.log(err);
		res.json(photo);
	});
});

require('./app/routes')(app);
// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port);
module.exports = app;