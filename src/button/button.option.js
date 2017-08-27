'use strict';

angular.module('huoyun.widget').factory("ButtonOption", [function() {

  const props = ["name", "icon", "label", "visibility", "disabled", "appendClass", "style", "onClick"];

  function ButtonOption(options) {
    var that = this;
    props.forEach(function(prop) {
      that[prop] = options[prop];
    });
  }

  return ButtonOption;
}]);