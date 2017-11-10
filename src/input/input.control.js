'use strict';

angular.module('huoyun.widget').factory("InputControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {
    function InputControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(InputControl, HuoYunWidgetCore.Control);

    InputControl.prototype.getPlaceholder = function() {
      return this.getOptions().placeholder;
    };

    InputControl.prototype.isReadonly = function() {
      return this.__isFalse("readonly");
    };

    InputControl.prototype.setValue = function(value) {
      this.$$value = value;
      return this;
    };

    InputControl.prototype.getValue = function() {
      return this.$$value;
    };

    return InputControl;
  }
]);