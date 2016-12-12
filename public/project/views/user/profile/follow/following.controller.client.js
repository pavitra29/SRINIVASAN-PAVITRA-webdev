(function () {

    angular
        .module("SpotTunesApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($q, $routeParams, UserService, ReviewService) {
        var vm = this;

        vm.follow = follow;
        vm.unfollow = unfollow;

        vm.navigateUserId = $routeParams.userId;

        function init() {
            UserService
                .findCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.loggedInUserId = user._id;
                        return UserService.findAllFollowingUsers(vm.navigateUserId);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                        isAlreadyFollowing(vm.users);

                        UserService
                            .findUserById(vm.navigateUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navigatedUser = user;
                                }
                            });
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

        init();

        function isAlreadyFollowing(users) {
            var promiseArray = [];
            var result = [];

            users.forEach(function (element, index, array) {
                promiseArray
                    .push(
                        UserService
                            .isAlreadyFollowing(vm.loggedInUserId, element._id)
                            .then(
                                function (response) {
                                    var user = element;

                                    if (user._id != vm.loggedInUserId) {
                                        user.alreadyFollowing = response.data ? true : false;
                                    }
                                    else {
                                        user.itsMe = true;
                                    }

                                    result.push(user);
                                },
                                function (err) {
                                    console.log(err);
                                })
                    );
            });

            $q.all(promiseArray).then(function () {
                vm.users = result;
            });
        }

        function follow(index) {
            var userId = vm.users[index]._id;
            UserService
                .follow(vm.loggedInUserId, userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.users[index].alreadyFollowing = (status.n == 1 || status.nModified == 1) && status.ok == 1 ? true : false;
                });
        }

        function unfollow(index) {
            var userId = vm.users[index]._id;
            UserService
                .unfollow(vm.loggedInUserId, userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.users[index].alreadyFollowing = (status.n == 1 || status.nModified == 1) && status.ok == 1 ? false : true;
                });
        }
    }

})();