'use strict';

angular.module('huoyun.widget').factory("NavItemControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function NavItemControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(NavItemControl, HuoYunWidgetCore.Control);

    NavItemControl.prototype.setNav = function(nav) {
      this.$$nav = nav;
      return this;
    };

    NavItemControl.prototype.getNav = function() {
      return this.$$nav;
    };

    NavItemControl.prototype.getText = function() {
      return this.getOptions().text;
    };

    NavItemControl.prototype.onClick = function() {
      if (!this.isSelected()) {
        this.setSelected(true);
        var that = this;
        this.getNav().getItems().forEach(function(item) {
          if (item !== that) {
            item.setSelected(false);
          }
        });
      }
      this.getNav().raiseEvent("itemClick", [this]);
    };

    NavItemControl.prototype.isSelected = function() {
      return this.$$selected;
    };

    NavItemControl.prototype.setSelected = function(val) {
      this.$$selected = val;
      return this;
    };

    return NavItemControl;
  }
]);