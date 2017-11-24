'use strict';

angular.module('huoyun.widget').factory("Day", [function() {

  function Day(options) {
    this.getOptions = function() {
      return options;
    };
  }

  Day.prototype.inNextMonth = function() {
    return !!this.getOptions().nextMonth;
  };

  Day.prototype.inLastMonth = function() {
    return !!this.getOptions().lastMonth;
  };

  Day.prototype.inCurrentMonth = function() {
    return !this.inNextMonth() && !this.inLastMonth();
  };

  Day.prototype.getDate = function() {
    return this.getOptions().date;
  };

  Day.prototype.isToday = function() {
    return this.$$today === true;
  };

  Day.prototype.setToday = function() {
    this.$$today = true;
  };

  Day.prototype.isSelected = function() {
    return this.$$selected === true;
  };

  Day.prototype.setSelected = function(val) {
    this.$$selected = val;
    return this;
  };

  Day.prototype.isEqual = function(date) {
    return this.getDate().getFullYear() === date.getFullYear() && this.getDate().getMonth() === date.getMonth() && this.getDate().getDate() === date.getDate();
  };


  return Day;
}]);


angular.module('huoyun.widget').factory("Week", [function() {

  function Week() {
    this.$$days = [];
  }

  Week.prototype.addDay = function(day) {
    this.$$days.push(day);
    return this;
  };

  Week.prototype.getDays = function() {
    return this.$$days;
  };

  return Week;
}]);


angular.module('huoyun.widget').factory("DatePickerControl", ["HuoYunWidgetCore", "Week", "Day",
  function(HuoYunWidgetCore, Week, Day) {

    const Months = [{
      name: "January",
      shortName: "Jan",
      value: 0
    }, {
      name: "February",
      shortName: "Feb",
      value: 1
    }, {
      name: "March",
      shortName: "Mar",
      value: 2
    }, {
      name: "April",
      shortName: "Apr",
      value: 3
    }, {
      name: "May",
      shortName: "May",
      value: 4
    }, {
      name: "June",
      shortName: "June",
      value: 5
    }, {
      name: "July",
      shortName: "July",
      value: 6
    }, {
      name: "August",
      shortName: "Aug",
      value: 7
    }, {
      name: "September",
      shortName: "Sept",
      value: 8
    }, {
      name: "October",
      shortName: "Oct",
      value: 9
    }, {
      name: "November",
      shortName: "Nov",
      value: 10
    }, {
      name: "December",
      shortName: "Dec",
      value: 11
    }];

    const WeekDays = [{
      name: "Monday",
      shortName: "Mon"
    }, {
      name: "Tuesday",
      shortName: "Tues"
    }, {
      name: "Wednesday",
      shortName: "Wed"
    }, {
      name: "Thursday",
      shortName: "Thur"
    }, {
      name: "Friday",
      shortName: "Fri"
    }, {
      name: "Saturday",
      shortName: "Sat"
    }, {
      name: "Sunday",
      shortName: "Sun"
    }];

    const CalendarViewMode = {
      YEAR: "Year",
      MONTH: "Month",
      DAY: "Day"
    };

    function DatePickerControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$weeks = [];
      this.$$viewMode = CalendarViewMode.DAY;
      this.setDate(this.getOptions().date || new Date());
    }

    HuoYunWidgetCore.ClassExtend(DatePickerControl, HuoYunWidgetCore.Control);

    DatePickerControl.prototype.getDate = function() {
      return this.$$date;
    };

    DatePickerControl.prototype.setDate = function(date) {
      var oldDate = this.getDate();
      this.$$date = date;
      this.__init();
      this.raiseEvent("valueChanged", [date, this.getDate(), this]);
    };

    DatePickerControl.prototype.getDays = function() {
      return this.$$days;
    };

    DatePickerControl.prototype.getWeeks = function() {
      return this.$$weeks;
    };

    DatePickerControl.prototype.__init = function() {
      this.$$weeks = [];
      this.$$days = [];

      var monthStartDate = new Date(this.getYear(), this.getMonth(), 1);
      var monthEndDate = new Date(this.getYear(), this.getMonth() + 1, 0);

      this.$$days = this.$$days
        .concat(this.__getPassedDaysOfLastMonth(monthStartDate.getDay() - 1))
        .concat(this.__getDaysOfCurrentMonth())
        .concat(this.__getComingDaysOfNextMonth(7 - monthEndDate.getDay() + 1));

      var week = null;
      for (var index = 0; index < this.$$days.length; index++) {
        if (index % 7 === 0) {
          week = new Week();
          this.$$weeks.push(week);
        }
        week.addDay(this.$$days[index]);
      }
    };

    DatePickerControl.prototype.__getDaysOfCurrentMonth = function() {
      var endDate = new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
      var days = [];
      for (var index = 1; index <= endDate; index++) {
        var day = new Day({
          date: new Date(this.getYear(), this.getMonth(), index)
        });
        if (day.isEqual(this.getDate())) {
          day.setSelected(true);
        }
        if (day.isEqual(new Date())) {
          day.setToday(true);
        }
        days.push(day);
      }

      return days;
    };

    DatePickerControl.prototype.__getPassedDaysOfLastMonth = function(num) {
      if (num < 0) {
        num += 7;
      }

      var lastDateofLastMonth = new Date(this.getYear(), this.getMonth(), 0).getDate();
      var days = [];
      for (var index = num; index > 0; index--) {
        days.push(new Day({
          lastMonth: true,
          date: new Date(this.getYear(), this.getMonth() - 1, lastDateofLastMonth - index + 1)
        }));
      }

      return days;
    };

    DatePickerControl.prototype.__getComingDaysOfNextMonth = function(num) {
      if (num > 7) {
        num -= 7;
      }

      var days = [];
      for (var index = 1; index < num; index++) {
        days.push(new Day({
          lastMonth: true,
          date: new Date(this.getYear(), this.getMonth() + 1, index)
        }));
      }

      return days;
    };

    DatePickerControl.prototype.getYear = function() {
      return this.getDate().getFullYear();
    };

    DatePickerControl.prototype.getMonth = function() {
      return this.getDate().getMonth();
    };

    DatePickerControl.prototype.getWeekDays = function() {
      return WeekDays;
    };

    DatePickerControl.prototype.getWeekDayName = function(weekday) {
      return weekday["shortName"];
    };

    DatePickerControl.prototype.onDayClicked = function(day) {
      this.setDate(day.getDate());
    };

    DatePickerControl.prototype.getHeader = function() {
      if (this.isDayView()) {
        return `${this.getMonth() + 1} - ${this.getYear()}`;
      }

      if (this.isMonthView()) {
        return `${this.getYear()}`;
      }

      if (this.isYearView()) {
        return "Select Year";
      }
    };

    DatePickerControl.prototype.getViewMode = function() {
      return this.$$viewMode;
    };

    DatePickerControl.prototype.onLeftButtonClicked = function() {
      var date = this.getDate();
      if (this.isDayView()) {
        date.setMonth(date.getMonth() - 1);
        this.setDate(date);
      }

      if (this.isMonthView()) {
        date.setYear(date.getFullYear() - 1);
        this.setDate(date);
      }

      if (this.isYearView()) {
        this.__setYearPageIndex(this.__getYearPageIndex() - 1);
      }
    };

    DatePickerControl.prototype.onRightButtonClicked = function() {
      var date = this.getDate();
      if (this.isDayView()) {
        date.setMonth(date.getMonth() + 1);
        this.setDate(date);
      }

      if (this.isMonthView()) {
        date.setYear(date.getFullYear() + 1);
        this.setDate(date);
      }

      if (this.isYearView()) {
        this.__setYearPageIndex(this.__getYearPageIndex() + 1);
      }
    };

    DatePickerControl.prototype.isDayView = function() {
      return this.getViewMode() === CalendarViewMode.DAY;
    };

    DatePickerControl.prototype.isMonthView = function() {
      return this.getViewMode() === CalendarViewMode.MONTH;
    };

    DatePickerControl.prototype.isYearView = function() {
      return this.getViewMode() === CalendarViewMode.YEAR;
    };

    DatePickerControl.prototype.onViewModeButtonClicked = function() {
      if (this.isDayView()) {
        this.$$viewMode = CalendarViewMode.MONTH;
        return;
      }

      if (this.isMonthView()) {
        this.$$viewMode = CalendarViewMode.YEAR;
        return;
      }
    };

    DatePickerControl.prototype.getMonths = function() {
      return Months;
    };

    DatePickerControl.prototype.getMonthName = function(month) {
      return month["shortName"];
    };

    DatePickerControl.prototype.isCurrentMonth = function(month) {
      return this.getMonth() === month.value;
    };

    DatePickerControl.prototype.onMonthButtonClicked = function(month) {
      var date = this.getDate();
      date.setMonth(month.value);
      this.setDate(date);
      this.$$viewMode = CalendarViewMode.DAY;
    };

    DatePickerControl.prototype.getYears = function() {
      var years = [];
      var pageIndex = parseInt((this.getYear() - 1970) / 25) + this.__getYearPageIndex();
      var startYear = 1970 + pageIndex * 25;
      for (var index = 0; index < 25; index++) {
        years.push(startYear + index);
      }
      return years;
    };

    DatePickerControl.prototype.__getYearPageIndex = function() {
      return this.$$yearPageIndex || 0;
    };

    DatePickerControl.prototype.__setYearPageIndex = function(pageIndex) {
      this.$$yearPageIndex = pageIndex;
    };

    DatePickerControl.prototype.onYearButtonClicked = function(year) {
      var date = this.getDate();
      date.setYear(year);
      this.setDate(date);
      this.$$viewMode = CalendarViewMode.MONTH;
    };

    DatePickerControl.prototype.isCurrentYear = function(year) {
      return this.getYear() === year;
    };

    return DatePickerControl;
  }
]);