'use strict';

angular.module('huoyun.widget', ['ngDialog']);

angular.module('huoyun.widget').provider("Format", function () {

  this.configuration = function (options) {
    var that = this;
    ["date", "datetime", "time"].forEach(function (prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
    return this;
  };

  this.getValue = function (prop) {
    return this[prop];
  };

  this.$get = function () {
    return this;
  };
});

angular.module('huoyun.widget').run(["Format", function (FormatProvider) {

  FormatProvider.configuration({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm",
    time: "HH:mm a"
  });
}]);

angular.module('huoyun.widget').factory("HuoYunWidgets", ["Dialog", "ButtonControl", "FormControl", "HuoYunWidgetsInputs", "ListViewControl", "TableControl", "BreadCrumbControl", "NavControl", "SidebarControl", "TipControl", "PaginationControl", "DatePickerControl", "TabControl", "LoadingControl", "TimePickerControl", function (Dialog, ButtonControl, FormControl, HuoYunWidgetsInputs, ListViewControl, TableControl, BreadCrumbControl, NavControl, SidebarControl, TipControl, PaginationControl, DatePickerControl, TabControl, LoadingControl, TimePickerControl) {

  return {
    Controls: {
      Tip: TipControl,
      SideBar: SidebarControl,
      BreadCrumb: BreadCrumbControl,
      Nav: NavControl,
      Button: ButtonControl,
      Form: FormControl,
      Inputs: HuoYunWidgetsInputs,
      Table: TableControl,
      ListView: ListViewControl,
      Pagination: PaginationControl,
      DatePicker: DatePickerControl,
      TimePicker: TimePickerControl,
      Tab: TabControl
    },
    ShowLoading: function ShowLoading(options) {
      return new LoadingControl(options).show();
    },
    ShowTip: function ShowTip(options) {
      return new TipControl(options).pop();
    },
    ShowDialog: function ShowDialog() {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("BreadCrumbControl", ["HuoYunWidgetCore", "BreadCrumbItemControl", function (HuoYunWidgetCore, BreadCrumbItemControl) {

  function BreadCrumbControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$items = [];
    var that = this;
    options.items.forEach(function (item) {
      var itemControl = new BreadCrumbItemControl(item).setBreadCrumb(that);
      that.$$items.push(itemControl);
    });
  }

  BreadCrumbControl.prototype.getItems = function () {
    return this.$$items;
  };

  HuoYunWidgetCore.ClassExtend(BreadCrumbControl, HuoYunWidgetCore.Control);

  return BreadCrumbControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsBreadCrumb', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'breadcrumb/breadcrumb.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("BreadCrumbItemControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function BreadCrumbItemControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(BreadCrumbItemControl, HuoYunWidgetCore.Control);

  BreadCrumbItemControl.prototype.setBreadCrumb = function (breadCrumb) {
    this.$$breadCrumb = breadCrumb;
    return this;
  };

  BreadCrumbItemControl.prototype.getBreadCrumb = function () {
    return this.$$breadCrumb;
  };

  BreadCrumbItemControl.prototype.getText = function () {
    return this.getOptions().text;
  };

  BreadCrumbItemControl.prototype.getIcon = function () {
    return this.getOptions().icon;
  };

  BreadCrumbItemControl.prototype.onClick = function () {
    this.getBreadCrumb().raiseEvent("itemClick", [this]);
  };

  return BreadCrumbItemControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("ButtonControl", ["$log", "HuoYunWidgetCore", function ($log, HuoYunWidgetCore) {

  function ButtonControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ButtonControl, HuoYunWidgetCore.Control);

  ButtonControl.prototype.getButtonIcon = function () {
    return this.getOptions().icon;
  };

  ButtonControl.prototype.isButtonIconVisibility = function () {
    return !!this.getButtonIcon();
  };

  ButtonControl.prototype.getButtonText = function () {
    return this.getOptions().text;
  };

  ButtonControl.prototype.onClick = function () {
    if (!this.isDisabled()) {
      this.raiseEvent("click", [this]);
    }
  };

  return ButtonControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsButton', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'button/button.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("CheckBoxControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function CheckBoxControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(CheckBoxControl, HuoYunWidgetCore.Control);

  CheckBoxControl.prototype.getValue = function () {
    return this.getOptions().value;
  };

  CheckBoxControl.prototype.setValue = function (val) {
    this.getOptions().value = val;
    return this;
  };

  CheckBoxControl.prototype.isChecked = function () {
    return this.getValue() === true;
  };

  CheckBoxControl.prototype.getText = function () {
    return this.getOptions().text;
  };

  CheckBoxControl.prototype.setText = function (text) {
    this.getOptions().text = text;
    return this;
  };

  CheckBoxControl.prototype.getIconClass = function () {
    return this.isChecked() ? "fa-check-square-o" : "fa-square-o";
  };

  CheckBoxControl.prototype.onClick = function ($event) {
    var oldValue = this.getValue();
    var newValue = !oldValue;
    this.setValue(newValue).raiseEvent(newValue ? "checked" : "unchecked");
  };

  return CheckBoxControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsCheckBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'checkbox/checkbox.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

function Linq(array) {

  this.getArray = function () {
    return array;
  };
}

Linq.prototype.join = function (cb, separator) {
  if (typeof cb === "function") {
    var res = [];
    this.getArray().forEach(function (item) {
      var temp = cb(item);
      if (temp !== null && temp !== undefined && temp !== "") {
        res.push(temp);
      }
    });

    return res.join(separator);
  }

  return this.getArray().join(separator);
};

Linq.prototype.first = function (cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return array[index];
    }
  }
};

Linq.prototype.exists = function (item, cb) {
  if (!cb) {
    return this.getArray().indexOf(item) !== -1;
  }

  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return true;
    }
  }
};

Linq.prototype.any = function (cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (cb(array[index], index)) {
      return true;
    }
  }

  return false;
};

Linq.prototype.all = function (cb) {
  if (typeof cb !== "function") {
    throw new Error("cb is not function");
  }

  var array = this.getArray();
  for (var index = 0; index < array.length; index++) {
    if (!cb(array[index], index)) {
      return false;
    }
  }

  return true;
};

Linq.prototype.toMap = function (keyOrCallback) {
  var map = {};
  this.getArray().forEach(function (item, index) {
    if (typeof keyOrCallback === "string") {
      map[item[keyOrCallback]] = item;
    } else if (typeof key === "function") {
      map[keyOrCallback(item, index)] = item;
    } else {
      throw new Error("keyOrCallback is invalid");
    }
  });

  return map;
};

Linq.prototype.toArray = function (keyOrCallback) {
  var array = [];
  this.getArray().forEach(function (item, index) {
    if (typeof keyOrCallback === "string") {
      array.push(item[keyOrCallback]);
    } else if (typeof key === "function") {
      array.push(keyOrCallback(item, index));
    } else {
      throw new Error("keyOrCallback is invalid");
    }
  });
  return array;
};

Array.prototype.linq = function () {
  return new Linq(this);
};
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

angular.module('huoyun.widget').factory("Control", [function () {
  function Control(options) {
    this.$$eventMap = {};

    this.getOptions = function () {
      if (options === null || options === undefined) {
        options = {};
      }
      return options;
    };
  }

  Control.prototype.getId = function () {
    if (!this.$$id) {
      if (this.getOptions().id) {
        this.$$id = this.getOptions().id;
      } else {
        var now = new Date();
        this.$$id = now.getTime();
      }
    }

    return this.$$id;
  };

  Control.prototype.callSuperMethod = function (method, args) {
    this.constructor.super.prototype[method].apply(this, args);
  };

  Control.prototype.getName = function () {
    return this.getOptions().name;
  };

  Control.prototype.getControlName = function () {
    return this.constructor.name;
  };

  Control.prototype.setElement = function (elem) {
    this.$$elem = elem;
    return this;
  };

  Control.prototype.getElement = function () {
    return this.$$elem;
  };

  Control.prototype.appendClass = function () {
    return this.getOptions().appendClass;
  };

  Control.prototype.getTemplateUrl = function () {
    return this.getOptions().templateUrl;
  };

  Control.prototype.hasTemplateUrl = function () {
    return !!this.getTemplateUrl();
  };

  Control.prototype.getStyle = function () {
    var style = this.getOptions().style;
    if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === "object") {
      return style;
    }

    if (typeof style === "function") {
      return style.apply(this);
    }
  };

  Control.prototype.isVisibility = function () {
    return this.__isTrue("visibility");
  };

  Control.prototype.isDisabled = function () {
    return this.__isFalse("disabled");
  };

  Control.prototype.__isTrue = function (propName) {
    return !this.__isFalse(propName);
  };

  Control.prototype.__isFalse = function (propName) {
    var propValue = this.getOptions()[propName];

    if (typeof propValue === "boolean") {
      return propValue;
    }

    if (typeof propValue === "function") {
      return propValue.apply(this);
    }

    return false;
  };

  Control.prototype.getEventListeners = function (eventName) {
    if (!this.$$eventMap[eventName]) {
      this.$$eventMap[eventName] = [];
    }
    return this.$$eventMap[eventName];
  };

  Control.prototype.clearEventListeners = function (eventName) {
    this.$$eventMap[eventName] = [];
    return this;
  };

  Control.prototype.on = function (eventName, listener) {
    if (typeof listener !== "function") {
      throw new Event("Event listener must be function");
    }
    this.getEventListeners(eventName).push(listener);

    return this;
  };

  Control.prototype.off = function (eventName, listener) {
    var listeners = this.getEventListeners(eventName);

    if (listener === undefined) {
      return this.clearEventListeners(eventName);
    }

    if (typeof listener !== "function") {
      throw new Event("Event listener must be function");
    }

    var index = listeners.indexOf(listener);
    listeners.splice(index, 1);
    return this;
  };

  Control.prototype.raiseEvent = function (eventName, args) {
    var that = this;
    var listeners = this.getEventListeners(eventName);
    listeners.forEach(function (listener) {
      listener.apply(that, args);
    });
  };

  return Control;
}]);
'use strict';

angular.module('huoyun.widget').factory("ClassExtend", [function () {

  function ClassExtend(Child, Parent) {

    if (Child === undefined || Child === null) throw new Error('ERR_INVALID_ARG_TYPE', 'Child', 'function');
    if (Parent === undefined || Parent === null) throw new Error('ERR_INVALID_ARG_TYPE', 'Parent', 'function');
    if (Parent.prototype === undefined) {
      throw new Error('ERR_INVALID_ARG_TYPE', 'Parent.prototype', 'function');
    }
    Child.super = Parent;
    Object.setPrototypeOf(Child.prototype, Parent.prototype);
  }
  return ClassExtend;
}]);

angular.module('huoyun.widget').factory("$Promise", ["$q", function ($q) {

  return {
    resolve: function resolve(obj) {
      if (obj instanceof Promise || obj instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.resolve(obj);
      return deferred.promise;
    },
    reject: function reject(obj) {
      if (obj instanceof Promise || obj instanceof $q) {
        return val;
      }

      var deferred = $q.defer();
      deferred.reject(obj);
      return deferred.promise;
    },
    all: function all(promises) {
      return $q.all(promises);
    }
  };
}]);

angular.module('huoyun.widget').factory("HuoYunWidgetCore", ["ClassExtend", "Control", "$Promise", "Validator", function (ClassExtend, Control, $Promise, Validator) {
  return {
    ClassExtend: ClassExtend,
    Control: Control,
    Promise: $Promise,
    Validator: Validator
  };
}]);

angular.module('huoyun.widget').factory("DataStore", [function () {

  function DataStore() {
    this.$$map = {};
  }

  DataStore.prototype.setItem = function (key, value) {
    this.$$map[key] = value;
    return this;
  };

  DataStore.prototype.getItemAndRemove = function (key) {
    var value = this.$$map[key];
    delete this.$$map[key];
    return value;
  };

  DataStore.prototype.getItem = function (key) {
    return this.$$map[key];
  };

  DataStore.prototype.removeItem = function (key) {
    delete this.$$map[key];
    return this;
  };

  var store = new DataStore();

  return store;
}]);
'use strict';

angular.module('huoyun.widget').factory("Day", [function () {

  function Day(options) {
    this.getOptions = function () {
      return options;
    };
  }

  Day.prototype.inNextMonth = function () {
    return !!this.getOptions().nextMonth;
  };

  Day.prototype.inLastMonth = function () {
    return !!this.getOptions().lastMonth;
  };

  Day.prototype.inCurrentMonth = function () {
    return !this.inNextMonth() && !this.inLastMonth();
  };

  Day.prototype.getDate = function () {
    return this.getOptions().date;
  };

  Day.prototype.isToday = function () {
    return this.$$today === true;
  };

  Day.prototype.setToday = function () {
    this.$$today = true;
  };

  Day.prototype.isSelected = function () {
    return this.$$selected === true;
  };

  Day.prototype.setSelected = function (val) {
    this.$$selected = val;
    return this;
  };

  Day.prototype.isEqual = function (date) {
    return this.getDate().getFullYear() === date.getFullYear() && this.getDate().getMonth() === date.getMonth() && this.getDate().getDate() === date.getDate();
  };

  return Day;
}]);

angular.module('huoyun.widget').factory("Week", [function () {

  function Week() {
    this.$$days = [];
  }

  Week.prototype.addDay = function (day) {
    this.$$days.push(day);
    return this;
  };

  Week.prototype.getDays = function () {
    return this.$$days;
  };

  return Week;
}]);

angular.module('huoyun.widget').factory("DatePickerControl", ["HuoYunWidgetCore", "Week", "Day", function (HuoYunWidgetCore, Week, Day) {

  var Months = [{
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

  var WeekDays = [{
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

  var CalendarViewMode = {
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

  DatePickerControl.prototype.getDate = function () {
    return this.$$date;
  };

  DatePickerControl.prototype.setDate = function (date) {
    var oldDate = this.getDate();
    this.$$date = date;
    this.__init();
    this.raiseEvent("valueChanged", [date, this.getDate(), this]);
  };

  DatePickerControl.prototype.getDays = function () {
    return this.$$days;
  };

  DatePickerControl.prototype.getWeeks = function () {
    return this.$$weeks;
  };

  DatePickerControl.prototype.__init = function () {
    this.$$weeks = [];
    this.$$days = [];

    var monthStartDate = new Date(this.getYear(), this.getMonth(), 1);
    var monthEndDate = new Date(this.getYear(), this.getMonth() + 1, 0);

    this.$$days = this.$$days.concat(this.__getPassedDaysOfLastMonth(monthStartDate.getDay() - 1)).concat(this.__getDaysOfCurrentMonth()).concat(this.__getComingDaysOfNextMonth(7 - monthEndDate.getDay() + 1));

    var week = null;
    for (var index = 0; index < this.$$days.length; index++) {
      if (index % 7 === 0) {
        week = new Week();
        this.$$weeks.push(week);
      }
      week.addDay(this.$$days[index]);
    }
  };

  DatePickerControl.prototype.__getDaysOfCurrentMonth = function () {
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

  DatePickerControl.prototype.__getPassedDaysOfLastMonth = function (num) {
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

  DatePickerControl.prototype.__getComingDaysOfNextMonth = function (num) {
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

  DatePickerControl.prototype.getYear = function () {
    return this.getDate().getFullYear();
  };

  DatePickerControl.prototype.getMonth = function () {
    return this.getDate().getMonth();
  };

  DatePickerControl.prototype.getWeekDays = function () {
    return WeekDays;
  };

  DatePickerControl.prototype.getWeekDayName = function (weekday) {
    return weekday["shortName"];
  };

  DatePickerControl.prototype.onDayClicked = function (event, day) {
    event.preventDefault();
    event.stopPropagation();
    this.setDate(day.getDate());
    this.raiseEvent("dayClicked", [day, this.getDate(), this]);
  };

  DatePickerControl.prototype.getHeader = function () {
    if (this.isDayView()) {
      return this.getMonth() + 1 + ' - ' + this.getYear();
    }

    if (this.isMonthView()) {
      return '' + this.getYear();
    }

    if (this.isYearView()) {
      return "Select Year";
    }
  };

  DatePickerControl.prototype.getViewMode = function () {
    return this.$$viewMode;
  };

  DatePickerControl.prototype.onLeftButtonClicked = function () {
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

  DatePickerControl.prototype.onRightButtonClicked = function () {
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

  DatePickerControl.prototype.isDayView = function () {
    return this.getViewMode() === CalendarViewMode.DAY;
  };

  DatePickerControl.prototype.isMonthView = function () {
    return this.getViewMode() === CalendarViewMode.MONTH;
  };

  DatePickerControl.prototype.isYearView = function () {
    return this.getViewMode() === CalendarViewMode.YEAR;
  };

  DatePickerControl.prototype.onViewModeButtonClicked = function () {
    if (this.isDayView()) {
      this.$$viewMode = CalendarViewMode.MONTH;
      return;
    }

    if (this.isMonthView()) {
      this.$$viewMode = CalendarViewMode.YEAR;
      return;
    }
  };

  DatePickerControl.prototype.getMonths = function () {
    return Months;
  };

  DatePickerControl.prototype.getMonthName = function (month) {
    return month["shortName"];
  };

  DatePickerControl.prototype.isCurrentMonth = function (month) {
    return this.getMonth() === month.value;
  };

  DatePickerControl.prototype.onMonthButtonClicked = function (month) {
    var date = this.getDate();
    date.setMonth(month.value);
    this.setDate(date);
    this.$$viewMode = CalendarViewMode.DAY;
  };

  DatePickerControl.prototype.getYears = function () {
    var years = [];
    var pageIndex = parseInt((this.getYear() - 1970) / 25) + this.__getYearPageIndex();
    var startYear = 1970 + pageIndex * 25;
    for (var index = 0; index < 25; index++) {
      years.push(startYear + index);
    }
    return years;
  };

  DatePickerControl.prototype.__getYearPageIndex = function () {
    return this.$$yearPageIndex || 0;
  };

  DatePickerControl.prototype.__setYearPageIndex = function (pageIndex) {
    this.$$yearPageIndex = pageIndex;
  };

  DatePickerControl.prototype.onYearButtonClicked = function (year) {
    var date = this.getDate();
    date.setYear(year);
    this.setDate(date);
    this.$$viewMode = CalendarViewMode.MONTH;
  };

  DatePickerControl.prototype.isCurrentYear = function (year) {
    return this.getYear() === year;
  };

  return DatePickerControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsDatePicker', ["DatePickerControl", function (DatePickerControl) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'datepicker/date.picker.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

/*
 * https://github.com/likeastore/ngDialog
 */

angular.module('huoyun.widget').config(["ngDialogProvider", function (ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

angular.module('huoyun.widget').controller("ConfirmDialogController", ["$scope", function ($scope) {
  $scope.onCancelButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onCancelButtonClicked === "function") {
      $scope.ngDialogData.onCancelButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('Cancel');
    }
  };

  $scope.onConfirmButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onConfirmButtonClicked === "function") {
      $scope.ngDialogData.onConfirmButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('OK');
    }
  };

  $scope.confirmClose = function () {
    $scope.closeThisDialog('OK');
  };

  $scope.cancelClose = function () {
    $scope.closeThisDialog('Cancel');
  };
}]);

angular.module('huoyun.widget').factory("Dialog", ['$q', 'ngDialog', function ($q, ngDialog) {

  return {
    showError: function showError(message, title, buttonText) {
      return this.showConfirm({
        title: title || "错误",
        content: message,
        cancel: {
          visibility: false
        },
        confirm: {
          text: buttonText || "知道了"
        }
      });
    },

    showConfirm: function showConfirm(options) {
      var dialogOptions = {
        template: "dialog/dialog.html",
        controller: "ConfirmDialogController",
        appendClassName: options.appendClassName || "",
        closeByDocument: !!options.closeByDocument,
        data: {
          title: options.title || "无标题",
          content: options.content,
          templateUrl: options.templateUrl,
          confirmButtonText: options.confirm && options.confirm.text || "确定",
          cancelButtonText: options.cancel && options.cancel.text || "取消",
          confirmButtonVisibility: !(options.confirm && options.confirm.visibility === false),
          cancelButtonVisibility: !(options.cancel && options.cancel.visibility === false),
          params: options.params
        }
      };

      ngDialog.open(dialogOptions).closePromise.then(function (data) {
        if (data.value) {
          if (Array.isArray(data.value) && data.value.length > 0) {
            var key = data.value[0];
            if (key === 'OK' && options.confirm && typeof options.confirm.callback === "function") {
              return options.confirm.callback.apply(this, data.value);
            }

            if (key === "Cancel" && options.cancel && typeof options.cancel.callback === "function") {
              return options.cancel.callback.apply(this, data.value);
            }

            if (typeof options.closeCallback === "function") {
              return options.closeCallback.apply(this, data.value);
            }
          }

          if (typeof options.closeCallback === "function") {
            return options.closeCallback.apply(this, [data.value]);
          }
        }

        if (typeof options.closeCallback === "function") {
          return options.closeCallback.apply(this);
        }
      });
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsDraggable', ["DataStore", function (DataStore) {
  return {
    restrict: 'A',
    scope: {
      dragData: "="
    },
    link: function link($scope, elem, attrs, controller) {
      elem.attr("draggable", true);
      elem.bind("dragstart", function ($event) {
        var token = new Date().getTime();
        DataStore.setItem(token, $scope.dragData);
        if ($event.originalEvent) {
          $event.dataTransfer = $event.originalEvent.dataTransfer;
        }

        $event.dataTransfer.setData("token", token);
      });
    }
  };
}]);

angular.module('huoyun.widget').directive('dragSuccess', ["$parse", "DataStore", function ($parse, DataStore) {
  return {
    restrict: 'A',
    link: function link($scope, elem, attrs) {
      if (attrs.dragSuccess) {
        var onDropSuccessFn = $parse(attrs.dragSuccess);
      }

      elem.on("dragover", function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      });

      elem.on("dragleave", function (event) {
        event.preventDefault();
        event.stopPropagation();
      });

      elem.bind("drop", function ($event) {
        if ($event.originalEvent) {
          $event.dataTransfer = $event.originalEvent.dataTransfer;
        }
        var token = $event.dataTransfer.getData("token");
        $event.preventDefault();
        $event.stopPropagation();
        if (onDropSuccessFn) {
          $scope.$evalAsync(function () {
            onDropSuccessFn($scope, {
              $event: $event,
              $dragData: DataStore.getItemAndRemove(token)
            });
          });
        }
      });
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Drag", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function Drag(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
    this.$$draggable = true;
  }

  HuoYunWidgetCore.ClassExtend(Drag, HuoYunWidgetCore.Control);

  Drag.prototype.setDragData = function (dragData) {
    this.$$dragData = dragData;
    return this;
  };

  Drag.prototype.isDraggable = function () {
    return this.$$draggable;
  };

  Drag.prototype.onDragStart = function ($event) {
    console.log(arguments);
  };

  return Drag;
}]);
'use strict';

angular.module('huoyun.widget').directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    //require: "ngRepeat",
    link: function link(scope, element, attr) {
      if (scope.$last === true) {
        scope.$evalAsync(attr.onFinishRender);
      }
    }
  };
});
'use strict';

angular.module('huoyun.widget').factory("FormOrientation", [function () {

  var Orientations = {
    Horizontal: "horizontal",
    Vertical: "vertical"
  };

  function FormOrientation(val) {
    this.$$value = Orientations.Vertical;
    if (typeof val === "string") {
      if (val.toLowerCase() === "horizontal") {
        this.$$value = Orientations.Horizontal;
      }
    }
  }

  FormOrientation.prototype.getValue = function () {
    return this.$$value.toLowerCase();
  };

  FormOrientation.prototype.appendClass = function () {
    if (this.getValue() === Orientations.Horizontal) {
      return "form-horizontal";
    }
    return "";
  };

  return FormOrientation;
}]);

angular.module('huoyun.widget').factory("FormHeaderControl", ["HuoYunWidgetCore", "ButtonControl", function (HuoYunWidgetCore, ButtonControl) {

  function FormHeaderControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    var that = this;
    that.$$buttons = [];

    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (button) {
        that.$$buttons.push(new ButtonControl(button));
      });
    }
  }

  HuoYunWidgetCore.ClassExtend(FormHeaderControl, HuoYunWidgetCore.Control);

  FormHeaderControl.prototype.getTitle = function () {
    return this.getOptions().title;
  };

  FormHeaderControl.prototype.getButtons = function () {
    return this.$$buttons;
  };

  return FormHeaderControl;
}]);

angular.module('huoyun.widget').factory("FormFooterControl", ["HuoYunWidgetCore", "ButtonControl", function (HuoYunWidgetCore, ButtonControl) {

  function FormFooterControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    var that = this;
    that.$$buttons = [];

    if (Array.isArray(options.buttons)) {
      options.buttons.forEach(function (button) {
        that.$$buttons.push(new ButtonControl(button));
      });
    }
  }

  HuoYunWidgetCore.ClassExtend(FormFooterControl, HuoYunWidgetCore.Control);

  FormFooterControl.prototype.getButtons = function () {
    return this.$$buttons;
  };

  return FormFooterControl;
}]);

angular.module('huoyun.widget').factory("FormControl", ["$log", "HuoYunWidgetCore", "FormGroupControl", "FormOrientation", "FormHeaderControl", "FormFooterControl", function ($log, HuoYunWidgetCore, FormGroupControl, FormOrientation, FormHeaderControl, FormFooterControl) {

  function FormControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
    this.$$data = {};
    var that = this;

    that.$$orientation = new FormOrientation(options.orientation);
    that.$$groups = [];

    if (options.header) {
      that.$$header = new FormHeaderControl(options.header);
    }

    if (options.footer) {
      that.$$footer = new FormFooterControl(options.footer);
    }

    if (options.groups) {
      if (Array.isArray(options.groups)) {
        options.groups.forEach(function (group) {
          var control = new FormGroupControl(group).setFormControl(that).on("valueChanged", function (newVal, oldVal) {
            that.setPropertyValue(control.getName(), newVal);
          });

          that.$$groups.push(control);
        });
      } else {
        throw new Error("groups should be array.");
      }
    }
  }

  HuoYunWidgetCore.ClassExtend(FormControl, HuoYunWidgetCore.Control);

  FormControl.prototype.getOrientation = function () {
    return this.$$orientation.getValue();
  };

  FormControl.prototype.appendOrientationClass = function () {
    return this.$$orientation.appendClass();
  };

  FormControl.prototype.isReadonly = function () {
    return this.__isFalse("readonly");
  };

  FormControl.prototype.getHeader = function () {
    return this.$$header;
  };

  FormControl.prototype.getFooter = function () {
    return this.$$footer;
  };

  FormControl.prototype.isFooterVisibility = function () {
    return this.getFooter().isVisibility();
  };

  FormControl.prototype.getGroups = function () {
    return this.$$groups;
  };

  FormControl.prototype.getBindExpr = function (formGroup) {
    return this.getPropertyValue(formGroup.getName());
  };

  FormControl.prototype.setData = function (data) {
    this.$$data = data;
    return this;
  };

  FormControl.prototype.getData = function () {
    return this.$$data;
  };

  FormControl.prototype.getPropertyValue = function (propName) {
    return this.getData()[propName];
  };

  FormControl.prototype.setPropertyValue = function (propName, val) {
    var oldVal = this.getPropertyValue(propName);
    this.__setPropertyValue(propName, val);
    this.raiseEvent("propertyValueChanged", [propName, val, oldVal]);
    return this;
  };

  FormControl.prototype.__setPropertyValue = function (propName, val) {
    this.getData()[propName] = val;
    return this;
  };

  return FormControl;
}]);
'use strict';

angular.module('huoyun.widget').provider("FormControlProvider", [function () {

  var controls = {};
  var widgetNames = {};

  this.registerControl = function (type, control, name) {
    controls[type] = control;
    widgetNames[type] = name;
    return this;
  };

  this.getControlbyType = function (type) {
    return controls[type];
  };

  this.getWidgetNameByType = function (type) {
    return widgetNames[type];
  };

  this.getWidgetNameByTypeOrDefault = function (type, defaultType) {
    return widgetNames[type] || widgetNames[defaultType];
  };

  this.$get = function () {
    return this;
  };
}]);

angular.module('huoyun.widget').run(["FormControlProvider", "HuoYunWidgetsInputs", function (FormControlProvider, HuoYunWidgetsInputs) {
  FormControlProvider.registerControl("DROPDOWN", HuoYunWidgetsInputs.Dropdown, "widgets-dropdown");
  FormControlProvider.registerControl("EMAIL", HuoYunWidgetsInputs.EmailBox, "widgets-email-box");
  FormControlProvider.registerControl("STRING", HuoYunWidgetsInputs.TextBox, "widgets-text-box");
  FormControlProvider.registerControl("DATALIST", HuoYunWidgetsInputs.DataList, "widgets-data-list");
  FormControlProvider.registerControl("DATE", HuoYunWidgetsInputs.Date, "widgets-date-box");
  FormControlProvider.registerControl("TIME", HuoYunWidgetsInputs.Time, "widgets-time-input-box");
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsForm', ["$log", function ($log) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'form/form.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("InputControl", ["HuoYunWidgetCore", "InputValidatorProvider", "InputErrorControl", function (HuoYunWidgetCore, InputValidatorProvider, InputErrorControl) {

  function InputControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(InputControl, HuoYunWidgetCore.Control);

  InputControl.prototype.getPlaceholder = function () {
    return this.getOptions().placeholder;
  };

  InputControl.prototype.isReadonly = function () {
    return this.__isFalse("readonly");
  };

  InputControl.prototype.setValue = function (value) {
    var oldVal = this.getValue();
    if (oldVal !== value) {
      this.$$value = value;
      this.raiseEvent("valueChanged", [value, oldVal]);
    }
    return this;
  };

  InputControl.prototype.getValue = function () {
    return this.$$value;
  };

  InputControl.prototype.addValidator = function (validator) {
    this.getValidators().push(validator);
  };

  InputControl.prototype.getValidators = function () {
    if (!this.$$validators) {
      this.$$validators = [];
    }

    return this.$$validators.concat(this.getGlobalValidators()).filter(function (validator) {
      return !!validator;
    });
  };

  InputControl.prototype.getGlobalValidators = function () {
    return InputValidatorProvider.getValidatorsByInputControl(this.constructor);
  };

  InputControl.prototype.validator = function () {
    var that = this;
    HuoYunWidgetCore.Promise.all(this.getValidators().map(function (validator) {
      var validatorInstance = new validator(that.getValue());
      return validatorInstance.onValid();
    })).then(function () {
      that.getErrorControl() && that.getErrorControl().clear();
    }).catch(function (ex) {
      that.$$error = new InputErrorControl(ex);
    });
  };

  InputControl.prototype.hasError = function () {
    return this.getErrorControl() && this.getErrorControl().hasError();
  };

  InputControl.prototype.getErrorControl = function () {
    return this.$$error;
  };

  return InputControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsInputs", ["TextControl", "EmailControl", "DropdownControl", "DataListControl", "SearchControl", "DateControl", "TimeControl", function (TextControl, EmailControl, DropdownControl, DataListControl, SearchControl, DateControl, TimeControl) {
  return {
    TextBox: TextControl,
    EmailBox: EmailControl,
    Dropdown: DropdownControl,
    DataList: DataListControl,
    Search: SearchControl,
    Date: DateControl,
    Time: TimeControl
  };
}]);
'use strict';

angular.module('huoyun.widget').provider("InputValidatorProvider", [function () {

  var validators = {};

  this.registerValidator = function (input, validator) {
    validators[input] = validator;
    return this;
  };

  this.getValidatorsByInputControl = function (input) {
    return validators[input];
  };

  this.$get = function () {
    return this;
  };
}]);

angular.module('huoyun.widget').run(["InputValidatorProvider", "HuoYunWidgetsValidators", "HuoYunWidgetsInputs", function (InputValidatorProvider, HuoYunWidgetsValidators, HuoYunWidgetsInputs) {
  InputValidatorProvider.registerValidator(HuoYunWidgetsInputs.EmailBox, HuoYunWidgetsValidators.Email);
}]);
'use strict';

angular.module('huoyun.widget').factory("CheckBoxListViewItemControl", ["HuoYunWidgetCore", "ListViewItemControl", "CheckBoxControl", function (HuoYunWidgetCore, ListViewItemControl, CheckBoxControl) {

  function CheckBoxListViewItemControl() {
    ListViewItemControl.apply(this, arguments);

    var that = this;
    this.$$checkBox = new CheckBoxControl();
    this.$$checkBox.getText = function () {
      return that.getDisplayText();
    };
  }

  HuoYunWidgetCore.ClassExtend(CheckBoxListViewItemControl, ListViewItemControl);

  CheckBoxListViewItemControl.prototype.getCheckBox = function () {
    return this.$$checkBox;
  };

  return CheckBoxListViewItemControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("ListViewItemControl", ["HuoYunWidgetCore", "ItemControl", function (HuoYunWidgetCore, ItemControl) {

  function ListViewItemControl() {
    ItemControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ListViewItemControl, ItemControl);

  return ListViewItemControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("ListViewControl", ["HuoYunWidgetCore", "SelectorControl", "ListViewItemControl", function (HuoYunWidgetCore, SelectorControl, ListViewItemControl) {

  function ListViewControl() {
    SelectorControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ListViewControl, SelectorControl);

  ListViewControl.prototype.getItemTemplate = function () {
    return this.$$itemTemplate || ListViewItemControl;
  };

  return ListViewControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("LoadingControl", ['$compile', '$rootScope', "$templateCache", "HuoYunWidgetCore", function ($compile, $rootScope, $templateCache, HuoYunWidgetCore) {

  function LoadingControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(LoadingControl, HuoYunWidgetCore.Control);

  LoadingControl.prototype.getContent = function () {
    return this.getOptions().content;
  };

  LoadingControl.prototype.getContainerElement = function () {
    return this.getOptions().containerElement || $('body');
  };

  LoadingControl.prototype.getTemplateUrl = function () {
    return "loading/loading.template.html";
  };

  LoadingControl.prototype.newScope = function () {
    var $scope = $rootScope.$new();
    $scope.loading = this;
    return $scope;
  };

  LoadingControl.prototype.getTemplate = function () {
    return angular.element($templateCache.get(this.getTemplateUrl()));
  };

  LoadingControl.prototype.getWrapperTemplate = function () {
    return angular.element($templateCache.get("loading/loading.wrapper.html"));
  };

  LoadingControl.prototype.show = function () {
    if (this.$$inited) {
      return this.setVisibility(true);
    }

    var template = this.getTemplate();
    if (this.__isBody()) {
      this.getContainerElement().append(template);
    } else {
      this.getContainerElement().wrap(this.getWrapperTemplate()).after(template);
    }
    $compile(template)(this.newScope());
    this.$$inited = true;
    return this;
  };

  LoadingControl.prototype.close = function () {
    this.setVisibility(false);
  };

  LoadingControl.prototype.isVisibility = function () {
    return this.$$visibility !== false;
  };

  LoadingControl.prototype.setVisibility = function (visibility) {
    this.$$visibility = visibility;
    return this;
  };

  LoadingControl.prototype.__isBody = function () {
    var elem = this.getContainerElement();
    if (elem.length > 0) {
      return elem[0].tagName === "BODY";
    }

    return false;
  };

  return LoadingControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsLoading', [function () {
  return {
    priority: 100,
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'loading/loading.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("NavControl", ["HuoYunWidgetCore", "NavItemControl", function (HuoYunWidgetCore, NavItemControl) {

  function NavControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$items = [];
    var that = this;
    options.items.forEach(function (item) {
      var itemControl = new NavItemControl(item).setNav(that);
      that.$$items.push(itemControl);
    });
  }

  NavControl.prototype.getItems = function () {
    return this.$$items;
  };

  HuoYunWidgetCore.ClassExtend(NavControl, HuoYunWidgetCore.Control);

  return NavControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsNav', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'nav/nav.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("NavItemControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function NavItemControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(NavItemControl, HuoYunWidgetCore.Control);

  NavItemControl.prototype.setNav = function (nav) {
    this.$$nav = nav;
    return this;
  };

  NavItemControl.prototype.getNav = function () {
    return this.$$nav;
  };

  NavItemControl.prototype.getText = function () {
    return this.getOptions().text;
  };

  NavItemControl.prototype.onClick = function () {
    if (!this.isSelected()) {
      this.setSelected(true);
      var that = this;
      this.getNav().getItems().forEach(function (item) {
        if (item !== that) {
          item.setSelected(false);
        }
      });
    }
    this.getNav().raiseEvent("itemClick", [this]);
  };

  NavItemControl.prototype.isSelected = function () {
    return this.$$selected;
  };

  NavItemControl.prototype.setSelected = function (val) {
    this.$$selected = val;
    return this;
  };

  return NavItemControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("PaginationControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  var Default_Pagination_Count = 5;

  function PaginationControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(PaginationControl, HuoYunWidgetCore.Control);

  PaginationControl.prototype.setData = function (data) {
    this.setTotalPages(data.totalPages).setFirst(data.first).setLast(data.last).setCurrentPage(data.currentPage).__reset();
  };

  PaginationControl.prototype.__reset = function () {
    this.$$pages = null;
    return this;
  };

  PaginationControl.prototype.isFirst = function () {
    return this.getOptions().first === true;
  };

  PaginationControl.prototype.setFirst = function (val) {
    this.getOptions().first = val;
    return this;
  };

  PaginationControl.prototype.setLast = function (val) {
    this.getOptions().last = val;
    return this;
  };

  PaginationControl.prototype.isLast = function () {
    return this.getOptions().last === true;
  };

  PaginationControl.prototype.getTotalPages = function () {
    return this.getOptions().totalPages;
  };

  PaginationControl.prototype.setTotalPages = function (val) {
    this.getOptions().totalPages = val;
    return this;
  };

  PaginationControl.prototype.getPages = function () {
    if (!this.$$pages) {
      this.$$pages = [];

      var paginationCount = this.getPaginationCount();
      var totalPages = this.getTotalPages();

      var beginPage = parseInt(this.getCurrentPage() / paginationCount) * paginationCount;
      var endPage = beginPage + paginationCount;
      if (endPage > totalPages) {
        endPage = totalPages;
      }
      for (var index = beginPage; index < endPage; index++) {
        this.$$pages.push(index);
      }
    }

    return this.$$pages;
  };

  PaginationControl.prototype.getCurrentPage = function () {
    return this.getOptions().currentPage;
  };

  PaginationControl.prototype.setCurrentPage = function (val) {
    this.getOptions().currentPage = val;
    return this;
  };

  PaginationControl.prototype.activeClass = function (page) {
    return this.getCurrentPage() === page ? "active" : "";
  };

  PaginationControl.prototype.getPageText = function (page) {
    return page + 1;
  };

  PaginationControl.prototype.onPageClick = function (page) {
    this.raiseEvent("pageChanged", [page, this]);
  };

  PaginationControl.prototype.move = function (page) {
    if (page < 0 || page >= this.getTotalPages()) {
      throw new Error("invalid arguments");
    }

    this.setCurrentPage(page).setFirst(page === 0).setLast(page === this.getTotalPages() - 1).__reset();
  };

  PaginationControl.prototype.getPaginationCount = function () {
    return this.getOptions().paginationCount || Default_Pagination_Count;
  };

  PaginationControl.prototype.onPerviousClick = function () {
    if (!this.isFirst()) {
      this.onPageClick(this.getCurrentPage() - 1);
    }
  };

  PaginationControl.prototype.onNextClick = function () {
    if (!this.isLast()) {
      this.onPageClick(this.getCurrentPage() + 1);
    }
  };

  return PaginationControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsPagination', function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'pagination/pagination.html',
    link: function link($scope, elem, attrs) {}
  };
});
'use strict';

angular.module('huoyun.widget').factory("ItemControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function ItemControl() {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(ItemControl, HuoYunWidgetCore.Control);

  ItemControl.prototype.setSelector = function (selector) {
    this.$$selector = selector;
    return this;
  };

  ItemControl.prototype.getSelector = function () {
    return this.$$selector;
  };

  ItemControl.prototype.setData = function (data) {
    this.$$data = data;
    return this;
  };

  ItemControl.prototype.getData = function () {
    return this.$$data;
  };

  ItemControl.prototype.isSelected = function () {
    return this.$$isSelected === true;
  };

  ItemControl.prototype.setSelected = function () {
    this.$$isSelected = true;
    return this;
  };

  ItemControl.prototype.setUnselected = function () {
    this.$$isSelected = false;
    return this;
  };

  ItemControl.prototype.toggleSelected = function () {
    this.$$isSelected = !this.$$isSelected;
    return this;
  };

  ItemControl.prototype.getValue = function () {
    return this.__getValueByPathFunc("getValuePath");
  };

  ItemControl.prototype.getDisplayText = function () {
    return this.__getValueByPathFunc("getDisplayPath");
  };

  ItemControl.prototype.hasTemplateUrl = function () {
    return this.getSelector().hasItemTemplateUrl();
  };

  ItemControl.prototype.onClicked = function () {
    this.getSelector().onItemClicked(this);
  };

  ItemControl.prototype.__getValueByPathFunc = function (pathFuncName) {
    var data = this.getData();

    if (data === null || data === undefined) {
      return data;
    }

    var selector = this.getSelector();
    if (!selector) {
      return data;
    }

    var displayPath = selector[pathFuncName]();
    if (displayPath) {
      return this.__getValueByPath(data, displayPath);
    }

    return data;
  };

  ItemControl.prototype.__getValueByPath = function (data, path) {
    if (typeof path === "string") {
      var paths = path.split(".");
      if (paths.length === 0) {
        return undefined;
      }

      var obj = data[paths[0]];
      if (obj === undefined || obj === null || paths.length === 1) {
        return obj;
      }

      return this.getValueByPath(obj, paths.slice(1).join("."));
    }

    throw new Error("path must be string");
  };

  return ItemControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("Selection", [function () {

  var Modes = {
    None: "none",
    Single: "single",
    Multiple: "multiple"
  };

  function Selection(val) {
    this.$$value = Modes.Single;
    if (typeof val === "string") {
      if (val.toLowerCase() === Modes.Multiple) {
        this.$$value = Modes.Multiple;
      }
    }
  }

  Selection.prototype.getValue = function () {
    return this.$$value.toLowerCase();
  };

  Selection.prototype.isSingle = function () {
    return this.getValue() === Modes.Single;
  };

  Selection.prototype.isMultiple = function () {
    return this.getValue() === Modes.Multiple;
  };

  Selection.Modes = Modes;

  return Selection;
}]);
'use strict';

angular.module('huoyun.widget').factory("SelectorControl", ["$q", "HuoYunWidgetCore", "ItemControl", "Selection", function ($q, HuoYunWidgetCore, ItemControl, Selection) {

  function SelectorControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(SelectorControl, HuoYunWidgetCore.Control);

  SelectorControl.prototype.getSelection = function () {
    if (!this.$$selection) {
      this.$$selection = new Selection(this.getOptions().selection);
    }
    return this.$$selection;
  };

  SelectorControl.prototype.setSelection = function (selection) {
    if (selection instanceof Selection) {
      this.$$selection = selection;
      return this;
    }

    throw new Error("selection must be Selection type.");
  };

  SelectorControl.prototype.setSelectionMode = function (selection) {
    return this.setSelection(new Selection(selection));
  };

  SelectorControl.prototype.getDataSource = function () {
    if (!this.$$dataSource) {
      var dataSource = this.getOptions().dataSource;
      if (Array.isArray(dataSource)) {
        this.$$dataSource = $q.resolve(dataSource);
      }

      if (typeof dataSource === "function") {
        this.$$dataSource = dataSource.apply(this);
      }
    }

    if (this.$$dataSource instanceof $q) {
      return this.$$dataSource;
    }

    return $q.resolve(this.$$dataSource);
  };

  SelectorControl.prototype.setDataSource = function (dataSource) {
    var oldDataSource = this.getDataSource();
    this.getOptions().dataSource = dataSource;
    this.__resetDataSource();
    this.raiseEvent("dataSourceChanged", [this.getDataSource(), oldDataSource]);
    return this;
  };

  SelectorControl.prototype.__resetDataSource = function () {
    this.$$dataSource = null;
    this.$$items = null;
  };

  SelectorControl.prototype.getItems = function () {
    if (!this.$$items) {
      this.$$items = [];
      var that = this;
      this.getDataSource().then(function (data) {
        if (Array.isArray(data)) {
          data.forEach(function (itemData) {
            var ItemTemplate = that.getItemTemplate() || ItemControl;
            var itemControl = new ItemTemplate().setData(itemData).setSelector(that);
            that.$$items.push(itemControl);
          });
        }
      });
    }

    return this.$$items;
  };

  SelectorControl.prototype.setItemTemplate = function (itemTemplate) {
    this.$$itemTemplate = itemTemplate;
    return this;
  };

  SelectorControl.prototype.getItemTemplate = function () {
    return this.$$itemTemplate || ItemControl;
  };

  SelectorControl.prototype.setItemTemplateUrl = function (itemTemplateUrl) {
    this.$$itemTemplateUrl = itemTemplateUrl;
    return this;
  };

  SelectorControl.prototype.getItemTemplateUrl = function () {
    return this.$$itemTemplateUrl;
  };

  SelectorControl.prototype.hasItemTemplateUrl = function () {
    return !!this.getItemTemplateUrl();
  };

  SelectorControl.prototype.getValuePath = function () {
    return this.getOptions().valuePath;
  };

  SelectorControl.prototype.setValuePath = function (valuePath) {
    this.getOptions().valuePath = valuePath;
    return this;
  };

  SelectorControl.prototype.getDisplayPath = function () {
    return this.getOptions().displayPath;
  };

  SelectorControl.prototype.setDisplayPath = function (displayPath) {
    this.getOptions().displayPath = displayPath;
    return this;
  };

  SelectorControl.prototype.onItemClicked = function (item) {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Single) {
      var oldSelectedItem = this.getSelectionItem();
      if (item !== oldSelectedItem) {
        oldSelectedItem && oldSelectedItem.setUnselected();
        item.setSelected();
        this.raiseEvent("selectedChanged", [item, oldSelectedItem]);
      }

      return;
    }

    if (selection === Selection.Modes.Multiple) {
      var oldSelectedItems = this.getSelectedItems();
      item.toggleSelected();
      var newSelectedItems = this.getSelectedItems();
      this.raiseEvent("selectedChanged", [newSelectedItems, oldSelectedItems]);
    }
  };

  SelectorControl.prototype.getSelectionItem = function () {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Single) {
      var items = this.getItems();
      for (var index = 0; index < items.length; index++) {
        if (items[index].isSelected()) {
          return items[index];
        }
      }
    }
  };

  SelectorControl.prototype.getSelectedValue = function () {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Single) {
      var selectedItem = this.getSelectionItem();
      return selectedItem && selectedItem.getValue();
    }

    if (selection === Selection.Modes.Multiple) {
      var selectedItems = this.getSelectedItems();
      return selectedItems.map(function (selectedItem) {
        return selectedItem.getValue();
      });
    }
  };

  SelectorControl.prototype.getSelectedItems = function () {
    var selection = this.getSelection().getValue();
    if (selection === Selection.Modes.Multiple) {
      return this.getItems().filter(function (item) {
        return item.isSelected();
      });
    }
  };

  return SelectorControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("SidebarControl", ["HuoYunWidgetCore", "SidebarItemControl", function (HuoYunWidgetCore, SidebarItemControl) {

  function SidebarControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$items = [];
    var that = this;
    (options.items || []).forEach(function (item) {
      var itemControl = new SidebarItemControl(item).setSideBar(that);
      that.$$items.push(itemControl);
    });
  }

  HuoYunWidgetCore.ClassExtend(SidebarControl, HuoYunWidgetCore.Control);

  SidebarControl.prototype.getItems = function () {
    return this.$$items;
  };

  return SidebarControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSideBar', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'sidebar/sidebar.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SidebarItemControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function SidebarItemControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$items = [];
    var that = this;
    (options.items || []).forEach(function (item) {
      var itemControl = new SidebarItemControl(item).setParent(that);
      that.$$items.push(itemControl);
    });
  }

  HuoYunWidgetCore.ClassExtend(SidebarItemControl, HuoYunWidgetCore.Control);

  SidebarItemControl.prototype.setSideBar = function (sidebar) {
    this.$$sidebar = sidebar;
    return this;
  };

  SidebarItemControl.prototype.getSideBar = function () {
    if (!this.$$sidebar) {
      this.$$sidebar = this.getParent() && this.getParent().getSideBar();
    }
    return this.$$sidebar;
  };

  SidebarItemControl.prototype.setParent = function (sidebarItem) {
    this.$$parent = sidebarItem;
    return this;
  };

  SidebarItemControl.prototype.getParent = function () {
    return this.$$parent;
  };

  SidebarItemControl.prototype.getItems = function () {
    return this.$$items;
  };

  SidebarItemControl.prototype.hasChild = function () {
    return this.getItems().length !== 0;
  };

  SidebarItemControl.prototype.getText = function () {
    return this.getOptions().text;
  };

  SidebarItemControl.prototype.getIcon = function () {
    return this.getOptions().icon;
  };

  SidebarItemControl.prototype.onClick = function () {
    this.getSideBar().raiseEvent("itemClick", [this, this.getParent()]);
  };

  return SidebarItemControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSideBarItem', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'sidebar/sidebaritem.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SlideSelectorControl", ["HuoYunWidgetCore", "$timeout", function (HuoYunWidgetCore, $timeout) {

  var ItemHeight = 30;
  var OffsetItemCount = 2;
  var RepeatCount = 3;

  function SlideSelectorControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$value = this.getOptions().selectedValue;
  }

  HuoYunWidgetCore.ClassExtend(SlideSelectorControl, HuoYunWidgetCore.Control);

  SlideSelectorControl.prototype.getItems = function () {
    if (!this.$$items) {
      var items = this.__getItems();
      if (Array.isArray(items)) {
        this.$$items = [];
        for (var index = 0; index < this.getRepeatCount(); index++) {
          this.$$items = this.$$items.concat(items);
        }
      }
    }

    return this.$$items;
  };

  SlideSelectorControl.prototype.getRepeatCount = function () {
    return this.getOptions().repeatCount || RepeatCount;
  };

  SlideSelectorControl.prototype.__getItems = function () {
    return this.getOptions().items || [];
  };

  SlideSelectorControl.prototype.getItemId = function (index) {
    return 'item_' + this.getId() + '_' + index;
  };

  SlideSelectorControl.prototype.getItemDisplayText = function (item) {
    var displayPath = this.getOptions().displayPath;
    if (displayPath) {
      return item[displayPath];
    }

    return item;
  };

  SlideSelectorControl.prototype.getItemValue = function (item) {
    var valuePath = this.getValuePath();
    if (valuePath) {
      return item[valuePath];
    }

    return item;
  };

  SlideSelectorControl.prototype.getValuePath = function () {
    return this.getOptions().valuePath;
  };

  SlideSelectorControl.prototype.indexOf = function (value) {
    if (value) {
      for (var index = 0; index < this.__getItems().length; index++) {
        if (value === this.getItemValue(this.__getItems()[index])) {
          return index;
        }
      }
    }

    return -1;
  };

  SlideSelectorControl.prototype.scrollToInit = function () {
    var index = this.indexOf(this.getSelectedValue());
    if (index === -1) {
      index = this.__getItems().length;
    } else {
      index += this.__getItems().length;
    }

    this.scrollByItemIndex(index);
  };

  SlideSelectorControl.prototype.getItemPanelElement = function () {
    if (!this.$$itemsPanelElem) {
      this.$$itemsPanelElem = this.getElement().find(".items-pannel");
    }

    return this.$$itemsPanelElem;
  };

  SlideSelectorControl.prototype.onRepeatRendered = function () {
    var that = this;
    if (that.__$$calcScrollTop) {
      this.getItemPanelElement().scrollTop(that.__$$calcScrollTop);
      return;
    }

    this.scrollToInit();

    var timer = null;
    this.getItemPanelElement().off("scroll").on("scroll", function (event) {
      var elem = this;
      var index = Math.ceil(elem.scrollTop / ItemHeight);
      if (timer) {
        clearTimeout(timer);
      }

      if (that.getItems().length - index < that.__getItems().length) {
        that.__$$calcScrollTop = index * ItemHeight;
        that.$$items = that.$$items.concat(that.__getItems());
      } else {
        timer = setTimeout(function () {
          var calcScrollTop = index * ItemHeight;
          if (elem.scrollTop !== calcScrollTop) {
            elem.scrollTop = calcScrollTop;
          } else {
            $timeout(function () {
              that.setScrollTop(calcScrollTop).setSelectedValue(that.getItems()[index + that.getOffsetItemCount()]);
            });
          }
        }, 150);

        $timeout(function () {
          that.setScrollTop(elem.scrollTop);
        });
      }
    });
  };

  SlideSelectorControl.prototype.getSelectedValue = function () {
    return this.$$value;
  };

  SlideSelectorControl.prototype.setSelectedValue = function (value) {
    var oldValue = this.getSelectedValue();
    this.$$value = value;
    if (oldValue !== value) {
      this.raiseEvent("selectedChanged", [value, oldValue, this]);
    }
    return this;
  };

  SlideSelectorControl.prototype.isItemSelected = function (item, index) {
    var scrollTop = this.getScrollTop();
    return Math.ceil(scrollTop / ItemHeight) + this.getOffsetItemCount() === index;
  };

  SlideSelectorControl.prototype.setScrollTop = function (scrollTop) {
    this.$$scrollTop = scrollTop;
    return this;
  };

  SlideSelectorControl.prototype.getScrollTop = function () {
    return this.$$scrollTop || 0;
  };

  SlideSelectorControl.prototype.scrollToNextElement = function () {
    this.getItemPanelElement().scrollTop(this.getScrollTop() + ItemHeight);
  };

  SlideSelectorControl.prototype.scrollToPerviousElement = function () {
    this.getItemPanelElement().scrollTop(this.getScrollTop() - ItemHeight);
  };

  SlideSelectorControl.prototype.getOffsetItemCount = function () {
    return this.getOptions().offsetItemCount || OffsetItemCount;
  };

  SlideSelectorControl.prototype.isActive = function () {
    return this.$$active === true;
  };

  SlideSelectorControl.prototype.setActive = function (val) {
    if (this.$$active !== val) {
      var oldValue = this.$$active;
      this.$$active = val;
      var that = this;
      if (val) {
        $(document).on("click", that.onClick.bind(this));
      } else {
        $(document).off("click", that.onClick.bind(this));
      }
      this.raiseEvent("activeChanged", [val, oldValue, this]);
    }
    return this;
  };

  SlideSelectorControl.prototype.onClick = function (event) {
    if ($(event.target).closest('#' + this.getId()).length === 0) {
      var that = this;
      $timeout(function () {
        that.setActive(false);
      });
    }
  };

  SlideSelectorControl.prototype.scrollByItemIndex = function (index) {
    var position = ItemHeight * (index - this.getOffsetItemCount());
    this.getItemPanelElement().scrollTop(position);
  };

  SlideSelectorControl.prototype.onItemClicked = function (item, index) {
    if (this.isActive()) {
      this.scrollByItemIndex(index);
      return;
    }

    if (!this.isActive() && this.isItemSelected(item, index)) {
      this.setActive(true);
    }
  };

  return SlideSelectorControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSlideSelector', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    replace: true,
    templateUrl: 'slide.selector/slide.selector.html',
    link: function link($scope, elem, attrs) {
      $scope.options && $scope.options.setElement(elem);
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("TabControl", ["HuoYunWidgetCore", "TabItemControl", function (HuoYunWidgetCore, TabItemControl) {

  function TabControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TabControl, HuoYunWidgetCore.Control);

  TabControl.prototype.getTabItems = function () {
    if (!this.$$items) {
      this.$$items = [];
      var that = this;
      (this.getOptions().items || []).forEach(function (item) {
        var itemControl = new TabItemControl(item).setTab(that);
        that.$$items.push(itemControl);
      });

      this.setTabSelected(0);
    }
    return this.$$items;
  };

  TabControl.prototype.setTabSelected = function (tabIndex) {
    var items = this.getTabItems();
    if (items.length > tabIndex) {
      items[tabIndex].selected();
    }
  };

  TabControl.prototype.getSelectedTabItem = function () {
    var items = this.getTabItems();
    for (var index = 0; index < items.length; index++) {
      if (items[index].isSelected()) {
        return items[index];
      }
    }
  };

  TabControl.prototype.setTabItemTemplate = function (index, template) {
    var tabItem = this.getTabItems()[index];
    if (tabItem) {
      tabItem.setTemplate(template);
    }
  };

  return TabControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("TabItemControl", ["HuoYunWidgetCore", "TabItemHeaderControl", function (HuoYunWidgetCore, TabItemHeaderControl) {

  function TabItemControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TabItemControl, HuoYunWidgetCore.Control);

  TabItemControl.prototype.setTab = function (tab) {
    this.$$tab = tab;
    return this;
  };

  TabItemControl.prototype.getTab = function () {
    return this.$$tab;
  };

  TabItemControl.prototype.getHeader = function () {
    if (!this.$$header) {
      this.$$header = new TabItemHeaderControl(this.getOptions().header).setTabItem(this);
    }
    return this.$$header;
  };

  TabItemControl.prototype.getContent = function () {
    return this.getOptions().content;
  };

  TabItemControl.prototype.isSelected = function () {
    return this.$$selected;
  };

  TabItemControl.prototype.selected = function () {
    this.$$selected = true;
    var that = this;
    this.getTab().getTabItems().forEach(function (tabItem) {
      if (that !== tabItem) {
        tabItem.unselected();
      }
    });
  };

  TabItemControl.prototype.unselected = function () {
    this.$$selected = false;
  };

  TabItemControl.prototype.onClick = function () {
    if (!this.isSelected()) {
      var oldSelectedItem = this.getTab().getSelectedTabItem();
      this.selected();
      this.getTab().raiseEvent("selectedChanged", [this, oldSelectedItem, this.getTab()]);
    }
  };

  TabItemControl.prototype.setTemplate = function (template) {
    this.$$template = template;
    return this;
  };

  TabItemControl.prototype.getTemplate = function () {
    return this.$$template;
  };

  return TabItemControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("TabItemHeaderControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function TabItemHeaderControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TabItemHeaderControl, HuoYunWidgetCore.Control);

  TabItemHeaderControl.prototype.setTabItem = function (tabItem) {
    this.$$tabItem = tabItem;
    return this;
  };

  TabItemHeaderControl.prototype.getTabItem = function () {
    return this.$$tabItem;
  };

  TabItemHeaderControl.prototype.getContent = function () {
    return this.getOptions().content;
  };

  return TabItemHeaderControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTabItemHeader', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'tab/tab.item.header.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

// angular.module('huoyun.widget').directive('widgetsTabItem', [
//   function() {
//     return {
//       restrict: 'A',
//       scope: {
//         options: "="
//       },
//       templateUrl: 'tab/tab.item.html',
//       link: function($scope, elem, attrs) {}
//     }
//   }
// ]);
'use strict';

angular.module('huoyun.widget').factory("TableColumnControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  var SortDirection = {
    Down: "down",
    Up: "up"
  };

  function TableColumnControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
    this.$$sortDirection = SortDirection.Up;
  }

  HuoYunWidgetCore.ClassExtend(TableColumnControl, HuoYunWidgetCore.Control);

  TableColumnControl.prototype.getHeaderText = function () {
    return this.getOptions().text;
  };

  TableColumnControl.prototype.getColumnValue = function (row) {
    return row.getColumnValue(this.getName());
  };

  TableColumnControl.prototype.setColumnTemplate = function (template) {
    this.$$columnTemplate = template;
  };

  TableColumnControl.prototype.isSortable = function () {
    return this.getOptions().sortable === true;
  };

  TableColumnControl.prototype.getSortDirection = function () {
    return this.$$sortDirection;
  };

  TableColumnControl.prototype.getTable = function () {
    return this.$$table;
  };

  TableColumnControl.prototype.setTable = function (table) {
    this.$$table = table;
    return this;
  };

  TableColumnControl.prototype.onClick = function () {
    if (this.isSortable()) {
      this.getTable().raiseEvent("sortChanged", [this.getName(), this.getSortDirection()]);
    }
  };

  return TableColumnControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("TableControl", ["HuoYunWidgetCore", "SelectorControl", "TableHeaderControl", "TableRowControl", "TableColumnControl", function (HuoYunWidgetCore, SelectorControl, TableHeaderControl, TableRowControl, TableColumnControl) {

  function TableControl(options) {
    SelectorControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TableControl, SelectorControl);

  TableControl.prototype.getHeader = function () {
    if (!this.$$header) {
      this.$$header = new TableHeaderControl(this.getOptions().header).setTable(this);
    }

    return this.$$header;
  };

  TableControl.prototype.getItemTemplate = function () {
    return this.$$itemTemplate || TableRowControl;
  };

  TableControl.prototype.getColumns = function () {
    if (!this.$$columns) {
      this.$$columns = [];
      var that = this;
      (this.getOptions().columns || []).forEach(function (column) {
        that.$$columns.push(new TableColumnControl(column).setTable(that));
      });
    }

    return this.$$columns;
  };

  TableControl.prototype.getRows = function () {
    return this.getItems();
  };

  TableControl.prototype.onColumnDragSuccess = function ($event, sourceColumn, targetColumn) {
    if (sourceColumn !== targetColumn) {
      this.exchangePosition(sourceColumn, targetColumn);
    }
  };

  TableControl.prototype.exchangePosition = function (sourceColumn, targetColumn) {
    var columns = this.getColumns();
    var souceColumnIndex = columns.indexOf(sourceColumn);
    var targetColumnIndex = columns.indexOf(targetColumn);
    columns[souceColumnIndex] = targetColumn;
    columns[targetColumnIndex] = sourceColumn;
    this.raiseEvent("columnExchanged", [sourceColumn, targetColumn, this]);
  };

  TableControl.prototype.getColumnNames = function () {
    return this.getColumns().map(function (column) {
      return column.getName();
    });
  };

  return TableControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("TableHeaderControl", ["HuoYunWidgetCore", "TableColumnControl", function (HuoYunWidgetCore, TableColumnControl) {

  function TableHeaderControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TableHeaderControl, HuoYunWidgetCore.Control);

  TableHeaderControl.prototype.setTable = function (table) {
    this.$$table = table;
    return this;
  };

  TableHeaderControl.prototype.getTable = function () {
    return this.$$table;
  };

  return TableHeaderControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTable', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'table/table.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("TableRowControl", ["HuoYunWidgetCore", "ItemControl", function (HuoYunWidgetCore, ItemControl) {

  function TableRowControl(options) {
    ItemControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TableRowControl, ItemControl);

  TableRowControl.prototype.getColumnValue = function (columnName) {
    return this.getData()[columnName];
  };

  return TableRowControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("TimePickerControl", ["HuoYunWidgetCore", "$timeout", "SlideSelectorControl", function (HuoYunWidgetCore, $timeout, SlideSelectorControl) {

  var Direction = {
    UP: "up",
    DOWN: "down"
  };

  var HOURS = [];
  for (var index = 1; index <= 12; index++) {
    HOURS.push(index);
  }

  var MINUTES = [];
  for (var _index = 1; _index < 60; _index++) {
    MINUTES.push(_index);
  }

  var TIME_FORMATS = [{
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
      selectedValue: this.getShortHours()
    }).on("selectedChanged", function (newVal, oldVal, control) {
      that.setHours(newVal);
    }).on("activeChanged", function (newVal, oldVal, control) {
      if (newVal) {
        that.getMinutesControl().setActive(false);
        that.getTimeFormatControl().setActive(false);
      }
    });

    this.$$minutesControl = new SlideSelectorControl({
      items: MINUTES,
      selectedValue: this.getMinutes()
    }).on("selectedChanged", function (newVal, oldVal, control) {
      that.setMinutes(newVal);
    }).on("activeChanged", function (newVal, oldVal, control) {
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
    }).on("selectedChanged", function (newVal, oldVal, control) {
      that.setTimeFormat(newVal);
    }).on("activeChanged", function (newVal, oldVal, control) {
      if (newVal) {
        that.getMinutesControl().setActive(false);
        that.getHoursControl().setActive(false);
      }
    });
  }

  HuoYunWidgetCore.ClassExtend(TimePickerControl, HuoYunWidgetCore.Control);

  TimePickerControl.prototype.getMinutes = function () {
    return this.getDate().getMinutes();
  };

  TimePickerControl.prototype.setMinutes = function (val) {
    var oldValue = this.getMinutes();
    if (oldValue !== val) {
      var date = this.getDate();
      this.setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), val));
    }
  };

  TimePickerControl.prototype.getHours = function () {
    return this.getDate().getHours();
  };

  TimePickerControl.prototype.getShortHours = function () {
    var hours = this.getHours();
    return hours > 12 ? hours - 12 : hours;
  };

  TimePickerControl.prototype.setHours = function (val) {
    var oldValue = this.getHours();
    if (oldValue !== val) {
      var date = this.getDate();
      var hours = this.getTimeFormat() === "pm" ? val + 12 : val;
      this.setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, date.getMinutes()));
    }
  };

  TimePickerControl.prototype.getTimeFormat = function () {
    var hours = this.getHours();
    return hours > 12 ? "pm" : "am";
  };

  TimePickerControl.prototype.setTimeFormat = function (val) {
    var oldValue = this.getTimeFormat();
    if (oldValue !== val) {
      var shortHours = this.getShortHours();
      var hours = val === "pm" ? shortHours + 12 : shortHours;
      var date = this.getDate();
      this.setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, date.getMinutes()));
    }
  };

  TimePickerControl.prototype.__getFullYear = function () {
    return this.getDate().getFullYear();
  };

  TimePickerControl.prototype.getDate = function () {
    return this.$$date;
  };

  TimePickerControl.prototype.setDate = function (date) {
    var oldDate = this.$$date;
    this.$$date = date;
    this.raiseEvent("timeChanged", [date, oldDate, this]);
  };

  TimePickerControl.prototype.getMinutesControl = function () {
    return this.$$minutesControl;
  };

  TimePickerControl.prototype.getHoursControl = function () {
    return this.$$hoursControl;
  };

  TimePickerControl.prototype.getTimeFormatControl = function () {
    return this.$$timeFormatControl;
  };

  TimePickerControl.prototype.onOkButtonClicked = function () {
    this.raiseEvent("picked", [this.getDate(), this]);
  };

  TimePickerControl.prototype.onCancelButtonClicked = function () {
    this.raiseEvent("cancelled", [this]);
  };

  return TimePickerControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTimePicker', ["DatePickerControl", function (DatePickerControl) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'timepicker/time.picker.html',
    link: function link($scope, elem, attrs) {

      var control = $scope.options;
      control.on("__scrollingStart", function () {
        elem.find(".list-hours").off("scroll", ScrollEventHandler);
      }).on("__scrollingEnd", function () {
        elem.find(".list-hours").on("scroll", ScrollEventHandler);
      });

      function ScrollEventHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        control.__scroll(this.scrollTop);
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("TipControl", ['$compile', '$rootScope', "$templateCache", "HuoYunWidgetCore", function ($compile, $rootScope, $templateCache, HuoYunWidgetCore) {

  function TipControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TipControl, HuoYunWidgetCore.Control);

  TipControl.prototype.getMessage = function () {
    return this.getOptions().message;
  };

  TipControl.prototype.getContainerElement = function () {
    return this.getOptions().containerElement || $('body');
  };

  TipControl.prototype.getTemplateUrl = function () {
    return this.callSuperMethod("getTemplateUrl", arguments) || "tip/tip.html";
  };

  TipControl.prototype.getDuration = function () {
    return this.getOptions().duration || 1000;
  };

  TipControl.prototype.newScope = function () {
    var $scope = $rootScope.$new();
    $scope.options = this;
    return $scope;
  };

  TipControl.prototype.pop = function () {
    var $tip = $compile($templateCache.get(this.getTemplateUrl()))(this.newScope());
    this.getContainerElement().append($tip);
    $tip.show();
    var that = this;
    var timer = setTimeout(function () {
      $tip.fadeOut(300, function () {
        $tip.remove();
      });
      clearTimeout(timer);
    }, that.getDuration());
  };

  return TipControl;
}]);
'use strict';

angular.module('huoyun.widget').factory("EmailValidator", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  var PATTERN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  function EmailValidator(options) {
    HuoYunWidgetCore.Validator.apply(this, arguments);
    this.$$errors = {};

    this.addErrorType("invalidFormat", "邮箱地址格式不正确");
  }

  HuoYunWidgetCore.ClassExtend(EmailValidator, HuoYunWidgetCore.Validator);

  EmailValidator.prototype.onValid = function () {
    if (PATTERN.test(this.getOptions())) {
      return this.__success();
    }

    return this.__failed("invalidFormat");
  };

  return EmailValidator;
}]);
'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsValidators", ["EmailValidator", function (EmailValidator) {

  return {
    Email: EmailValidator
  };
}]);
'use strict';

angular.module('huoyun.widget').run(['$templateCache', function ($templateCache) {
  $templateCache.put('breadcrumb/breadcrumb.html', '<div class="widgets-breadcrumb" ng-class="options.appendClass()" control-name="{{options.getControlName()}}"><ol class="breadcrumb"><li ng-repeat="$item in options.getItems()" name="{{$item.getName()}}" ng-if="$item.isVisibility()" ng-click="$item.onClick()" ng-style="$item.getStyle()" ng-class="$item.appendClass()" ng-disabled="$item.isDisabled()"><i class="fa" ng-class="$item.getIcon()" aria-hidden="true"></i> <span ng-bind="$item.getText()"></span></li></ol></div>');
  $templateCache.put('button/button.html', '<button class="btn" name="{{options.getName()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-click="options.onClick()"><i class="fa" aria-hidden="true" ng-class="options.getButtonIcon()" ng-if="options.isButtonIconVisibility()"></i> <span ng-bind="options.getButtonText()"></span></button>');
  $templateCache.put('checkbox/checkbox.html', '<div class="widgets-checkbox" ng-click="options.onClick($event)"><i class="fa fa-check-square-o" aria-hidden="true" ng-class="options.getIconClass()"></i> <span class="widgets-checkbox-content" ng-bind="options.getText()"></span></div>');
  $templateCache.put('datepicker/date.picker.html', '<div class="widgets-date-picker"><div class="widgets-date-picker-wrapper"><div class="calendar-month-header"><div class="last-button" ng-click="options.onLeftButtonClicked()"><i class="fa fa-angle-left" aria-hidden="true"></i></div><div class="calendar-month-header-content" ng-bind="options.getHeader()" ng-click="options.onViewModeButtonClicked()"></div><div class="next-button" ng-click="options.onRightButtonClicked()"><i class="fa fa-angle-right" aria-hidden="true"></i></div></div><div class="calendar-month-days-view" ng-if="options.isDayView()"><div class="calendar-month-days-view-header"><div class="week-day-item" ng-repeat="weekDay in options.getWeekDays()" ng-bind="options.getWeekDayName(weekDay)"></div></div><div class="calendar-month-days-view-body"><div class="week-item" ng-repeat="$week in options.getWeeks()"><div class="week-day-item" ng-repeat="$day in $week.getDays()" today="{{$day.isToday()}}" data-selected="{{$day.isSelected()}}" current-month="{{$day.inCurrentMonth()}}" ng-bind="$day.getDate().getDate()" ng-click="options.onDayClicked($event,$day)"></div></div></div></div><div class="calendar-year-months-view" ng-if="options.isMonthView()"><div class="month-item-wrapper" ng-repeat="$month in options.getMonths()"><div class="month-item" ng-bind="options.getMonthName($month)" current-month="{{options.isCurrentMonth($month)}}" ng-click="options.onMonthButtonClicked($month)"></div></div></div><div class="calendar-years-view" ng-if="options.isYearView()"><div class="year-item-wrapper" ng-repeat="$year in options.getYears()"><div class="year-item" ng-bind="$year" current-year="{{options.isCurrentYear($year)}}" ng-click="options.onYearButtonClicked($year)"></div></div></div></div></div>');
  $templateCache.put('dialog/dialog.html', '<div class="box box-primary huoyun-dialog-content-container animated bounceInDown"><div class="box-header with-border"><h3 class="box-title"><i class="fa fa-info" aria-hidden="true"></i> <span ng-bind="ngDialogData.title"></span></h3></div><div class="box-body"><div ng-if="!ngDialogData.templateUrl" ng-bind="ngDialogData.content"></div><div ng-if="ngDialogData.templateUrl" ng-include="ngDialogData.templateUrl"></div></div><div class="box-footer"><button type="submit" ng-if="ngDialogData.cancelButtonVisibility" class="btn btn-default pull-right" ng-click="onCancelButtonClicked()" ng-bind="ngDialogData.cancelButtonText"></button> <button type="submit" ng-if="ngDialogData.confirmButtonVisibility" class="btn btn-primary pull-right" ng-click="onConfirmButtonClicked()" ng-bind="ngDialogData.confirmButtonText"></button></div></div>');
  $templateCache.put('form/form.html', '<div class="box widgets-form" form-readonly="{{options.isReadonly()}}"><div class="box-header" ng-if="options.getHeader().isVisibility()"><h3 class="box-title" ng-bind="options.getHeader().getTitle()"></h3><div class="box-tools pull-right"><div class="input-group input-group-sm"><div widgets-button="" options="button" ng-repeat="button in options.getHeader().getButtons()"></div></div></div></div><form ng-class="options.appendOrientationClass()"><div class="box-body" ng-if="!options.isReadonly()"><div ng-repeat="$formGroup in options.getGroups()" prop-name="{{$formGroup.getName()}}" prop-type="{{$formGroup.getType()}}" ng-if="$formGroup.isVisibility()"><div ng-if="$formGroup.hasTemplateUrl()"><div ng-include="$formGroup.getTemplateUrl()"></div></div><div ng-if="!$formGroup.hasTemplateUrl()"><div widgets-form-group="" options="$formGroup" ng-model="options.$$data[$formGroup.getName()]"></div></div></div></div><div class="box-footer" ng-if="options.isFooterVisibility()"><div widgets-button="" options="button" ng-repeat="button in options.getFooter().getButtons()"></div></div></form></div>');
  $templateCache.put('loading/loading.html', '<div id="{{options.getId()}}" class="widgets-loading" name="{{options.getName()}}" ng-class="options.appendClass()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-if="options.isVisibility()"><div class="loading-content-container"><i class="fa fa-refresh fa-spin"></i> <span class="loading-content" ng-bind="options.getContent()"></span></div></div>');
  $templateCache.put('loading/loading.template.html', '<div widgets-loading="" options="loading"></div>');
  $templateCache.put('loading/loading.wrapper.html', '<div class="loading-wrapper"></div>');
  $templateCache.put('nav/nav.html', '<div class="row widgets-nav"><nav><ul><li ng-repeat="$item in options.getItems()" name="{{$item.getName()}}" ng-if="$item.isVisibility()" ng-bind="$item.getText()" ng-click="$item.onClick()" ng-style="$item.getStyle()" ng-class="$item.appendClass()" ng-disabled="$item.isDisabled()" data-selected="{{$item.isSelected()}}"></li></ul></nav></div>');
  $templateCache.put('pagination/pagination.html', '<div class="widgets-pagination"><ul class="pagination pagination-sm no-margin pull-right" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()"><li ng-disabled="options.isFirst()"><span ng-click="options.onPerviousClick()">\xAB</span></li><li ng-repeat="$page in options.getPages()" ng-class="options.activeClass($page)"><span ng-bind="options.getPageText($page)" ng-click="options.onPageClick($page)"></span></li><li ng-disabled="options.isLast()"><span ng-click="options.onNextClick()">\xBB</span></li></ul></div>');
  $templateCache.put('sidebar/sidebar.html', '<div class="widgets-side-bar"><aside><div ng-repeat="$item in options.getItems()"><div widgets-side-bar-item="" options="$item"></div></div></aside></div>');
  $templateCache.put('sidebar/sidebaritem.html', '<div class="side-bar-item"><div class="side-bar-group-header"><i class="fa" ng-class="options.getIcon()" aria-hidden="true"></i> <span ng-bind="options.getText()"></span></div><ul class="side-bar-group-items-container" ng-if="options.hasChild()"><li ng-repeat="$item in options.getItems()" ng-bind="$item.getText()" ng-class="$item.getExpandClass()" ng-click="$item.onClick()"></li></ul></div>');
  $templateCache.put('slide.selector/slide.selector.html', '<div id="{{options.getId()}}" class="widgets-slide-selector" control-name="{{options.getControlName()}}" active="{{options.isActive()}}"><div class="arrow-button arrow-up-button" ng-click="options.scrollToPerviousElement()"><i class="fa fa-angle-up" aria-hidden="true"></i></div><ul class="items-pannel"><li id="{{options.getItemId($index)}}" class="selector-item" ng-repeat="$item in options.getItems() track by $index" data-selected="{{options.isItemSelected($item,$index)}}" ng-bind="options.getItemDisplayText($item)" on-finish-render="options.onRepeatRendered()" ng-click="options.onItemClicked($item,$index)"></li></ul><div class="arrow-button arrow-down-button" ng-click="options.scrollToNextElement()"><i class="fa fa-angle-down" aria-hidden="true"></i></div></div>');
  $templateCache.put('tab/tab.item.header.html', '<div class="tab-item-header" data-selected="{{options.getTabItem().isSelected()}}" ng-click="options.getTabItem().onClick()" ng-disabled="options.isDisabled()" ng-class="options.appendClass()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()"><div class="widgets-tab-header-container"><div ng-if="options.hasTemplateUrl()" ng-include="options.getTemplateUrl()"></div><div ng-if="!options.hasTemplateUrl()" ng-bind="options.getContent()"></div></div></div>');
  $templateCache.put('tab/tab.item.html', '<div class="widgets-tab-item" ng-if="options.isSelected()" ng-disabled="options.isDisabled()" ng-class="options.appendClass()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()"><div ng-if="options.hasTemplateUrl()" ng-include="options.getTemplateUrl()"></div><div ng-if="!options.hasTemplateUrl()" ng-bind="options.getContent()"></div></div>');
  $templateCache.put('table/table.html', '<div class="widgets-table"><table class="table" ng-class="options.appendClass()"><thead ng-if="options.getHeader().isVisibility()" ng-style="options.getHeader().getStyle()"><tr><th ng-repeat="$column in options.getColumns()" column-name="{{$column.getName()}}" ng-style="$column.getStyle()" ng-bind="$column.getHeaderText()" widgets-draggable="" drag-data="$column" drag-success="options.onColumnDragSuccess($event,$dragData,$column)"></th></tr></thead><tbody><tr ng-repeat="$row in options.getRows()" data-selected="{{$row.isSelected()}}" ng-click="options.onItemClicked($row)"><td ng-repeat="$column in options.getColumns()"><div ng-bind="$column.getColumnValue($row)"></div></td></tr></tbody></table></div>');
  $templateCache.put('timepicker/time.picker.html', '<div class="widgets-time-picker" id="{{options.getId()}}" control-name="{{options.getControlName()}}"><div class="widgets-time-picker-container"><div class="widgets-time-picker-item-conatiner"><div class="widgets-time-picker-item widgets-time-picker-hours"><div class="widgets-time-picker-item-label">Hour</div><div class="widgets-slide-selector-container"><div widgets-slide-selector="" options="options.getHoursControl()"></div></div></div></div><div class="widgets-time-picker-item-conatiner"><div class="widgets-time-picker-item widgets-time-picker-minutes"><div class="widgets-time-picker-item-label">Minute</div><div class="widgets-slide-selector-container"><div widgets-slide-selector="" options="options.getMinutesControl()"></div></div></div></div><div class="widgets-time-picker-item-conatiner"><div class="widgets-time-picker-item widgets-time-picker-format"><div class="widgets-time-picker-item-label">AM/PM</div><div class="widgets-slide-selector-container"><div widgets-slide-selector="" options="options.getTimeFormatControl()"></div></div></div></div></div><div class="widgets-time-picker-footer"><div class="btn btn-default btn-sm huoyun-margin-left-10" ng-click="options.onCancelButtonClicked()">Cancel</div><div class="btn btn-primary btn-sm" ng-click="options.onOkButtonClicked()">OK</div></div></div>');
  $templateCache.put('tip/tip.html', '<div class="widgets-tip"><div id="{{options.getId()}}" class="alert alert-success alert-dismissible"><span ng-bind="options.getMessage()"></span></div></div>');
  $templateCache.put('form/formgroup/form-group.html', '<div class="form-group widgets-form-group" mandatory="{{options.isMandatory()}}" ng-class="options.appendClass()" has-error="{{options.hasError}}"><div ng-if="options.hasLabelControl()"><div ng-if="options.getLabelControl().hasTemplateUrl()"><div ng-include="options.getLabelControl().getTemplateUrl()"></div></div><div ng-if="!options.getLabelControl().hasTemplateUrl()"><label for="{{options.getName()}}" class="control-label" ng-bind="options.getLabelControl().getText()" ng-class="options.getLabelControl().appendClass()"></label></div></div><div ng-if="options.hasInputControl()"><div ng-if="options.getInputControl().hasTemplateUrl()"><div ng-include="options.getInputControl().getTemplateUrl()"></div></div><div class="input-control-template" ng-if="!options.getInputControl().hasTemplateUrl()" ng-init="renderInputControl()"></div></div></div>');
  $templateCache.put('input/date/date.html', '<div class="input-group widgets-date-input" has-error="{{options.hasError()}}"><input id="{{options.getId()}}" type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-click="options.onDateInputClick($event)" ng-style="options.getStyle()" ng-value="options.getFormatText()"> <span class="input-group-addon" ng-click="options.onDateInputClick($event)"><i class="fa fa-calendar"></i></span><div class="popup" ng-if="options.isShow()" ng-blur="options.onPopupBlur()"><div widgets-date-picker="" options="options.getCalendar()"></div></div></div><div widgets-input-error="" options="options.getErrorControl()"></div>');
  $templateCache.put('input/datalist/datalist.dialog.html', '<div class="widgets-data-list-dialog" ng-controller="DataListController" ng-class="vm.getSelectionModeClass()"><div widgets-search-box="" options="vm.search"></div><div widgets-list-view="" options="vm.listView"><item-template><div widgets-check-box="" options="$item.getCheckBox()"></div></item-template></div><div class="item-template load-more" ng-click="vm.loadMore()" ng-if="vm.getDataListControl().isLoadMoreVisibility()"><div>\u52A0\u8F7D\u66F4\u591A...</div></div></div>');
  $templateCache.put('input/datalist/datalist.html', '<div class="input-group" ng-click="onButtonClicked()"><span class="input-group-addon"><i class="fa fa-link"></i></span> <input id="{{options.getId()}}" type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-value="options.getInputText()"></div>');
  $templateCache.put('input/dropdown/dropdown.html', '<select id="{{options.getId()}}" placeholder="{{options.getPlaceholder()}}" ng-options="options.getItemValue(option) as options.getItemLabel(option) for option in options.getDataSource()" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-style="options.getStyle()" control-name="{{options.getControlName()}}" ng-if="options.isVisibility()" ng-class="options.appendClass()" ng-model="$parent.options.$$value" widgets-events-input-changed=""></select>');
  $templateCache.put('input/email/email.html', '<div class="input-group" has-error="{{options.hasError()}}"><span class="input-group-addon"><i class="fa fa-envelope"></i></span> <input id="{{options.getId()}}" type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-model="$parent.options.$$value" widgets-events-input-changed="" widgets-input-validator=""></div><div widgets-input-error="" options="options.getErrorControl()"></div>');
  $templateCache.put('input/error/input.error.html', '<div class="widgets-input-error" ng-if="options.hasError()"><div class="error-message" ng-bind="options.getErrorMessage()"></div></div>');
  $templateCache.put('input/search/search.html', '<div class="form-group widgets-search-box"><div class="input-group"><input id="{{options.getId()}}" type="text" class="form-control" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-model="$parent.options.$$value" widgets-events-input-changed=""> <span class="input-group-addon" ng-click="options.onSearchBoxButtonClicked()"><i class="fa" ng-class="options.appendSearchIconClass()"></i></span></div></div>');
  $templateCache.put('input/text/text.html', '<input id="{{options.getId()}}" type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" control-name="{{options.getControlName()}}" ng-style="options.getStyle()" ng-model="$parent.options.$$value" widgets-events-input-changed="" widgets-input-validator=""><div widgets-input-error="" options="options.getErrorControl()"></div>');
  $templateCache.put('input/time/time.html', '<div id="{{options.getId()}}" class="input-group widgets-time-input" control-name="{{options.getControlName()}}" has-error="{{options.hasError()}}"><input type="text" placeholder="{{options.getPlaceholder()}}" ng-disabled="options.isDisabled()" ng-readonly="options.isReadonly()" ng-class="options.appendClass()" ng-if="options.isVisibility()" ng-click="options.onTimeInputClick($event)" ng-style="options.getStyle()" ng-value="options.getFormatText()"> <span class="input-group-addon" ng-click="options.onTimeInputClick($event)"><i class="fa fa-clock-o"></i></span><div class="popup" ng-if="options.isShow()"><div widgets-time-picker="" options="options.getTimePickerControl()"></div></div></div><div widgets-input-error="" options="options.getErrorControl()"></div>');
  $templateCache.put('list.view/directives/list.view.html', '<div class="widgets-list-view"><div class="list-view-item" widgets-list-view-item="" ng-repeat="$item in options.getItems()"></div></div>');
  $templateCache.put('list.view/directives/list.view.item.html', '<div class="list-view-item" data-selected="{{$item.isSelected()}}" ng-click="$item.onClicked()"><div ng-if="!$item.hasTemplateUrl()" ng-bind="$item.getDisplayText()"></div><div ng-if="$item.hasTemplateUrl()" ng-include="$item.hasTemplateUrl()"></div></div>');
  $templateCache.put('tab/directives/tab.html', '<div id="{{options.getId()}}" class="widgets-tab" control-name="{{options.getControlName()}}" ng-init="$tab = options"><div class="widgets-tab-header"><div ng-repeat="$tabItem in options.getTabItems()" widgets-tab-item-header="" options="$tabItem.getHeader()"></div></div><div class="widgets-tab-panel"><div class="tab-item" widgets-tab-item="" ng-repeat="$tabItem in options.getTabItems()"></div></div></div>');
  $templateCache.put('tab/directives/tab.item.html', '<div id="{{$tabItem.getId()}}" control-name="{{$tabItem.getControlName()}}" class="widgets-tab-item" ng-if="$tabItem.isSelected()" ng-disabled="$tabItem.isDisabled()" ng-class="$tabItem.appendClass()" ng-style="$tabItem.getStyle()" ng-init="onTabItemRender()"><div class="content-presenter"></div></div>');
}]);
'use strict';

angular.module('huoyun.widget').factory("Validator", ["$q", function ($q) {

  function Validator(options) {
    this.$$errors = {};

    this.getOptions = function () {
      return options;
    };
  }

  Validator.prototype.onValid = function () {
    return this.__success();
  };

  Validator.prototype.addErrorType = function (errorName, errorMessage) {
    this.$$errors[errorName] = errorMessage;
    return this;
  };

  Validator.prototype.getErrorMessage = function (errorName) {
    return this.$$errors[errorName];
  };

  Validator.prototype.__failed = function (errorType) {
    return $q.reject({
      validator: this,
      errorType: errorType
    });
  };

  Validator.prototype.__success = function () {
    return $q.resolve({
      validator: this
    });
  };

  return Validator;
}]);
'use strict';

angular.module('huoyun.widget').factory("FormGroupControl", ["$log", "HuoYunWidgetCore", "FormGroupLabelControl", "FormGroupInputControl", function ($log, HuoYunWidgetCore, FormGroupLabelControl, FormGroupInputControl) {

  function FormGroupControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    this.$$label = new FormGroupLabelControl(options.label || {}).setFromGroup(this);

    var that = this;
    this.$$input = new FormGroupInputControl(options.input || {}).setFromGroup(this).on("valueChanged", function (newVal, oldVal) {
      that.raiseEvent("valueChanged", [newVal, oldVal]);
    });
  }

  HuoYunWidgetCore.ClassExtend(FormGroupControl, HuoYunWidgetCore.Control);

  FormGroupControl.prototype.hasLabelControl = function () {
    return this.getLabelControl().isVisibility();
  };

  FormGroupControl.prototype.getLabelControl = function () {
    return this.$$label;
  };

  FormGroupControl.prototype.hasInputControl = function () {
    return this.getInputControl().isVisibility();
  };

  FormGroupControl.prototype.getInputControl = function () {
    return this.$$input;
  };

  FormGroupControl.prototype.setFormControl = function (form) {
    this.$$form = form;
    return this;
  };

  FormGroupControl.prototype.getFormControl = function () {
    return this.$$form;
  };

  FormGroupControl.prototype.getType = function () {
    var type = this.getOptions().type;
    return type && type.toUpperCase();
  };

  FormGroupControl.prototype.isMandatory = function () {
    return this.getOptions().mandatory;
  };

  FormGroupControl.prototype.getValue = function () {
    return this.getFormControl().getPropertyValue(this.getName());
  };

  FormGroupControl.prototype.setValueChangedCallback = function (callback) {
    var inputControl = this.getInputControl();
    inputControl && inputControl.setValueChangedCallback(callback);
    return this;
  };

  FormGroupControl.prototype.getValueChangedCallback = function () {
    var inputControl = this.getInputControl();
    return inputControl && inputControl.getValueChangedCallback();
  };

  return FormGroupControl;
}]);

angular.module('huoyun.widget').factory("FormGroupLabelControl", ["$log", "HuoYunWidgetCore", function ($log, HuoYunWidgetCore) {

  function FormGroupLabelControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(FormGroupLabelControl, HuoYunWidgetCore.Control);

  FormGroupLabelControl.prototype.setFromGroup = function (formGroup) {
    this.$$formGroup = formGroup;
    return this;
  };

  FormGroupLabelControl.prototype.getText = function () {
    return this.getOptions().text;
  };

  return FormGroupLabelControl;
}]);

angular.module('huoyun.widget').factory("FormGroupInputControl", ["$log", "HuoYunWidgetCore", "TextControl", "FormControlProvider", function ($log, HuoYunWidgetCore, TextControl, FormControlProvider) {

  function FormGroupInputControl(options) {
    HuoYunWidgetCore.Control.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(FormGroupInputControl, HuoYunWidgetCore.Control);

  FormGroupInputControl.prototype.setFromGroup = function (formGroup) {
    this.$$formGroup = formGroup;
    return this;
  };

  FormGroupInputControl.prototype.getFormGroup = function () {
    return this.$$formGroup;
  };

  FormGroupInputControl.prototype.getInput = function () {
    if (!this.$$inputOptions) {
      var inputOptions = this.getOptions();
      inputOptions.appendClass = "form-control " + (inputOptions.appendClass || "");

      var control = FormControlProvider.getControlbyType(this.getFormGroup().getType());
      if (!control) {
        control = TextControl;
      }

      var that = this;

      this.$$inputOptions = new control(inputOptions).on("valueChanged", function (newVal, oldVal) {
        that.raiseEvent("valueChanged", [newVal, oldVal]);
      });
    }

    return this.$$inputOptions;
  };

  return FormGroupInputControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroup', ["FormControlProvider", "$compile", function (FormControlProvider, $compile) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      options: "="
    },
    templateUrl: 'form/formgroup/form-group.html',
    link: function link($scope, elem, attrs) {
      $scope.renderInputControl = function () {
        var controlType = $scope.options.getType();
        var widgetName = FormControlProvider.getWidgetNameByTypeOrDefault(controlType, "STRING");
        var template = '<div ' + widgetName + ' options="options.getInputControl().getInput()"></div>';
        var linkFn = $compile(template);
        linkFn($scope, function (clone) {
          elem.find(".input-control-template").append(clone);
        });
      };
    }
  };
}]);
'use strict';

// angular.module('huoyun.widget').factory("EmailValidator", function() {

//   const PATTERN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//   function EmailValidator(formGroupOption) {
//     this.formGroupOption = formGroupOption;
//   }

//   EmailValidator.prototype.onValid = function(value) {
//     if (PATTERN.test(value)) {
//       return Promise.resolve();
//     }

//     this.formGroupOption.errorMessage = `邮箱地址格式不正确`
//     return Promise.reject(this.formGroupOption);
//   }

//   return EmailValidator;
// });
'use strict';

angular.module('huoyun.widget').factory("MandatoryValidator", function () {

  function MandatoryValidator(formGroupOption) {
    this.formGroupOption = formGroupOption;
  }

  MandatoryValidator.prototype.onValid = function (value) {
    if (value === null || value === undefined) {
      this.formGroupOption.errorMessage = '\u5B57\u6BB5' + this.formGroupOption.label + '\u4E0D\u80FD\u4E3A\u7A7A';
      return Promise.reject(this.formGroupOption);
    }

    if (typeof value === "string") {
      if (value.trim() === "") {
        this.formGroupOption.errorMessage = '\u5B57\u6BB5' + this.formGroupOption.label + '\u4E0D\u80FD\u4E3A\u7A7A';
        return Promise.reject(this.formGroupOption);
      }
    }

    return Promise.resolve();
  };

  return MandatoryValidator;
});
'use strict';

angular.module('huoyun.widget').factory("DateControl", ["HuoYunWidgetCore", "InputControl", "DatePickerControl", "$filter", "Format", function (HuoYunWidgetCore, InputControl, DatePickerControl, $filter, FormatProvider) {

  function DateControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(DateControl, InputControl);

  DateControl.prototype.isReadonly = function () {
    return true;
  };

  DateControl.prototype.onDateInputClick = function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isShow()) {
      this.close();
    } else {
      this.open();
    }
  };

  DateControl.prototype.isShow = function () {
    return this.$$show === true;
  };

  DateControl.prototype.close = function () {
    this.$$show = false;
    this.$$calendar = null;
    this.raiseEvent("close", [this]);
    return this;
  };

  DateControl.prototype.open = function () {
    this.$$show = true;
    this.raiseEvent("open", [this]);
    return this;
  };

  DateControl.prototype.getCalendar = function () {
    if (!this.$$calendar) {
      var that = this;
      this.$$calendar = new DatePickerControl({
        date: this.getValue()
      }).on("dayClicked", function (day, date, control) {
        that.setValue(date);
        that.close();
      });
    }
    return this.$$calendar;
  };

  DateControl.prototype.onPopupBlur = function () {
    console.log(arguments);
  };

  DateControl.prototype.getFormat = function () {
    return this.getOptions().format || FormatProvider.getValue("date");
  };

  DateControl.prototype.getTimeZone = function () {
    return this.getOptions().timezone;
  };

  DateControl.prototype.getFormatText = function () {
    return $filter('date')(this.getValue(), this.getFormat(), this.getTimeZone());
  };

  return DateControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsDateBox', ["$timeout", function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/date/date.html',
    link: function link($scope, elem, attrs) {

      $scope.options && $scope.options.on("open", function () {
        $(document).on("click", clickEventListener);
      }).on("close", function () {
        $(document).off("click", clickEventListener);
      });

      function clickEventListener(event) {
        if (!$(event.target).closest('.popup').length) {
          $timeout(function () {
            $scope.options.close();
          });
        }
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("DataListControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function DataListControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(DataListControl, InputControl);

  DataListControl.prototype.getInputText = function () {
    return this.$$inputText;
  };

  DataListControl.prototype.setInputText = function (text) {
    this.$$inputText = text;
    return this;
  };

  DataListControl.prototype.isReadonly = function () {
    return true;
  };

  return DataListControl;
}]);
'use strict';

angular.module('huoyun.widget').controller('DataListController', ["$scope", "CheckBoxControl", "ListViewControl", "HuoYunWidgetCore", "CheckBoxListViewItemControl", "SearchControl", function ($scope, CheckBoxControl, ListViewControl, HuoYunWidgetCore, CheckBoxListViewItemControl, SearchControl) {

  $scope.vm = {
    search: null,
    pageCount: 0,
    getDataListControl: function getDataListControl() {
      return $scope.ngDialogData.params.options;
    },
    getDataListOptions: function getDataListOptions() {
      return $scope.vm.getDataListControl().getOptions();
    },
    listView: null,
    loadPageDataSource: function loadPageDataSource() {
      var dataSource = $scope.vm.getDataListOptions().loadMore($scope.vm.pageCount, $scope.vm.search.getValue());
      return HuoYunWidgetCore.Promise.resolve(dataSource).then(function (result) {
        $scope.vm.pageCount = $scope.vm.pageCount + 1;
        return HuoYunWidgetCore.Promise.resolve(result);
      });
    }
  };

  $scope.vm.search = new SearchControl({
    placeholder: "Search ..."
  }).on("valueChanged", function () {
    console.log(arguments);
  });

  var options = $scope.vm.getDataListOptions();
  $scope.vm.listView = new ListViewControl().setValuePath(options.valueField).setDisplayPath(options.labelField).setSelectionMode(options.selection).setDataSource($scope.vm.loadPageDataSource).setItemTemplate(CheckBoxListViewItemControl).on("dataSourceChanged", function () {
    console.log(arguments);
  });

  $scope.ngDialogData.onConfirmButtonClicked = function () {
    var value = $scope.vm.listView.getSelectedValue();
    var text = $scope.vm.listView.getSelectedItems().map(function (listviewItem) {
      return listviewItem.getDisplayText();
    }).join(", ");
    $scope.closeThisDialog(['OK', value, text]);
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsDataList', ["Dialog", function (Dialog) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/datalist/datalist.html',
    link: function link($scope, ele, attrs) {

      $scope.onButtonClicked = function () {
        var options = {
          title: '\u9009\u62E9' + $scope.options.label,
          templateUrl: "input/datalist/datalist.dialog.html",
          params: {
            options: $scope.options
          },
          closeCallback: function closeCallback(key, value, text) {
            if (key === "OK") {
              $scope.options.setValue(value).setInputText(text);
            }
          }
        };
        var dialog = Dialog.showConfirm(options);
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("DropdownControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function DropdownControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(DropdownControl, InputControl);

  DropdownControl.prototype.getDataSource = function () {
    if (!this.$$dataSource) {
      this.$$dataSource = this.getOptions().data;
    }

    if (!Array.isArray(this.$$dataSource)) {
      throw new Error("data isn't array");
    }

    return this.$$dataSource;
  };

  DropdownControl.prototype.getLabelField = function () {
    return this.getOptions().labelField;
  };

  DropdownControl.prototype.getItemLabel = function (option) {
    var labelField = this.getLabelField();
    if (labelField) {
      return option[labelField];
    }

    return option;
  };

  DropdownControl.prototype.getValueField = function () {
    return this.getOptions().valueField;
  };

  DropdownControl.prototype.getItemValue = function (item) {
    var valueField = this.getValueField();
    if (valueField) {
      return item[valueField];
    }
    return item;
  };

  return DropdownControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsDropdown', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/dropdown/dropdown.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("EmailControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function EmailControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(EmailControl, InputControl);

  return EmailControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsEmailBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/email/email.html',
    link: function link($scope, ele, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("InputErrorControl", ["HuoYunWidgetCore", function (HuoYunWidgetCore) {

  function InputErrorControl(ex) {
    HuoYunWidgetCore.Control.apply(this, arguments);

    if (ex && ex.validator && ex.errorType) {
      this.setErrorMessage(ex.validator.getErrorMessage(ex.errorType));
    } else {
      this.setErrorMessage("未知错误");
    }
  }

  HuoYunWidgetCore.ClassExtend(InputErrorControl, HuoYunWidgetCore.Control);

  InputErrorControl.prototype.clear = function () {
    this.$$errorMessage = null;
    return this;
  };

  InputErrorControl.prototype.setErrorMessage = function (errorMessage) {
    this.$$errorMessage = errorMessage;
    return this;
  };

  InputErrorControl.prototype.getErrorMessage = function () {
    return this.$$errorMessage;
  };

  InputErrorControl.prototype.hasError = function () {
    return !!this.getErrorMessage();
  };

  return InputErrorControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsInputError', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/error/input.error.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("SearchControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function SearchControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(SearchControl, InputControl);

  SearchControl.prototype.isSearching = function () {
    return !!this.getValue();
  };

  SearchControl.prototype.appendSearchIconClass = function () {
    return this.isSearching() ? "fa-times" : "fa-search";
  };

  SearchControl.prototype.onSearchBoxButtonClicked = function () {
    if (this.isSearching()) {
      this.setValue(null);
    }
  };

  return SearchControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsSearchBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/search/search.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("TextControl", ["HuoYunWidgetCore", "InputControl", function (HuoYunWidgetCore, InputControl) {

  function TextControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TextControl, InputControl);

  return TextControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTextBox', [function () {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/text/text.html',
    link: function link($scope, elem, attrs) {}
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("TimeControl", ["HuoYunWidgetCore", "InputControl", "TimePickerControl", "$filter", "Format", function (HuoYunWidgetCore, InputControl, TimePickerControl, $filter, FormatProvider) {

  function TimeControl(options) {
    InputControl.apply(this, arguments);
  }

  HuoYunWidgetCore.ClassExtend(TimeControl, InputControl);

  TimeControl.prototype.isReadonly = function () {
    return true;
  };

  TimeControl.prototype.onTimeInputClick = function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isShow()) {
      this.close();
    } else {
      this.open();
    }
  };

  TimeControl.prototype.isShow = function () {
    return this.$$show === true;
  };

  TimeControl.prototype.close = function () {
    this.$$show = false;
    this.$$timePickerControl = null;
    this.raiseEvent("close", [this]);
    return this;
  };

  TimeControl.prototype.open = function () {
    this.$$show = true;
    this.raiseEvent("open", [this]);
    return this;
  };

  TimeControl.prototype.getTimePickerControl = function () {
    if (!this.$$timePickerControl) {
      var that = this;
      this.$$timePickerControl = new TimePickerControl({
        date: this.getValue()
      }).on("picked", function (date, control) {
        that.setValue(date);
        that.close();
      });
    }
    return this.$$timePickerControl;
  };

  TimeControl.prototype.getFormat = function () {
    return this.getOptions().format || FormatProvider.getValue("time");
  };

  TimeControl.prototype.getFormatText = function () {
    return $filter('date')(this.getValue(), this.getFormat());
  };

  return TimeControl;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTimeInputBox', ["$timeout", function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/time/time.html',
    link: function link($scope, elem, attrs) {

      $scope.options && $scope.options.on("open", function () {
        $(document).on("click", clickEventListener);
      }).on("close", function () {
        $(document).off("click", clickEventListener);
      });

      function clickEventListener(event) {
        if (!$(event.target).closest('.popup').length) {
          $timeout(function () {
            $scope.options.close();
          });
        }
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsListViewItem', ["$templateCache", "$compile", function ($templateCache, $compile) {
  var TemplateUrl = "list.view/directives/list.view.item.html";

  return {
    replace: true,
    require: "^widgetsListView",
    restrict: 'A',
    link: function link($scope, elem, attrs, control, $transclude) {
      var slotFilled = $transclude.isSlotFilled(control.slotName);
      if (slotFilled) {
        $transclude($scope, function (transcludeElem) {
          elem.append(transcludeElem);
        }, null, control.slotName);
      } else {
        var fallbackLinkFn = $compile($templateCache.get(TemplateUrl));
        fallbackLinkFn($scope, function (clone) {
          elem.append(clone);
        });
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsListView', [function () {
  return {
    replace: true,
    restrict: 'A',
    scope: {
      options: "="
    },
    transclude: {
      "item": "?itemTemplate"
    },
    templateUrl: 'list.view/directives/list.view.html',
    controller: function controller($scope) {
      return {
        listView: $scope.options,
        slotName: "item"
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTabItem', ["$templateCache", "$compile", function ($templateCache, $compile) {
  return {
    require: "^widgetsTab",
    restrict: 'A',
    templateUrl: 'tab/directives/tab.item.html',
    link: function link($scope, elem, attrs, control) {
      $scope.onTabItemRender = function () {
        var template = $scope.$tabItem.getTemplate();
        var linkFn = $compile(template);
        linkFn($scope, function (clone, scope) {
          elem.find(".content-presenter").append(clone);
        });
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsTab', [function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      options: "="
    },
    transclude: {
      "tabItem": "?tabItemTemplate"
    },
    terminal: true,
    templateUrl: 'tab/directives/tab.html',
    controller: function controller($scope) {
      return {
        tab: $scope.options,
        slotName: "tabItem"
      };
    },
    link: function link($scope, elem, attrs, control, $transclude) {
      var slotFilled = $transclude.isSlotFilled(control.slotName);
      $transclude($scope, function (transcludeElem) {
        for (var index = 0; index < transcludeElem.length; index++) {
          var tabItemElem = transcludeElem.get(index);
          var tabIndex = parseInt(tabItemElem.getAttribute("tab-item-index"));
          control.tab.setTabItemTemplate(tabIndex, tabItemElem.innerHTML);
        }
      }, null, control.slotName);
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsEventsInputChanged', ["InputControl", function (InputControl) {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function link($scope, ele, attrs, ngModelController) {
      if ($scope.options instanceof InputControl) {
        var inputControl = $scope.options;
        var oldVal = inputControl.getValue();
        var newVal = oldVal;

        ngModelController.$viewChangeListeners.push(function () {
          newVal = inputControl.getValue();
          inputControl.raiseEvent("valueChanged", [newVal, oldVal]);
          oldVal = newVal;
        });
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsInputValidator', ["InputControl", function (InputControl) {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function link($scope, ele, attrs, ngModelController) {
      if ($scope.options instanceof InputControl) {
        var inputControl = $scope.options;
        ngModelController.$viewChangeListeners.push(function () {
          inputControl.validator();
        });
      }
    }
  };
}]);