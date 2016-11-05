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

            // console.log("create widget: "+widget.widgetType);

            // if(widget.widgetType === "header") {
            //     widget.size = "4";
            //     widget.text = "This is new Header!";
            // }
            // else if (widget.widgetType === "html") {
            //     widget.text = "<p>This is new dynamic HTML</p>";
            // }
            // else if (widget.widgetType === "image") {
            //     widget.width = "100%";
            //     widget.url = "http://lorempixel.com/400/200/";
            // }
            // else if (widget.widgetType === "youtube") {
            //     widget.width = "100%";
            //     widget.url = "https://youtu.be/AM2Ivdi9c4E";
            // }
            // else {
            //     vm.error = "Unable to create widget"
            // }

            widget._id = (new Date()).getTime();
            widget.pageId = vm.pageId;

            WidgetService
                .createWidget(vm.pageId,widget)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
                })
                .error(function () {
                    
                });

        }
    }

})();
