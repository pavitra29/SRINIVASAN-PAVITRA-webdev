module.exports = function () {

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

        return MusicModel
            .findOneAndUpdate(
            {_id: music.id.toString()},
            newMusicObj, {upsert: true});
    }

    function findMusicById(albumId) {
        return MusicModel.findById(albumId);
    }

    function findAllFavoriteMusic(musicIds) {
        return MusicModel.find({_id: {$in: musicIds}});
    }


};
