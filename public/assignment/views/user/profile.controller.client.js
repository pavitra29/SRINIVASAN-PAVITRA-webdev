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

            user = UserService.findUserById(userId);

            if(user != null) {
                vm.user = user;
            }

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

            vm.user = UserService.deleteUser(userId);

            $location.url("/login");
        }
    }
})();
