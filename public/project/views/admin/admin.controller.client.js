(function () {
    
    angular
        .module("SpotTunesApp")
        .controller("AdminController", AdminController);
    
    
    function AdminController(UserService) {

        var vm = this;

        UserService
            .findAllUsers()
            .success(function (users) {
                vm.users = users;
            })
            .error(function (error) {
                console.log(error)
            })
    }
    
})();
