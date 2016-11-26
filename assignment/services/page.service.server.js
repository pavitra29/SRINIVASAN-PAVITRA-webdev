module.exports = function (app, model) {

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "title": "This is Post 1", "websiteId": "456" },
    //     { "_id": "432", "name": "Post 2", "title": "This is Post 2", "websiteId": "456" },
    //     { "_id": "543", "name": "Post 3", "title": "This is Post 3", "websiteId": "456" },
    //     { "_id": "693", "name": "Content 1", "title": "Post 1 Description", "websiteId": "234" },
    //     { "_id": "253", "name": "Content 2", "title": "Post 2 Description", "websiteId": "234" }
    // ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var page = req.body;

        model
            .pageModel
            .createPage(req.params.websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // pages.push(page);
        // res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );


        // var result = [];
        //
        // for(var p in pages) {
        //     if(pages[p].websiteId == websiteId) {
        //         result.push(pages[p]);
        //     }
        // }
        // res.json(result);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        model
            .pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    if(page) {
                        res.json(page);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // for(var p in pages) {
        //     if(pages[p]._id == pageId) {
        //         res.send(pages[p]);
        //         break;
        //     }
        // }
        // res.send('0');
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        model
            .pageModel
            .updatePage(pageId, page)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // for(var p in pages) {
        //     if(pages[p]._id == pageId) {
        //         pages[p].name = page.name;
        //         pages[p].title = page.title;
        //         break;
        //     }
        // }
        // res.sendStatus(200);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        model
            .pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        // for(var p in pages) {
        //     if(pages[p]._id == pageId) {
        //         pages.splice(p,1);
        //         break;
        //     }
        // }
        // res.sendStatus(200);
    }

};
