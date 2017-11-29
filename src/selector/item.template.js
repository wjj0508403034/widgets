'use strict';

angular.module('huoyun.widget').factory("ItemControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function ItemControl() {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(ItemControl, HuoYunWidgetCore.Control);

    ItemControl.prototype.setSelector = function(selector) {
      this.$$selector = selector;
      return this;
    };

    ItemControl.prototype.getSelector = function() {
      return this.$$selector;
    };

    ItemControl.prototype.setData = function(data) {
      this.$$data = data;
      return this;
    };

    ItemControl.prototype.getData = function() {
      return this.$$data;
    };

    ItemControl.prototype.isSelected = function() {
      return this.$$isSelected === true;
    };

    ItemControl.prototype.setSelected = function() {
      this.$$isSelected = true;
      return this;
    };

    ItemControl.prototype.setUnselected = function() {
      this.$$isSelected = false;
      return this;
    };

    ItemControl.prototype.toggleSelected = function() {
      this.$$isSelected = !this.$$isSelected;
      return this;
    };

    ItemControl.prototype.getValue = function() {
      return this.__getValueByPathFunc("getValuePath");
    };

    ItemControl.prototype.getDisplayText = function() {
      return this.__getValueByPathFunc("getDisplayPath");
    };

    ItemControl.prototype.hasTemplateUrl = function() {
      return this.getSelector().hasItemTemplateUrl();
    };

    ItemControl.prototype.onClicked = function() {
      this.getSelector().onItemClicked(this);
    };

    ItemControl.prototype.__getValueByPathFunc = function(pathFuncName) {
      var data = this.getData();

      if (data === null || data === undefined) {
        return data;
      }

      var selector = this.getSelector();
      if (!selector) {
        return data;
      }

      var displayPath = selector[pathFuncName]();
      if (displayPath) {
        return this.__getValueByPath(data, displayPath);
      }

      return data;
    };

    ItemControl.prototype.__getValueByPath = function(data, path) {
      if (typeof path === "string") {
        var paths = path.split(".");
        if (paths.length === 0) {
          return undefined;
        }

        var obj = data[paths[0]];
        if (obj === undefined || obj === null || paths.length === 1) {
          return obj;
        }

        return this.getValueByPath(obj, paths.slice(1).join("."));
      }

      throw new Error("path must be string");
    };

    return ItemControl;
  }


]);