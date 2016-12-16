(function () {
    
    angular
        .module("SpotTunesApp")
        .controller("AdminController", AdminController);
    
    
    function AdminController(UserService) {

        var vm = this;
        vm.adminDeleteUser = adminDeleteUser;

        function init() {
            UserService
                .findAllUsers()
                .success(function (users) {
                    vm.users = users;
                })
                .error(function (error) {
                    console.log(error)
                })
        }
        init();


        function adminDeleteUser(index) {

            UserService
                .adminDeleteUser(vm.users[index]._id)
                .success(function () {
                    init();
                })
                .error(function () {

                });
        }
    }
    
})();
