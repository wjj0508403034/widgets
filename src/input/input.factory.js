'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsInputs", ["TextControl", "EmailControl", "DropdownControl", "DataListControl",

  function(TextControl, EmailControl, DropdownControl, DataListControl) {

    return {
      TextBox: TextControl,
      EmailBox: EmailControl,
      Dropdown: DropdownControl,
      DataList: DataListControl
    };
  }
]);