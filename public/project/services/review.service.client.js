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

        function findAllReviewsByMusicId(albumId) {
            return $http.get("/api/music/" + albumId + "/reviews");
        }

        function addReview(userId, albumId, review) {
            return $http.post("/api/user/" + userId + "/music/" + albumId, review);
        }

        function updateReview(albumId, reviewId, review) {
            return $http.put("/api/music/" + albumId + "/review/" + reviewId, review);
        }

        function deleteReview(albumId, reviewId) {
            return $http.delete("/api/music/" + albumId + "/review/" + reviewId);
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/user/" + userId + "/reviews");
        }
    }

})();