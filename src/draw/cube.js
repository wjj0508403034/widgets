'use strict';

angular.module('huoyun.widget').factory("Cube", ["Point", "Line", "Rect", "draw", "Timeline", "Quadrilateral",
  function(Point, Line, Rect, drawProvider, Timeline, Quadrilateral) {

    function Cube() {
      this.timeline = new Timeline();
      this.svgGroup = null;
      this.polyline = null;

      /**
       * 立方体6个面，分别定义为1,2,3,4,5,6
       */
      this.surface1 = null;
      this.surface2 = null;
      this.surface3 = null;
      this.surface4 = null;
      this.surface5 = null;
      this.surface6 = null;

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

    Cube.prototype.add = function(obj) {
      if (obj && typeof obj.getSvgObj === "function") {
        this.svgGroup.add(obj.getSvgObj());
      }
    };

    Cube.prototype.setSvg = function(svg) {
      this.svg = svg;
      var parentBox = this.svg.rbox();
      this.svgGroup = this.svg.group();
      this.svgGroup.path(`M0,0L${parentBox.width},${parentBox.height}`);
      this.polyline = this.svg.polyline().fill(drawProvider.randomColor())
        .stroke(drawProvider.line.stroke);
      this.svgGroup.add(this.polyline);

      var that = this;
      [1, 2, 3, 4, 5, 6].forEach(function(index) {
        var color = drawProvider.randomColor();
        var propName = `surface${index}`;
        that[propName] = new Quadrilateral();
        that[propName].setSvg(that.svg).setFillColor(color);
        that.add(that[propName]);
      })
      return this;
    };

    Cube.prototype.setTime = function(time) {
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
          this.removeGuideLinesAndPoints();
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

    Cube.prototype.getData = function() {
      var data = [];

      var that = this;
      [1, 2, 3, 4, 5, 6].forEach(function(index) {
        data.push(that[`surface${index}`].getData());
      });

      return data;
    };

    Cube.prototype.drawCube = function() {
      this.surface1.setPoints(
        this.rect1.getPoint1(),
        this.rect1.getPoint2(),
        this.rect1.getPoint3(),
        this.rect1.getPoint4()
      );

      this.surface2.setPoints(
        this.rect1.getPoint1(),
        this.point10,
        this.point11,
        this.rect1.getPoint4()
      );

      this.surface3.setPoints(
        this.rect1.getPoint4(),
        this.rect1.getPoint3(),
        this.rect2.getPoint3(),
        this.point11
      );

      this.surface4.setPoints(
        this.point10,
        this.point9,
        this.rect2.getPoint3(),
        this.point11
      );

      this.surface5.setPoints(
        this.rect1.getPoint2(),
        this.point9,
        this.rect2.getPoint3(),
        this.rect1.getPoint3(),
      );

      this.surface6.setPoints(
        this.rect1.getPoint1(),
        this.rect1.getPoint2(),
        this.point9,
        this.point10
      );

      var that = this;
      [1, 2, 3, 4, 5, 6].forEach(function(index) {
        that[`surface${index}`].draw();
      });

      console.log(this.getData());
    };

    Cube.prototype.removeGuideLinesAndPoints = function() {
      this.rect1.remove();
      this.rect2.remove();
      this.guideline1.remove();
      this.guideline2.remove();
      this.verticalGuideline.remove();
      this.horizontalGuideline.remove();
    };

    return Cube;
  }
]);