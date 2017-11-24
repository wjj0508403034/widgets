'use strict';

angular.module('huoyun.widget').provider("FormControlProvider", [function() {

  var controls = {};

  this.registerControl = function(type, control) {
    controls[type] = control;
    return this;
  };

  this.getControlbyType = function(type) {
    return controls[type];
  };

  this.$get = function() {
    return this;
  };
}]);

angular.module('huoyun.widget').run(["FormControlProvider", "HuoYunWidgetsInputs", function(FormControlProvider, HuoYunWidgetsInputs) {
  FormControlProvider.registerControl("DROPDOWN", HuoYunWidgetsInputs.Dropdown);
  FormControlProvider.registerControl("EMAIL", HuoYunWidgetsInputs.EmailBox);
  FormControlProvider.registerControl("STRING", HuoYunWidgetsInputs.TextBox);
  FormControlProvider.registerControl("DATALIST", HuoYunWidgetsInputs.DataList);
  FormControlProvider.registerControl("DATE", HuoYunWidgetsInputs.Date);
}]);