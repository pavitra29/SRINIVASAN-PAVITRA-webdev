module.exports = function (app, model) {

    app.get("/ejs/form/:id/details", renderFormDetails);

    function renderFormDetails(req, res) {
        var data = {
          form: model.findFormById(req.params.id)
        };
        res.render("ejs/form/form-details.view.server.ejs", data);
    }

};
