'use strict';

angular.module('huoyun.widget').directive('widgetsTab', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'tab/tab.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);