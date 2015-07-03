var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, '../client/static')));
//app.set('views', path.join(__dirname, '../client/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.listen(8000, function(){
	console.log('Server running on port 8000');
})

require('../config/mongoose.js');
require('../config/routes.js')(app);