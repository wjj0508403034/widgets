'use strict';

angular.module('huoyun.widget').directive('widgetsTable', ["display",
  function(displayProvider) {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        source: "=",
        onRowClicked: "&",
        onPagingChanged: "&"
      },
      templateUrl: 'table/table.html',
      link: function($scope, elem, attrs) {

        $scope.getDateFilter = function() {
          return displayProvider.date;
        };

        $scope.getColumnValue = function(line, column) {
          return line && column && line.getPropValue(column);
        };
      }
    }
  }
]);