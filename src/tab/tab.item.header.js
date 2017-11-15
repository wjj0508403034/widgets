'use strict';

angular.module('huoyun.widget').directive('widgetsTabItemHeader', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'tab/tab.item.header.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);