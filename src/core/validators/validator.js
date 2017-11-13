'use strict';

angular.module('huoyun.widget').factory("Validator", ["$q",
  function($q) {

    function Validator(options) {
      this.$$errors = {};

      this.getOptions = function() {
        return options;
      };
    }

    Validator.prototype.onValid = function() {
      return this.__success();
    };

    Validator.prototype.addErrorType = function(errorName, errorMessage) {
      this.$$errors[errorName] = errorMessage;
      return this;
    };

    Validator.prototype.getErrorMessage = function(errorName) {
      return this.$$errors[errorName];
    };

    Validator.prototype.__failed = function(errorType) {
      return $q.reject({
        validator: this,
        errorType: errorType
      });
    };

    Validator.prototype.__success = function() {
      return $q.resolve({
        validator: this
      });
    };

    return Validator;
  }
]);