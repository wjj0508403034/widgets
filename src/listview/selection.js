'use strict';

angular.module('huoyun.widget').factory("Selection", [function() {

  const Modes = {
    None: "none",
    Single: "single",
    Multiple: "multiple"
  };

  function Selection(val) {
    this.$$value = Modes.Single;
    if (typeof val === "string") {
      if (val.toLowerCase() === Modes.Multiple) {
        this.$$value = Modes.Multiple;
      }
    }
  }

  Selection.prototype.getValue = function() {
    return this.$$value.toLowerCase();
  };

  Selection.prototype.isSingle = function() {
    return this.getValue() === Modes.Single;
  };

  Selection.prototype.isMultiple = function() {
    return this.getValue() === Modes.Multiple;
  };

  Selection.Modes = Modes;

  return Selection;
}]);