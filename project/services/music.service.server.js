module.exports = function (app,model) {

    app.post("/api/music", addMusic);

    function addMusic(req, res) {
        var music = req.body;
        model
            .musicModel
            .addMusic(music)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};
