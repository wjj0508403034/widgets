'use strict';

angular.module('huoyun.widget').factory("SelectorControl", ["$q", "HuoYunWidgetCore", "ItemControl", "Selection",
  function($q, HuoYunWidgetCore, ItemControl, Selection) {

    function SelectorControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$selection = new Selection(options.selection);
    }

    HuoYunWidgetCore.ClassExtend(SelectorControl, HuoYunWidgetCore.Control);

    SelectorControl.prototype.getSelection = function() {
      return this.$$selection;
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

      return this.$$dataSource;
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
      if (itemTemplate instanceof ItemControl) {
        this.$$itemTemplate = itemTemplate;
      }

      throw new Error("itemTemplate not extends ItemControl");
    };

    SelectorControl.prototype.getItemTemplate = function() {
      return this.$$itemTemplate || ItemControl;
    };

    SelectorControl.prototype.getValuePath = function() {
      return this.getOptions().valuePath;
    };

    SelectorControl.prototype.getDisplayPath = function() {
      return this.getOptions().displayPath;
    };

    SelectorControl.prototype.onItemClicked = function(item) {
      var selection = this.getSelection().getValue();
      if (selection === Selection.Modes.Single) {
        var oldSelectedItem = this.getSelectionItem();
        if (item !== oldSelectedItem) {
          oldSelectedItem && oldSelectedItem.setUnselected();
          item.setSelected();
          this.onSelectedChanged(item, oldSelectedItem);
        }

        return;
      }

      if (selection === Selection.Modes.Multiple) {
        var oldSelectedItems = this.getSelectedItems();
        item.toggleSelected();
        var newSelectedItems = this.getSelectedItems();
        this.onSelectedChanged(newSelectedItems, oldSelectedItems);
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

    SelectorControl.prototype.onSelectedChanged = function(newVal, oldVal) {
      var that = this;
      var listeners = this.getEventListeners("selectedChanged");
      listeners.forEach(function(listener) {
        listener.apply(that, [newVal, oldVal]);
      });
    };

    return SelectorControl;
  }
]);