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
      if (selection !== Selection.Modes.None) {
        item.toggleSelected();

        if (selection === Selection.Modes.Single) {
          this.__setItemsUnselectedExceptSelf(item);
        }
      }
    };

    SelectorControl.prototype.__setItemsUnselectedExceptSelf = function(self) {
      this.getItems().forEach(function(item) {
        if (item !== self) {
          item.setUnselected();
        }
      });
    }

    SelectorControl.prototype.getSelectionItem = function() {
      //this.getItems().forEach
    };

    SelectorControl.prototype.onSelectedChanged = function() {

    };

    return SelectorControl;
  }
]);