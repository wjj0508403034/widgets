'use strict';

// angular.module('huoyun.widget').factory("EmailValidator", function() {

//   const PATTERN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//   function EmailValidator(formGroupOption) {
//     this.formGroupOption = formGroupOption;
//   }

//   EmailValidator.prototype.onValid = function(value) {
//     if (PATTERN.test(value)) {
//       return Promise.resolve();
//     }

//     this.formGroupOption.errorMessage = `邮箱地址格式不正确`
//     return Promise.reject(this.formGroupOption);
//   }

//   return EmailValidator;
// });