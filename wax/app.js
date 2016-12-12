module.exports = function (app) {

    app.get("/wax/:applicationName/index.html", indexController);
    app.get("/wax/:applicationName/app.js", appController);
    app.get("/wax/:applicationName/config.js", configController);

    var model = require("./model/wax.model.server")();

    function indexController(req,res) {

        var application = {
            applicationName: model.findApplicationByName()
        };

        res.render("wax/index.ejs", application);
    }

    function appController(req, res) {
        var data = {
            applicationName: req.params.applicationName
        };

        res.setHeader('content-type', 'text/javascript');
        res.render("wax/app.ejs", data)
    }

    function configController(req, res) {
        var data = {
            applicationName: req.params.applicationName
        };

        res.setHeader('content-type', 'text/javascript');
        res.render("wax/config.ejs", data)
    }

};
