module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                return model.pageModel
                    .findPageById(pageId)
                    .then(function (pageObj) {
                            widgetObj._page = pageObj._id;
                            widgetObj.save();
                            pageObj.widgets.push(widgetObj);
                            pageObj.save();
                            return widgetObj.save();
                        }
                    )
                }
            )
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel
            .find({
                _page: pageId
            });
    }

    function findWidgetById(widgetId) {
        return WidgetModel
            .findById({
                _id: widgetId
            });
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    name: widget.name ? widget.name : null,
                    text: widget.text ? widget.text : null,
                    url: widget.url ? widget.url : null,
                    width: widget.width ? widget.width : null,
                    size: widget.size ? widget.size : null,
                    rows: widget.rows ? widget.rows : null,
                    placeholder: widget.placeholder ? widget.placeholder : null,
                    formatted: widget.formatted ? widget.formatted : null
                });
    }

    function deleteWidget(widgetId) {
        return WidgetModel
            .remove({
                _id: widgetId
            });
    }

    function reorderWidget(pageId, start, end) {

    }

};
