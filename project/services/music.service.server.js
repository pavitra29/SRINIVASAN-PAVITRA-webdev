module.exports = function (app,model) {

    app.post("/api/music", addAlbum);

    function addAlbum(req, res) {
        var music = req.body;
        model
            .musicModel
            .addAlbum(music)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

};
