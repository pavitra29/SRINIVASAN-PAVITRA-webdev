module.exports = function (app, model) {


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
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    if(website) {
                        res.json(website);
                    }
                    else {
                        res.send('0');
                    }

                },
                function (error) {

                }
            );

        // for(var w in websites) {
        //     if(websites[w]._id == websiteId) {
        //         res.send(websites[w]);
        //         return;
        //     }
        // }
        // res.send('0');

    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;

        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );


        // for(var w in websites) {
        //     if(websites[w]._id == websiteId) {
        //         websites[w].name = website.name;
        //         websites[w].description = website.description;
        //         break;
        //     }
        // }
        // res.sendStatus(200);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites.splice(w,1);
                break;
            }
        }

        res.sendStatus(200);
    }

    function createWebsite(req, res) {
        var website = req.body;

        model
            .websiteModel
            .createWebsiteForUser(req.params.userId, website)
            .then(
                function (website) {
                    if(website) {
                        res.json(website);
                        console.log(website);
                    }
                    else {
                        res.send('0');
                        console.log("zero case");
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

        // websites.push(website);
        // res.sendStatus(200);
    }


    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // var result = [];
        // for(var w in websites) {
        //     if(websites[w].developerId == userId) {
        //         result.push(websites[w]);
        //     }
        // }
        // res.json(result);
    }

};
