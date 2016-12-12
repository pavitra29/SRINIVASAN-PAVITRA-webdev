(function () {
    angular
        .module("SpotTunesApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;

        vm.createUser = createUser;

        function createUser() {

            if(!vm.user || (!vm.user.username || !vm.user.password || !vm.user.password2)) {
                vm.error="Please enter all details";
            }
            else if (vm.user.password !== vm.user.password2) {
                vm.error = "Passwords don't match";
            }
            else {

                var userExists = null;

                UserService
                    .findUserByUsername(vm.user.username)
                    .success(function (user) {
                        if(user != '0') {
                            userExists = user;

                            if (userExists) {
                                vm.error = "Username already exists";
                            }

                        }
                        else {
                            UserService
                                .register(vm.user)
                                .then(
                                    function(response) {
                                        var user = response.data;
                                        $rootScope.currentUser = user;
                                        $location.url("/user/"+user._id);
                                    });
                        }
                    })
                    .error(function () {

                    });
            }
        }
    }

})();
