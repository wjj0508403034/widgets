'use strict';

angular.module('huoyun.widget').factory("MandatoryValidator", function() {

  function MandatoryValidator(formGroupOption) {
    this.formGroupOption = formGroupOption;
  }

  MandatoryValidator.prototype.onValid = function(value) {
    if (value === null || value === undefined) {
      this.formGroupOption.errorMessage = `字段${this.formGroupOption.label}不能为空`
      return Promise.reject(this.formGroupOption);
    }

    if (typeof value === "string") {
      if (value.trim() === "") {
        this.formGroupOption.errorMessage = `字段${this.formGroupOption.label}不能为空`
        return Promise.reject(this.formGroupOption);
      }
    }

    return Promise.resolve();
  }

  return MandatoryValidator;
});