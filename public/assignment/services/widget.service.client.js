(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    
    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "The Best Hidden Features in iOS 10"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "https://i.ytimg.com/vi/ymVXuT0Yfl4/maxresdefault.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>By now, you’ve probably had some time to play around with iOS 10 and get acquainted with all the new features. We’ve already told you about most of them, but there are all kinds of tweaks and new settings hidden deep within the software. Here are some of the best features hidden inside iOS 10.</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Use your iPhone as a magnifier"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/mkudW0QERno" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>If you’ve ever found yourself wishing you had a magnifying glass with you, iOS 10 can now serve as an excellent replacement. The new Magnifier–not to be confused with the Text Size and Zoom features that makes your on-screen text bigger–uses your phone’s camera and flashlight to make sure you can always read that receipt or dig out that splinter.</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {

            var widgetId = parseInt(Math.floor(Math.random()*900) + 100);

            widget._id = widgetId.toString();
            widget.pageId = pageId;

            widgets.push(widget);

        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var wg in widgets) {
                if(widgets[wg].pageId === pageId) {
                    result.push(widgets[wg]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return widgets[w];
                }

            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].pageId = widget.pageId;

                }

            }

            for(var w in widgets) {
                console.log([widgets[w].size, widgets[w].text, widgets[w].url, widgets[w].width]);

            }

        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets.splice(w,1);
                }
            }
        }

    }
    
    
})();
