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

        // var userId = $routeParams["uid"]; //userId not needed as the current user is in session

        vm.navigateUserId = $routeParams["uid"];

        function init() {

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

                        if(vm.navigateUserId) {
                           if(vm.navigateUserId != vm.loggedInUserId) {
                               UserService
                                   .findUserById(vm.navigateUserId)
                                   .then(function (response) {
                                       console.log(response);
                                       var user = response.data;
                                       if (user) {
                                           vm.navigatedUser = user;
                                       }
                                   });

                               if (vm.navigateUserId == vm.loggedInUserId) {
                                   vm.user = $rootScope.currentUser;
                               }
                               else {
                                   vm.user = vm.navigatedUser;
                               }
                           }
                        }


                        if(!vm.navigateUserId) {
                            vm.user = $rootScope.currentUser;
                        }

                        console.log(vm.user);

                        if(vm.user) {
                            ReviewService.findAllReviewsByUserId(vm.user._id)
                                .then(function (response) {
                                        vm.reviews = response.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    });
                        }

                        if(!vm.navigateUserId) {
                            vm.navigateUserId = $rootScope.currentUser._id;
                        }
                    }
                });

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

            console.log([vm.loggedInUserId, vm.navigateUserId]);

            UserService
                .follow(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.alreadyFollowing = (status.n == 1 || status.nModified == 1) && status.ok == 1 ? true : false;
                });
        }

        function unfollow() {
            UserService
                .unfollow(vm.loggedInUserId, vm.navigateUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.alreadyFollowing = (status.n == 1 || status.nModified == 1) && status.ok == 1 ? false : true;
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
