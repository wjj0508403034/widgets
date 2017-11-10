'use strict';

angular.module('huoyun.widget').factory("CheckBoxControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function CheckBoxControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(CheckBoxControl, HuoYunWidgetCore.Control);

    CheckBoxControl.prototype.getValue = function() {
      return this.getOptions().value;
    };

    CheckBoxControl.prototype.setValue = function(val) {
      this.getOptions().value = val;
      return this;
    };

    CheckBoxControl.prototype.isChecked = function() {
      return this.getValue() === true;
    };

    CheckBoxControl.prototype.getText = function() {
      return this.getOptions().text;
    };

    CheckBoxControl.prototype.setText = function(text) {
      this.getOptions().text = text;
      return this;
    };

    CheckBoxControl.prototype.getIconClass = function() {
      return this.isChecked() ? "fa-check-square-o" : "fa-square-o";
    };

    CheckBoxControl.prototype.onClick = function($event) {
      var oldValue = this.getValue();
      var newValue = !oldValue;
      this.setValue(newValue);

      this.raiseEvent("valueChanged", [newValue, oldValue]);
      this.raiseEvent(newValue ? "checked" : "unchecked");
    };


    return CheckBoxControl;
  }
]);