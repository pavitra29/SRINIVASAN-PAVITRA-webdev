module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");

    var MusicSchema = require("./music.schema.server")();
    var MusicModel = mongoose.model("MusicModel", MusicSchema);

    var api = {
        addMusic: addMusic,
        findMusicById: findMusicById,
        findAllFavoriteMusic: findAllFavoriteMusic
    };
    return api;

    function addMusic(music) {
        var newMusicObj = {
            "name": music.name,
            "imageUrl": music.imageUrl
        };

        console.log(newMusicObj);

        return MusicModel
            .findOneAndUpdate(
            {_id: music.id.toString()},
            newMusicObj, {upsert: true});
    }

    function findMusicById(musicId) {
        return MusicModel.findById(musicId);
    }

    function findAllFavoriteMusic(musicIds) {

        console.log("inside model");

        return MusicModel.find({_id: {$in: musicIds}});
    }


};
