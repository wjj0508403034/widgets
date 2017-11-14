'use strict';

angular.module('huoyun.widget').factory("BreadCrumbItemControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    function BreadCrumbItemControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(BreadCrumbItemControl, HuoYunWidgetCore.Control);

    BreadCrumbItemControl.prototype.setBreadCrumb = function(breadCrumb) {
      this.$$breadCrumb = breadCrumb;
      return this;
    };

    BreadCrumbItemControl.prototype.getBreadCrumb = function() {
      return this.$$breadCrumb;
    };

    BreadCrumbItemControl.prototype.getText = function() {
      return this.getOptions().text;
    };

    BreadCrumbItemControl.prototype.getIcon = function() {
      return this.getOptions().icon;
    };

    BreadCrumbItemControl.prototype.onClick = function() {
      this.getBreadCrumb().raiseEvent("itemClick", [this]);
    };

    return BreadCrumbItemControl;
  }
]);