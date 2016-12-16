(function () {
    angular
        .module("SpotTunesApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope, ReviewService) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout =  logout;
        vm.isFollowing = false;
        vm.follow = follow;
        vm.unfollow = unfollow;

        vm.navigateUserId = $routeParams["uid"];

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
                            console.log("Want to follow: " + vm.navigateUserId);
                            console.log("Logged in as: " + vm.loggedInUserId);
                            isAlreadyFollowing();

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

        function logout() {
            UserService.logout()
                .success(function () {
                    $rootScope.currentUser = null;

                    $location.url('/login');
                });
        }

        function updateUser() {

            vm.error=null;
            vm.success=null;

            if(!vm.user || (!vm.user.username && !vm.user.email && !vm.user.firstName && !user.lastName)) {
                vm.error="No details found to update";
            }
            else {

                console.log(vm.user);

                UserService
                    .updateUser(vm.user)
                    .success(function () {
                        vm.success = "User successfully updated!";
                    })
                    .error(function () {

                    });
            }
        }

        function deleteUser() {

            UserService
                .deleteUser(vm.user._id)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });
        }

        function follow() {

            UserService
                .follow(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {

                    console.log(response);

                    var status = response.data;
                    vm.alreadyFollowing = (status.n == 1 || status.nModified == 1) && status.ok == 1 ? true : false;

                    UserService
                        .findUserById(vm.navigateUserId)
                        .success(function (user) {
                            vm.user = user;
                        })

                });
        }

        function unfollow() {
            UserService
                .unfollow(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {
                    var status = response.data;
                    vm.alreadyFollowing = (status.n == 1 || status.nModified == 1) && status.ok == 1 ? false : true;

                    UserService
                        .findUserById(vm.navigateUserId)
                        .success(function (user) {
                            vm.user = user;
                        })
                });

        }

        function isAlreadyFollowing() {
            UserService
                .isAlreadyFollowing(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {
                    vm.alreadyFollowing = response.data ? true : false;
                });
        }
    }
})();
