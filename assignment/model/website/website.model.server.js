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
        // TODO: remove website from user
        return WebsiteModel
            .remove({
                _id: websiteId
            });

        // return WebsiteModel
        //     .findById({
        //         _id:websiteId
        //     })
        //     .then(function (websiteObj) {
        //         model
        //             .findUserById(websiteObj._user)
        //             .then(function (userObj) {
        //                     userObj.websites.splice(websiteObj,1);
        //                     userObj.save();
        //
        //                     return WebsiteModel
        //                         .remove({
        //                             _id: websiteId
        //                         });
        //
        //                 },
        //                 function (error) {
        //                     console.log(error);
        //                 }
        //             )
        //
        //     },
        //     function (error) {
        //         console.log(error);
        //     })

    }

    function findAllWebsitesForUser(userId) {
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
