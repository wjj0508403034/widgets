'use strict';

angular.module('huoyun.widget').factory("EmailControl", ["HuoYunWidgetCore", "InputControl",
  function(HuoYunWidgetCore, InputControl) {

    function EmailControl(options) {
      InputControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(EmailControl, InputControl);


    return EmailControl;
  }
]);