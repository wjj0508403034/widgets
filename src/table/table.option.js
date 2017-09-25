'use strict';


angular.module('huoyun.widget').factory("TableSelection", function() {
  const Modes = {
    None: "None",
    Single: "Single",
    Multiple: "Multiple"
  };

  return Modes;
});

angular.module('huoyun.widget').factory("TableSelectionOption", ["TableSelection", function(TableSelection) {

  const props = ["checkbox", "hightlight"];

  function TableSelectionOption(options) {
    var that = this;
    props.forEach(function(prop) {
      that[prop] = options[prop];
    });

    this.mode = TableSelection.None;

    if (typeof options.mode === "string") {
      if (options.mode.toLowerCase() === "single") {
        this.mode = TableSelection.Single;
      } else if (options.mode.toLowerCase() === "multiple") {
        this.mode = TableSelection.Multiple;
      }
    }
  }

  TableSelectionOption.prototype.checkBoxVisibility = function() {
    return this.checkbox === true;
  };

  TableSelectionOption.prototype.isHighLight = function() {
    return this.hightlight !== false;
  };

  return TableSelectionOption;
}]);

angular.module('huoyun.widget').factory("TableMaskLayerOption", [function() {

  const props = ["icon", "text", "templateUrl", "style"];

  function TableMaskLayerOption() {
    var that = this;
    props.forEach(function(prop) {
      that[prop] = options[prop];
    });
  }

  return TableMaskLayerOption;
}]);

angular.module('huoyun.widget').factory("TableHeaderOption", ["ButtonOption", "widgetsHelper",
  function(ButtonOption, widgetsHelper) {

    const props = ["style", "title", "icon"];


    function TableHeaderOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      that.buttons = [];

      if (Array.isArray(options.buttons)) {
        options.buttons.forEach(function(buttonOption) {
          that.buttons.push(new ButtonOption(buttonOption));
        });
      }
    }

    TableHeaderOption.prototype.$$style = function() {
      return widgetsHelper.style(this);
    };

    return TableHeaderOption;
  }
]);

angular.module('huoyun.widget').factory("TableColumnOption", ["widgetsHelper",
  function(widgetsHelper) {

    const props = ["name", "label", "type", "visibility", "headerTemplateUrl", "templateUrl", "style"];

    function TableColumnOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      this.getOption = function() {
        return options;
      };
    }

    TableColumnOption.prototype.$$style = function() {
      return widgetsHelper.style(this);
    };

    TableColumnOption.prototype.$$visibility = function() {
      return widgetsHelper.visibility(this);
    };

    TableColumnOption.prototype.getName = function() {
      return this.name;
    };

    TableColumnOption.prototype.getValueText = function(val) {
      if (typeof this.getOption().getValueText === "function") {
        return this.getOption().getValueText(val);
      }

      return val;
    };

    return TableColumnOption;
  }
]);

angular.module('huoyun.widget').factory("TableLineData", ["CheckBoxOption",
  function(CheckBoxOption) {

    function TableLineData(data) {
      this.data = data;
      this.$$selected = false;
      this.checkboxOption = new CheckBoxOption({ value: false });
    }

    TableLineData.prototype.selected = function() {
      this.$$selected = true;
      this.checkboxOption.value = true;
    };

    TableLineData.prototype.unselected = function() {
      this.$$selected = false;
      this.checkboxOption.value = false;
    };

    TableLineData.prototype.isSelected = function() {
      return this.$$selected;
    };

    TableLineData.prototype.getPropValue = function(column) {
      return this.data && this.data[column.getName()];
    };

    TableLineData.prototype.getData = function() {
      return this.data;
    };

    return TableLineData;
  }
]);

angular.module('huoyun.widget').factory("TableSource", ["TableLineData", function(TableLineData) {

  const props = ["first", "last", "number", "numberOfElements", "size", "sort", "totalElements",
    "totalPages"
  ];

  function TableSource(options) {
    var that = this;
    props.forEach(function(prop) {
      that[prop] = options[prop];
    });

    that.lines = [];
    if (Array.isArray(options.content)) {
      options.content.forEach(function(item) {
        that.lines.push(new TableLineData(item));
      });
    }
  }

  TableSource.prototype.count = function() {
    return this.lines.length;
  };

  TableSource.prototype.selectedAll = function() {
    this.lines.forEach(function(line) {
      line.selected();
    });
  };

  TableSource.prototype.unselectedAll = function() {
    this.lines.forEach(function(line) {
      line.unselected();
    });
  };

  TableSource.prototype.selected = function($line) {
    var that = this;
    that.lines.forEach(function(line) {
      if (line === $line) {
        line.selected();
      } else {
        line.unselected();
      }
    })
  };

  TableSource.prototype.addSelected = function($line) {
    $line.selected();
  };

  TableSource.prototype.removeSelected = function($line) {
    $line.unselected();
  };

  TableSource.prototype.getSelectedItems = function() {
    var that = this;
    var items = [];
    that.lines.forEach(function(line) {
      if (line.isSelected()) {
        items.push(line);
      }
    });

    return items;
  };

  TableSource.prototype.getSelectedItem = function() {
    for (var index = 0; index < this.lines.length; index++) {
      if (this.lines[index].isSelected()) {
        return this.lines[index];
      }
    }
  };

  return TableSource;
}]);

angular.module('huoyun.widget').factory("TableOption", ["TableSelection", "TableColumnOption",
  "TableSource", "TableHeaderOption", "TableMaskLayerOption", "TableSelectionOption", "CheckBoxOption",
  function(TableSelection, TableColumnOption, TableSource, TableHeaderOption, TableMaskLayerOption,
    TableSelectionOption, CheckBoxOption) {

    const eventHandlers = ["onSelectChanged"];

    function TableOption(options) {
      this.title = options.title;
      this.buttons = [];
      this.columns = [];
      this.source = null;

      if (options.selection) {
        this.selection = new TableSelectionOption(options.selection);
      }

      if (options.header) {
        this.header = new TableHeaderOption(options.header);
      }

      if (options.mask) {
        this.mask = new TableMaskLayerOption(options.mask);
      }

      var that = this;
      if (Array.isArray(options.columns)) {
        options.columns.forEach(function(columnOption) {
          that.columns.push(new TableColumnOption(columnOption));
        });
      }

      eventHandlers.forEach(function(eventHandler) {
        if (options[eventHandler] && typeof options[eventHandler] === "function") {
          that[eventHandler] = options[eventHandler];
        }
      });

      that.$$selectedAllOption = new CheckBoxOption({
        value: false,
        onCheckChanged: function(event, oldVal, newVal) {
          if (newVal) {
            that.source && that.source.selectedAll();
          } else {
            that.source && that.source.unselectedAll();
          }
        }
      });
    }

    TableOption.prototype.getSelectionMode = function() {
      if (this.selection) {
        return this.selection.mode;
      }

      return TableSelection.None;
    };

    TableOption.prototype.getSelectedItem = function() {
      if (this.source && this.getSelectionMode() === TableSelection.Single) {
        return this.source.getSelectedItem();
      }
    };

    TableOption.prototype.$$showCheckBox = function() {
      if (this.getSelectionMode() === TableSelection.Multiple) {
        return this.selection.checkBoxVisibility();
      }

      return false;
    };

    TableOption.prototype.setSource = function(source) {
      this.source = new TableSource(source);
    };

    TableOption.prototype.isEmpty = function() {
      return this.source && this.source.count() === 0;
    };

    TableOption.prototype.$$columnCount = function() {
      if (this.source) {
        return this.source.count();
      }

      return 0;
    };

    TableOption.prototype.$$onLineClicked = function(lineData, index) {
      if (this.getSelectionMode() === TableSelection.Single) {
        if (!lineData.isSelected()) {
          this.source.selected(lineData);
          this.onSelectChanged && this.onSelectChanged(this.source.getSelectedItem());
        }
      } else if (this.getSelectionMode() === TableSelection.Multiple) {
        if (!lineData.isSelected()) {
          this.source.addSelected(lineData);
        } else {
          this.source.removeSelected(lineData);
        }
        this.onSelectChanged && this.onSelectChanged(this.source.getSelectedItems());
      }
    };

    return TableOption;
  }
]);