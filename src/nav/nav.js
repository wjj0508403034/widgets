'use strict';

/**
 * options:
 *  items:
 *    label
 *    visibility
 *    style
 */
angular.module('huoyun.widget').directive('widgetsNav', ["$log", "widgetsHelper",
  function($log, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'nav/nav.html',
      link: function($scope, ele, attrs) {

        $scope.itemVisibility = function(item) {
          return widgetsHelper.visibility(item);
        };

        $scope.itemStyle = function(item) {
          return widgetsHelper.style(item);
        };

        $scope.onItemClicked = function(item) {
          if (typeof item.onClick === "function") {
            item.onClick.apply(item);
          } else {
            $log.warn("Nav item no click handler.", item);
          }
        };
      }
    }
  }
]);