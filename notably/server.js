// require all dependencies:
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// import routes for use:
require('./app/routes')(app, {});

// tell server to listen for HTTP requests:
app.listen(port, () => {
	console.log('We are live on port ' + port);
});
