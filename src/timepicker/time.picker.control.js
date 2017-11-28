'use strict';

angular.module('huoyun.widget').factory("TimePickerControl", ["HuoYunWidgetCore", "$timeout", "SlideSelectorControl",
  function(HuoYunWidgetCore, $timeout, SlideSelectorControl) {

    const Direction = {
      UP: "up",
      DOWN: "down"
    };

    const HOURS = [];
    for (let index = 1; index <= 12; index++) {
      HOURS.push(index);
    }

    const MINUTES = [];
    for (let index = 1; index < 60; index++) {
      MINUTES.push(index);
    }

    const TIME_FORMATS = [{
      name: "am",
      text: "AM"
    }, {
      name: "pm",
      text: "PM"
    }];

    function TimePickerControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      var that = this;

      this.setDate(this.getOptions().date || new Date());

      this.$$hoursControl = new SlideSelectorControl({
        items: HOURS,
        selectedValue: this.getHours()
      }).on("selectedChanged", function(newVal, oldVal, control) {
        that.setHours(newVal);
      }).on("activeChanged", function(newVal, oldVal, control) {
        if (newVal) {
          that.getMinutesControl().setActive(false);
          that.getTimeFormatControl().setActive(false);
        }
      });

      this.$$minutesControl = new SlideSelectorControl({
        items: MINUTES,
        selectedValue: this.getMinutes()
      }).on("selectedChanged", function(newVal, oldVal, control) {
        that.setMinutes(newVal);
      }).on("activeChanged", function(newVal, oldVal, control) {
        if (newVal) {
          that.getHoursControl().setActive(false);
          that.getTimeFormatControl().setActive(false);
        }
      });

      this.$$timeFormatControl = new SlideSelectorControl({
        items: TIME_FORMATS,
        selectedValue: this.getTimeFormat(),
        displayPath: "text",
        valuePath: "name",
        repeatCount: 5
      }).on("selectedChanged", function(newVal, oldVal, control) {
        //that.setMinutes(newVal);
      }).on("activeChanged", function(newVal, oldVal, control) {
        if (newVal) {
          that.getMinutesControl().setActive(false);
          that.getHoursControl().setActive(false);
        }
      });
    }

    HuoYunWidgetCore.ClassExtend(TimePickerControl, HuoYunWidgetCore.Control);

    TimePickerControl.prototype.getMinutes = function() {
      return this.getDate().getMinutes();
    };

    TimePickerControl.prototype.setMinutes = function(val) {
      var oldValue = this.getMinutes();
      if (oldValue !== val) {
        this.getDate().setMinutes(val);
      }
    };

    TimePickerControl.prototype.getHours = function() {
      var hours = this.getDate().getHours();
      return hours > 12 ? hours - 12 : hours;
    };

    TimePickerControl.prototype.setHours = function(val) {
      var oldValue = this.getHours();
      if (oldValue !== val) {
        this.getDate().setHours(val);
      }
    };

    TimePickerControl.prototype.getTimeFormat = function() {
      var hours = this.getDate().getHours();
      return hours > 12 ? "pm" : "am";
    };

    TimePickerControl.prototype.getDate = function() {
      return this.$$date;
    };

    TimePickerControl.prototype.setDate = function(date) {
      this.$$date = date;
    };

    TimePickerControl.prototype.getMinutesControl = function() {
      return this.$$minutesControl;
    };

    TimePickerControl.prototype.getHoursControl = function() {
      return this.$$hoursControl;
    };

    TimePickerControl.prototype.getTimeFormatControl = function() {
      return this.$$timeFormatControl;
    };

    return TimePickerControl;
  }
]);