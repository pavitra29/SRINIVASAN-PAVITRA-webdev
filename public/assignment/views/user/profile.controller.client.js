(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        vm.update = update;
        vm.remove = remove;

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

        function update(userId, user) {

            vm.error=null;
            vm.success=null;

            if(!user || (!user.username && !user.email && !user.firstName && !user.lastName)) {
                vm.error="No details found to update";
            }
            else {
                vm.user = UserService.updateUser(userId, user);

                vm.success = "User successfully updated!";
            }
        }

        function remove(userId) {

            UserService
                .deleteUser(userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });

        }
    }
})();
