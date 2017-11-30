'use strict';

angular.module('huoyun.widget').factory("ButtonControl", ["$log", "HuoYunWidgetCore",
  function($log, HuoYunWidgetCore) {

    function ButtonControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(ButtonControl, HuoYunWidgetCore.Control);


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
      if (!this.isDisabled()) {
        this.raiseEvent("click", [this]);
      }
    };

    return ButtonControl;
  }
]);