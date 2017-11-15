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

        this.setTabSelected(0);
      }
      return this.$$items;
    };

    TabControl.prototype.setTabSelected = function(tabIndex) {
      var items = this.getTabItems();
      if (items.length > tabIndex) {
        items[tabIndex].selected();
      }
    };

    TabControl.prototype.getSelectedTabItem = function() {
      var items = this.getTabItems();
      for (var index = 0; index < items.length; index++) {
        if (items[index].isSelected()) {
          return items[index];
        }
      }
    };

    return TabControl;
  }
]);