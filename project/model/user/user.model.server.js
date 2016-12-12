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
        findUserByInstagramId: findUserByInstagramId,
        findUserBySpotifyId: findUserBySpotifyId,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers,
        favoriteMusic: favoriteMusic,
        undoFavoriteMusic: undoFavoriteMusic,
        findMusicByFavorite: findMusicByFavorite,
        addFollowingUser: addFollowingUser,
        addFollowerUser: addFollowerUser,
        removeFollowingUser: removeFollowingUser,
        removeFollowerUser: removeFollowerUser,
        findAlreadyFollowingUser: findAlreadyFollowingUser,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowersUsers: findAllFollowersUsers,
        setModel: setModel
    };
    return api;

    function findAllUsers() {
        return UserModel.find();
    }

    function favoriteMusic(userId, musicId) {
        return UserModel
            .update({
                    _id : userId
                },
                {
                    $addToSet: {favorites: musicId}
                });
    }

    function undoFavoriteMusic(userId, musicId) {
        return UserModel.update({_id: userId}, {$pullAll: {favorites: [musicId]}});
    }

    function findMusicByFavorite(userId, musicId) {
        return UserModel.findOne({_id: userId, favorites: {$in: [musicId]}});
    }

    function addFollowingUser(followerId, followingId) {
        return UserModel.update(
            {_id: followerId},
            {$addToSet: {following: followingId}}
        );
    }

    function addFollowerUser(followerId, followingId) {
        return UserModel.update(
            {_id: followingId},
            {$addToSet: {follower: followerId}}
        );
    }

    function removeFollowingUser(followerId, followingId) {
        return UserModel.update(
            {_id: followerId},
            {$pullAll: {following: [followingId]}}
        );
    }

    function removeFollowerUser(followerId, followingId) {
        return UserModel.update(
            {_id: followingId},
            {$pullAll: {follower: [followerId]}}
        );
    }

    function findAlreadyFollowingUser(followerId, followingId) {
        return UserModel.findOne(
            {_id: followerId,
                following: {$in: [followingId]}
            });
    }

    function findAllFollowingUsers(users) {
        return UserModel.find({_id: {$in: users}});
    }

    function findAllFollowersUsers(users) {
        return UserModel.find({_id: {$in: users}});
    }

    /*
     * no changes below this line
     * */


    function findUserBySpotifyId(spotId) {
        return UserModel
            .findOne({
                "spotify.id": spotId
            });
    }

    function findUserByInstagramId(instaId) {
        return UserModel
            .findOne({
                "insta.id": instaId
            });
    }

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
                email : user.email,
                phone : user.phone,
                birthDate: user.birthDate
            })
    }

};
