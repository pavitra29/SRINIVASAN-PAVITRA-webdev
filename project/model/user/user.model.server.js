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
        isAlreadyFollowing: isAlreadyFollowing,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowersUsers: findAllFollowersUsers,
        setModel: setModel,
        findAllUsers: findAllUsers
    };
    return api;

    function findAllUsers() {
        return UserModel.find();
    }

    function favoriteMusic(userId, albumId) {
        return UserModel
            .update({
                    _id : userId
                },
                {
                    $addToSet: {favorites: albumId}
                });
    }

    function undoFavoriteMusic(userId, albumId) {
        return UserModel.update({_id: userId}, {$pullAll: {favorites: [albumId]}});
    }

    function findMusicByFavorite(userId, albumId) {
        return UserModel.findOne({_id: userId, favorites: {$in: [albumId]}});
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

    function isAlreadyFollowing(followerId, followingId) {
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
        return UserModel.findById(userId);
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
                birthDate: user.birthDate,
                imageUrl: user.imageUrl
            })
    }

};
