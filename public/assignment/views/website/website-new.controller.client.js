(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {

                });
        }
        init();

        function createWebsite(website) {

            vm.error=null;
            vm.success=null;

            if(!website || !website.name) {
                vm.error = "Website name cannot be empty!";
            }
            else {

                var exists = false;

                for(var e in vm.websites) {
                    if(vm.websites[e].name === website.name) {
                        exists = true;
                        break;
                    }
                }

                if(exists) {
                    vm.error = "Website name already exists";
                }
                else {

                    website._id = (new Date()).getTime();
                    website.developerId = vm.userId;

                    WebsiteService
                        .createWebsite(vm.userId, website)
                        .success(function () {
                            $location.url("/user/" + vm.userId + "/website");
                        })
                        .error(function () {

                        });
                }
            }
        }
    }
})();
