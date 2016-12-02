module.exports = function (app, model) {

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

    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function createWebsite(req, res) {
        var website = req.body;

        model
            .websiteModel
            .createWebsiteForUser(req.params.userId, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

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

    }

};
