module.exports = function () {

    var mongoose = require('mongoose');

    var ReviewSchema = require("./review.schema.server")();
    var ReviewModel = mongoose.model("ReviewModel",ReviewSchema);

    var api = {
        findAllReviewsByMusicId: findAllReviewsByMusicId,
        addReview: addReview,
        updateReview: updateReview,
        deleteReview: deleteReview,
        findAllReviewsByUserId: findAllReviewsByUserId
    };
    return api;

    function findAllReviewsByMusicId(musicId) {
        return ReviewModel.find({musicId: musicId});
    }

    function addReview(userId, musicId, review) {
        review.userId = userId;
        review.musicId = musicId;
        return ReviewModel.create(review);
    }

    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = new Date();
        return ReviewModel.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id: reviewId});
    }

    function findAllReviewsByUserId(userId) {
        return ReviewModel.find({userId: userId});
    }

};