'use strict';


angular.module('huoyun.widget').factory("DatePickerControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function DatePickerControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(DatePickerControl, HuoYunWidgetCore.Control);

    DatePickerControl.prototype.getDate = function() {
      return this.getOptions().date || new Date();
    };

    DatePickerControl.prototype.getMonth = function() {
      return this.getDate().getMonth();
    };


    return DatePickerControl;
  }
]);