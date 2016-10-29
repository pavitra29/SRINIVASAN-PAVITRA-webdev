var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

require("./assignment/app.js")(app);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook Social Network" },
    { "_id": "234", "name": "Twitter",     "developerId": "456", "description": "Twitter tweeting" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmodo Blog" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Tic tac toe game" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers game" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess game" }
];

app.get("/websites", function(req, res){
    res.send(websites);
});


app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), app.get('ipaddress'));