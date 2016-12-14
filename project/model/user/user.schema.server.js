module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String},
        firstName: String,
        lastName: String,
        google: {
            id: String,
            token: String
        },
        facebook: {
            id:    String,
            token: String
        },
        insta: {
            id:    String,
            token: String
        },
        spotify: {
            id: String,
            token: String
        },
        favorites: [String],
        follower: [String],
        following: [String],
        email: String,
        phone: String,
        birthDate : {type: Date},
        imageUrl: String,
        role: {type: String, default: 'USER', enum: ['ADMIN', 'USER']},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "user"});

    return UserSchema;

};
