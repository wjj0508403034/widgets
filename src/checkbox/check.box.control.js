'use strict';

angular.module('huoyun.widget').factory("CheckBoxControl", ["$log", "HuoYunWidgetCore",
  function($log, HuoYunWidgetCore) {

    function CheckBoxControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(CheckBoxControl, HuoYunWidgetCore.Control);

    CheckBoxControl.prototype.getValue = function() {
      return this.getOptions().value;
    };

    CheckBoxControl.prototype.setValue = function(val) {
      this.getOptions().value = val;
    };

    CheckBoxControl.prototype.isChecked = function() {
      return this.getValue() === true;
    };

    CheckBoxControl.prototype.getText = function() {
      return this.getOptions().text;
    };

    CheckBoxControl.prototype.getIconClass = function() {
      return this.isChecked() ? "fa-check-square-o" : "fa-square-o";
    };

    CheckBoxControl.prototype.onClick = function($event) {
      var oldValue = this.getValue();
      var newValue = !oldValue;
      this.setValue(newValue);

      var valueChangedCallback = this.getValueChangedCallback();
      valueChangedCallback && valueChangedCallback($event, oldValue, newValue);

      if (newValue) {
        var checkedCallback = this.getCheckedCallback();
        checkedCallback && checkedCallback($event);
      } else {
        var uncheckedCallback = this.getUncheckedCallback();
        uncheckedCallback && uncheckedCallback($event);
      }
    };

    CheckBoxControl.prototype.getValueChangedCallback = function() {
      return this.__getCallback("onValueChanged");
    };

    CheckBoxControl.prototype.getCheckedCallback = function() {
      return this.__getCallback("checked");
    };

    CheckBoxControl.prototype.getUncheckedCallback = function() {
      return this.__getCallback("unchecked");
    };

    CheckBoxControl.prototype.__getCallback = function(callbackName) {
      var callback = this.getOptions()[callbackName];
      if (typeof callback === "function") {
        return callback;
      }
    };

    return CheckBoxControl;
  }
]);