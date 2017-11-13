'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsValidators", ["EmailValidator",

  function(EmailValidator) {

    return {
      Email: EmailValidator
    };
  }
]);