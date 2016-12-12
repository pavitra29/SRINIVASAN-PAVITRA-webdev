(function() {

    angular
        .module("SpotTunesApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($routeParams, ReviewService) {
        var vm = this;

        function init() {
            var userId = $routeParams.userId;
            ReviewService.findAllReviewsByUserId(userId)
                .then(function (response) {
                        vm.reviews = response.data;
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        init();
    }
})();