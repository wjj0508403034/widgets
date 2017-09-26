'use strict';

angular.module('huoyun.widget').factory("ButtonOption", ["widgetsHelper", "$log",
  function(widgetsHelper, $log) {
    function ButtonOption(options) {
      this.getOptions = function() {
        return options;
      };
    }

    ButtonOption.prototype.getName = function() {
      return this.getOptions().name;
    };

    ButtonOption.prototype.getAppendClass = function() {
      return this.getOptions().appendClass;
    };

    ButtonOption.prototype.isVisibility = function() {
      return widgetsHelper.visibility(this.getOptions());
    };

    ButtonOption.prototype.isDisabled = function() {
      return widgetsHelper.disabled(this.getOptions());
    };

    ButtonOption.prototype.getStyle = function() {
      return widgetsHelper.style(this.getOptions());
    };

    ButtonOption.prototype.getIcon = function() {
      return this.getOptions().icon;
    };

    ButtonOption.prototype.getText = function() {
      return this.getOptions().label;
    };

    ButtonOption.prototype.onClick = function() {
      if (!this.isDisabled()) {
        if (typeof this.getOptions().onClick === "function") {
          this.getOptions().onClick.apply(this);
        } else {
          $log.warn("Button no click handler.", this);
        }
      }
    }

    return ButtonOption;
  }
]);