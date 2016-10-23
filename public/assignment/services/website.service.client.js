(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook Social Network" },
            { "_id": "234", "name": "Twitter",     "developerId": "456", "description": "Twitter tweeting" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmodo Blog" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Tic tac toe game" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers game" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess game" }
        ];


        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite:deleteWebsite
            
        };

        return api;
        
        function createWebsite(userId, website) {

            var websiteId = parseInt(Math.floor(Math.random()*900) + 100);

            website._id = websiteId;
            website.developerId = userId;

            websites.push(website);


            // return website;
            return JSON.parse(JSON.stringify(website))
        }

        function findWebsitesByUser(userId) {
            var result = [];

            for(var w in websites) {
                if(websites[w]._id === userId) {
                    result.push(websites[w]);
                }
            }

            return result;
        }
        
        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    return websites[w];
                }
            }
            return null;

        }
        
        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    break;
                }
            }

        }
        
        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites.splice(w,1);
                    break;
                }
            }

        }
    }
})();
