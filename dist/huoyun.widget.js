'use strict';

angular.module('huoyun.widget', ['ngDialog']);

angular.module('huoyun.widget').provider("display", function () {

  this.date = "yyyy-MM-dd";
  this.datetime = "yyyy-MM-dd HH:mm";

  /**
   * options
   *  - date
   *  - datetime
   */
  this.config = function (options) {
    var that = this;
    ["date", "datetime"].forEach(function (prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
  };

  this.$get = function () {
    return this;
  };
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

angular.module('huoyun.widget').factory("widgetsHelper", function () {

  String.prototype.pad = function (width) {
    var temp = this.split(".");
    if (temp[0].length < width) {
      temp[0] = new Array(width - temp[0].length + 1).join("0") + temp[0];
    }

    return temp.join(".");
  };

  return {

    visibility: function visibility(obj) {
      if (typeof obj.visibility === "boolean") {
        return obj.visibility;
      }

      if (typeof obj.visibility === "function") {
        return obj.visibility.apply(obj);
      }

      return true;
    },

    disabled: function disabled(obj) {
      if (typeof obj.disabled === "boolean") {
        return obj.disabled;
      }

      if (typeof obj.disabled === "function") {
        return obj.disabled.apply(obj);
      }

      return false;
    },

    style: function style(obj) {
      if (_typeof(obj.style) === "object") {
        return obj.style;
      }

      if (typeof obj.style === "function") {
        return obj.style.apply(obj);
      }
    },

    durationFormat: function durationFormat(time) {
      var hour = 0;
      var minuter = 0;
      var second = 0;

      if (time) {
        if (time < 60) {
          second = time;
        } else {
          second = time % 60;
          var temp = time / 60;
          if (temp < 60) {
            minuter = temp;
          } else {
            hour = temp / 60;
            minuter = temp % 60;
          }
        }
      }

      return hour.toFixed(0).pad(2) + ':' + minuter.toFixed(0).pad(2) + ':' + second.toFixed(3).pad(2);
    }
  };
});
'use strict';

/*
 * https://github.com/likeastore/ngDialog
 */

angular.module('huoyun.widget').config(["ngDialogProvider", function (ngDialogProvider) {
  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default huoyun-dialog-container',
    showClose: false,
    closeByDocument: false,
    closeByEscape: false
  });
}]);

angular.module('huoyun.widget').controller("ConfirmDialogController", ["$scope", function ($scope) {
  $scope.onCancelButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onCancelButtonClicked === "function") {
      $scope.ngDialogData.onCancelButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('Cancel');
    }
  };

  $scope.onConfirmButtonClicked = function () {
    if ($scope.ngDialogData && typeof $scope.ngDialogData.onConfirmButtonClicked === "function") {
      $scope.ngDialogData.onConfirmButtonClicked.apply(this);
    } else {
      $scope.closeThisDialog('OK');
    }
  };
}]);

angular.module('huoyun.widget').factory("Dialog", ['$q', 'ngDialog', function ($q, ngDialog) {

  return {
    showError: function showError(message) {
      return this.showConfirm({
        title: "错误",
        content: message,
        cancel: {
          visibility: false
        },
        confirm: {
          text: "知道了"
        }
      });
    },

    showConfirm: function showConfirm(options) {
      var dialogOptions = {
        template: "dialog/dialog.html",
        controller: "ConfirmDialogController",
        appendClassName: options.appendClassName || "",
        closeByDocument: !!options.closeByDocument,
        data: {
          title: options.title || "无标题",
          content: options.content,
          templateUrl: options.templateUrl,
          confirmButtonText: options.confirm && options.confirm.text || "确定",
          cancelButtonText: options.cancel && options.cancel.text || "取消",
          confirmButtonVisibility: !(options.confirm && options.confirm.visibility === false),
          cancelButtonVisibility: !(options.cancel && options.cancel.visibility === false),
          params: options.params
        }
      };

      var dtd = $q.defer();

      ngDialog.open(dialogOptions).closePromise.then(function (data) {
        if (data.value === "OK") {
          dtd.resolve();
        } else {
          dtd.reject();
        }
      });

      return dtd.promise;
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsPagination', function () {
  return {
    restrict: 'A',
    scope: {
      pageData: "=",
      onPagingChanged: "&"
    },
    templateUrl: 'table/pagination.html',
    link: function link($scope, ele, attrs) {
      var MAXNumberCount = 5;
      $scope.numbers = [];

      $scope.$watch("pageData", function (newValue, oldValue) {
        if (newValue) {
          refresh(newValue);
        } else {
          $scope.numbers = [];
        }
      });

      $scope.onPagingClicked = function (pageIndex) {
        $scope.onPagingChanged({
          pageIndex: pageIndex
        });
      };

      function refresh(pageData) {
        $scope.numbers = [];
        var startIndex = parseInt(pageData.number / MAXNumberCount) * MAXNumberCount;
        var endIndex = startIndex + MAXNumberCount;
        if (endIndex > pageData.totalPages) {
          endIndex = pageData.totalPages;
        }
        for (var index = startIndex; index < endIndex; index++) {
          $scope.numbers.push(index);
        }
      }
    }
  };
});
'use strict';

angular.module('huoyun.widget').factory("TableSelection", function () {

  var Modes = {
    None: "None",
    Single: "Single",
    Multiple: "Multiple"
  };

  function Selection(mode) {
    this.mode = Modes.None;

    if (typeof mode === "string") {
      if (mode.toLowerCase() === "single") {
        this.mode = Modes.Single;
      } else if (mode.toLowerCase() === "multiple") {
        this.mode = Modes.Multiple;
        return;
      }
    }
  }

  Selection.Modes = Modes;

  return Selection;
});

/**
 * options
 *  - title
 *  - buttons
 *    - name
 *    - icon
 *    - label
 *    - visibility
 *    - disabled
 *    - style
 *    - appendClass
 *  - columns
 *    - name
 *    - label
 *    - type
 *    - visibility
 *    - headerTemplateUrl
 *    - templateUrl
 *    - style
 *  - selectionMode //None,Single,Multiple
 * 
 * dataSource
 *  - content
 *  - first
 *  - last
 *  - number
 *  - numberOfElements
 *  - size
 *  - sort
 *  - totalElements
 *  - totalPages
 */
angular.module('huoyun.widget').directive('widgetsTable', ["$log", "display", "widgetsHelper", "TableSelection", function ($log, displayProvider, widgetsHelper, TableSelection) {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      source: "=",
      onRowClicked: "&",
      onPagingChanged: "&"
    },
    templateUrl: 'table/table.html',
    link: function link($scope, ele, attrs) {

      $scope.columnVisibility = function (column) {
        return widgetsHelper.visibility(column);
      };

      $scope.columnStyle = function (column) {
        return widgetsHelper.style(column);
      };

      $scope.buttonVisibility = function (button) {
        return widgetsHelper.visibility(button);
      };

      $scope.buttonDisabled = function (button) {
        return widgetsHelper.disabled(button);
      };

      $scope.buttonStyle = function (button) {
        return widgetsHelper.style(button);
      };

      $scope.buttonClass = function (button) {
        return button.appendClass || "btn-default";
      };

      $scope.onButtonClicked = function (button) {
        if (typeof button.onClick === "function") {
          button.onClick.apply(button);
        } else {
          $log.warn("Button no click handler.", button);
        }
      };

      $scope.getDateFilter = function () {
        return displayProvider.date;
      };

      $scope.onLineClicked = function (lineData, index) {
        var selection = new TableSelection($scope.options.selectionMode);
        if (selection.mode === TableSelection.Modes.Single) {
          lineData.$$selected = true;
          $scope.source.content.forEach(function (lineItem) {
            if (lineItem !== lineData) {
              lineItem.$$selected = false;
            }
          });
          $scope.$emit("selectChanged", lineData);
        } else if (selection.mode === TableSelection.Modes.Multiple) {
          lineData.$$selected = !lineData.$$selected;
          var selectedItems = $scope.source.content.filter(function (lineItem) {
            return lineItem.$$selected;
          });
          $scope.$emit("selectChanged", selectedItems);
        } else {
          $scope.onRowClicked({
            lineData: lineData,
            index: index
          });
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory('Tip', ['$templateCache', '$compile', '$rootScope', '$timeout', function ($templateCache, $compile, $rootScope, $timeout) {

  return {
    show: function show(message) {
      var id = "tip-" + new Date().getTime();
      var $scope = $rootScope.$new();
      var template = $templateCache.get('tip/tip.html');
      $scope.message = message;
      var $tip = $compile(template)($scope);
      $tip.attr("id", id);
      $('body').append($tip);
      $tip.show();
      var timer = setTimeout(function () {
        $tip.fadeOut(300, function () {
          $tip.remove();
        });
        clearTimeout(timer);
      }, 1000);
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Cube", ["Point", "Line", "Rect", "draw", "Timeline", "Quadrilateral", function (Point, Line, Rect, drawProvider, Timeline, Quadrilateral) {

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

  Cube.prototype.setHorizontalLine = function (line) {
    this.horizontalLine = line;
    return this;
  };

  Cube.prototype.disableDrawing = function () {
    if (!this.svg) {
      throw new Error("Cube not set story board");
    }

    this.svg.off("mousedown");
    this.svg.off("mousemove");

    return this;
  };

  Cube.prototype.enableDrawing = function () {
    if (!this.svg) {
      throw new Error("Cube not set story board");
    }
    var that = this;
    this.svg.on("mousedown", function (event) {
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

    this.svg.on("mousemove", function (event) {
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

  Cube.prototype.add = function (obj) {
    if (obj && typeof obj.getSvgObj === "function") {
      this.svgGroup.add(obj.getSvgObj());
    }
  };

  Cube.prototype.setSvg = function (svg) {
    this.svg = svg;
    var parentBox = this.svg.rbox();
    this.svgGroup = this.svg.group();
    this.svgGroup.path('M0,0L' + parentBox.width + ',' + parentBox.height);
    this.polyline = this.svg.polyline().fill(drawProvider.randomColor()).stroke(drawProvider.line.stroke);
    this.svgGroup.add(this.polyline);

    var that = this;
    [1, 2, 3, 4, 5, 6].forEach(function (index) {
      var color = drawProvider.randomColor();
      var propName = 'surface' + index;
      that[propName] = new Quadrilateral();
      that[propName].setSvg(that.svg).setFillColor(color);
      that.add(that[propName]);
    });
    return this;
  };

  Cube.prototype.setTime = function (time) {
    return this;
  };

  Cube.prototype.drawRect1 = function (point, isEnd) {
    this.rect1.setEndPoint(point).draw();
    if (isEnd) {
      this.drawing = "rect2";
      this.rect2 = new Rect();
      this.rect2.setSvg(this.svg).setStartPoint(this.rect1.startPoint);
    }
  };

  Cube.prototype.drawRect2 = function (point, isEnd) {
    this.rect2.setEndPoint(point).draw();
    if (isEnd) {
      this.drawing = "guideline1";
      this.guideline1 = new Line();
      this.guideline1.setSvg(this.svg).setStartPoint(this.rect1.getPoint2());
    }
  };

  Cube.prototype.drawGuideline1 = function (point, isEnd) {
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

  Cube.prototype.drawGuideline2 = function () {
    this.guideline2 = new Line(this.rect1.startPoint, this.horizontalLineCrossingPoint);
    this.guideline2.setSvg(this.svg).draw();
  };

  Cube.prototype.drawHorizontalGuideline = function () {
    var line2_of_rect2 = this.rect2.getLine2();
    this.point9 = line2_of_rect2.crossingPoint(this.guideline1);
    this.horizontalGuideline = Line.HorizontalLine(this.point9).setSvg(this.svg);
    this.point10 = this.horizontalGuideline.crossingPoint(this.guideline2);
    this.horizontalGuideline.setEndPoint(this.point10).draw();
  };

  Cube.prototype.drawVerticalGuideline = function () {
    var line2_of_rect2 = this.rect2.getLine3();
    this.verticalGuideline = Line.VerticalLine(this.point10).setSvg(this.svg);
    this.point11 = this.verticalGuideline.crossingPoint(line2_of_rect2);
    this.verticalGuideline.setEndPoint(this.point11).draw();
  };

  Cube.prototype.getData = function () {
    var data = [];

    var that = this;
    [1, 2, 3, 4, 5, 6].forEach(function (index) {
      data.push(that['surface' + index].getData());
    });

    return data;
  };

  Cube.prototype.drawCube = function () {
    this.surface1.setPoints(this.rect1.getPoint1(), this.rect1.getPoint2(), this.rect1.getPoint3(), this.rect1.getPoint4());

    this.surface2.setPoints(this.rect1.getPoint1(), this.point10, this.point11, this.rect1.getPoint4());

    this.surface3.setPoints(this.rect1.getPoint4(), this.rect1.getPoint3(), this.rect2.getPoint3(), this.point11);

    this.surface4.setPoints(this.point10, this.point9, this.rect2.getPoint3(), this.point11);

    this.surface5.setPoints(this.rect1.getPoint2(), this.point9, this.rect2.getPoint3(), this.rect1.getPoint3());

    this.surface6.setPoints(this.rect1.getPoint1(), this.rect1.getPoint2(), this.point9, this.point10);

    var that = this;
    [1, 2, 3, 4, 5, 6].forEach(function (index) {
      that['surface' + index].draw();
    });

    console.log(this.getData());
  };

  Cube.prototype.removeGuideLinesAndPoints = function () {
    this.rect1.remove();
    this.rect2.remove();
    this.guideline1.remove();
    this.guideline2.remove();
    this.verticalGuideline.remove();
    this.horizontalGuideline.remove();
  };

  return Cube;
}]);
'use strict';

angular.module('huoyun.widget').provider("draw", function () {

  this.line = {
    stroke: {
      color: '#f06',
      width: 1,
      linecap: 'round'
    }
  };

  this.fill = "rgba(109, 33, 33, 0.25)";

  this.text = {
    font: {
      size: 18,
      family: 'Verdana'
    },
    fill: "#f06"
  };

  this.fillColors = ["rgba(109, 33, 33, 0.25)", "rgba(46, 109, 164, 0.25)", "rgba(169, 68, 66, 0.25)", "rgba(0, 188, 212, 0.25)", "rgba(255, 152, 0, 0.25)", "rgba(255, 87, 34, 0.25)", "rgba(255, 235, 59, 0.25)", "rgba(76, 175, 80, 0.25)", "rgba(0, 150, 136, 0.25)", "rgba(121, 85, 72, 0.25)", "rgba(63, 81, 181, 0.25)", "rgba(156, 39, 176, 0.25)"];

  this.randomColor = function () {
    var randomIndex = Math.round(Math.random() * (Object.keys(this.fillColors).length - 1));
    return this.fillColors[Object.keys(this.fillColors)[randomIndex]];
  };

  this.$get = function () {
    return this;
  };
});
'use strict';

angular.module('huoyun.widget').factory("Draw", ["Point", "Line", "Cube", "Quadrilateral", function (Point, Line, Cube, Quadrilateral) {

  return {
    Point: Point,
    Line: Line,
    Cube: Cube,
    Quadrilateral: Quadrilateral
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Line", ["Point", "draw", function (Point, drawProvider) {

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

  Line.prototype.setStartPoint = function (point) {
    this.startPoint = point;
    return this;
  };

  Line.prototype.setSvg = function (svg) {
    this.svg = svg;
    this.svgline = this.svg.line().stroke(drawProvider.line.stroke);
    return this;
  };

  Line.prototype.style = function (style) {
    if (!this.svg) {
      throw new Error("Line not set story board");
    }

    this.svgline.style(style);
    return this;
  };

  Line.prototype.setEndPoint = function (point) {
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

  Line.prototype.valid = function () {
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

  Line.prototype.draw = function () {
    this.valid().svgline.plot(this.value());
    return this;
  };

  Line.prototype.text = function (text) {
    this.valid();
    var textPosition = this.startPoint.add(0, -10).jsonValue();
    this.svg.plain(text).font(drawProvider.text.font).fill(drawProvider.text.fill).attr(textPosition);
    return this;
  };

  Line.prototype.formula = function () {
    return 'y=' + this.k + 'x+' + this.b;
  };

  Line.prototype.remove = function () {
    if (this.svgline) {
      this.svgline.remove();
    }
  };

  Line.prototype.inline = function (point) {
    return (this.endPoint.y - this.startPoint.y) * (point.x - this.startPoint.x) === (this.endPoint.x - this.startPoint.x) * (point.y - this.startPoint.y);
  };

  Line.prototype.crossingPoint = function (line2) {
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

  Line.prototype.value = function () {
    return [this.startPoint.value(), this.endPoint.value()];
  };

  Line.HorizontalLine = function (point) {
    return new Line(point, point.add(10, 0));
  };

  Line.VerticalLine = function (point) {
    return new Line(point, point.add(0, 10));
  };

  return Line;
}]);
'use strict';

angular.module('huoyun.widget').factory("Point", [function () {

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.value = function () {
    return [this.x, this.y];
  };

  Point.prototype.jsonValue = function () {
    return {
      x: this.x,
      y: this.y
    };
  };

  Point.prototype.getData = function () {
    return {
      x: this.x,
      y: this.y
    };
  };

  Point.prototype.add = function (x, y) {
    return new Point(this.x + x, this.y + y);
  };

  return Point;
}]);
'use strict';

/**
 * 四边形，不一定是矩形
 */

angular.module('huoyun.widget').factory("Quadrilateral", ["draw", function (drawProvider) {

  function Quadrilateral() {
    this.polyline = null;
  }

  Quadrilateral.prototype.setPoints = function (point1, point2, point3, point4) {
    var that = this;
    var points = arguments;
    [1, 2, 3, 4].forEach(function (index) {
      that['point' + index] = points[index - 1];
    });
    return this;
  };

  Quadrilateral.prototype.setSvg = function (svg) {
    this.svg = svg;
    this.polyline = this.svg.polyline().fill(drawProvider.fill).stroke(drawProvider.line.stroke);
    return this;
  };

  Quadrilateral.prototype.setFillColor = function (color) {
    this.polyline.fill(color);
    return this;
  };

  Quadrilateral.prototype.getSvgObj = function () {
    return this.polyline;
  };

  Quadrilateral.prototype.draw = function () {
    var that = this;
    var points = [];
    [1, 2, 3, 4, 1].forEach(function (index) {
      points.push(that['point' + index].value());
    });
    this.polyline.plot(points);
    return this;
  };

  Quadrilateral.prototype.getData = function () {
    var data = [];

    var that = this;
    [1, 2, 3, 4].forEach(function (index) {
      data.push(that['point' + index].getData());
    });

    return data;
  };

  return Quadrilateral;
}]);
'use strict';

angular.module('huoyun.widget').factory("Rect", ["Point", "draw", "Line", function (Point, drawProvider, Line) {

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

  Rect.prototype.setSvg = function (svg) {
    this.svg = svg;
    this.polyline = this.svg.polyline().fill(drawProvider.fill).stroke(drawProvider.line.stroke);
    return this;
  };

  Rect.prototype.style = function (style) {
    if (!this.polyline) {
      throw new Error("Line not set story board");
    }

    this.polyline.style(style);
    return this;
  };

  Rect.prototype.remove = function () {
    if (this.polyline) {
      this.polyline.remove();
    }
  };

  Rect.prototype.setStartPoint = function (point) {
    this.startPoint = point;
    return this;
  };

  Rect.prototype.setEndPoint = function (point) {
    this.endPoint = point;
    return this;
  };

  Rect.prototype.draw = function () {
    var points = [];
    points.push(this.getPoint1().value());
    points.push(this.getPoint2().value());
    points.push(this.getPoint3().value());
    points.push(this.getPoint4().value());
    points.push(this.getPoint1().value());
    this.polyline.plot(points);
    return this;
  };

  Rect.prototype.getPoint1 = function () {
    return this.startPoint;
  };

  Rect.prototype.getPoint2 = function () {
    return new Point(this.endPoint.x, this.startPoint.y);
  };

  Rect.prototype.getPoint3 = function () {
    return this.endPoint;
  };

  Rect.prototype.getPoint4 = function () {
    return new Point(this.startPoint.x, this.endPoint.y);
  };

  Rect.prototype.getLine2 = function () {
    return new Line(this.getPoint2(), this.getPoint3());
  };

  Rect.prototype.getLine3 = function () {
    return new Line(this.getPoint3(), this.getPoint4());
  };

  return Rect;
}]);
'use strict';

angular.module('huoyun.widget').directive("widgetsStoryBoard", ["$log", "svgHelper", "Draw", function ($log, svgHelper, Draw) {
  return {
    restrict: "A",
    scope: {
      svgOptions: "=",
      frameIndex: "="
    },
    link: function link($scope, elem, attrs) {
      var svg = svgHelper.generateSVG(elem);

      $scope.$watch("frameIndex", function (newVal, oldValue) {
        if (newVal && $scope.svgOptions && $scope.svgOptions.objects) {
          $scope.svgOptions.objects.forEach(function (object) {
            if (!object.svg) {
              object.setSvg(svg).setHorizontalLine($scope.svgOptions.line);
            }
            object.setTime(newVal);
          });
        }
      });

      var deregisterWatch = $scope.$watch("svgOptions", function (newVal, oldValue) {
        if (newVal) {
          deregisterWatch();
          if (typeof $scope.svgOptions.afterSvgInit === "function") {
            $scope.svgOptions.afterSvgInit(svg);
          }

          if (typeof $scope.svgOptions.registerObjectCreate === "function") {
            $scope.svgOptions.registerObjectCreate(ObjectCreateHandler);
          }
        }
      });

      function ObjectCreateHandler(object) {
        object.setSvg(svg).setTime($scope.frameIndex).enableDrawing();
      }

      //$scope.svgOptions.line.setSvg(svg).draw().text("水平消失线");
      // svg.rect(177, 177, 8, 8).fill("#4F80FF").stroke({
      //   color: "rgba(0,0,0,0)"
      // }).style({
      //   cursor: "nw-resize"
      // }).attr({
      //   "pointer-events": "all"
      // })
      //var cube = new Draw.Cube();
      //cube.setHorizontalLine($scope.svgOptions.line).setSvg(svg).enableDrawing();

    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("svgHelper", ["draw", function (drawProvider) {
  return {
    generateSVG: function generateSVG(elem) {
      var svgId = 'svg' + new Date().getTime();
      var storyBoardContainer = angular.element("<div class='svg-story-board-container'></div>").attr("id", svgId);
      storyBoardContainer.css("height", "100%").css("width", "100%");
      elem.append(storyBoardContainer);
      var svg = SVG(svgId);
      svg.size("100%", "100%");
      return svg;
    },

    drawLine: function drawLine(svg, line) {
      svg.line(line.value()).stroke(drawProvider.line.stroke);
    },

    updateLine: function updateLine(line, point1, point2) {
      return line.plot([point1.value(), point2.value()]);
    },

    drawLineByPoints: function drawLineByPoints(svg, point1, point2) {
      return svg.line([point1.value(), point2.value()]).stroke(drawProvider.line.stroke);
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Timeline", [function () {

  function Timeline() {
    this.timeline = {};
    this.currentTime = null;
  }

  Timeline.prototype.getTimes = function () {
    return Object.keys(this.timeline);
  };

  Timeline.prototype.setCurrentTime = function (time) {
    this.currentTime = time;
  };

  Timeline.prototype.setData = function (time, data) {
    this.timeline[time] = data;
  };

  Timeline.prototype.getEndPoints = function (time) {
    if (this.timeline[time]) {
      return {
        min: time,
        max: time
      };
    }

    var times = this.getTimes();
    var min = null;
    var max = null;
    for (var index = 0; index < times.length; index++) {
      var cur = parseFloat(times[index]);
      if (max === null && cur > time) {
        max = times[index];
        if (index > 0) {
          min = times[index - 1];
        }

        break;
      }
    }

    return {
      min: min,
      max: max
    };
  };

  return Timeline;
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsVideoControlBar', ["$log", "widgetsHelper", function ($log, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      video: "="
    },
    templateUrl: 'video/video.control.bar.html',
    link: function link($scope, ele, attrs) {

      $scope.playButtonDisabled = function () {
        if (!$scope.video) {
          return true;
        }
        return false;
      };

      $scope.playButtonVisibility = function () {
        if ($scope.video && $scope.video.status === "play") {
          return false;
        }

        return true;
      };

      $scope.onPlayButtonClicked = function () {
        if ($scope.video) {
          $scope.video.play();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.pauseButtonDisabled = function () {
        if (!$scope.video) {
          return true;
        }
        return false;
      };

      $scope.onPauseButtonClicked = function () {
        if ($scope.video) {
          $scope.video.pause();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onFastForwardButtonClicked = function () {
        if ($scope.video) {
          $scope.video.fastForward();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onFastBackwardButtonClicked = function () {
        if ($scope.video) {
          $scope.video.fastBackward();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onPerviousFrameButtonClicked = function () {
        if ($scope.video) {
          $scope.video.previousFrame();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onNextFrameButtonClicked = function () {
        if ($scope.video) {
          $scope.video.nextFrame();
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onRateButtonClicked = function (rate) {
        if ($scope.video) {
          $scope.video.changeRate(rate);
        } else {
          $log.warn("current video is undefined.");
        }
      };

      $scope.onRateButtonDisabled = function (rate) {
        if ($scope.video) {
          return $scope.video.defaultPlaybackRate * rate === $scope.video.getPlaybackRate();
        }
      };

      $scope.getFrameInfo = function () {
        if ($scope.video) {
          return '\u7B2C' + $scope.video.currentFrame + '\u5E27/\u5171' + $scope.video.totalFrames + '\u5E27';
        }
      };

      $scope.getTimeInfo = function () {
        if ($scope.video) {
          var time = widgetsHelper.durationFormat($scope.video.currentTime);
          var total = widgetsHelper.durationFormat($scope.video.duration);
          return time + '/' + total;
        }
      };

      $scope.progressStyle = function () {
        var width = 0;
        if ($scope.video) {
          width = (100.0 * $scope.video.currentTime / $scope.video.duration).toFixed(2) + "%";
        }
        return {
          width: width
        };
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').factory("Video", ["$timeout", "$log", "video", function ($timeout, $log, videoProvider) {

  function Video(elem, fps) {
    this.elem = elem;
    this.duration = elem.duration;
    this.height = elem.videoHeight;
    this.width = elem.videoWidth;
    this.fps = fps || 15;
    this.defaultPlaybackRate = elem.defaultPlaybackRate;
    this.currentTime = elem.currentTime;
    this.percentage = 0;
    this.totalFrames = parseInt((this.fps * this.duration).toFixed(0));
    this.currentFrame = 0;
    this.status = "loaded";

    var timer = null;
    var timer_interval = 8;

    this.setTimerInterval = function (val) {
      timer_interval = val;
    };

    this.startTimer = function () {
      if (this.status === "play") {
        var that = this;
        timer = setInterval(function () {
          $timeout(function () {
            that.setCurrentTime(that.elem.currentTime);
          });
        }, timer_interval / that.getPlaybackRate());
      } else {
        this.stopTimer();
      }
    };

    this.stopTimer = function () {
      clearInterval(timer);
      timer = null;
    };
  }

  Video.prototype.setFps = function (fps) {
    this.fps = fps;
  };

  Video.prototype.play = function () {
    this.elem.play();
    this.status = "play";
    this.startTimer();
  };

  Video.prototype.pause = function () {
    this.status = "pause";
    this.elem.pause();
    this.stopTimer();
  };

  Video.prototype.getPlaybackRate = function () {
    return this.elem.playbackRate;
  };

  Video.prototype.changeRate = function (rate) {
    this.elem.playbackRate = rate;
  };

  Video.prototype.changeTime = function (time) {
    if (time < 0) {
      this.elem.currentTime = 0;
      this.setCurrentTime(0);
      return;
    }

    if (time > this.duration) {
      this.elem.currentTime = this.duration;
      this.setCurrentTime(this.duration);
      return;
    }

    this.elem.currentTime = time;
    this.setCurrentTime(time);
  };

  Video.prototype.setCurrentTime = function (currentTime) {
    this.currentTime = currentTime;
    this.percentage = this.currentTime / this.duration;
    this.currentFrame = parseInt((this.fps * currentTime).toFixed(0));
  };

  Video.prototype.previousFrame = function () {
    if (this.currentFrame > 0) {
      this.changeTime((this.currentFrame - 1) * 1.0 / this.fps);
    }
  };

  Video.prototype.nextFrame = function () {
    if (this.currentFrame < this.totalFrames) {
      this.changeTime((this.currentFrame + 1) * 1.0 / this.fps);
    }
  };

  Video.prototype.fastForward = function () {
    var time = this.currentTime + videoProvider.step * this.getPlaybackRate();
    this.changeTime(time);
  };

  Video.prototype.fastBackward = function () {
    var time = this.currentTime - videoProvider.step * this.getPlaybackRate();
    this.changeTime(time);
  };

  Video.prototype.setPrecent = function (precent) {
    if (precent < 0) {
      precent = 0;
    } else if (precent > 1) {
      precent = 1;
    }
    this.changeTime(this.duration * precent);
  };

  return Video;
}]);
'use strict';

/**
 * options
 *  - fps
 */

angular.module('huoyun.widget').directive('widgetsVideoPlayer', ["$log", "Video", "$timeout", "widgetsHelper", function ($log, Video, $timeout, widgetsHelper) {
  return {
    restrict: 'A',
    scope: {
      svgOptions: "=",
      options: "=",
      src: "="
    },
    templateUrl: 'video/video.player.html',
    link: function link($scope, elem, attrs) {

      var videoElement = elem.find("video")[0];

      videoElement.onloadedmetadata = function (e) {
        e.preventDefault();
        $log.info("Video metadata is loaded", e);
        $timeout(function () {
          $scope.video = new Video(videoElement, $scope.options.fps);
        });
      };

      $scope.buttonVisibility = function (button) {
        return widgetsHelper.visibility(button);
      };

      $scope.buttonDisabled = function (button) {
        return widgetsHelper.disabled(button);
      };

      $scope.buttonStyle = function (button) {
        return widgetsHelper.style(button);
      };

      $scope.buttonClass = function (button) {
        return button.appendClass || "btn-default";
      };

      $scope.onButtonClicked = function (button) {
        if (typeof button.onClick === "function") {
          button.onClick.apply(button);
        } else {
          $log.warn("Button no click handler.", button);
        }
      };
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').directive('widgetsVideoProgressBar', ["$log", "$timeout", function ($log, $timeout) {
  return {
    restrict: 'A',
    scope: {
      video: "="
    },
    templateUrl: 'video/video.progress.bar.html',
    link: function link($scope, elem, attrs) {

      $scope.dragProcent = 0;
      $scope.inDraging = false;

      function getProcent() {
        if ($scope.inDraging) {
          return (100 * $scope.dragProcent).toFixed(2) + "%";
        }

        return getVideoProcent();
      }

      function getVideoProcent() {
        if ($scope.video) {
          return (100.0 * $scope.video.currentTime / $scope.video.duration).toFixed(2) + "%";
        }

        return 0;
      }

      $scope.progressStyle = function () {
        return {
          width: getProcent()
        };
      };

      $scope.radioButtonStyle = function () {
        return {
          left: getProcent()
        };
      };

      $scope.onProgressBarClicked = function (event) {
        event.stopPropagation();
        if ($scope.video) {
          var precent = event.offsetX / elem.width();
          $scope.video.setPrecent(precent);
        }
      };

      var delta = 0;
      $scope.onDragRadioButtonDown = function (event) {
        event.stopPropagation();
        if ($scope.video) {
          delta = event.clientX - event.offsetX;
          console.log("Mouse Down Delta", event, elem.clientX());
          $scope.dragProcent = $scope.video.currentTime / $scope.video.duration;
          $scope.inDraging = true;
          $(document).on("mousemove", onMouseMoveHandler);
          $(document).on("mouseup", onMouseUpHandler);
        }
      };

      function onMouseUpHandler(event) {
        event.stopPropagation();
        $(document).off("mousemove", onMouseMoveHandler);
        $(document).off("mouseup", onMouseUpHandler);
        $timeout(function () {
          $scope.inDraging = false;
        });
      };

      function onMouseMoveHandler(event) {
        event.stopPropagation();
        $timeout(function () {
          console.log("Delta", delta, event.clientX);
          $scope.dragProcent = 1.0 * (event.clientX - delta) / elem.width();
          $scope.video.setPrecent($scope.dragProcent);
        });
      }
    }
  };
}]);
'use strict';

angular.module('huoyun.widget').provider("video", function () {

  this.step = 5;
  this.fastStep = this.step * 2;

  /**
   * options
   *  - step
   *  - fastSteps
   */
  this.config = function (options) {
    var that = this;
    ["step", "fastStep"].forEach(function (prop) {
      if (options[prop]) {
        that[prop] = options[prop];
      }
    });
  };

  this.$get = function () {
    return this;
  };
});
'use strict';

angular.module('huoyun.widget').run(['$templateCache', function ($templateCache) {
  $templateCache.put('dialog/dialog.html', '<div class="box box-primary huoyun-dialog-content-container"><div class="box-header with-border"><h3 class="box-title"><i class="fa fa-info" aria-hidden="true"></i> <span ng-bind="ngDialogData.title"></span></h3></div><div class="box-body"><div ng-if="!ngDialogData.templateUrl" ng-bind="ngDialogData.content"></div><div ng-if="ngDialogData.templateUrl" ng-include="ngDialogData.templateUrl"></div></div><div class="box-footer"><button type="submit" ng-if="ngDialogData.cancelButtonVisibility" class="btn btn-default pull-right" ng-click="onCancelButtonClicked()" ng-bind="ngDialogData.cancelButtonText"></button> <button type="submit" ng-if="ngDialogData.confirmButtonVisibility" class="btn btn-primary pull-right" ng-click="onConfirmButtonClicked()" ng-bind="ngDialogData.confirmButtonText"></button></div></div>');
  $templateCache.put('table/pagination.html', '<ul class="pagination pagination-sm no-margin pull-right widgets-pagination"><li ng-disabled="pageData.first"><span ng-click="onPagingClicked(pageData.number - 1)">\xAB</span></li><li ng-repeat="number in numbers" ng-class="{true: \'active\', false: \'\'}[number === pageData.number]"><span ng-bind="number + 1" ng-click="onPagingClicked(number)"></span></li><li ng-disabled="pageData.last"><span ng-click="onPagingClicked(pageData.number + 1)">\xBB</span></li></ul>');
  $templateCache.put('table/table.html', '<div class="box widgets-table"><div class="box-header"><h3 class="box-title"><i class="fa fa-server" aria-hidden="true"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.buttons" ng-show="buttonVisibility(button)" ng-click="onButtonClicked(button)" ng-style="buttonStyle(button)" ng-class="buttonClass(button)" ng-disabled="buttonDisabled(button)"><i ng-show="button.icon" class="fa" aria-hidden="true" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><div class="box-body table-responsive no-padding"><table class="table table-hover table-bordered"><tbody><tr class="no-hover"><th ng-repeat="column in options.columns" ng-show="columnVisibility(column)" column-name="{{column.name}}" column-type="{{column.type}}" ng-style="columnStyle(column)"><div ng-if="column.headerTemplateUrl" ng-include="column.headerTemplateUrl"></div><div ng-if="!column.headerTemplateUrl" ng-bind="column.label"></div></th></tr><tr ng-show="source.content.length === 0"><td class="empty-table" colspan="*"><i class="fa fa-database"></i> <span>\u6682\u65E0\u6570\u636E</span></td></tr><tr ng-show="source.content.length > 0" ng-repeat="lineData in source.content" ng-click="onLineClicked(lineData,$index)" ng-class="{true: \'selected\', false: \'\'}[lineData.$$selected]"><td class="table-column" column-name="{{column.name}}" column-type="{{column.type}}" ng-repeat="column in options.columns" ng-show="columnVisibility(column)" ng-style="columnStyle(column)"><div ng-if="column.templateUrl" ng-include="column.templateUrl"></div><div ng-if="!column.templateUrl" ng-switch="column.type"><span ng-switch-when="date" ng-bind="lineData[column.name] | date: getDateFilter()"></span> <span ng-switch-default="" ng-bind="lineData[column.name]"></span></div></td></tr></tbody></table></div><div class="box-footer clearfix"><div class="pull-left table-footer-total"></div><div widgets-pagination="" ng-show="source.totalPages" page-data="source" on-paging-changed="onPagingChangedHandler(pageIndex)"></div></div></div>');
  $templateCache.put('tip/tip.html', '<div class="alert alert-success alert-dismissible widget-tip"><span ng-bind="message"></span></div>');
  $templateCache.put('video/video.control.bar.html', '<div class="widgets-video-control-bar"><div widgets-video-progress-bar="" video="video"></div><div class="widgets-video-control-bar-panel"><button class="btn" ng-click="onPlayButtonClicked()" ng-disabled="playButtonDisabled()" ng-show="playButtonVisibility()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u64AD\u653E</span></button> <button class="btn" ng-click="onPauseButtonClicked()" ng-disabled="pauseButtonDisabled()" ng-show="!playButtonVisibility()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u6682\u505C</span></button> <button class="btn" ng-click="onFastBackwardButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u5FEB\u9000</span></button> <button class="btn" ng-click="onFastForwardButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u5FEB\u8FDB</span></button> <button class="btn" ng-click="onRateButtonClicked(1)" ng-disabled="onRateButtonDisabled(1)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u6B63\u5E38\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(2)" ng-disabled="onRateButtonDisabled(2)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>2\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(4)" ng-disabled="onRateButtonDisabled(4)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>4\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(8)" ng-disabled="onRateButtonDisabled(8)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>8\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onPerviousFrameButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u4E0A\u4E00\u5E27</span></button> <button class="btn" ng-click="onNextFrameButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u4E0B\u4E00\u5E27</span></button><div class="pull-right"><span class="marign-right-100" ng-bind="getTimeInfo()"></span> <span ng-bind="getFrameInfo()"></span></div></div></div>');
  $templateCache.put('video/video.player.html', '<div class="box widgets-video-player"><div class="box-header"><h3 class="box-title"><i class="fa fa-server" aria-hidden="true"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.buttons" ng-show="buttonVisibility(button)" ng-click="onButtonClicked(button)" ng-style="buttonStyle(button)" ng-class="buttonClass(button)" ng-disabled="buttonDisabled(button)"><i ng-show="button.icon" class="fa" aria-hidden="true" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><div class="box-body no-padding" widgets-story-board="" svg-options="svgOptions" frame-index="video.currentFrame"><video preload="metadata"><source type="video/mp4" ng-src="{{src}}"></video></div><div class="box-footer clearfix"><div widgets-video-control-bar="" video="video"></div></div></div>');
  $templateCache.put('video/video.progress.bar.html', '<div class="widgets-video-progress-bar" drag="{{inDraging}}"><div class="progress progress-xxs" ng-click="onProgressBarClicked($event)"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" ng-style="progressStyle()"><span class="sr-only" ng-style="radioButtonStyle()"><div class="sr-only-inner progress-bar-success" ng-mousedown="onDragRadioButtonDown($event)"></div></span></div></div></div>');
}]);