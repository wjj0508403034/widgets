'use strict';

angular.module('huoyun.widget').directive('widgetsTextBox', [function() {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/text/text.html',
    link: function($scope, elem, attrs) {}
  }
}]);