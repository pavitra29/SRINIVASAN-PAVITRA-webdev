(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.createPage = createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                });
        }
        init();

        function createPage(page) {

            vm.error=null;

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

                    // page._id = (new Date()).getTime();
                    page.websiteId = vm.websiteId;

                    PageService
                        .createPage(vm.websiteId, page)
                        .success(function () {
                            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");        
                        })
                        .error(function () {
                            
                        });
                    
                }
            }
        }
    }

})();
