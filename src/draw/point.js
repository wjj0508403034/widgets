'use strict';

angular.module('huoyun.widget').factory("Point", [function() {

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.value = function() {
    return [this.x, this.y];
  };

  Point.prototype.getData = function() {
    return {
      x: this.x,
      y: this.y
    };
  };

  Point.prototype.add = function(x, y) {
    return new Point(this.x + x, this.y + y);
  };

  Point.DeviationCalculation = function(point1, point2, k) {
    var x = point1.x + k * (point2.x - point1.x);
    var y = point1.y + k * (point2.y - point1.y);
    return new Point(x, y);
  };

  return Point;
}]);