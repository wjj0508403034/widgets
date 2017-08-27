'use strict';


angular.module('huoyun.widget').factory("TableSelection", function() {
  const Modes = {
    None: "None",
    Single: "Single",
    Multiple: "Multiple"
  };

  return Modes;
});

angular.module('huoyun.widget').factory("TableColumnOption", [function() {

  const props = ["name", "label", "type", "visibility", "headerTemplateUrl", "templateUrl", "style"];

  function TableColumnOption(options) {
    var that = this;
    props.forEach(function(prop) {
      that[prop] = options[prop];
    });
  }

  return TableColumnOption;
}]);


angular.module('huoyun.widget').factory("TableSource", [function() {

  const props = ["content", "first", "last", "number", "numberOfElements", "size", "sort", "totalElements", "totalPages"];

  function TableSource(options) {
    var that = this;
    props.forEach(function(prop) {
      that[prop] = options[prop];
    });
  }

  return TableSource;
}]);

angular.module('huoyun.widget').factory("TableOption", ["TableSelection", "TableColumnOption", "ButtonOption", "TableSource", "Linq",
  function(TableSelection, TableColumnOption, ButtonOption, TableSource, Linq) {

    function TableOption(options) {
      this.title = options.title;
      this.buttons = [];
      this.columns = [];
      this.source = null;
      this.selectionMode = TableSelection.None;

      if (typeof options.selectionMode === "string") {
        if (options.selectionMode.toLowerCase() === "single") {
          this.selectionMode = TableSelection.Single;
        } else if (options.selectionMode.toLowerCase() === "multiple") {
          this.selectionMode = TableSelection.Multiple;
        }
      }

      var that = this;
      if (Array.isArray(options.columns)) {
        options.columns.forEach(function(columnOption) {
          that.columns.push(new TableColumnOption(columnOption));
        });
      }

      if (Array.isArray(options.buttons)) {
        options.buttons.forEach(function(buttonOption) {
          that.buttons.push(new ButtonOption(buttonOption));
        });
      }
    }

    TableOption.prototype.getSelectedItem = function() {
      if (this.selectionMode === TableSelection.Single) {
        if (this.source && Array.isArray(this.source.content)) {
          var linq = new Linq(this.source.content);
          return linq.findItem(function(item) {
            return item.$$selected;
          });
        }
      }
    };

    TableOption.prototype.setSource = function(source) {
      this.source = new TableSource(source);
    };

    return TableOption;
  }
]);