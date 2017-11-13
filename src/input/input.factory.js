'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsInputs", ["TextControl", "EmailControl", "DropdownControl", "DataListControl", "SearchControl",

  function(TextControl, EmailControl, DropdownControl, DataListControl, SearchControl) {

    return {
      TextBox: TextControl,
      EmailBox: EmailControl,
      Dropdown: DropdownControl,
      DataList: DataListControl,
      Search: SearchControl
    };
  }
]);