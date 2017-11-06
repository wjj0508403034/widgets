'use strict';

angular.module('huoyun.widget').factory("FormGroupControl", ["$log", "HuoYunWidgetCore", "FormGroupLabelControl", "FormGroupInputControl",
  function($log, HuoYunWidgetCore, FormGroupLabelControl, FormGroupInputControl) {

    function FormGroupControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);


      this.$$label = new FormGroupLabelControl(options.label || {});
      this.$$label.setFromGroup(this);

      this.$$input = new FormGroupInputControl(options.input || {});
      this.$$input.setFromGroup(this);
    }

    HuoYunWidgetCore.ClassExtend(FormGroupControl, HuoYunWidgetCore.Control);

    FormGroupControl.prototype.hasLabelControl = function() {
      return this.getLabelControl().isVisibility();
    };

    FormGroupControl.prototype.getLabelControl = function() {
      return this.$$label;
    };

    FormGroupControl.prototype.hasInputControl = function() {
      return this.getInputControl().isVisibility();
    };

    FormGroupControl.prototype.getInputControl = function() {
      return this.$$input;
    };

    FormGroupControl.prototype.setFormControl = function(form) {
      this.$$form = form;
    };

    FormGroupControl.prototype.getType = function() {
      var type = this.getOptions().type;
      return type && type.toUpperCase();
    };

    FormGroupControl.prototype.isMandatory = function() {
      return this.getOptions().mandatory;
    };

    return FormGroupControl;
  }
]);

angular.module('huoyun.widget').factory("FormGroupLabelControl", ["$log", "HuoYunWidgetCore",
  function($log, HuoYunWidgetCore) {

    function FormGroupLabelControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(FormGroupLabelControl, HuoYunWidgetCore.Control);

    FormGroupLabelControl.prototype.setFromGroup = function(formGroup) {
      this.$$formGroup = formGroup;
    };

    FormGroupLabelControl.prototype.getText = function() {
      return this.getOptions().text;
    };

    return FormGroupLabelControl;
  }
]);


angular.module('huoyun.widget').factory("FormGroupInputControl", ["$log", "HuoYunWidgetCore", "TextControl", "FormControlProvider",
  function($log, HuoYunWidgetCore, TextControl, FormControlProvider) {

    function FormGroupInputControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(FormGroupInputControl, HuoYunWidgetCore.Control);

    FormGroupInputControl.prototype.setFromGroup = function(formGroup) {
      this.$$formGroup = formGroup;
    };

    FormGroupInputControl.prototype.getFormGroup = function() {
      return this.$$formGroup;
    };

    FormGroupInputControl.prototype.getInputOptions = function() {
      if (!this.$$inputOptions) {
        var inputOptions = this.getOptions();
        inputOptions.appendClass = "form-control " + (inputOptions.appendClass || "");

        var control = FormControlProvider.getControlbyType(this.getFormGroup().getType());
        if (!control) {
          control = TextControl;
        }

        this.$$inputOptions = new control(inputOptions);
      }

      return this.$$inputOptions;
    };

    return FormGroupInputControl;
  }
]);