module.exports = function (app, model) {

    var multer = require('multer'); // npm install multer --save
    var pathlibrary = require('path');

    var upload = multer({ dest: __dirname+'/../../public/assignment/upload' });


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", sortWidget); //?initial=index1&final=index2

    function sortWidget(req, res) {
        var query = req.query;

        var pid = req.params.pageId;

        var initial = parseInt(query.initial);
        var final = parseInt(query.final);

        // console.log([initial, final]);

        model
            .widgetModel
            .reorderWidget(pid, initial, final);

        // widgets.splice(final, 0 ,widgets.splice(initial,1)[0]);

    }

    function createWidget(req, res) {
        var widget = req.body;

        model
            .widgetModel
            .createWidget(req.params.pageId, widget)
            .then(
                function (widget) {
                    // console.log(widget);
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    if(widget) {
                        res.json(widget);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );


    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );

    }


    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        var widget = {
            width: width,
            url: "/assignment/upload/"+filename,
            pageId: pageId
        };

        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );


    }

};
