'use strict';

angular.module('huoyun.widget').factory("TableRowControl", ["HuoYunWidgetCore", "ItemControl",
  function(HuoYunWidgetCore, ItemControl) {

    function TableRowControl(options) {
      ItemControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TableRowControl, ItemControl);

    TableRowControl.prototype.getColumnValue = function(columnName) {
      return this.getData()[columnName];
    };

    return TableRowControl;
  }
]);