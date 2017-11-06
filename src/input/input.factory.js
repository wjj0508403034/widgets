'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsInputs", ["TextControl", "EmailControl", "DropdownControl",

  function(TextControl, EmailControl, DropdownControl) {

    return {
      TextBox: TextControl,
      EmailBox: EmailControl,
      Dropdown: DropdownControl
    };
  }
]);