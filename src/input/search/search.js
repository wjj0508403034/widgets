'use strict';

angular.module('huoyun.widget').directive('widgetsSearchBox', [function() {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'input/search/search.html',
    link: function($scope, elem, attrs) {}
  }
}]);