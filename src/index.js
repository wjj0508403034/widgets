'use strict';

angular.module('huoyun.widget', ['ngDialog']);

angular.module('huoyun.widget').provider("Format", function() {

  this.configuration = function(options) {
    var that = this;
    ["date", "datetime", "time"].forEach(function(prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
    return this;
  };

  this.getValue = function(prop) {
    return this[prop];
  };

  this.$get = function() {
    return this;
  };
});

angular.module('huoyun.widget').run(["Format", function(FormatProvider) {

  FormatProvider.configuration({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm",
    time: "HH:mm a"
  });
}]);

angular.module('huoyun.widget').factory("HuoYunWidgets", ["Dialog", "ButtonControl", "FormControl", "HuoYunWidgetsInputs", "ListViewControl", "TableControl", "BreadCrumbControl", "NavControl", "SidebarControl", "TipControl", "PaginationControl", "DatePickerControl", "TabControl", "LoadingControl", "TimePickerControl",
  function(Dialog, ButtonControl, FormControl, HuoYunWidgetsInputs, ListViewControl, TableControl, BreadCrumbControl, NavControl, SidebarControl, TipControl, PaginationControl, DatePickerControl, TabControl, LoadingControl, TimePickerControl) {

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
      ShowLoading: function(options) {
        return new LoadingControl(options).show();
      },
      ShowTip: function(options) {
        return new TipControl(options).pop();
      },
      ShowDialog: function() {

      }
    };
  }
]);