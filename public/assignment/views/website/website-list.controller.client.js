(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams.uid;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (user) {
                    vm.websites = user.websites;
                })
                .error(function () {

                });
        }
        init();

    }
})();
