var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/tracker', { useNewUrlParser: true });  //creates tracker database inside of mongodb

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//SCHEMA SETUP
var trackerSchema = new mongoose.Schema({
	name: String,
	rating: Number,
});

var Tracker = mongoose.model("Tracker", trackerSchema); //compiles into model

// Tracker.create( //create new database entry
// 	{
// 		name: "Energy"
// 	}, function (err, tracker){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly created tracker: ");
// 			console.log(tracker);
// 		}
// 	});

app.get("/", function(req, res){
	res.render("home");
});

app.get("/tracker", function(req, res){
	//get all trackers from DB
	Tracker.find({}, function (err, allTrackers) {
		if(err){
			console.log(err);
		} else {
			res.render("tracker",{tracker:allTrackers}); //data passed in, and name given
		}
		
	});

});

app.post("/tracker", function(req, res){
	//get data from link and add to tracker object
	var name = req.body.name; //gets data from form
	var newTracker = {name:name}
	//create a new tracker and save to DB
	Tracker.create(newTracker, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to tracker page
			res.redirect("/tracker");
		}
	});
});

// app.get("/tracker/new", function( req, res){
// 	res.render("tracker",{tracker:tracker}); //new.ejs
// });

app.listen(3000);