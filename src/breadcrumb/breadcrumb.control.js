'use strict';

angular.module('huoyun.widget').factory("BreadCrumbControl", ["HuoYunWidgetCore", "BreadCrumbItemControl",
  function(HuoYunWidgetCore, BreadCrumbItemControl) {

    function BreadCrumbControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$items = [];
      var that = this;
      options.items.forEach(function(item) {
        var itemControl = new BreadCrumbItemControl(item)
          .setBreadCrumb(that);
        that.$$items.push(itemControl);
      });
    }

    BreadCrumbControl.prototype.getItems = function() {
      return this.$$items;
    };

    HuoYunWidgetCore.ClassExtend(BreadCrumbControl, HuoYunWidgetCore.Control);

    return BreadCrumbControl;
  }
]);