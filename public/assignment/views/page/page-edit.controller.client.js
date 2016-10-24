(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);


    function EditPageController($routeParams, $location, PageService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.update = update;
        vm.remove = remove;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();


        function update(page) {

            if(!page || !page.name) {
                vm.error = "Page name cannot be empty!";
            }
            else {
                PageService.updatePage(page._id, page);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

        function remove(pageId) {

            PageService.deletePage(pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

    }
})();
