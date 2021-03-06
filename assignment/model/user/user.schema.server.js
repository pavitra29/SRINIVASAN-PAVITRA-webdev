module.exports = function () {

    var mongoose = require("mongoose");

    // commented sections are from Implementation 1
    // var WebsiteSchema = require("../website/website.schema.server");

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
        email: String,
        phone: String,
        role: {type: String, default: 'STUDENT', enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}], //Implementation 2
        // websites: [WebsiteSchema],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "user"});

    return UserSchema;

    /*

     Implementation 1:

     // var WebsiteSchema = require("../website/website.schema.server");

     // websites: [WebsiteSchema],

     // how its stored in mongoose
     var user = {
     username: 'alice',
     websites: [
     {_id: "123", name: 'facebook.com'},
     {_id: "234", name: 'twitter'}
     ]
     }
     */

};
