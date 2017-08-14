'use strict';

angular.module('huoyun.widget').factory("Point", [function() {

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.value = function() {
    return [this.x, this.y];
  };

  Point.prototype.jsonValue = function() {
    return {
      x: this.x,
      y: this.y
    };
  };

  Point.prototype.add = function(x, y) {
    return new Point(this.x + x, this.y + y);
  };



  return Point;
}]);