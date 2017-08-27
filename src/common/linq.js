'use strict';

angular.module('huoyun.widget').factory("Linq", function() {

  function Linq(data) {
    if (!Array.isArray(data)) {
      throw new Error("data must be array");
    }

    this.data = data;
  }

  Linq.prototype.findItem = function(condition) {
    if (typeof condition !== "function") {
      throw new Error("condition must be function");
    }
    for (var index = 0; index < this.data.length; index++) {
      if (condition(this.data[index], index, this.data)) {
        return this.data[index];
      }
    }
  };

  return Linq;
});