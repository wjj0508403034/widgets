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
      return this;
    };

    FormGroupControl.prototype.getFormControl = function() {
      return this.$$form;
    };

    FormGroupControl.prototype.getType = function() {
      var type = this.getOptions().type;
      return type && type.toUpperCase();
    };

    FormGroupControl.prototype.isMandatory = function() {
      return this.getOptions().mandatory;
    };

    FormGroupControl.prototype.getValue = function() {
      return this.getFormControl().getPropertyValue(this.getName());
    };

    FormGroupControl.prototype.setValueChangedCallback = function(callback) {
      var inputControl = this.getInputControl();
      inputControl && inputControl.setValueChangedCallback(callback);
      return this;
    };

    FormGroupControl.prototype.getValueChangedCallback = function() {
      var inputControl = this.getInputControl();
      return inputControl && inputControl.getValueChangedCallback();
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
      return this;
    };

    FormGroupInputControl.prototype.getFormGroup = function() {
      return this.$$formGroup;
    };

    FormGroupInputControl.prototype.getInput = function() {
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

    FormGroupInputControl.prototype.setValueChangedCallback = function(callback) {
      this.$$valueChangedCallback = callback;
      var input = this.getInput();
      input && input.addValueChangedListener(callback);
      return this;
    };

    FormGroupInputControl.prototype.getValueChangedCallback = function() {
      return this.$$valueChangedCallback;
    };

    return FormGroupInputControl;
  }
]);