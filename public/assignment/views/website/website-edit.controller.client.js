(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    
    
    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        var websiteId = $routeParams.wid;

        vm.userId = $routeParams.uid;

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);

        }
        init();

        // var userId = $routeParams["uid"];
        // function init() {
        //     vm.website = WebsiteService.findWebsitesByUser(userId);
        // }
        // init();


    }
    
})();
