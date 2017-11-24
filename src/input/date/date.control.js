'use strict';

angular.module('huoyun.widget').factory("DateControl", ["HuoYunWidgetCore", "InputControl", "DatePickerControl", "$filter", "Format",
  function(HuoYunWidgetCore, InputControl, DatePickerControl, $filter, FormatProvider) {

    function DateControl(options) {
      InputControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(DateControl, InputControl);


    DateControl.prototype.isReadonly = function() {
      return true;
    };

    DateControl.prototype.onDateInputClick = function(event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.isShow()) {
        this.close();
      } else {
        this.open();
      }
    };

    DateControl.prototype.isShow = function() {
      return this.$$show === true;
    };

    DateControl.prototype.close = function() {
      this.$$show = false;
      this.$$calendar = null;
      this.raiseEvent("close", [this]);
      return this;
    };

    DateControl.prototype.open = function() {
      this.$$show = true;
      this.raiseEvent("open", [this]);
      return this;
    };

    DateControl.prototype.getCalendar = function() {
      if (!this.$$calendar) {
        var that = this;
        this.$$calendar = new DatePickerControl({
          date: this.getValue()
        }).on("dayClicked", function(day, date, control) {
          that.setValue(date);
          that.close();
        });
      }
      return this.$$calendar;
    };

    DateControl.prototype.onPopupBlur = function() {
      console.log(arguments)
    };

    DateControl.prototype.getFormat = function() {
      return this.getOptions().format || FormatProvider.getValue("date");
    };

    DateControl.prototype.getTimeZone = function() {
      return this.getOptions().timezone;
    };

    DateControl.prototype.getFormatText = function() {
      return $filter('date')(this.getValue(), this.getFormat(), this.getTimeZone());
    };


    return DateControl;
  }
]);