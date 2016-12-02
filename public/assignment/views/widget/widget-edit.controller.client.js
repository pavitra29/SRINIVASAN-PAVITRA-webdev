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
                })
                .error(function () {

                });
        }
        init();

        function updateWidget(widget) {

            if(!widget || !widget.name) {
                vm.error = "Widget name cannot be empty!";
            }
            else {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {

                    });

            }
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
