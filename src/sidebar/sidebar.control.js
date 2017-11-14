'use strict';

angular.module('huoyun.widget').factory("SidebarControl", ["HuoYunWidgetCore", "SidebarItemControl",
  function(HuoYunWidgetCore, SidebarItemControl) {

    function SidebarControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$items = [];
      var that = this;
      (options.items || []).forEach(function(item) {
        var itemControl = new SidebarItemControl(item)
          .setSideBar(that);
        that.$$items.push(itemControl);
      });
    }

    HuoYunWidgetCore.ClassExtend(SidebarControl, HuoYunWidgetCore.Control);

    SidebarControl.prototype.getItems = function() {
      return this.$$items;
    };

    return SidebarControl;
  }
]);