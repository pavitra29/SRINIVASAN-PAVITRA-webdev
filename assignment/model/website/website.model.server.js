module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");

    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function (websiteObj) {
                model.userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                            websiteObj._user = userObj._id;
                            websiteObj.save();
                            userObj.websites.push(websiteObj);
                            return userObj.save();
                        },
                        function (error) {
                            console.log(error);
                        });
            });
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .remove({
                _id: websiteId
            });

    }

    function findAllWebsitesForUser(userId) {
        // Commented because we can get the list of websites using _user from the website model itself
        // instead of making call to the user model
        // return model.userModel.findAllWebsitesForUser(userId);
        return WebsiteModel
            .find({
                _user: userId
            });
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById({
            _id: websiteId
        });
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                name: website.name,
                description: website.description
            }
        );
    }




};
