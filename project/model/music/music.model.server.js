module.exports = function () {

    var mongoose = require("mongoose");

    var MusicSchema = require("./music.schema.server")();
    var MusicModel = mongoose.model("MusicModel", MusicSchema);

    var api = {
        addAlbum: addAlbum,
        findAlbumById: findAlbumById,
        findAllFavoriteMusic: findAllFavoriteMusic
    };
    return api;

    function addAlbum(music) {
        var newMusicObj = {
            "name": music.name,
            "imageUrl": music.imageUrl
        };

        return MusicModel
            .findOneAndUpdate(
            {_id: music.id.toString()},
            newMusicObj, {upsert: true});
    }

    function findAlbumById(albumId) {
        return MusicModel.findById(albumId);
    }

    function findAllFavoriteMusic(musicIds) {
        return MusicModel.find({_id: {$in: musicIds}});
    }


};
