'use strict';

angular.module('huoyun.widget').factory("ButtonControl", ["$log", "HuoYunWidgetCore",
  function($log, HuoYunWidgetCore) {

    function ButtonControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(ButtonControl, HuoYunWidgetCore.Control);


    ButtonControl.prototype.getButtonName = function() {
      return this.getOptions().name;
    };

    ButtonControl.prototype.getButtonIcon = function() {
      return this.getOptions().icon;
    };

    ButtonControl.prototype.isButtonIconVisibility = function() {
      return !!this.getButtonIcon();
    };

    ButtonControl.prototype.getButtonText = function() {
      return this.getOptions().text;
    };


    ButtonControl.prototype.onClick = function() {
      if (this.isDisabled()) {
        return;
      }

      if (typeof this.getOptions().onClick === "function") {
        this.getOptions().onClick.apply(this);
        return;
      }

      $log.warn("Button no click handler.", this);
    };

    return ButtonControl;
  }
]);