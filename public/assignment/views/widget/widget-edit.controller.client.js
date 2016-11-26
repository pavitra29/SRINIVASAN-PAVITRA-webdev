(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {

            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;

                    console.log("Inside edit widget");

                })
                .error(function () {

                });
        }
        init();

        function updateWidget(widget) {

            WidgetService
                .updateWidget(vm.widgetId, widget)
                .success(function () {
                    console.log("Update completed!");
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {
                    
                });


        }

        function deleteWidget() {

            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {

                });

        }

    }

})();
