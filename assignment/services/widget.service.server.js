module.exports = function (app) {

    var widgets = [
        { "_id": "123", "widgetType": "header", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "header", "pageId": "321", "size": 4, "text": "The Best Hidden Features in iOS 10"},
        { "_id": "345", "widgetType": "image", "pageId": "321", "width": "100%", "url": "https://i.ytimg.com/vi/ymVXuT0Yfl4/maxresdefault.jpg"},
        { "_id": "456", "widgetType": "html", "pageId": "321", "text": "<p>By now, you’ve probably had some time to play around with iOS 10 and get acquainted with all the new features. We’ve already told you about most of them, but there are all kinds of tweaks and new settings hidden deep within the software. Here are some of the best features hidden inside iOS 10.</p>"},
        { "_id": "567", "widgetType": "header", "pageId": "321", "size": 4, "text": "Use your iPhone as a magnifier"},
        { "_id": "678", "widgetType": "youtube", "pageId": "321", "width": "100%", "url": "https://youtu.be/mkudW0QERno" },
        { "_id": "789", "widgetType": "html", "pageId": "321", "text": "<p>If you’ve ever found yourself wishing you had a magnifying glass with you, iOS 10 can now serve as an excellent replacement. The new Magnifier–not to be confused with the Text Size and Zoom features that makes your on-screen text bigger–uses your phone’s camera and flashlight to make sure you can always read that receipt or dig out that splinter.</p>"}
    ];


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        var result = [];
        for(var wg in widgets) {
            if(widgets[wg].pageId === pageId) {
                result.push(widgets[wg]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                res.send(widgets[w]);
            }
        }
        res.send('0');

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets[w] = widget;
                break;
            }
        }
        res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w,1);
                break;
            }
        }
        res.sendStatus(200);
    }

};
