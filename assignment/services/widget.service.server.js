module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var pathlibrary = require('path');

    var upload = multer({ dest: __dirname+'/../../public/assignment/upload' });

    var widgets = [
        { "index": 0, "_id": "123", "widgetType": "header", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "index": 1, "_id": "234", "widgetType": "header", "pageId": "321", "size": 4, "text": "The Best Hidden Features in iOS 10"},
        { "index": 2, "_id": "345", "widgetType": "image", "pageId": "321", "width": "100%", "url": "https://i.ytimg.com/vi/ymVXuT0Yfl4/maxresdefault.jpg"},
        { "index": 3, "_id": "456", "widgetType": "html", "pageId": "321", "text": "<p>By now, you’ve probably had some time to play around with iOS 10 and get acquainted with all the new features. We’ve already told you about most of them, but there are all kinds of tweaks and new settings hidden deep within the software. Here are some of the best features hidden inside iOS 10.</p>"},
        { "index": 4, "_id": "567", "widgetType": "header", "pageId": "321", "size": 4, "text": "Use your iPhone as a magnifier"},
        { "index": 5, "_id": "678", "widgetType": "youtube", "pageId": "321", "width": "100%", "url": "https://youtu.be/mkudW0QERno" },
        { "index": 6, "_id": "789", "widgetType": "html", "pageId": "321", "text": "<p>If you’ve ever found yourself wishing you had a magnifying glass with you, iOS 10 can now serve as an excellent replacement. The new Magnifier–not to be confused with the Text Size and Zoom features that makes your on-screen text bigger–uses your phone’s camera and flashlight to make sure you can always read that receipt or dig out that splinter.</p>"}
    ];


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", sortWidget); //?initial=index1&final=index2

    function sortWidget(req, res) {
        var query = req.query;

        var initial = query.initial;
        var final = query.final;

        // console.log([initial, final]);

        widgets.splice(final, 0 ,widgets.splice(initial,1)[0]);

    }

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
                return;
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


    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {

                widgets[w].width = width;
                widgets[w].url = "/assignment/upload/"+filename;

                var pageId = widgets[w].pageId;

                res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            }
        }



    }

};
