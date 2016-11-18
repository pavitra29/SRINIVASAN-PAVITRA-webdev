(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);


    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;

        vm.websiteId = $routeParams['wid'];
        vm.userId = $routeParams['uid'];

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {

            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (user) {
                    vm.websites = user.websites;
                })
                .error(function () {

                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website
                })
                .error(function () {

                });

        }
        init();


        function deleteWebsite(wid) {
            WebsiteService
                .deleteWebsite(wid)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");        
                })
                .error(function () {
                    
                });
            

        }

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(website._id,website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");        
                })
                .error(function () {
                    
                });
            
        }
    }

})();
