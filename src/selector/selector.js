'use strict';

angular.module('huoyun.widget').factory("SelectorControl", ["$q", "HuoYunWidgetCore", "ItemControl", "Selection",
  function($q, HuoYunWidgetCore, ItemControl, Selection) {

    function SelectorControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(SelectorControl, HuoYunWidgetCore.Control);

    SelectorControl.prototype.getSelection = function() {
      if (!this.$$selection) {
        this.$$selection = new Selection(this.getOptions().selection);
      }
      return this.$$selection;
    };

    SelectorControl.prototype.setSelection = function(selection) {
      if (selection instanceof Selection) {
        this.$$selection = selection;
        return this;
      }

      throw new Error("selection must be Selection type.");
    };

    SelectorControl.prototype.setSelectionMode = function(selection) {
      return this.setSelection(new Selection(selection));
    };

    SelectorControl.prototype.getDataSource = function() {
      if (!this.$$dataSource) {
        var dataSource = this.getOptions().dataSource;
        if (Array.isArray(dataSource)) {
          this.$$dataSource = $q.resolve(dataSource);
        }

        if (typeof dataSource === "function") {
          this.$$dataSource = dataSource.apply(this);
        }
      }

      if (this.$$dataSource instanceof $q) {
        return this.$$dataSource;
      }

      return $q.resolve(this.$$dataSource);
    };

    SelectorControl.prototype.setDataSource = function(dataSource) {
      var oldDataSource = this.getDataSource();
      this.getOptions().dataSource = dataSource;
      this.__resetDataSource();
      this.raiseEvent("dataSourceChanged", [this.getDataSource(), oldDataSource]);
      return this;
    };

    SelectorControl.prototype.__resetDataSource = function() {
      this.$$dataSource = null;
      this.$$items = null;
    };

    SelectorControl.prototype.getItems = function() {
      if (!this.$$items) {
        this.$$items = [];
        var that = this;
        this.getDataSource().then(function(data) {
          if (Array.isArray(data)) {
            data.forEach(function(itemData) {
              var ItemTemplate = that.getItemTemplate() || ItemControl;
              var itemControl = new ItemTemplate().setData(itemData).setSelector(that);
              that.$$items.push(itemControl);
            });
          }
        });
      }

      return this.$$items;
    };

    SelectorControl.prototype.setItemTemplate = function(itemTemplate) {
      this.$$itemTemplate = itemTemplate;
      return this;
    };

    SelectorControl.prototype.getItemTemplate = function() {
      return this.$$itemTemplate || ItemControl;
    };

    SelectorControl.prototype.setItemTemplateUrl = function(itemTemplateUrl) {
      this.$$itemTemplateUrl = itemTemplateUrl;
      return this;
    };

    SelectorControl.prototype.getItemTemplateUrl = function() {
      return this.$$itemTemplateUrl;
    };

    SelectorControl.prototype.hasItemTemplateUrl = function() {
      return !!this.getItemTemplateUrl();
    };

    SelectorControl.prototype.getValuePath = function() {
      return this.getOptions().valuePath;
    };

    SelectorControl.prototype.setValuePath = function(valuePath) {
      this.getOptions().valuePath = valuePath;
      return this;
    };

    SelectorControl.prototype.getDisplayPath = function() {
      return this.getOptions().displayPath;
    };

    SelectorControl.prototype.setDisplayPath = function(displayPath) {
      this.getOptions().displayPath = displayPath;
      return this;
    };

    SelectorControl.prototype.onItemClicked = function(item) {
      var selection = this.getSelection().getValue();
      if (selection === Selection.Modes.Single) {
        var oldSelectedItem = this.getSelectionItem();
        if (item !== oldSelectedItem) {
          oldSelectedItem && oldSelectedItem.setUnselected();
          item.setSelected();
          this.raiseEvent("selectedChanged", [item, oldSelectedItem]);
        }

        return;
      }

      if (selection === Selection.Modes.Multiple) {
        var oldSelectedItems = this.getSelectedItems();
        item.toggleSelected();
        var newSelectedItems = this.getSelectedItems();
        this.raiseEvent("selectedChanged", [newSelectedItems, oldSelectedItems]);
      }
    };

    SelectorControl.prototype.getSelectionItem = function() {
      var selection = this.getSelection().getValue();
      if (selection === Selection.Modes.Single) {
        var items = this.getItems();
        for (var index = 0; index < items.length; index++) {
          if (items[index].isSelected()) {
            return items[index];
          }
        }
      }
    };

    SelectorControl.prototype.getSelectedValue = function() {
      var selection = this.getSelection().getValue();
      if (selection === Selection.Modes.Single) {
        var selectedItem = this.getSelectionItem();
        return selectedItem && selectedItem.getValue();
      }

      if (selection === Selection.Modes.Multiple) {
        var selectedItems = this.getSelectedItems();
        return selectedItems.map(function(selectedItem) {
          return selectedItem.getValue();
        })
      }
    };

    SelectorControl.prototype.getSelectedItems = function() {
      var selection = this.getSelection().getValue();
      if (selection === Selection.Modes.Multiple) {
        return this.getItems().filter(function(item) {
          return item.isSelected();
        });
      }
    };

    return SelectorControl;
  }
]);