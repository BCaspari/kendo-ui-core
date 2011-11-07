(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEUP = touch ? "touchend" : "mouseup",
        ACTIVE_STATE_CLASS = "k-state-active",
        CLICK = "click",
        application = kendo.application,
        extend = $.extend,
        proxy = $.proxy;

    var MobileButton = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that._wrap();

            that._clickProxy = proxy(that._click, that);
            that._pressProxy = proxy(that._press, that);
            that._releaseProxy = proxy(that._release, that);

            that.enable(options.enable);

            // Hack to prevent the addressbar
            // flashing when clicking the buttons
            that._href = that.element.attr("href");

            that.bind([
                CLICK
            ], options);
        },

        options: {
            name: "MobileButton",
            selector: "[data-kendo-role=button]",
            enable: true
        },

        enable: function(enable) {
            var that = this;

            enable = enable === undefined ? true: enable;

            if (enable) {
                that.element
                    .bind(CLICK, that._clickProxy)
                    .bind(MOUSEDOWN, that._pressProxy)
                    .bind(MOUSEUP, that._releaseProxy);
            } else {
                that.element
                    .unbind(CLICK, that._clickProxy)
                    .unbind(MOUSEDOWN, that._pressProxy)
                    .unbind(MOUSEUP, that._releaseProxy);
            }
        },

        disable: function () {
            this.enable(false);
        },

        _press: function (e) {
            this.element.addClass(ACTIVE_STATE_CLASS).attr("href", "#!");
        },

        _release: function (e) {
            var that = this,
                href = that._href;

            that.element.removeClass(ACTIVE_STATE_CLASS);
            that.trigger(CLICK);

            if (application && href) {
                application.navigate(href);
            }
        },

        _click: function(e) {
            this.element.attr("href", this._href);
            if (application) {
                e.preventDefault();
            }
        },

        _wrap: function() {
            var that = this,
                element = that.element,
                span;

            span = element.addClass("k-button")
                          .children("span");

            if (!span[0]) {
                span = element.wrapInner("<span/>").children("span");
            }

            span.addClass("k-text")
                .find("img")
                .addClass("k-image");
        }
    });

    ui.plugin(MobileButton);
})(jQuery);
