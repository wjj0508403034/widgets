'use strict';

angular.module('huoyun.widget').directive('widgetsTable', ["$log", "display", "widgetsHelper", "TableSelection",
  function($log, displayProvider, widgetsHelper, TableSelection) {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        source: "=",
        onRowClicked: "&",
        onPagingChanged: "&"
      },
      templateUrl: 'table/table.html',
      link: function($scope, ele, attrs) {

        $scope.headerStyle = function(header) {
          return widgetsHelper.style(header);
        };

        $scope.columnVisibility = function(column) {
          return widgetsHelper.visibility(column);
        };

        $scope.columnStyle = function(column) {
          return widgetsHelper.style(column);
        };

        $scope.buttonVisibility = function(button) {
          return widgetsHelper.visibility(button);
        };

        $scope.buttonDisabled = function(button) {
          return widgetsHelper.disabled(button);
        };

        $scope.buttonStyle = function(button) {
          return widgetsHelper.style(button);
        };

        $scope.buttonClass = function(button) {
          return button.appendClass || "btn-default";
        };

        $scope.onButtonClicked = function(button) {
          if (!$scope.buttonDisabled(button)) {
            if (typeof button.onClick === "function") {
              button.onClick.apply(button);
            } else {
              $log.warn("Button no click handler.", button);
            }
          }
        };

        $scope.getDateFilter = function() {
          return displayProvider.date;
        };

        $scope.onLineClicked = function(lineData, index) {
          if ($scope.options.selectionMode === TableSelection.Single) {
            lineData.$$selected = true;
            $scope.options.source.content.forEach(function(lineItem) {
              if (lineItem !== lineData) {
                lineItem.$$selected = false;
              }
            });
            $scope.$emit("selectChanged", lineData);
          } else if ($scope.options.selectionMode === TableSelection.Multiple) {
            lineData.$$selected = !lineData.$$selected;
            var selectedItems = $scope.options.source.content.filter(function(lineItem) {
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
    }
  }
]);