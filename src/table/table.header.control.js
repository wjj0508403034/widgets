'use strict';


angular.module('huoyun.widget').factory("TableHeaderControl", ["HuoYunWidgetCore", "TableColumnControl",
  function(HuoYunWidgetCore, TableColumnControl) {

    function TableHeaderControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TableHeaderControl, HuoYunWidgetCore.Control);

    TableHeaderControl.prototype.setTable = function(table) {
      this.$$table = table;
      return this;
    };

    TableHeaderControl.prototype.getTable = function() {
      return this.$$table;
    };

    return TableHeaderControl;
  }
]);