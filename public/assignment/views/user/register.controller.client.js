(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;

        vm.createUser = createUser;

        function createUser() {

            if(!vm.user || (vm.user.username == null || vm.user.password == null || vm.user.password2 == null)) {
                vm.error="Please enter all details";
            }
            else if (vm.user.password !== vm.user.password2) {
                vm.error = "Passwords don't match";
            }
            else {

                var userExists = null;

                UserService
                    .register(vm.user)
                    .then(
                        function(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            // console.log($rootScope.currentUser);
                            $location.url("/user/"+user._id);
                        });

                // UserService
                //     .findUserByUsername(vm.user.username)
                //     .success(function (user) {
                //         if(user != '0') {
                //             userExists = user;
                //
                //             if (userExists) {
                //                 vm.error = "Username already exists";
                //             }
                //
                //         }
                //         else {
                //             UserService
                //                 .createUser(vm.user)
                //                 .success(function (user) {
                //                     $location.url("/user/" + user._id);
                //                 })
                //                 .error(function () {
                //                     vm.error = "Error in creating user";
                //                 });
                //         }
                //     })
                //     .error(function () {
                //
                //     });
            }
        }
    }

})();
