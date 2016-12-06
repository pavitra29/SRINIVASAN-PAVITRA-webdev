module.exports = function (app, model) {

    app.post("/ejs/form", postForm);
    app.get("/ejs/form", renderAllForms);
    app.get("/ejs/form/:id/delete", deleteForm);
    app.get("/ejs/form/:id", findFormById);

    function findFormById(req, res) {
        var formId = req.params.id;
        var form = model.findFormById(formId);

        var data = {
            form: form,
            forms: model.findAllForms()
        };

        res.render("ejs/form/form-list.view.server.ejs", data);
    }

    function deleteForm(req, res) {
        var formId = req.params.id;
        console.log(formId);
        model.deleteForm(formId);
        res.redirect("/ejs/form");
    }

    function postForm(req, res) {
        var form = req.body;

        var action = form.action;
        if(action == 'add') {

            model.createForm(form);

        }
        else if(action == 'update') {

            model.updateForm(form);
        }
        res.redirect("/ejs/form");
    }

    function renderAllForms(req,res) {

        var forms = model.findAllForms();
        var data = {
            forms: forms
        };

        res.render("ejs/form/form-list.view.server.ejs", data);

    }

};
