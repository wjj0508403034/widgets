'use strict';

angular.module('huoyun.widget').factory("DataListControl", ["HuoYunWidgetCore", "InputControl", "HuoyunPromise",
  function(HuoYunWidgetCore, InputControl, HuoyunPromise) {

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