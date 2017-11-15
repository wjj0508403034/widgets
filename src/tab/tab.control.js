'use strict';

angular.module('huoyun.widget').factory("TabControl", ["HuoYunWidgetCore", "TabItemControl",
  function(HuoYunWidgetCore, TabItemControl) {

    function TabControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TabControl, HuoYunWidgetCore.Control);

    TabControl.prototype.getTabItems = function() {
      if (!this.$$items) {
        this.$$items = [];
        var that = this;
        (this.getOptions().items || []).forEach(function(item) {
          var itemControl = new TabItemControl(item)
            .setTab(that);
          that.$$items.push(itemControl);
        });
      }
      return this.$$items;
    };



    return TabControl;
  }
]);