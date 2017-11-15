'use strict';

angular.module('huoyun.widget').factory("TabItemHeaderControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function TabItemHeaderControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TabItemHeaderControl, HuoYunWidgetCore.Control);


    TabItemHeaderControl.prototype.setTabItem = function(tabItem) {
      this.$$tabItem = tabItem;
      return this;
    };

    TabItemHeaderControl.prototype.getTabItem = function() {
      return this.$$tabItem;
    };

    TabItemHeaderControl.prototype.getContent = function() {
      return this.getOptions().content;
    };


    return TabItemHeaderControl;
  }
]);