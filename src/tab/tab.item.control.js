'use strict';

angular.module('huoyun.widget').factory("TabItemControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function TabItemControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TabItemControl, HuoYunWidgetCore.Control);


    TabItemControl.prototype.setTab = function(tab) {
      this.$$tab = tab;
      return this;
    };

    TabItemControl.prototype.getContent = function() {
      return this.getOptions().content;
    };


    return TabItemControl;
  }
]);