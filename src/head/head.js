'use strict';

/**
 * options:
 *  title:
 *  titleStyle
 *  onTitleClicked
 */
angular.module('huoyun.widget').directive('widgetsHead', ["$log", "widgetsHelper",
  function($log, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'head/head.html',
      link: function($scope, ele, attrs) {

        $scope.titleStyle = function(style) {
          return widgetsHelper.style({
            style: style
          });
        };

        $scope.onTitleClick = function() {
          if (typeof $scope.options.onTitleClicked === "function") {
            $scope.options.onTitleClicked.apply(null);
          }
        };
      }
    }
  }
]);