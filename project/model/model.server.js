module.exports = function () {
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/webdev-project-2016');

    // var mongoLocalURI = 'mongodb://localhost/webdev-project-2016'; //will be needed to run on Heroku
    // mongoose.connect(process.env.MONGODB_URI || mongoLocalURI);

    var userModel = require("./user/user.model.server")();

    var model = {
        userModel: userModel
    };

    userModel.setModel(model);

    return model;

};
