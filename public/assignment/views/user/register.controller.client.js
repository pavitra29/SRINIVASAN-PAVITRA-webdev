(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.createUser = createUser;

        function createUser() {

            if(!vm.user) {
                vm.error="Please enter all details";
            }
            else if(user.username == null || user.password == null || user.password2 == null) {
                vm.error="Please enter all details";
            }
            else {
                var userExists = UserService.findUserByUsername(user.username);

                if (userExists != null) {
                    vm.error = "Username already exists";
                }
                else if (user.password !== user.password2) {
                    vm.error = "Passwords don't match";
                }
                else if (user && !userExists) {

                    UserService
                        .createUser(user)
                        .success(function () {
                            $location.url("/user/" + user._id);
                        })
                        .error(function () {

                        });

                    // console.log([newUser.username,newUser.password,newUser.password2,newUser._id]);


                }
                else {
                    vm.error = "Error in creating user";
                }
            }
        }
    }

})();
