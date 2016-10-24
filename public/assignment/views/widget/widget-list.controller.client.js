(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImage = checkSafeImage;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }


        function checkSafeYouTubeUrl(url) {

            var parts = url.split('/');

            var id = parts[parts.length-1];

            url = "https://www.youtube.com/embed/"+id;

            return $sce.trustAsResourceUrl(url);

        }

        function checkSafeImage(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }

})();
