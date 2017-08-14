'use strict';

angular.module('huoyun.widget').factory("Rect", ["Point", "draw",
  function(Point, drawProvider) {

    function Rect() {
      this.startPoint = null;
      this.endPoint = null;
      this.polyline = null;
    }

    Rect.prototype.setSvg = function(svg) {
      this.svg = svg;
    };

    Rect.prototype.drawToPoint = function(point) {
      var pointArray = this.getPointArray(this.startPoint, point);
      if (!this.polyline) {
        this.polyline = this.svg.polyline(pointArray)
          .fill(drawProvider.fill)
          .stroke(drawProvider.line.stroke);
      } else {
        this.polyline.plot(pointArray);
      }
    };

    Rect.prototype.endToPoint = function(point) {
      this.endPoint = point;
      this.polyline.plot(this.getPointArray(this.startPoint, this.endPoint));
    };

    Rect.prototype.getPointArray = function(startPoint, endPoint) {
      return [
        startPoint.value(), [startPoint.x, endPoint.y],
        endPoint.value(), [endPoint.x, startPoint.y],
        startPoint.value()
      ];
    };

    Rect.prototype.getSecondPoint = function() {
      return new Point(this.endPoint.x, this.startPoint.y);
    };

    return Rect;
  }
]);