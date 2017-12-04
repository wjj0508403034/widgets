'use strict';

angular.module('huoyun.widget').directive('widgetsTabItemHeader', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'control/tab/directives/tab.item.header.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);