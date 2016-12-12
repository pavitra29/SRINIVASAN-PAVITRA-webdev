module.exports = function () {

    var mongoose = require('mongoose');

    var MusicSchema = mongoose.Schema({
        _id: String,
        name: String,
        imageUrl: String
    }, {collection: 'music'});

    return MusicSchema;

};
