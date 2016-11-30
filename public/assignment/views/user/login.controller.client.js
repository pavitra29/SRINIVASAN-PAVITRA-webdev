(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login() {

            // UserService
            //     .findUserByCredentials(vm.user.username,vm.user.password)

            UserService
                .login(vm.user.username,vm.user.password)
                .success(function (user) {

                    if(!user) {
                        vm.error = "No such user";
                    } else {
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    }

                })
                .error(function () {

                });

        }
    }
})();



