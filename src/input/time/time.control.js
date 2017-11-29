'use strict';

angular.module('huoyun.widget').factory("TimeControl", ["HuoYunWidgetCore", "InputControl", "TimePickerControl", "$filter", "Format",
  function(HuoYunWidgetCore, InputControl, TimePickerControl, $filter, FormatProvider) {

    function TimeControl(options) {
      InputControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TimeControl, InputControl);


    TimeControl.prototype.isReadonly = function() {
      return true;
    };

    TimeControl.prototype.onTimeInputClick = function(event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.isShow()) {
        this.close();
      } else {
        this.open();
      }
    };

    TimeControl.prototype.isShow = function() {
      return this.$$show === true;
    };

    TimeControl.prototype.close = function() {
      this.$$show = false;
      this.$$timePickerControl = null;
      this.raiseEvent("close", [this]);
      return this;
    };

    TimeControl.prototype.open = function() {
      this.$$show = true;
      this.raiseEvent("open", [this]);
      return this;
    };

    TimeControl.prototype.getTimePickerControl = function() {
      if (!this.$$timePickerControl) {
        var that = this;
        this.$$timePickerControl = new TimePickerControl({
          date: this.getValue()
        }).on("picked", function(date, control) {
          that.setValue(date);
          that.close();
        });
      }
      return this.$$timePickerControl;
    };

    TimeControl.prototype.getFormat = function() {
      return this.getOptions().format || FormatProvider.getValue("time");
    };

    TimeControl.prototype.getFormatText = function() {
      return $filter('date')(this.getValue(), this.getFormat());
    };

    return TimeControl;
  }
]);