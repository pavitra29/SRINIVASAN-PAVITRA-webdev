module.exports = function () {

    var forms = require('./form.mock.server.json');

    var api = {
        findAllForms: findAllForms,
        createForm: createForm,
        deleteForm: deleteForm,
        findFormById: findFormById,
        updateForm: updateForm
    };
    return api;

    function updateForm(form) {
        for(var f in forms) {
            if(form._id == forms[f]._id) {
                forms[f] = form;
            }
        }
    }

    function findFormById(formId) {
        for(var f in forms) {
            if(forms[f]._id == formId) {
                return forms[f];
            }
        }
    }

    function deleteForm(formId) {
        for(var f in forms) {
            if(forms[f]._id == formId) {
                forms.splice(f,1);
            }
        }
    }

    function findAllForms() {
        return forms;
    }

    function createForm(form) {
        form._id = (new Date).getTime();
        forms.push(form);
    }

};
