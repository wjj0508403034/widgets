'use strict';

angular.module('huoyun.widget').directive('widgetsBreadCrumb', ["$log", "widgetsHelper",
  function($log, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'breadcrumb/breadcrumb.html',
      link: function($scope, ele, attrs) {

        $scope.itemStyle = function(item) {
          return widgetsHelper.style(item);
        };

        $scope.onItemClicked = function(item, index) {
          if ($scope.options.items.length - 1 !== index) {
            if (typeof item.onClick === "function") {
              item.onClick.apply(item);
            } else {
              $log.warn("Nav item no click handler.", item);
            }
          }
        };
      }
    }
  }
]);