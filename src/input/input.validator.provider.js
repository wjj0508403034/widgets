'use strict';

angular.module('huoyun.widget').provider("InputValidatorProvider", [function() {

  var validators = {};

  this.registerValidator = function(input, validator) {
    validators[input] = validator;
    return this;
  };

  this.getValidatorsByInputControl = function(input) {
    return validators[input];
  };

  this.$get = function() {
    return this;
  };
}]);

angular.module('huoyun.widget').run(["InputValidatorProvider", "HuoYunWidgetsValidators", "HuoYunWidgetsInputs", function(InputValidatorProvider, HuoYunWidgetsValidators, HuoYunWidgetsInputs) {
  InputValidatorProvider.registerValidator(HuoYunWidgetsInputs.EmailBox, HuoYunWidgetsValidators.Email);
}]);