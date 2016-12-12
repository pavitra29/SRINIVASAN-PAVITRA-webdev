module.exports = function () {

    var application = require("./wax.model.mock.json");

    var api = {
        findApplicationByName : findApplicationByName
    };
    return api;

    function findApplicationByName() {
        return application
    }

};
