(function () {

    angular
        .module("SpotTunesApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($q, $routeParams, UserService, ReviewService, $rootScope) {
        var vm = this;

        vm.follow = follow;
        vm.unfollow = unfollow;

        vm.navigateUserId = $routeParams.userId;

        function init() {

            if(!vm.navigateUserId) {

                UserService
                    .findCurrentUser()
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                            vm.user = user;
                            vm.loggedInUserId = user._id;

                            ReviewService.findAllReviewsByUserId(vm.user._id)
                                .then(function (response) {
                                        vm.reviews = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    });

                            return UserService.findAllFollowingUsers(vm.user._id);
                        }
                    })
                    .then(function (response) {
                        var users = response.data;
                        if (users) {
                            vm.users = users;
                            isAlreadyFollowing(vm.users);
                        }
                    });

            }
            else {
                UserService
                    .findCurrentUser()
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                            vm.loggedInUserId = user._id;

                            ReviewService.findAllReviewsByUserId(vm.navigateUserId)
                                .then(function (response) {
                                        vm.reviews = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    });

                            UserService
                                .findUserById(vm.navigateUserId)
                                .then(function (response) {
                                    var user = response.data;
                                    if (user) {
                                        vm.navigatedUser = user;
                                        vm.user = user;
                                    }
                                });

                            return UserService.findAllFollowingUsers(vm.navigateUserId);
                        }
                    })
                    .then(function (response) {
                        var users = response.data;
                        if (users) {
                            vm.users = users;
                            isAlreadyFollowing(vm.users);
                        }
                    });
            }

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
                                        if (response.data) {
                                            user.alreadyFollowing = true;
                                        }
                                        else {
                                            user.alreadyFollowing = false;
                                        }
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

                    UserService
                        .findUserById(vm.loggedInUserId)
                        .success(function (user) {
                            vm.user = user;
                        })
                });

            UserService.findAllFollowingUsers(vm.loggedInUserId);
        }

        function unfollow(index) {
            var userId = vm.users[index]._id;

            console.log(vm.loggedInUserId, userId);

            UserService
                .unfollow(vm.loggedInUserId, userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.users[index].alreadyFollowing = (status.n == 1 || status.nModified == 1) && status.ok == 1 ? false : true;

                    UserService
                        .findUserById(vm.loggedInUserId)
                        .success(function (user) {
                            vm.user = user;
                        })
                });

            UserService.findAllFollowingUsers(vm.loggedInUserId);
        }
    }

})();