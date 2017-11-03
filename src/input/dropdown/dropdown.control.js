'use strict';

angular.module('huoyun.widget').factory("DropdownControl", ["HuoYunWidgetCore", "InputControl",
  function(HuoYunWidgetCore, InputControl) {

    function DropdownControl(options) {
      InputControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(DropdownControl, InputControl);

    DropdownControl.prototype.getDataSource = function() {
      if (!this.dataSource) {
        this.dataSource = this.getOptions().data;
      }

      if (!Array.isArray(this.dataSource)) {
        throw new Error("data isn't array");
      }

      return this.dataSource;
    };


    DropdownControl.prototype.getLabelField = function() {
      return this.getOptions().labelField;
    };

    DropdownControl.prototype.getLabel = function(option) {
      var labelField = this.getLabelField();
      if (labelField) {
        return option[labelField];
      }

      return option;
    };

    DropdownControl.prototype.getValueField = function() {
      return this.getOptions().valueField;
    };

    DropdownControl.prototype.getValue = function(option) {
      var valueField = this.getValueField();
      if (valueField) {
        return option[valueField];
      }
      return option;
    };

    return DropdownControl;
  }
]);