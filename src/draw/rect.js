'use strict';

angular.module('huoyun.widget').factory("Rect", ["Point", "draw", "Line",
  function(Point, drawProvider, Line) {

    /**
     * 矩形
     *   point3(endPoint) line3        point4
     *           ==========================
     *           =                        =
     *           =                        =
     *   line2   =                        =  line4
     *           =                        =
     *           ==========================
     *        point2        line1        point1(startPoint)
     */
    function Rect() {
      this.startPoint = null;
      this.endPoint = null;
      this.polyline = null;
    }

    Rect.prototype.setSvg = function(svg) {
      this.svg = svg;
      this.polyline = this.svg.polyline()
        .fill(drawProvider.fill)
        .stroke(drawProvider.line.stroke);
      return this;
    };

    Rect.prototype.style = function(style) {
      if (!this.polyline) {
        throw new Error("Line not set story board");
      }

      this.polyline.style(style);
      return this;
    };

    Rect.prototype.remove = function() {
      if (this.polyline) {
        this.polyline.remove();
      }
    };

    Rect.prototype.setStartPoint = function(point) {
      this.startPoint = point;
      return this;
    };

    Rect.prototype.setEndPoint = function(point) {
      this.endPoint = point;
      return this;
    };

    Rect.prototype.draw = function() {
      var points = [];
      points.push(this.getPoint1().value());
      points.push(this.getPoint2().value());
      points.push(this.getPoint3().value());
      points.push(this.getPoint4().value());
      points.push(this.getPoint1().value());
      this.polyline.plot(points);
      return this;
    };

    Rect.prototype.getPoint1 = function() {
      return this.startPoint;
    };

    Rect.prototype.getPoint2 = function() {
      return new Point(this.endPoint.x, this.startPoint.y);
    };

    Rect.prototype.getPoint3 = function() {
      return this.endPoint;
    };

    Rect.prototype.getPoint4 = function() {
      return new Point(this.startPoint.x, this.endPoint.y);
    };

    Rect.prototype.getLine2 = function() {
      return new Line(this.getPoint2(), this.getPoint3());
    };

    Rect.prototype.getLine3 = function() {
      return new Line(this.getPoint3(), this.getPoint4());
    };

    return Rect;
  }
]);