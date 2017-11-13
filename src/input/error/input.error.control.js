'use strict';

angular.module('huoyun.widget').factory("InputErrorControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function InputErrorControl(ex) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      if (ex && ex.validator && ex.errorType) {
        this.setErrorMessage(ex.validator.getErrorMessage(ex.errorType));
      } else {
        this.setErrorMessage("未知错误");
      }
    }

    HuoYunWidgetCore.ClassExtend(InputErrorControl, HuoYunWidgetCore.Control);

    InputErrorControl.prototype.clear = function() {
      this.$$errorMessage = null;
      return this;
    };

    InputErrorControl.prototype.setErrorMessage = function(errorMessage) {
      this.$$errorMessage = errorMessage;
      return this;
    };

    InputErrorControl.prototype.getErrorMessage = function() {
      return this.$$errorMessage;
    };

    InputErrorControl.prototype.hasError = function() {
      return !!this.getErrorMessage();
    };

    return InputErrorControl;
  }
]);