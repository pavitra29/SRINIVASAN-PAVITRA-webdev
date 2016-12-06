module.exports = function(app) {

    var model = require("./model/model.server")();

    require("./services/user.service.server.js")(app, model);

};
