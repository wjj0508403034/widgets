'use strict';

angular.module('huoyun.widget').factory("InputControl", ["HuoYunWidgetCore", "InputValidatorProvider", "InputErrorControl",
  function(HuoYunWidgetCore, InputValidatorProvider, InputErrorControl) {

    function InputControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(InputControl, HuoYunWidgetCore.Control);

    InputControl.prototype.getPlaceholder = function() {
      return this.getOptions().placeholder;
    };

    InputControl.prototype.isReadonly = function() {
      return this.__isFalse("readonly");
    };

    InputControl.prototype.setValue = function(value) {
      var oldVal = this.getValue();
      if (oldVal !== value) {
        this.$$value = value;
        this.raiseEvent("valueChanged", [value, oldVal]);
      }
      return this;
    };

    InputControl.prototype.getValue = function() {
      return this.$$value;
    };

    InputControl.prototype.addValidator = function(validator) {
      this.getValidators().push(validator);
    };

    InputControl.prototype.getValidators = function() {
      if (!this.$$validators) {
        this.$$validators = [];
      }

      return this.$$validators.concat(this.getGlobalValidators())
        .filter(function(validator) {
          return !!validator;
        });
    };

    InputControl.prototype.getGlobalValidators = function() {
      return InputValidatorProvider.getValidatorsByInputControl(this.constructor);
    };

    InputControl.prototype.validator = function() {
      var that = this;
      HuoYunWidgetCore.Promise.all(this.getValidators().map(function(validator) {
          var validatorInstance = new validator(that.getValue());
          return validatorInstance.onValid();
        }))
        .then(function() {
          that.getErrorControl() && that.getErrorControl().clear();
        }).catch(function(ex) {
          that.$$error = new InputErrorControl(ex);
        });
    };

    InputControl.prototype.hasError = function() {
      return this.getErrorControl() && this.getErrorControl().hasError();
    };

    InputControl.prototype.getErrorControl = function() {
      return this.$$error;
    };

    return InputControl;
  }
]);