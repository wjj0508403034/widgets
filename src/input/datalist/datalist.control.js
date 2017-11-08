'use strict';


angular.module('huoyun.widget').factory("ListSelection", [function() {

  const Modes = {
    Single: "single",
    Multiple: "multiple"
  };

  function ListSelection(val) {
    this.$$value = Modes.Single;
    if (typeof val === "string") {
      if (val.toLowerCase() === Modes.Multiple) {
        this.$$value = Modes.Multiple;
      }
    }
  }

  ListSelection.prototype.getValue = function() {
    return this.$$value.toLowerCase();
  };

  ListSelection.prototype.isSingle = function() {
    return this.getValue() === Modes.Single;
  };

  ListSelection.prototype.isMultiple = function() {
    return this.getValue() === Modes.Multiple;
  };

  return ListSelection;
}]);


angular.module('huoyun.widget').factory("ListDataSource", ["CheckBoxControl",
  function(CheckBoxControl) {


    function ListDataSource(selection) {
      this.$$selection = selection;
    }

    ListDataSource.prototype.getSelection = function() {
      return this.$$selection;
    };

    ListDataSource.prototype.getData = function() {
      if (!this.$$dataSource) {
        this.$$dataSource = [];
      }
      return this.$$dataSource;
    };

    ListDataSource.prototype.setData = function(data) {
      return this.clear().append(data);
    };

    ListDataSource.prototype.setSelected = function(items) {
      var that = this;
      this.getData().forEach(function(item) {
        if (that.__isItemInItems(item.data, items)) {
          item.checkbox.setValue(true);
        }
      });

      return this;
    };

    ListDataSource.prototype.__isItemInItems = function(item, items) {
      for (var index = 0; index < items.length; index++) {
        if (item === items[index]) {
          return true;
        }
      }

      return false;
    };

    ListDataSource.prototype.setLabelField = function(labelField) {
      this.$$labelField = labelField;
      return this;
    };

    ListDataSource.prototype.getLabelField = function() {
      return this.$$labelField;
    };

    ListDataSource.prototype.getLabelContent = function(data) {
      var labelField = this.getLabelField();
      if (typeof labelField === "string") {
        return data[labelField];
      }

      return data;
    };

    ListDataSource.prototype.addItem = function(item) {

      if (this.getSelection().isSingle()) {
        this.getData().push(item);
      } else {
        var that = this;
        var itemWarpper = {
          data: item,
          checkbox: new CheckBoxControl({
            value: false,
            text: that.getLabelContent(item),
            checked: function($event) {

            },
            unchecked: function($event) {

            }
          })
        };

        this.getData().push(itemWarpper);
      }
    };

    ListDataSource.prototype.append = function(data) {
      if (!Array.isArray(data)) {
        throw new Error("Data must be array.");
      }

      var that = this;

      data.forEach(function(item) {
        that.addItem(item);
      });

      return this;
    };

    ListDataSource.prototype.clear = function() {
      this.$$dataSource = [];
      return this;
    };

    ListDataSource.prototype.selectedAll = function() {
      return this.__setSelectedForAll(true);
    };

    ListDataSource.prototype.unselectedAll = function() {
      return this.__setSelectedForAll(false);
    };

    ListDataSource.prototype.__setSelectedForAll = function(value) {
      if (this.getSelection().isMultiple()) {
        this.getData().forEach(function(item) {
          item.checkbox.setValue(value);
        });
      }

      return this;
    };

    ListDataSource.prototype.getSelectedItems = function() {
      if (this.getSelection().isMultiple()) {
        var items = [];
        this.getData().forEach(function(item) {
          if (item.checkbox.isChecked()) {
            items.push(item);
          }
        });

        return items;
      }
    };

    ListDataSource.prototype.getSelectedData = function() {
      if (this.getSelection().isMultiple()) {
        var data = [];
        this.getData().forEach(function(item) {
          if (item.checkbox.isChecked()) {
            data.push(item.data);
          }
        });

        return data;
      }
    };

    return ListDataSource;
  }
]);

angular.module('huoyun.widget').factory("DataListControl", ["HuoYunWidgetCore", "InputControl", "ListSelection", "HuoyunPromise",
  function(HuoYunWidgetCore, InputControl, ListSelection, HuoyunPromise) {

    function DataListControl(options) {
      InputControl.apply(this, arguments);

      this.$$selection = new ListSelection(options.selection);
    }

    HuoYunWidgetCore.ClassExtend(DataListControl, InputControl);



    DataListControl.prototype.getSelection = function() {
      return this.$$selection;
    };

    DataListControl.prototype.getDataSource = function() {
      if (!this.$$dataSource) {
        this.$$dataSource = this.getOptions().data;
      }

      if (!Array.isArray(this.$$dataSource)) {
        throw new Error("data isn't array");
      }

      return this.$$dataSource;
    };

    DataListControl.prototype.getItemTemplateUrl = function() {
      return this.getOptions().itemTemplateUrl;
    };

    DataListControl.prototype.hasItemTemplateUrl = function() {
      return !!this.getItemTemplateUrl();
    };

    DataListControl.prototype.isSearchVisibility = function() {
      return this.__isFalse("searchVisibility");
    };

    DataListControl.prototype.onSearch = function(val) {
      return HuoyunPromise.resolve(this.getOptions().search(val));
    };

    DataListControl.prototype.isLoadMoreVisibility = function() {
      return this.__isFalse("loadMoreVisibility");
    };

    DataListControl.prototype.loadMoreData = function(loadCount, searchText) {
      return HuoyunPromise.resolve(this.getOptions().loadMore(loadCount, searchText));
    };

    DataListControl.prototype.getLabelField = function() {
      return this.getOptions().labelField;
    };

    DataListControl.prototype.getValueField = function() {
      return this.getOptions().valueField;
    };

    DataListControl.prototype.getSingleValueText = function(item) {
      return item && item[this.getLabelField()];
    };

    DataListControl.prototype.getMultiValueText = function(items) {
      if (Array.isArray(items)) {
        var that = this;

        return items.linq().join(function(item) {
          return that.getSingleValueText(item);
        }, ", ");
      }

      return items;
    };

    DataListControl.prototype.getValueText = function(value) {
      if (this.$$selection.isSingle()) {
        return this.getSingleValueText(value);
      }

      if (this.$$selection.isMultiple()) {
        return this.getMultiValueText(value);
      }

      return value;
    };

    DataListControl.prototype.isReadonly = function() {
      return true;
    };

    return DataListControl;
  }
]);