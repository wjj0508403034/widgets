'use strict';

angular.module('huoyun.widget').factory("HuoYunWidgetsInputs", ["TextControl", "EmailControl", "DropdownControl", "DataListControl", "SearchControl", "DateControl", "TimeControl",
  function(TextControl, EmailControl, DropdownControl, DataListControl, SearchControl, DateControl, TimeControl) {
    return {
      TextBox: TextControl,
      EmailBox: EmailControl,
      Dropdown: DropdownControl,
      DataList: DataListControl,
      Search: SearchControl,
      Date: DateControl,
      Time: TimeControl
    };
  }
]);