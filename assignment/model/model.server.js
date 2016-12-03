module.exports = function () {
    var mongoose = require('mongoose');
    // mongoose.connect('mongodb://127.0.0.1:27017/wam-fall-2016');

    var mongoLocalURI = 'mongodb://localhost/wam-fall-2016';
    mongoose.connect(process.env.MONGODB_URI || mongoLocalURI);

    // console.log(process.env.MONGODB_URI);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;

};
