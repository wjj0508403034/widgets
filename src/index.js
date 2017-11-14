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

angular.module('huoyun.widget').factory("HuoYunWidgets", ["Dialog", "SearchFormOption", "ButtonOption", "ButtonControl", "FormControl", "HuoYunWidgetsInputs", "ListViewControl", "TableControl", "BreadCrumbControl", "NavControl", "SidebarControl", "TipControl",
  function(Dialog,
    SearchFormOption, ButtonOption, ButtonControl, FormControl, HuoYunWidgetsInputs, ListViewControl, TableControl, BreadCrumbControl, NavControl, SidebarControl, TipControl) {

    return {
      Dialog: Dialog,
      SearchFormOption: SearchFormOption,
      ButtonOption: ButtonOption,
      Controls: {
        Tip: TipControl,
        SideBar: SidebarControl,
        BreadCrumb: BreadCrumbControl,
        Nav: NavControl,
        Button: ButtonControl,
        Form: FormControl,
        Inputs: HuoYunWidgetsInputs,
        Table: TableControl,
        ListView: ListViewControl
      }
    };
  }
]);