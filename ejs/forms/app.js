module.exports = function (app) {

    var model = require('./models/form.model.server.js')();

    require('./controllers/form-list.controller.server.js')(app,model);
    require('./controllers/form-details.controller.server.js')(app,model);

};
