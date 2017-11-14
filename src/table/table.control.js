'use strict';

angular.module('huoyun.widget').factory("TableControl", ["HuoYunWidgetCore", "SelectorControl", "TableHeaderControl", "TableRowControl",
  function(HuoYunWidgetCore, SelectorControl, TableHeaderControl, TableRowControl) {

    function TableControl(options) {
      SelectorControl.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TableControl, SelectorControl);

    TableControl.prototype.getHeader = function() {
      if (!this.$$header) {
        this.$$header = new TableHeaderControl(this.getOptions().header);
      }

      return this.$$header;
    };

    TableControl.prototype.getItemTemplate = function() {
      return this.$$itemTemplate || TableRowControl;
    };

    TableControl.prototype.onColumnDragSuccess = function($event) {
      console.log(arguments)
    };


    return TableControl;
  }
]);

angular.module('huoyun.widget').factory("TableHeaderControl", ["HuoYunWidgetCore", "TableColumnControl",
  function(HuoYunWidgetCore, TableColumnControl) {

    function TableHeaderControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$columns = [];

      var that = this;
      (options.columns || []).forEach(function(column) {
        that.$$columns.push(new TableColumnControl(column));
      });
    }

    HuoYunWidgetCore.ClassExtend(TableHeaderControl, HuoYunWidgetCore.Control);

    TableHeaderControl.prototype.getColumns = function() {
      return this.$$columns;
    };

    return TableHeaderControl;
  }
]);

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

angular.module('huoyun.widget').factory("TableColumnControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function TableColumnControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
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

    return TableColumnControl;
  }
]);