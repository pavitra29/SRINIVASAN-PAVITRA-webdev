(function(){
    angular
        .module("MyAngularApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login() {

            // commented to implement login using localStrategy of passport js
            // UserService
            //     .findUserByCredentials(vm.user.username,vm.user.password)

            if(!vm.user || (!vm.user.username || !vm.user.password)) {
                vm.error="Please enter all details";
            }
            else {
                UserService
                    .login(vm.user.username, vm.user.password)
                    .success(function (user) {

                        if (!user) {
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
    }
})();



