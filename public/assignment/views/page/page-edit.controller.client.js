(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);


    function EditPageController($routeParams, $location, PageService, $scope) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                });
            
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function () {
                    
                });
        }
        init();


        function updatePage(page) {

            if(!page || !page.name) {
                vm.error = "Page name cannot be empty!";
            }
            else {

                if($scope.editPageForm.$valid) {

                    PageService
                        .updatePage(page._id, page)
                        .success(function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        })
                        .error(function () {

                        });
                }
            }
        }

        function deletePage(pageId) {

            PageService
                .deletePage(pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");        
                })
                .error(function () {
                    
                });
            
        }

    }
})();
