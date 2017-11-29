'use strict';

angular.module('huoyun.widget').provider("FormControlProvider", [function() {

  const controls = {};
  const widgetNames = {};

  this.registerControl = function(type, control, name) {
    controls[type] = control;
    widgetNames[type] = name;
    return this;
  };

  this.getControlbyType = function(type) {
    return controls[type];
  };

  this.getWidgetNameByType = function(type) {
    return widgetNames[type];
  };

  this.getWidgetNameByTypeOrDefault = function(type, defaultType) {
    return widgetNames[type] || widgetNames[defaultType];
  };

  this.$get = function() {
    return this;
  };
}]);

angular.module('huoyun.widget').run(["FormControlProvider", "HuoYunWidgetsInputs",
  function(FormControlProvider, HuoYunWidgetsInputs) {
    FormControlProvider.registerControl("DROPDOWN", HuoYunWidgetsInputs.Dropdown, "widgets-dropdown");
    FormControlProvider.registerControl("EMAIL", HuoYunWidgetsInputs.EmailBox, "widgets-email-box");
    FormControlProvider.registerControl("STRING", HuoYunWidgetsInputs.TextBox, "widgets-text-box");
    FormControlProvider.registerControl("DATALIST", HuoYunWidgetsInputs.DataList, "widgets-data-list");
    FormControlProvider.registerControl("DATE", HuoYunWidgetsInputs.Date, "widgets-date-box");
    FormControlProvider.registerControl("TIME", HuoYunWidgetsInputs.Time, "widgets-time-input-box");
  }
]);