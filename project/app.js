module.exports = function(app) {

    var model = require("./model/model.server")();

    require("./services/user.service.server.js")(app, model);
    require("./services/music.service.server.js")(app, model);
    require("./services/review.service.server.js")(app, model);

};
