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
        yelp: {
            id:    String,
            token: String
        },
        email: String,
        phone: String,
        role: {type: String, default: 'STUDENT', enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "user"});

    return UserSchema;

};
