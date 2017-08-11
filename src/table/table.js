'use strict';

angular.module('huoyun.widget').factory("TableSelection", function() {

  const Modes = {
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
          if (typeof button.onClick === "function") {
            button.onClick.apply(button);
          } else {
            $log.warn("Button no click handler.", button);
          }
        };

        $scope.getDateFilter = function() {
          return displayProvider.date;
        };

        $scope.onLineClicked = function(lineData, index) {
          var selection = new TableSelection($scope.options.selectionMode);
          if (selection.mode === TableSelection.Modes.Single) {
            lineData.$$selected = true;
            $scope.source.content.forEach(function(lineItem) {
              if (lineItem !== lineData) {
                lineItem.$$selected = false;
              }
            });
            $scope.$emit("selectChanged", lineData);
          } else if (selection.mode === TableSelection.Modes.Multiple) {
            lineData.$$selected = !lineData.$$selected;
            var selectedItems = $scope.source.content.filter(function(lineItem) {
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