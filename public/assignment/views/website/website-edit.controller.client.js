(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    
    
    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;

        vm.websiteId = $routeParams['wid'];

        vm.userId = $routeParams['uid'];

        vm.remove = remove;
        vm.update = update;

        function init() {

            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

            vm.website = WebsiteService.findWebsiteById(vm.websiteId);

        }
        init();


        function remove(wid) {

            WebsiteService.deleteWebsite(wid);
            $location.url("/user/"+vm.userId+"/website");

        }

        function update(website) {
            WebsiteService.updateWebsite(website._id,website);
            $location.url("/user/"+vm.userId+"/website");
        }
    }
    
})();
