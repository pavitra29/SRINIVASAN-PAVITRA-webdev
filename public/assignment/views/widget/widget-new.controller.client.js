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

        vm.create = create;

        function create(widget) {

            vm.success=null;

            var widgetId = parseInt(Math.floor(Math.random()*900) + 100);


            widget._id = widgetId;

            console.log([widget.widgetType]);

            var newWidget = {
                "_id": widgetId,
                "widgetType": widget.widgetType,
                "pageId": vm.pageId
            };

            if(widget.widgetType === "HEADER") {
                newWidget.size = "4";
                newWidget.text = "This is new Header!";
            }
            else if (widget.widgetType === "HTML") {
                newWidget.text = "<p>This is new dynamic HTML</p>";
            }
            else if (widget.widgetType === "IMAGE") {
                newWidget.width = "100%";
                newWidget.url = "http://lorempixel.com/400/200/";
            }
            else if (widget.widgetType === "YOUTUBE") {
                newWidget.width = "100%";
                newWidget.url = "https://youtu.be/AM2Ivdi9c4E";
            }
            else {
                vm.error = "Unable to create widget"
            }


            WidgetService.createWidget(vm.pageId,newWidget);

            vm.success = "Widget "+ widget.widgetType +" successfully created!";

            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
        }
    }
    
})();
