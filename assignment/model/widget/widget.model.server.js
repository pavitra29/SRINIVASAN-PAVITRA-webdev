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
            .find({_page : pageId})
            .then(function (widgets) {
                return WidgetModel
                    .create(widget)
                    .then(function (widgetObj) {
                            return model.pageModel
                                .findPageById(pageId)
                                .then(function (pageObj) {
                                        widgetObj._page = pageObj._id;
                                        widgetObj.priority = widgets.length;
                                        widgetObj.save();
                                        pageObj.widgets.push(widgetObj);
                                        pageObj.save();
                                        return widgetObj.save();
                                    }
                                )
                        }
                    )
            });
    }


    function deleteWidget(widgetId) {

        return WidgetModel
            .findOne({_id: widgetId},
                function (err, widget) {
                    var index = widget.priority;
                    var pageId = widget._page;

                    WidgetModel
                        .find({_page: pageId},
                            function (err, widgets) {

                                widgets.forEach(function (widget) {
                                    if (widget.priority > index) {
                                        widget.priority--;
                                        widget.save(function() {});
                                    }

                                    if(widget._id == widgetId) {
                                        widget.remove();
                                    }

                                });

                            });
                });

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


    function reorderWidget(pageId, start, end) {

        return WidgetModel
            .find({_page: pageId},
                function (err, widgets) {
                    widgets.forEach(function (widget) {

                        if (widget.priority === start) {
                            widget.priority = end;
                            widget.save(function () {
                            });
                        }
                        else {
                            if(start > end) {

                                if(widget.priority >= end && widget.priority < start) {
                                    widget.priority++;
                                    widget.save(function () {});
                                }
                                else if(widget.priority === start) {
                                    widget.priority = end;
                                    widget.save(function () {});
                                }

                            } else {

                                if(widget.priority <= end && widget.priority > start) {
                                    widget.priority--;
                                    widget.save(function () {});
                                }
                                else if(widget.priority === start) {
                                    widget.priority = end;
                                    widget.save(function () {});
                                }
                            }
                        }



                    })
                })

    }

};
