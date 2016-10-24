(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);


    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "title": "This is Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "title": "This is Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "title": "This is Post 3", "websiteId": "456" },
            { "_id": "693", "name": "Content 1", "title": "Post 1 Description", "websiteId": "234" },
            { "_id": "253", "name": "Content 2", "title": "Post 2 Description", "websiteId": "234" }
        ];


        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(websiteId, page) {

            var pageId = parseInt(Math.floor(Math.random()*900) + 100);

            page._id = pageId.toString();
            page.websiteId = websiteId;

            pages.push(page);

        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId == websiteId) {
                    result.push(JSON.parse(JSON.stringify(pages[p])));
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    return JSON.parse(JSON.stringify(pages[p]));
                    break;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages[p].name = page.name;
                    break;
                }
            }

        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages.splice(p,1);
                    break;
                }
            }
        }

    }
})();
