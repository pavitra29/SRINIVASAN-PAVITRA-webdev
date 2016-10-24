(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.create = create;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function create(page) {

            vm.error=null;
            vm.success=null;

            if(!page || !page.name) {
                vm.error = "Page name cannot be empty!";
            }
            else {

                var exists = false;
                for(var p in vm.pages) {
                    if(vm.pages[p].name === page.name) {
                        exists = true;
                        break;
                    }
                }

                if(exists) {
                    vm.error = "Page name already exists!";
                }
                else {
                    PageService.createPage(vm.websiteId, page);
                    $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");
                }
            }
        }
    }

})();
