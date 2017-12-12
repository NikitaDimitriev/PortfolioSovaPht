module.exports = function(app) {
	var express        = require('express');
	var http           = require('http');
	var path           = require('path');
	var fs             = require('fs');
	var mongoose 	   = require('mongoose');
	var ObjectId 	   = require('mongodb').ObjectID;
	var multer         = require('multer');
	var Album          = require('./models/Album');
	var bodyParser     = require('body-parser');

	app.use(bodyParser.json()); 
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
	app.use(bodyParser.urlencoded({extended: true }));
	app.use(express.static(path.join(__dirname, 'public')));

	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    		cb(null, 'public/')
  		},
  		filename: function (req, file, cb) {
    		cb(null, Date.now() + path.extname(file.originalname))
  		}
	})

var upload = multer({ storage: storage });

	var array = upload.array('images', 35);

	var single = upload.single('file');

	app.post('/api/createAlbum', single ,function (req,res) {
	console.log(req.body.album, 'file');
	var data = JSON.parse(req.body.album);
	var titlePhoto = req.file.filename;
	Album.create({ 
				title: data.title,  
				category: data.category.name, 
				discription: data.discription,
				titlePhoto : titlePhoto
			},
			function (err, album) {
	  		if (err) console.log(err);
	  		res.json(album);
		});
	});

	app.get('/api/currentAlbum/:id', function(req, res){
		var id = req.params.id;
		Album.findById( id, function (err, album) {
	  		if (err) console.log(err);
			res.json(album);
		});
	});

	app.put('/api/addPhotos/:id', upload.any() , function (req,res){
		var id = req.params.id;
		console.log(id);
		console.log(req.files);
		var photosPath = [];

		for(var i = 0; i < req.files.length; i++){
			var pathToPhoto = "./upload/" + req.files[i].filename;
			console.log('path is : ', pathToPhoto);
			photosPath.push(pathToPhoto);
		
		};
		Album.findByIdAndUpdate (id, {
			$set:{
			photos: photosPath
			}
		}, function (err, album) {
	  		if (err) console.log(err);
			res.json(album);
		});
	});

	app.delete('/api/delete-album/:id', function(req, res){
		var id = req.params.id;
		console.log(id);
		Album.findByIdAndRemove( id, function (err, album) {
			  if (err) console.log(err);
			res.json(album);
		});
	});

		app.get('*', function(req, res) {
			res.sendfile('./public/index.html');
		});

		app.get('/admin', function(req, res) {
			res.sendfile('./public/admin.html');
		});

};
