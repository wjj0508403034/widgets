'use strict';

angular.module('huoyun.widget').factory("NavControl", ["HuoYunWidgetCore", "NavItemControl",
  function(HuoYunWidgetCore, NavItemControl) {

    function NavControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$items = [];
      var that = this;
      options.items.forEach(function(item) {
        var itemControl = new NavItemControl(item)
          .setNav(that);
        that.$$items.push(itemControl);
      });
    }

    NavControl.prototype.getItems = function() {
      return this.$$items;
    };

    HuoYunWidgetCore.ClassExtend(NavControl, HuoYunWidgetCore.Control);

    return NavControl;
  }
]);