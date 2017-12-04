'use strict';

angular.module('huoyun.widget').directive('widgetsTab', [
  function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        options: "="
      },
      transclude: true,
      priority: 99,
      templateUrl: 'control/tab/directives/tab.html',
      controller: function($scope) {
        return {
          tab: $scope.options
        };
      }
    }
  }
]);