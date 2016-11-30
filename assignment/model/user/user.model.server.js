module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);


    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        // findAllWebsitesForUser: findAllWebsitesForUser,
        setModel: setModel
    };
    return api;

    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({
               "google.id": googleId
            });
    }

    function findUserByFacebookId(facebookId) {
        return UserModel
            .findOne({
                'facebook.id': facebookId
            });

    }

    // function findAllWebsitesForUser(userId) {
    //     return UserModel
    //         .findById(userId)
    //         .populate("websites", "name")
    //         .exec();
    // }

    function deleteUser(userId) {
        return UserModel.remove({
            _id: userId
        });
    }

    function setModel(_model) {
        model = _model;
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        });
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        // UserModel.find({_id: userId}); OR => returns an array. It can be array of one or many
        return UserModel.findById(userId); //=> returns just an object
    }

    function updateUser(uid, user) {
        return UserModel.update(
            {
                _id:uid
            },
            {
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email
            })
    }

};
