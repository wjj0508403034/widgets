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

angular.module('huoyun.widget').factory("Cube", ["Point", "Line", "svgHelper", "Rect", function (Point, Line, svgHelper, Rect) {

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

  Cube.prototype.setHorizontalLine = function (line) {
    this.horizontalLine = line;
  };

  Cube.prototype.setSvg = function (svg) {
    this.svg = svg;
    var that = this;

    svg.mousedown(function (event) {
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

    svg.mousemove(function (event) {
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

  Cube.prototype.getHorizontalLineCrossingPoint = function (point) {
    var line = new Line(this.point1, point);
    return this.horizontalLine.crossingPoint(line);
  };

  Cube.prototype.wire = function (point) {
    if (this.line1) {
      svgHelper.updateLine(this.line1, this.point1, point);
    } else {
      this.line1 = svgHelper.drawLineByPoints(this.svg, this.point1, point);
    }
  };

  return Cube;
}]);
'use strict';

angular.module('huoyun.widget').provider("draw", function () {

  this.line = {
    stroke: {
      color: '#f06',
      width: 3,
      linecap: 'round'
    }
  };

  this.fill = "rgba(109, 33, 33, 0.25)";

  this.$get = function () {
    return this;
  };
});
'use strict';

angular.module('huoyun.widget').factory("Draw", ["Point", "Line", "Cube", function (Point, Line, Cube) {

  return {
    Point: Point,
    Line: Line,
    Cube: Cube
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
  };

  Line.prototype.setSvg = function (svg) {
    this.svg = svg;
  };

  Line.prototype.setEndPoint = function (point) {
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

  Line.prototype.drawToCrossLine = function (line, point) {
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

  Line.prototype.canCrossWithLine = function (line, point) {
    this.setEndPoint(point);
    return !!this.crossingPoint(line);
  };

  Line.prototype.formula = function () {
    return 'y=' + this.k + 'x+' + this.b;
  };

  Line.prototype.inline = function (point) {
    return (this.endPoint.y - this.startPoint.y) * (point.x - this.startPoint.x) === (this.endPoint.x - this.startPoint.x) * (point.y - this.startPoint.y);
  };

  Line.prototype.crossingPoint = function (line2) {
    if (this.k === line2.k) {
      return;
    }

    var x = (line2.b - this.b) * 1.0 / (this.k - line2.k);
    var y = (this.k * line2.b - line2.k * this.b) * 1.0 / (this.k - line2.k);
    return new Point(x, y);
  };

  Line.prototype.value = function () {
    return [this.startPoint.value(), this.endPoint.value()];
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

  return Point;
}]);
'use strict';

angular.module('huoyun.widget').factory("Rect", ["Point", "draw", function (Point, drawProvider) {

  function Rect() {
    this.startPoint = null;
    this.endPoint = null;
    this.polyline = null;
  }

  Rect.prototype.setSvg = function (svg) {
    this.svg = svg;
  };

  Rect.prototype.drawToPoint = function (point) {
    var pointArray = this.getPointArray(this.startPoint, point);
    if (!this.polyline) {
      this.polyline = this.svg.polyline(pointArray).fill(drawProvider.fill).stroke(drawProvider.line.stroke);
    } else {
      this.polyline.plot(pointArray);
    }
  };

  Rect.prototype.endToPoint = function (point) {
    this.endPoint = point;
    this.polyline.plot(this.getPointArray(this.startPoint, this.endPoint));
  };

  Rect.prototype.getPointArray = function (startPoint, endPoint) {
    return [startPoint.value(), [startPoint.x, endPoint.y], endPoint.value(), [endPoint.x, startPoint.y], startPoint.value()];
  };

  Rect.prototype.getSecondPoint = function () {
    return new Point(this.endPoint.x, this.startPoint.y);
  };

  return Rect;
}]);
'use strict';

angular.module('huoyun.widget').directive("widgetsStoryBoard", ["$log", "svgHelper", "Draw", function ($log, svgHelper, Draw) {
  return {
    restrict: "A",
    scope: {
      svgOptions: "="
    },
    link: function link($scope, elem, attrs) {
      var svg = svgHelper.generateSVG(elem);
      svgHelper.drawLine(svg, $scope.svgOptions.line);
      var path = 'M 100 200 C 200 100 300 0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100';
      svg.plain("水平消失线").font({ size: 42.5, family: 'Verdana' }).fill('#f06');

      var cube = new Draw.Cube();
      cube.setHorizontalLine($scope.svgOptions.line);
      cube.setSvg(svg);
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

angular.module('huoyun.widget').run(['$templateCache', function ($templateCache) {
  $templateCache.put('dialog/dialog.html', '<div class="box box-primary huoyun-dialog-content-container"><div class="box-header with-border"><h3 class="box-title"><i class="fa fa-info" aria-hidden="true"></i> <span ng-bind="ngDialogData.title"></span></h3></div><div class="box-body"><div ng-if="!ngDialogData.templateUrl" ng-bind="ngDialogData.content"></div><div ng-if="ngDialogData.templateUrl" ng-include="ngDialogData.templateUrl"></div></div><div class="box-footer"><button type="submit" ng-if="ngDialogData.cancelButtonVisibility" class="btn btn-default pull-right" ng-click="onCancelButtonClicked()" ng-bind="ngDialogData.cancelButtonText"></button> <button type="submit" ng-if="ngDialogData.confirmButtonVisibility" class="btn btn-primary pull-right" ng-click="onConfirmButtonClicked()" ng-bind="ngDialogData.confirmButtonText"></button></div></div>');
  $templateCache.put('table/pagination.html', '<ul class="pagination pagination-sm no-margin pull-right widgets-pagination"><li ng-disabled="pageData.first"><span ng-click="onPagingClicked(pageData.number - 1)">\xAB</span></li><li ng-repeat="number in numbers" ng-class="{true: \'active\', false: \'\'}[number === pageData.number]"><span ng-bind="number + 1" ng-click="onPagingClicked(number)"></span></li><li ng-disabled="pageData.last"><span ng-click="onPagingClicked(pageData.number + 1)">\xBB</span></li></ul>');
  $templateCache.put('table/table.html', '<div class="box widgets-table"><div class="box-header"><h3 class="box-title"><i class="fa fa-server" aria-hidden="true"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.buttons" ng-show="buttonVisibility(button)" ng-click="onButtonClicked(button)" ng-style="buttonStyle(button)" ng-class="buttonClass(button)" ng-disabled="buttonDisabled(button)"><i ng-show="button.icon" class="fa" aria-hidden="true" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><div class="box-body table-responsive no-padding"><table class="table table-hover table-bordered"><tbody><tr class="no-hover"><th ng-repeat="column in options.columns" ng-show="columnVisibility(column)" column-name="{{column.name}}" column-type="{{column.type}}" ng-style="columnStyle(column)"><div ng-if="column.headerTemplateUrl" ng-include="column.headerTemplateUrl"></div><div ng-if="!column.headerTemplateUrl" ng-bind="column.label"></div></th></tr><tr ng-show="source.content.length === 0"><td class="empty-table" colspan="*"><i class="fa fa-database"></i> <span>\u6682\u65E0\u6570\u636E</span></td></tr><tr ng-show="source.content.length > 0" ng-repeat="lineData in source.content" ng-click="onLineClicked(lineData,$index)" ng-class="{true: \'selected\', false: \'\'}[lineData.$$selected]"><td class="table-column" column-name="{{column.name}}" column-type="{{column.type}}" ng-repeat="column in options.columns" ng-show="columnVisibility(column)" ng-style="columnStyle(column)"><div ng-if="column.templateUrl" ng-include="column.templateUrl"></div><div ng-if="!column.templateUrl" ng-switch="column.type"><span ng-switch-when="date" ng-bind="lineData[column.name] | date: getDateFilter()"></span> <span ng-switch-default="" ng-bind="lineData[column.name]"></span></div></td></tr></tbody></table></div><div class="box-footer clearfix"><div class="pull-left table-footer-total"></div><div widgets-pagination="" ng-show="source.totalPages" page-data="source" on-paging-changed="onPagingChangedHandler(pageIndex)"></div></div></div>');
  $templateCache.put('tip/tip.html', '<div class="alert alert-success alert-dismissible widget-tip"><span ng-bind="message"></span></div>');
  $templateCache.put('video/video.control.bar.html', '<div class="widgets-video-control-bar"><div widgets-video-progress-bar="" video="video"></div><div class="widgets-video-control-bar-panel"><button class="btn" ng-click="onPlayButtonClicked()" ng-disabled="playButtonDisabled()" ng-show="playButtonVisibility()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u64AD\u653E</span></button> <button class="btn" ng-click="onPauseButtonClicked()" ng-disabled="pauseButtonDisabled()" ng-show="!playButtonVisibility()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u6682\u505C</span></button> <button class="btn" ng-click="onFastBackwardButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u5FEB\u9000</span></button> <button class="btn" ng-click="onFastForwardButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u5FEB\u8FDB</span></button> <button class="btn" ng-click="onRateButtonClicked(1)" ng-disabled="onRateButtonDisabled(1)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u6B63\u5E38\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(2)" ng-disabled="onRateButtonDisabled(2)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>2\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(4)" ng-disabled="onRateButtonDisabled(4)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>4\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onRateButtonClicked(8)" ng-disabled="onRateButtonDisabled(8)"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>8\u500D\u901F\u7387</span></button> <button class="btn" ng-click="onPerviousFrameButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u4E0A\u4E00\u5E27</span></button> <button class="btn" ng-click="onNextFrameButtonClicked()"><i class="fa" aria-hidden="true" ng-class="button.icon"></i> <span>\u4E0B\u4E00\u5E27</span></button><div class="pull-right"><span class="marign-right-100" ng-bind="getTimeInfo()"></span> <span ng-bind="getFrameInfo()"></span></div></div></div>');
  $templateCache.put('video/video.player.html', '<div class="box widgets-video-player"><div class="box-header"><h3 class="box-title"><i class="fa fa-server" aria-hidden="true"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.buttons" ng-show="buttonVisibility(button)" ng-click="onButtonClicked(button)" ng-style="buttonStyle(button)" ng-class="buttonClass(button)" ng-disabled="buttonDisabled(button)"><i ng-show="button.icon" class="fa" aria-hidden="true" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><div class="box-body no-padding" widgets-story-board="" svg-options="svgOptions"><video preload="metadata"><source type="video/mp4" ng-src="{{src}}"></video></div><div class="box-footer clearfix"><div widgets-video-control-bar="" video="video"></div></div></div>');
  $templateCache.put('video/video.progress.bar.html', '<div class="widgets-video-progress-bar" drag="{{inDraging}}"><div class="progress progress-xxs" ng-click="onProgressBarClicked($event)"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" ng-style="progressStyle()"><span class="sr-only" ng-style="radioButtonStyle()"><div class="sr-only-inner progress-bar-success" ng-mousedown="onDragRadioButtonDown($event)"></div></span></div></div></div>');
}]);