module.exports = function () {

    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema({
        title: String,
        description: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        musicId: String,
        userId: String,
        rating: String
    },{collection: 'review'});

    return ReviewSchema;
};
