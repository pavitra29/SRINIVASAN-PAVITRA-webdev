(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];

        vm.createNewWebsite = createNewWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createNewWebsite(website) {

            vm.error=null;
            vm.success=null;

            if(!website || (!website.name  && !website.description)) {
                vm.error = "No information found to create new website";
            }
            else {

                var exists = false;

                console.log([vm.websites.length]);

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

                    console.log([website.name, website.description]);
                    var newWebsite = WebsiteService.createWebsite(vm.userId, website);
                    vm.websites.push(newWebsite);
                    // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
                    vm.success = "New website successfully created!"
                }
            }
        }
    }
})();
