(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $location, $routeParams) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.createWidget = createWidget;

        function createWidget(widget) {

            WidgetService
                .createWidget(vm.pageId,widget)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
                })
                .error(function () {

                });

        }
    }

})();
