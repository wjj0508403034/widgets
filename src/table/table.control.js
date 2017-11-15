'use strict';

angular.module('huoyun.widget').factory("TableControl", ["HuoYunWidgetCore", "SelectorControl", "TableHeaderControl", "TableRowControl", "TableColumnControl",
  function(HuoYunWidgetCore, SelectorControl, TableHeaderControl, TableRowControl, TableColumnControl) {

    function TableControl(options) {
      SelectorControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TableControl, SelectorControl);

    TableControl.prototype.getHeader = function() {
      if (!this.$$header) {
        this.$$header = new TableHeaderControl(this.getOptions().header).setTable(this);
      }

      return this.$$header;
    };

    TableControl.prototype.getItemTemplate = function() {
      return this.$$itemTemplate || TableRowControl;
    };

    TableControl.prototype.getColumns = function() {
      if (!this.$$columns) {
        this.$$columns = [];
        var that = this;
        (this.getOptions().columns || []).forEach(function(column) {
          that.$$columns.push(new TableColumnControl(column).setTable(that));
        });
      }

      return this.$$columns;
    };

    TableControl.prototype.getRows = function() {
      return this.getItems();
    };

    TableControl.prototype.onColumnDragSuccess = function($event, sourceColumn, targetColumn) {
      if (sourceColumn !== targetColumn) {
        this.exchangePosition(sourceColumn, targetColumn);
      }
    };

    TableControl.prototype.exchangePosition = function(sourceColumn, targetColumn) {
      var columns = this.getColumns();
      var souceColumnIndex = columns.indexOf(sourceColumn);
      var targetColumnIndex = columns.indexOf(targetColumn);
      columns[souceColumnIndex] = targetColumn;
      columns[targetColumnIndex] = sourceColumn;
      this.raiseEvent("columnExchanged", [sourceColumn, targetColumn, this]);
    };

    TableControl.prototype.getColumnNames = function() {
      return this.getColumns().map(function(column) {
        return column.getName();
      });
    };


    return TableControl;
  }
]);