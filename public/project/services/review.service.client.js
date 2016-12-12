(function () {

    angular
        .module("SpotTunesApp")
        .factory("ReviewService", ReviewService);


    function ReviewService($http) {
        var api = {
            findAllReviewsByMusicId: findAllReviewsByMusicId,
            addReview: addReview,
            updateReview: updateReview,
            deleteReview: deleteReview,
            findAllReviewsByUserId: findAllReviewsByUserId
        };
        return api;

        function findAllReviewsByMusicId(musicId) {
            return $http.get("/api/music/" + musicId + "/reviews");
        }

        function addReview(userId, musicId, review) {
            return $http.post("/api/user/" + userId + "/music/" + musicId, review);
        }

        function updateReview(musicId, reviewId, review) {
            return $http.put("/api/music/" + musicId + "/review/" + reviewId, review);
        }

        function deleteReview(musicId, reviewId) {
            return $http.delete("/api/music/" + musicId + "/review/" + reviewId);
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/user/" + userId + "/reviews");
        }
    }

})();