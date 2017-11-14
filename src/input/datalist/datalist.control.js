'use strict';

angular.module('huoyun.widget').factory("DataListControl", ["HuoYunWidgetCore", "InputControl",
  function(HuoYunWidgetCore, InputControl) {

    function DataListControl(options) {
      InputControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(DataListControl, InputControl);

    DataListControl.prototype.getInputText = function() {
      return this.$$inputText;
    };

    DataListControl.prototype.setInputText = function(text) {
      this.$$inputText = text;
      return this;
    };

    DataListControl.prototype.isReadonly = function() {
      return true;
    };

    return DataListControl;
  }
]);