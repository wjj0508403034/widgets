'use strict';

angular.module('huoyun.widget').factory("BreadCrumbOption", ["BreadCrumbItemOption",
  function(BreadCrumbItemOption) {

    function BreadCrumbOption(options) {
      this.items = [];
      if (Array.isArray(options.items)) {
        var that = this;
        options.items.forEach(function(item) {
          that.items.push(new BreadCrumbItemOption(item));
        });
      }
    }

    return BreadCrumbOption;
  }
]);

angular.module('huoyun.widget').factory("BreadCrumbItemOption", [
  function() {

    const props = ["name", "label", "onClick", "style", "icon"];

    function BreadCrumbItemOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });
    }

    return BreadCrumbItemOption;
  }
]);