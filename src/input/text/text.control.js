'use strict';

angular.module('huoyun.widget').factory("TextControl", ["HuoYunWidgetCore", "InputControl",
  function(HuoYunWidgetCore, InputControl) {

    function TextControl(options) {
      InputControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TextControl, InputControl);


    return TextControl;
  }
]);