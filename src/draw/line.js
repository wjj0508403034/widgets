'use strict';

angular.module('huoyun.widget').factory("Line", ["Point", "draw", function(Point, drawProvider) {

  function Line(startPoint, endPoint) {
    this.startPoint = null;
    this.endPoint = null;
    this.k = null;
    this.svgline = null;

    if (startPoint) {
      this.setStartPoint(startPoint);
    }

    if (endPoint) {
      this.setEndPoint(endPoint);
    }
  }

  Line.prototype.setStartPoint = function(point) {
    this.startPoint = point;
  };

  Line.prototype.setSvg = function(svg) {
    this.svg = svg;
  };

  Line.prototype.setEndPoint = function(point) {
    if (!this.startPoint) {
      throw new Error("Must set line start point first.");
    }
    this.endPoint = point;
    this.k = 0;
    if (this.startPoint.x !== this.endPoint.x) {
      this.k = (this.endPoint.y - this.startPoint.y) * 1.0 / (this.endPoint.x - this.startPoint.x);
    }
    this.b = this.startPoint.y - this.k * this.startPoint.x;
  };

  Line.prototype.drawToCrossLine = function(line, point) {
    this.setEndPoint(point);
    var crossingPoint = this.crossingPoint(line);
    if (crossingPoint) {
      this.setEndPoint(crossingPoint);
    }

    if (!this.svgline) {
      this.svgline = this.svg.line(this.value()).stroke(drawProvider.line.stroke);
    } else {
      this.svgline.plot(this.value());
    }
  };

  Line.prototype.canCrossWithLine = function(line, point) {
    this.setEndPoint(point);
    return !!this.crossingPoint(line);
  };

  Line.prototype.formula = function() {
    return `y=${this.k}x+${this.b}`;
  };

  Line.prototype.inline = function(point) {
    return (this.endPoint.y - this.startPoint.y) * (point.x - this.startPoint.x) ===
      (this.endPoint.x - this.startPoint.x) * (point.y - this.startPoint.y);
  };

  Line.prototype.crossingPoint = function(line2) {
    if (this.k === line2.k) {
      return;
    }

    var x = (line2.b - this.b) * 1.0 / (this.k - line2.k);
    var y = (this.k * line2.b - line2.k * this.b) * 1.0 / (this.k - line2.k);
    return new Point(x, y);
  };

  Line.prototype.value = function() {
    return [this.startPoint.value(), this.endPoint.value()];
  };

  return Line;
}]);