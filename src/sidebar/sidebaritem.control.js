'use strict';

angular.module('huoyun.widget').factory("SidebarItemControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function SidebarItemControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$items = [];
      var that = this;
      (options.items || []).forEach(function(item) {
        var itemControl = new SidebarItemControl(item)
          .setParent(that);
        that.$$items.push(itemControl);
      });
    }

    HuoYunWidgetCore.ClassExtend(SidebarItemControl, HuoYunWidgetCore.Control);

    SidebarItemControl.prototype.setSideBar = function(sidebar) {
      this.$$sidebar = sidebar;
      return this;
    };

    SidebarItemControl.prototype.getSideBar = function() {
      if (!this.$$sidebar) {
        this.$$sidebar = this.getParent() && this.getParent().getSideBar();
      }
      return this.$$sidebar;
    };

    SidebarItemControl.prototype.setParent = function(sidebarItem) {
      this.$$parent = sidebarItem;
      return this;
    };

    SidebarItemControl.prototype.getParent = function() {
      return this.$$parent;
    };

    SidebarItemControl.prototype.getItems = function() {
      return this.$$items;
    };

    SidebarItemControl.prototype.hasChild = function() {
      return this.getItems().length !== 0;
    };

    SidebarItemControl.prototype.getText = function() {
      return this.getOptions().text;
    };

    SidebarItemControl.prototype.getIcon = function() {
      return this.getOptions().icon;
    };

    SidebarItemControl.prototype.onClick = function() {
      this.getSideBar().raiseEvent("itemClick", [this, this.getParent()]);
    };

    return SidebarItemControl;
  }
]);