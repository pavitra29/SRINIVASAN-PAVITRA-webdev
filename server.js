var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// require ("./test/app.js")(app);

require("./project/app.js")(app);

// require("./assignment/app.js")(app);

require("./ejs/forms/app")(app);
require("./wax/app")(app);

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), app.get('ipaddress'));