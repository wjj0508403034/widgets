'use strict';

angular.module('huoyun.widget').factory("Point", [function() {

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.value = function() {
    return [this.x, this.y];
  };

  return Point;
}]);