'use strict';

angular.module('huoyun.widget', ['ngDialog']);

angular.module('huoyun.widget').provider("display", function() {

  this.date = "yyyy-MM-dd";
  this.datetime = "yyyy-MM-dd HH:mm";

  /**
   * options
   *  - date
   *  - datetime
   */
  this.config = function(options) {
    var that = this;
    ["date", "datetime"].forEach(function(prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
  };

  this.$get = function() {
    return this;
  };
});

angular.module('huoyun.widget').factory("HuoYunWidgets", ["Dialog", "ButtonControl", "FormControl", "HuoYunWidgetsInputs", "ListViewControl", "TableControl", "BreadCrumbControl", "NavControl", "SidebarControl", "TipControl", "PaginationControl", "DatePickerControl", "TabControl", "LoadingControl",
  function(Dialog, ButtonControl, FormControl, HuoYunWidgetsInputs, ListViewControl, TableControl, BreadCrumbControl, NavControl, SidebarControl, TipControl, PaginationControl, DatePickerControl, TabControl, LoadingControl) {

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