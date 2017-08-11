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

angular.module('huoyun.widget').run(['$templateCache', function ($templateCache) {
  $templateCache.put('dialog/dialog.html', '<div class="box box-primary huoyun-dialog-content-container"><div class="box-header with-border"><h3 class="box-title"><i class="fa fa-info" aria-hidden="true"></i> <span ng-bind="ngDialogData.title"></span></h3></div><div class="box-body"><div ng-if="!ngDialogData.templateUrl" ng-bind="ngDialogData.content"></div><div ng-if="ngDialogData.templateUrl" ng-include="ngDialogData.templateUrl"></div></div><div class="box-footer"><button type="submit" ng-if="ngDialogData.cancelButtonVisibility" class="btn btn-default pull-right" ng-click="onCancelButtonClicked()" ng-bind="ngDialogData.cancelButtonText"></button> <button type="submit" ng-if="ngDialogData.confirmButtonVisibility" class="btn btn-primary pull-right" ng-click="onConfirmButtonClicked()" ng-bind="ngDialogData.confirmButtonText"></button></div></div>');
  $templateCache.put('table/pagination.html', '<ul class="pagination pagination-sm no-margin pull-right widgets-pagination"><li ng-disabled="pageData.first"><span ng-click="onPagingClicked(pageData.number - 1)">\xAB</span></li><li ng-repeat="number in numbers" ng-class="{true: \'active\', false: \'\'}[number === pageData.number]"><span ng-bind="number + 1" ng-click="onPagingClicked(number)"></span></li><li ng-disabled="pageData.last"><span ng-click="onPagingClicked(pageData.number + 1)">\xBB</span></li></ul>');
  $templateCache.put('table/table.html', '<div class="box widgets-table"><div class="box-header"><h3 class="box-title"><i class="fa fa-server" aria-hidden="true"></i> <span ng-bind="options.title"></span></h3><div class="box-tools"><div class="input-group input-group-sm"><button class="btn" ng-repeat="button in options.buttons" ng-show="buttonVisibility(button)" ng-click="onButtonClicked(button)" ng-style="buttonStyle(button)" ng-class="buttonClass(button)" ng-disabled="buttonDisabled(button)"><i ng-show="button.icon" class="fa" aria-hidden="true" ng-class="button.icon"></i> <span ng-bind="button.label"></span></button></div></div></div><div class="box-body table-responsive no-padding"><table class="table table-hover table-bordered"><tbody><tr class="no-hover"><th ng-repeat="column in options.columns" ng-show="columnVisibility(column)" column-name="{{column.name}}" column-type="{{column.type}}" ng-style="columnStyle(column)"><div ng-if="column.headerTemplateUrl" ng-include="column.headerTemplateUrl"></div><div ng-if="!column.headerTemplateUrl" ng-bind="column.label"></div></th></tr><tr ng-show="source.content.length === 0"><td class="empty-table" colspan="*"><i class="fa fa-database"></i> <span>\u6682\u65E0\u6570\u636E</span></td></tr><tr ng-show="source.content.length > 0" ng-repeat="lineData in source.content" ng-click="onLineClicked(lineData,$index)" ng-class="{true: \'selected\', false: \'\'}[lineData.$$selected]"><td class="table-column" column-name="{{column.name}}" column-type="{{column.type}}" ng-repeat="column in options.columns" ng-show="columnVisibility(column)" ng-style="columnStyle(column)"><div ng-if="column.templateUrl" ng-include="column.templateUrl"></div><div ng-if="!column.templateUrl" ng-switch="column.type"><span ng-switch-when="date" ng-bind="lineData[column.name] | date: getDateFilter()"></span> <span ng-switch-default="" ng-bind="lineData[column.name]"></span></div></td></tr></tbody></table></div><div class="box-footer clearfix"><div class="pull-left table-footer-total"></div><div widgets-pagination="" ng-show="source.totalPages" page-data="source" on-paging-changed="onPagingChangedHandler(pageIndex)"></div></div></div>');
  $templateCache.put('tip/tip.html', '<div class="alert alert-success alert-dismissible widget-tip"><span ng-bind="message"></span></div>');
}]);