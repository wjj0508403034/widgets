'use strict';

angular.module('huoyun.widget').directive('widgetsTable', [
  function() {
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