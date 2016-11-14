module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        title: String
    });
    return PageSchema;
};