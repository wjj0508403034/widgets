'use strict';

angular.module('huoyun.widget').factory("FormGroupControl", ["$log", "HuoYunWidgetCore",
  function($log, HuoYunWidgetCore) {

    function FormGroupControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(FormGroupControl, HuoYunWidgetCore.Control);


    FormGroupControl.prototype.setFormControl = function(form) {
      this.$$form = form;
    };

    FormGroupControl.prototype.getName = function() {
      return this.getOptions().name;
    };

    FormGroupControl.prototype.getType = function() {
      var type = this.getOptions().type;
      return type && type.toUpperCase();
    };

    FormGroupControl.prototype.getTemplateUrl = function() {
      return this.getOptions().templateUrl;
    };

    FormGroupControl.prototype.isCustomizeTemplate = function() {
      return !!this.getTemplateUrl();
    };

    FormGroupControl.prototype.isMandatory = function() {
      return this.getOptions().mandatory;
    };

    FormGroupControl.prototype.getLabel = function() {
      return this.getOptions().label;
    };

    FormGroupControl.prototype.appendLabelClass = function() {
      return this.getOptions().appendLabelClass && "";
    };

    FormGroupControl.prototype.appendControlClass = function() {
      var controlClass = this.getOptions().appendControlClass;
      return "form-control " + controlClass;
    };

    return FormGroupControl;
  }
]);