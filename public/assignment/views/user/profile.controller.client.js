(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var userId = $routeParams["uid"];

        function init() {

            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function () {

                });
        }
        init();

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
