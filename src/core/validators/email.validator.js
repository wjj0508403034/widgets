'use strict';

angular.module('huoyun.widget').factory("EmailValidator", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    const PATTERN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    function EmailValidator(options) {
      HuoYunWidgetCore.Validator.apply(this, arguments);
      this.$$errors = {};

      this.addErrorType("invalidFormat", "邮箱地址格式不正确");
    }

    HuoYunWidgetCore.ClassExtend(EmailValidator, HuoYunWidgetCore.Validator);

    EmailValidator.prototype.onValid = function() {
      if (PATTERN.test(this.getOptions())) {
        return this.__success();
      }

      return this.__failed("invalidFormat");
    };

    return EmailValidator;
  }
]);