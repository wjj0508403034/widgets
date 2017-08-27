'use strict';

angular.module('huoyun.widget').factory("NavOption", ["NavItemOption",
  function(NavItemOption) {

    function NavOption(options) {
      this.items = [];
      if (Array.isArray(options.items)) {
        var that = this;
        options.items.forEach(function(item) {
          that.items.push(new NavItemOption(item));
        });
      }
    }

    NavOption.prototype.setSelected = function(name) {
      this.items.forEach(function(item) {
        if (item.name === name) {
          item.setSelected();
        } else {
          item.setUnSelected();
        }
      })
    };

    return NavOption;
  }
]);

angular.module('huoyun.widget').factory("NavItemOption", [
  function() {

    const props = ["name", "label", "onClick", "visibility", "style", "selected"];

    function NavItemOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });
    }

    NavItemOption.prototype.setSelected = function() {
      this.selected = true;
    };

    NavItemOption.prototype.setUnSelected = function() {
      this.selected = false;
    };

    return NavItemOption;
  }
]);