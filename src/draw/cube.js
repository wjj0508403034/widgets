'use strict';

angular.module('huoyun.widget').factory("Cube", ["Point", "Line", "svgHelper", "Rect", "draw",
  function(Point, Line, svgHelper, Rect, drawProvider) {

    function Cube() {

      this.polyline = null;

      /**
       * 车尾矩形框
       */
      this.rect1 = null;

      /**
       * 整车矩形框
       */
      this.rect2 = null;

      /**
       * 车轮边线，辅助线1
       */
      this.guideline1 = null;

      /**
       * 辅助线2
       */
      this.guideline2 = null;

      this.verticalGuideline = null;
      this.horizontalGuideline = null;

      /**
       * 水平消失线
       */
      this.horizontalLine = null;

      /**
       * 水平消失线与车轮边线交点
       */
      this.horizontalLineCrossingPoint = null;

      /**
       * 第一条辅助线与整车矩形框交点
       */
      this.point9 = null;

      this.point10 = null;
      this.point11 = null;
    }

    Cube.prototype.setHorizontalLine = function(line) {
      this.horizontalLine = line;
      return this;
    };

    Cube.prototype.disableDrawing = function() {
      if (!this.svg) {
        throw new Error("Cube not set story board");
      }

      this.svg.off("mousedown");
      this.svg.off("mousemove");

      return this;
    };

    Cube.prototype.enableDrawing = function() {
      if (!this.svg) {
        throw new Error("Cube not set story board");
      }
      var that = this;
      this.svg.on("mousedown", function(event) {
        var point = new Point(event.offsetX, event.offsetY);
        if (!that.drawing) {
          that.drawing = "rect1";
          that.rect1 = new Rect();
          that.rect1.setSvg(that.svg).setStartPoint(point);
        } else {
          if (that.drawing === "rect1") {
            that.drawRect1(point, true);
          } else if (that.drawing === "rect2") {
            that.drawRect2(point, true);
          } else if (that.drawing === "guideline1") {
            that.drawGuideline1(point, true);
          }
        }
      });

      this.svg.on("mousemove", function(event) {
        var point = new Point(event.offsetX, event.offsetY);
        if (that.drawing === "rect1") {
          that.drawRect1(point, false);
          return;
        }

        if (that.drawing === "rect2") {
          that.drawRect2(point, false);
          return;
        }

        if (that.drawing === "guideline1") {
          that.drawGuideline1(point, false);
        }
      });
      return this;
    };

    Cube.prototype.setSvg = function(svg) {
      this.svg = svg;
      this.polyline = this.svg.polyline().fill(drawProvider.fill)
        .stroke(drawProvider.line.stroke);
      return this;
    };

    Cube.prototype.drawRect1 = function(point, isEnd) {
      this.rect1.setEndPoint(point).draw();
      if (isEnd) {
        this.drawing = "rect2";
        this.rect2 = new Rect();
        this.rect2.setSvg(this.svg).setStartPoint(this.rect1.startPoint);
      }
    };

    Cube.prototype.drawRect2 = function(point, isEnd) {
      this.rect2.setEndPoint(point).draw();
      if (isEnd) {
        this.drawing = "guideline1";
        this.guideline1 = new Line();
        this.guideline1.setSvg(this.svg).setStartPoint(this.rect1.getPoint2());
      }
    };

    Cube.prototype.drawGuideline1 = function(point, isEnd) {
      this.horizontalLineCrossingPoint = this.guideline1.setEndPoint(point).crossingPoint(this.horizontalLine);
      if (this.horizontalLineCrossingPoint) {
        this.guideline1.setEndPoint(this.horizontalLineCrossingPoint).draw();
        if (isEnd) {
          this.drawing = "end";
          this.drawGuideline2();
          this.drawHorizontalGuideline();
          this.drawVerticalGuideline();
          this.drawCube();
          this.hideGuideLinesAndPoints();
          this.disableDrawing();
        }
      } else if (!isEnd) {
        this.guideline1.draw();
      }
    };

    Cube.prototype.drawGuideline2 = function() {
      this.guideline2 = new Line(this.rect1.startPoint, this.horizontalLineCrossingPoint);
      this.guideline2.setSvg(this.svg).draw();
    };

    Cube.prototype.drawHorizontalGuideline = function() {
      var line2_of_rect2 = this.rect2.getLine2();
      this.point9 = line2_of_rect2.crossingPoint(this.guideline1);
      this.horizontalGuideline = Line.HorizontalLine(this.point9).setSvg(this.svg);
      this.point10 = this.horizontalGuideline.crossingPoint(this.guideline2);
      this.horizontalGuideline.setEndPoint(this.point10).draw();
    };

    Cube.prototype.drawVerticalGuideline = function() {
      var line2_of_rect2 = this.rect2.getLine3();
      this.verticalGuideline = Line.VerticalLine(this.point10).setSvg(this.svg);
      this.point11 = this.verticalGuideline.crossingPoint(line2_of_rect2);
      this.verticalGuideline.setEndPoint(this.point11).draw();
    };

    Cube.prototype.drawCube = function() {
      var points = [];
      points.push(this.rect1.getPoint1().value());
      points.push(this.rect1.getPoint2().value());
      points.push(this.rect1.getPoint3().value());
      points.push(this.rect1.getPoint4().value());
      points.push(this.rect1.getPoint1().value());
      points.push(this.rect1.getPoint4().value());
      points.push(this.point11.value());
      points.push(this.rect2.getPoint3().value());
      points.push(this.rect1.getPoint3().value());
      points.push(this.rect1.getPoint2().value());
      points.push(this.point9.value());
      points.push(this.rect2.getPoint3().value());
      points.push(this.point9.value());
      points.push(this.point10.value());
      points.push(this.point11.value());
      points.push(this.point10.value());
      points.push(this.rect1.getPoint1().value());
      this.polyline.plot(points);
    };

    Cube.prototype.hideGuideLinesAndPoints = function() {
      var style = { "display": "none" };
      this.rect1.style(style);
      this.rect2.style(style);
      this.guideline1.style(style);
      this.guideline2.style(style);
      this.verticalGuideline.style(style);
      this.horizontalGuideline.style(style);
    };

    return Cube;
  }
]);