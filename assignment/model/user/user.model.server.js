module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);


    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser
    };
    return api;

    function deleteUser(userId) {
        return UserModel.remove({
            _id: userId
        });
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({
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
