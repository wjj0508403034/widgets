'use strict';

angular.module('huoyun.widget').factory("SidebarPanelOption", ["SidebarMenuOption",
  function(SidebarMenuOption) {

    function SidebarPanelOption(options) {

      this.menus = [];

      if (Array.isArray(options.menus)) {
        var that = this;
        options.menus.forEach(function(menu) {
          var menuOption = new SidebarMenuOption(menu);
          that.menus.push(menuOption);
        });
      }


      this.getOptions = function() {
        return options;
      };
    }


    SidebarPanelOption.prototype.getMenus = function() {
      return this.menus;
    };



    return SidebarPanelOption;
  }
]);

angular.module('huoyun.widget').factory("SidebarMenuOption", ["SidebarMenuItemOption", "widgetsHelper",
  function(SidebarMenuItemOption, widgetsHelper) {

    function SidebarMenuOption(options) {

      this.items = [];
      if (Array.isArray(options.items)) {
        var that = this;
        options.items.forEach(function(item) {
          var menuItem = new SidebarMenuItemOption(item);
          menuItem.setMenu(that);
          that.items.push(menuItem);
        });
      }

      this.getOptions = function() {
        return options;
      };
    }

    SidebarMenuOption.prototype.getItems = function() {
      return this.items;
    };

    SidebarMenuOption.prototype.isVisibility = function() {
      return widgetsHelper.visibility(this.getOptions());
    };

    SidebarMenuOption.prototype.getLabel = function() {
      return this.getOptions().label;
    };

    SidebarMenuOption.prototype.getIcon = function() {
      return this.getOptions().icon;
    };

    SidebarMenuOption.prototype.onClick = function() {
      if (this.getItems().length > 0) {
        if (this.isExpand()) {
          this.collapse();
        } else {
          this.expand();
        }

        return;
      }

      var options = this.getOptions();
      if (typeof options.onClick === "function") {
        options.onClick(this);
      }
    };

    SidebarMenuOption.prototype.isExpand = function() {
      return this.$$activeClass === "active";
    };

    SidebarMenuOption.prototype.expand = function() {
      this.$$activeClass = "active";
    };

    SidebarMenuOption.prototype.collapse = function() {
      this.$$activeClass = "";
    };

    SidebarMenuOption.prototype.getAppendClass = function() {
      return this.$$activeClass + this.getOptions().appendClass;
    };

    return SidebarMenuOption;
  }
]);

angular.module('huoyun.widget').factory("SidebarMenuItemOption", ["widgetsHelper",
  function(widgetsHelper) {

    function SidebarMenuItemOption(options) {
      this.getOptions = function() {
        return options;
      };
    }

    SidebarMenuItemOption.prototype.setMenu = function(menu) {
      this.menu = menu;
    };

    SidebarMenuItemOption.prototype.isVisibility = function() {
      return widgetsHelper.visibility(this.getOptions());
    };

    SidebarMenuItemOption.prototype.onClick = function() {
      var options = this.getOptions();
      if (typeof options.onClick === "function") {
        options.onClick(this);
      }
    };

    SidebarMenuItemOption.prototype.getLabel = function() {
      return this.getOptions().label;
    };

    SidebarMenuItemOption.prototype.getIcon = function() {
      return this.getOptions().icon;
    };




    return SidebarMenuItemOption;
  }
]);