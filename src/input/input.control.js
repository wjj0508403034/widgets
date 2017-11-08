'use strict';

angular.module('huoyun.widget').factory("InputControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {
    function InputControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
      this.$$valueChangedListeners = [];
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

    InputControl.prototype.addValueChangedListener = function(listener) {
      this.$$valueChangedListeners.push(listener);
    };

    InputControl.prototype.getValueChangedListeners = function() {
      var onValueChangedCallback = this.getOptions().onValueChanged;
      if (typeof onValueChangedCallback === "function") {
        return this.$$valueChangedListeners.concat(onValueChangedCallback);
      }
      return this.$$valueChangedListeners;
    };

    InputControl.prototype.onValueChanged = function(newVal, oldVal) {
      var that = this;
      this.getValueChangedListeners().forEach(function(listener) {
        listener.apply(that, [newVal, oldVal]);
      });
    };

    return InputControl;
  }
]);