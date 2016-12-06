(function () {
    angular
        .module("MyAngularApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout =  logout;

        // var userId = $routeParams["uid"]; //userId not needed as the current user is in session

        function init() {

            UserService
                // .findUserById(userId)
                .findCurrentUser() //returning the current user from session which is stored in req.user on server
                .success(function (user) {
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function () {

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
    }
})();
