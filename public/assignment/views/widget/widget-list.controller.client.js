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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;

                    // var allWidgets = $(".wam-widget");
                    // console.log(allWidgets.length);
                    //
                    // var widgetsSortable = $(".wam-widget")
                    //     .sortable({
                    //         axis: 'y'
                    // });
                    // console.log(widgetsSortable);
                })
                .error(function () {
                    
                });
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
