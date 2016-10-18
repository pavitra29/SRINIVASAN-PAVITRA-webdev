(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;

        vm.uid = $routeParams.pid;
        vm.wid = $routeParams.pid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.pid;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }

        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);


        }


        function checkSafeYouTubeUrl(url) {

            var parts = url.split('/');

            var id = parts[parts.length-1];

            console.log(id);

            url = "https://www.youtube.com/embed/"+id;

            console.log(url);

            return $sce.trustAsResourceUrl(url);

        }
    }
    
})();
