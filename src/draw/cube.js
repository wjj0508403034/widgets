'use strict';

angular.module('huoyun.widget').factory("Cube", ["Point", "Line", "svgHelper", "Rect",
  function(Point, Line, svgHelper, Rect) {

    function Cube() {
      /**
       * 车尾矩形框
       */
      this.rect1 = null;

      /**
       * 整车矩形框
       */
      this.rect2 = null;

      /**
       * 车轮边线
       */
      this.line1 = null;

      /**
       * 水平消失线
       */
      this.horizontalLine = null;

      /**
       * 水平消失线与车轮边线交点
       */
      this.horizontalLineCrossingPoint = null;
    }

    Cube.prototype.setHorizontalLine = function(line) {
      this.horizontalLine = line;
    };

    Cube.prototype.setSvg = function(svg) {
      this.svg = svg;
      var that = this;

      svg.mousedown(function(event) {
        var point = new Point(event.offsetX, event.offsetY);
        if (!that.drawing) {
          that.drawing = "rect1";
          that.rect1 = new Rect();
          that.rect1.setSvg(that.svg);
          that.rect1.startPoint = point;
        } else {
          if (that.drawing === "rect1") {
            that.rect1.endToPoint(point);
            that.drawing = "rect2";
            that.rect2 = new Rect();
            that.rect2.setSvg(that.svg);
            that.rect2.startPoint = that.rect1.startPoint;
          } else if (that.drawing === "rect2") {
            that.rect2.endToPoint(point);
            that.drawing = "line1";
            that.line1 = new Line();
            that.line1.setSvg(that.svg);
            that.line1.setStartPoint(that.rect1.getSecondPoint());
          } else if (that.drawing === "line1") {
            if (that.line1.canCrossWithLine(that.horizontalLine, point)) {
              that.drawing = "end";
              that.line1.drawToCrossLine(that.horizontalLine, point);
            }
          }
        }
      });

      svg.mousemove(function(event) {
        var point = new Point(event.offsetX, event.offsetY);
        if (that.drawing === "rect1") {
          that.rect1.drawToPoint(point);
          return;
        }

        if (that.drawing === "rect2") {
          that.rect2.drawToPoint(point);
          return;
        }

        if (that.drawing === "line1") {
          that.line1.drawToCrossLine(that.horizontalLine, point);
        }

        // if (that.drawing) {
        //   var point = new Point(event.offsetX, event.offsetY);
        //   var crossingPoint = that.getHorizontalLineCrossingPoint(point);
        //   that.wire(crossingPoint || point);
        // }
      });
    };

    Cube.prototype.getHorizontalLineCrossingPoint = function(point) {
      var line = new Line(this.point1, point);
      return this.horizontalLine.crossingPoint(line);
    };

    Cube.prototype.wire = function(point) {
      if (this.line1) {
        svgHelper.updateLine(this.line1, this.point1, point);
      } else {
        this.line1 = svgHelper.drawLineByPoints(this.svg, this.point1, point);
      }
    };

    return Cube;
  }
]);