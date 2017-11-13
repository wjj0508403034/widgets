'use strict';

angular.module('huoyun.widget').directive('widgetsInputError', [function() {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/error/input.error.html',
    link: function($scope, elem, attrs) {}
  }
}]);