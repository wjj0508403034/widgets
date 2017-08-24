'use strict';

/**
 * options:
 *  items:
 *    label
 *    visibility
 *    style
 */
angular.module('huoyun.widget').directive('widgetsSideBar', ["$log", "widgetsHelper",
  function($log, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'sidebar/sidebar.html',
      link: function($scope, ele, attrs) {

        $scope.itemVisibility = function(item) {
          return widgetsHelper.visibility(item);
        };

        $scope.itemStyle = function(item) {
          return widgetsHelper.style(item);
        };

        $scope.onGroupItemClicked = function(group, groupItem) {
          if (typeof groupItem.onClick === "function") {
            groupItem.onClick.apply(null, [group, groupItem]);
          } else {
            $log.warn("Side bar no click handler.", group, groupItem);
          }
        };
      }
    }
  }
]);