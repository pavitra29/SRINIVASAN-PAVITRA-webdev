(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $sce) {
        var vm = this;

        vm.uid = $routeParams.pid;
        vm.wid = $routeParams.pid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.pid;


        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }

        init();

    }

})();
