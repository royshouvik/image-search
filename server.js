"use strict"
const imageSearch = require('./imageSearch'),
      mongoose = require('mongoose'),
      express = require('express');

// init project
var app = express();

// use native promise - http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/url', err => {  
	if(err) {
		console.error("Error connecting to MongoDB");
		throw err;
	}
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/:query", imageSearch.getSearchResults)
   .get("/api/latest/imagesearch", imageSearch.getLatestSearch);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
