'use strict';

angular.module('huoyun.widget').directive('widgetsTable', ["display",
  function(displayProvider) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'table/table.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);