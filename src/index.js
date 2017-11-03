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

angular.module('huoyun.widget').factory("HuoYunWidgets", ["TableOption", "Dialog", "Tip", "SidebarOption", "NavOption",
  "BreadCrumbOption", "FormOption", "CheckBoxOption", "SearchFormOption", "ButtonOption", "SidebarPanelOption", "DropdownControl", "TextControl", "ButtonControl", "FormControl",
  function(TableOption, Dialog, Tip, SidebarOption, NavOption, BreadCrumbOption, FormOption, CheckBoxOption,
    SearchFormOption, ButtonOption, SidebarPanelOption, DropdownControl, TextControl, ButtonControl, FormControl) {

    return {
      Dialog: Dialog,
      TableOption: TableOption,
      SidebarOption: SidebarOption,
      NavOption: NavOption,
      BreadCrumbOption: BreadCrumbOption,
      Tip: Tip,
      FormOption: FormOption,
      CheckBoxOption: CheckBoxOption,
      SearchFormOption: SearchFormOption,
      ButtonOption: ButtonOption,
      SidebarPanelOption: SidebarPanelOption,
      Controls: {
        Dropdown: DropdownControl,
        TextBox: TextControl,
        Button: ButtonControl,
        Form: FormControl
      }
    };
  }
]);