(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);
    
    function NewPageController($routeParams, PageService) {
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

            if(!page || (!page.name)) {
                vm.error = "No information found to create new page";
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
                    var newPage = PageService.createPage(vm.websiteId, page);
                    vm.pages.push(newPage);
                    // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
                    vm.success = "New Page successfully created!";
                }
            }
        }
    }
    
})();
