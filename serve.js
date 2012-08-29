// everynote express server
var express = require("express");

// instance
var app = express();

// config
app.configure( function() {} );

// routes
app.get("/", function(req,res) {
	res.send("Yo Planet");
});

// run
app.listen(3000);


