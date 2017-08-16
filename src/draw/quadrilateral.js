'use strict';

/**
 * 四边形，不一定是矩形
 */
angular.module('huoyun.widget').factory("Quadrilateral", ["draw",
  function(drawProvider) {

    function Quadrilateral() {
      this.polyline = null;
    }

    Quadrilateral.prototype.setPoints = function(point1, point2, point3, point4) {
      var that = this;
      var points = arguments;
      [1, 2, 3, 4].forEach(function(index) {
        that[`point${index}`] = points[index - 1];
      });
      return this;
    };

    Quadrilateral.prototype.setSvg = function(svg) {
      this.svg = svg;
      this.polyline = this.svg.polyline()
        .fill(drawProvider.fill)
        .stroke(drawProvider.line.stroke);
      return this;
    };

    Quadrilateral.prototype.setFillColor = function(color) {
      this.polyline.fill(color);
      return this;
    };

    Quadrilateral.prototype.getSvgObj = function() {
      return this.polyline;
    };

    Quadrilateral.prototype.draw = function() {
      var that = this;
      var points = [];
      [1, 2, 3, 4, 1].forEach(function(index) {
        points.push(that[`point${index}`].value());
      });
      this.polyline.plot(points);
      return this;
    };

    Quadrilateral.prototype.getData = function() {
      var data = [];

      var that = this;
      [1, 2, 3, 4].forEach(function(index) {
        data.push(that[`point${index}`].getData());
      });

      return data;
    };

    return Quadrilateral;
  }
]);