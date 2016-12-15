var q = require('q');
module.exports = function (app, model) {
    app.get("/api/music/:albumId/reviews", findAllReviewsByMusicId);
    app.post("/api/user/:userId/music/:albumId", addReview);
    app.put("/api/music/:albumId/review/:reviewId", updateReview);
    app.delete("/api/music/:albumId/review/:reviewId", deleteReview);
    app.get("/api/user/:userId/reviews", findAllReviewsByUserId);

    function findAllReviewsByMusicId(req, res) {
        var albumId = req.params.albumId;
        model
            .reviewModel
            .findAllReviewsByMusicId(albumId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addReview(req, res) {
        var userId = req.params.userId;
        var albumId = req.params.albumId;
        var review = req.body;
        model
            .reviewModel
            .addReview(userId, albumId, review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;
        model
            .reviewModel
            .updateReview(reviewId, review)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        model
            .reviewModel
            .deleteReview(reviewId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllReviewsByUserId(req, res) {
        var reqUserId = req.params.userId;
        model
            .reviewModel
            .findAllReviewsByUserId(reqUserId)
            .then(
                function (reviews) {
                    var promiseArray = [];
                    var result = [];

                    reviews.forEach(function (element, index, array) {
                        promiseArray
                            .push(
                                model
                                    .musicModel
                                    .findMusicById(element.albumId)
                                    .then(
                                        function (music) {
                                            if (music) {
                                                var jsonString = JSON.stringify(element);
                                                var jsonStringNew = jsonString;
                                                var review = JSON.parse(jsonStringNew);
                                                review.music = music;
                                                result.push(review);
                                            }
                                        },
                                        function (err) {
                                            console.log(err);
                                        })
                            );
                    });

                    q.all(promiseArray).then(function () {
                        res.json(result);
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}