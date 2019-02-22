var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

var tracker = [
		{name: "Mood"},
		{name: "Energy"},
		{name: "Exercise"}
	]

app.get("/", function(req, res){
	res.render("home");
});

app.get("/tracker", function(req, res){
	res.render("tracker",{tracker:tracker});
});

app.post("/tracker", function(req, res){
	// get data from link and add to tracker object
	var name = req.body.name;
	var newTracker = {name:name}
	tracker.push(newTracker);
	// redirect back to tracker page
	res.redirect("/tracker");
});

// app.get("/tracker/new", function( req, res){
// 	res.render("tracker",{tracker:tracker}); //new.ejs
// });

app.listen(3000);