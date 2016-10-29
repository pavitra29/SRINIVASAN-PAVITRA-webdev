(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {

            // console.log(username,password);

            var promise = UserService.findUserByCredentials(username,password);

            promise
                .success(function (user) {
                    console.log(user);
                    if(user === '0') {
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }

                })
                .error(function (bbb) {
                    console.log(bbb);
                });



        }
    }
})();



