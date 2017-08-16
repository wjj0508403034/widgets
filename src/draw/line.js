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
    return this;
  };

  Line.prototype.setSvg = function(svg) {
    this.svg = svg;
    this.svgline = this.svg.line().stroke(drawProvider.line.stroke);
    return this;
  };

  Line.prototype.style = function(style) {
    if (!this.svg) {
      throw new Error("Line not set story board");
    }

    this.svgline.style(style);
    return this;
  };

  Line.prototype.setEndPoint = function(point) {
    if (!this.startPoint) {
      throw new Error("Must set line start point first.");
    }
    this.endPoint = point;
    this.k = 0;
    if (this.startPoint.x !== this.endPoint.x) {
      this.k = (this.endPoint.y - this.startPoint.y) * 1.0 / (this.endPoint.x - this.startPoint.x);
    } else {
      this.k = Infinity;
    }
    this.b = this.startPoint.y - this.k * this.startPoint.x;
    return this;
  };

  Line.prototype.valid = function() {
    if (!this.startPoint) {
      throw new Error("Line not set start point");
    }

    if (!this.endPoint) {
      throw new Error("Line not set end point");
    }

    if (!this.svg) {
      throw new Error("Line not set story board");
    }

    return this;
  };

  Line.prototype.draw = function() {
    this.valid().svgline.plot(this.value());
    return this;
  };

  Line.prototype.text = function(text) {
    this.valid();
    var textPosition = this.startPoint.add(0, -10).getData();
    this.svg.plain(text).font(drawProvider.text.font).fill(drawProvider.text.fill).attr(textPosition);
    return this;
  };

  Line.prototype.formula = function() {
    return `y=${this.k}x+${this.b}`;
  };

  Line.prototype.remove = function() {
    if (this.svgline) {
      this.svgline.remove();
    }
  };

  Line.prototype.inline = function(point) {
    return (this.endPoint.y - this.startPoint.y) * (point.x - this.startPoint.x) ===
      (this.endPoint.x - this.startPoint.x) * (point.y - this.startPoint.y);
  };

  Line.prototype.crossingPoint = function(line2) {
    if (this.k === line2.k) {
      return;
    }
    var x = null;
    var y = null;
    if (this.k === Infinity) {
      x = this.startPoint.x;
      y = line2.k * x + line2.b;
      return new Point(x, y);
    }

    if (line2.k === Infinity) {
      x = line2.startPoint.x;
      y = this.k * x + this.b;
      return new Point(x, y);
    }

    x = (line2.b - this.b) * 1.0 / (this.k - line2.k);
    y = (this.k * line2.b - line2.k * this.b) * 1.0 / (this.k - line2.k);
    return new Point(x, y);
  };

  Line.prototype.value = function() {
    return [this.startPoint.value(), this.endPoint.value()];
  };

  Line.HorizontalLine = function(point) {
    return new Line(point, point.add(10, 0));
  };

  Line.VerticalLine = function(point) {
    return new Line(point, point.add(0, 10));
  };

  return Line;
}]);