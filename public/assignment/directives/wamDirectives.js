(function () {

    angular
        .module("wamDirectives",[])
        .directive("wamSortable", wamSortable); // wam-sortable

    function wamSortable() {
        // console.log("Hello from Sortable");


        function linker(scope, element, attributes) {

            var start = -1;
            var end = -1;

            element
                .sortable({
                    start: function (event, ui) {
                        start = $(ui.item).index();

                        // console.log($(ui.item).index());
                    },
                    stop: function (event, ui) {
                        end = $(ui.item).index();
                        scope.wamSortableController.sort(start, end);

                        // console.log($(ui.item).index());
                    },
                    axis: 'y'
                });
        }

        return {
            scope: {},
            link: linker,
            controller: wamSortableController,
            controllerAs: 'wamSortableController'
        }

    }

    function wamSortableController($routeParams, WidgetService) {
        var vm = this;

        vm.sort = sort;

        var pageId = $routeParams.pid;

        function sort(start, end) {
            WidgetService.sort(pageId, start, end);
        }
    }

})();