(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);


    function EditWebsiteController($routeParams, $location, WebsiteService, $scope) {
        var vm = this;

        vm.websiteId = $routeParams['wid'];
        vm.userId = $routeParams['uid'];

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {

            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
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

            if(!website || !website.name) {
                vm.error = "Website name cannot be empty!";
            }
            else {

                if($scope.editWebsiteForm.$valid) {
                    WebsiteService
                        .updateWebsite(website._id, website)
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
