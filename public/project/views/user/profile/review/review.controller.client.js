(function() {

    angular
        .module("SpotTunesApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($routeParams, ReviewService, $rootScope, UserService) {
        var vm = this;

        vm.navigateUserId = $routeParams.userId;

        function init() {

            if(!vm.navigateUserId) {
                UserService
                    .findCurrentUser()
                    .success(function (user) {
                        if(user != '0') {

                            vm.user = user;
                            $rootScope.currentUser = user;


                            ReviewService.findAllReviewsByUserId(vm.user._id)
                                .then(function (response) {
                                        vm.reviews = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    });
                        }
                    })
                    .error(function () {

                    });

            }
            else {
                UserService
                    .findCurrentUser()
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            vm.loggedInUserId = user._id;
                            $rootScope.currentUser = user;

                            UserService
                                .findUserById(vm.navigateUserId)
                                .then(function (response) {
                                    var user = response.data;
                                    if (user) {
                                        vm.navigatedUser = user;
                                        vm.user = user;
                                    }
                                });

                            ReviewService.findAllReviewsByUserId(vm.navigateUserId)
                                .then(function (response) {
                                        vm.reviews = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    });
                        }
                    });


            }
        }

        init();
    }
})();