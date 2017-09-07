'use strict';

angular.module('huoyun.widget').factory("ButtonOption", ["widgetsHelper", "$log",
  function(widgetsHelper, $log) {

    const props = ["name", "icon", "label", "visibility", "disabled", "appendClass", "style", "onClick"];

    function ButtonOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });
    }

    ButtonOption.prototype.$$visibility = function() {
      return widgetsHelper.visibility(this);
    };

    ButtonOption.prototype.$$disabled = function() {
      return widgetsHelper.disabled(this);
    };

    ButtonOption.prototype.$$style = function() {
      return widgetsHelper.style(this);
    };

    ButtonOption.prototype.$$click = function() {
      if (!this.$$disabled()) {
        if (typeof this.onClick === "function") {
          this.onClick.apply(this);
        } else {
          $log.warn("Button no click handler.", this);
        }
      }
    };

    return ButtonOption;
  }
]);