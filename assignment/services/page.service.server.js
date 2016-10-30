module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "title": "This is Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "title": "This is Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "title": "This is Post 3", "websiteId": "456" },
        { "_id": "693", "name": "Content 1", "title": "Post 1 Description", "websiteId": "234" },
        { "_id": "253", "name": "Content 2", "title": "Post 2 Description", "websiteId": "234" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var page = req.body;

        pages.push(page);
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];

        for(var p in pages) {
            if(pages[p].websiteId == websiteId) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        for(var p in pages) {
            if(pages[p]._id == pageId) {
                res.send(pages[p]);
                break;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages[p].name = page.name;
                pages[p].title = page.title;
                break;
            }
        }
        res.sendStatus(200);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages.splice(p,1);
                break;
            }
        }
        res.sendStatus(200);
    }

};
