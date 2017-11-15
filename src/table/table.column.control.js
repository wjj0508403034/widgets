'use strict';


angular.module('huoyun.widget').factory("TableColumnControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    const SortDirection = {
      Down: "down",
      Up: "up"
    };

    function TableColumnControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
      this.$$sortDirection = SortDirection.Up;
    }

    HuoYunWidgetCore.ClassExtend(TableColumnControl, HuoYunWidgetCore.Control);

    TableColumnControl.prototype.getHeaderText = function() {
      return this.getOptions().text;
    };

    TableColumnControl.prototype.getColumnValue = function(row) {
      return row.getColumnValue(this.getName());
    };

    TableColumnControl.prototype.setColumnTemplate = function(template) {
      this.$$columnTemplate = template;
    };

    TableColumnControl.prototype.isSortable = function() {
      return this.getOptions().sortable === true;
    };

    TableColumnControl.prototype.getSortDirection = function() {
      return this.$$sortDirection;
    };

    TableColumnControl.prototype.getTable = function() {
      return this.$$table;
    };

    TableColumnControl.prototype.setTable = function(table) {
      this.$$table = table;
      return this;
    };

    TableColumnControl.prototype.onClick = function() {
      if (this.isSortable()) {
        this.getTable().raiseEvent("sortChanged", [this.getName(), this.getSortDirection()]);
      }
    };

    return TableColumnControl;
  }
]);