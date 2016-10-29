module.exports = function (app) {


    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook Social Network" },
        { "_id": "234", "name": "Twitter",     "developerId": "456", "description": "Twitter tweeting" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmodo Blog" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Tic tac toe game" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers game" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess game" }
    ];


    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.post("/api/user/:userId/website",createWebsite);

    function createWebsite(req, res) {

        var website = req.body;

        websites.push(website);

        res.sendStatus(200);
    }


    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        var result = [];

        for(var w in websites) {
            if(websites[w].developerId == userId) {
                result.push(websites[w]);
            }
        }

        res.json(result);
    }

};
