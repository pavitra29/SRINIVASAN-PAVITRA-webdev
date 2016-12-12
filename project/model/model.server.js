module.exports = function () {
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/webdev-project-2016');

    // var mongoLocalURI = 'mongodb://localhost/webdev-project-2016'; //will be needed to run on Heroku
    // mongoose.connect(process.env.MONGODB_URI || mongoLocalURI);

    var userModel = require("./user/user.model.server")();
    var musicModel = require("./music/music.model.server")();
    var reviewModel = require("./review/review.model.server")();

    var model = {
        userModel: userModel,
        musicModel: musicModel,
        reviewModel: reviewModel
    };

    userModel.setModel(model);
    // musicModel.setModel(model);
    // reviewModel.setModel(model);

    return model;

};
