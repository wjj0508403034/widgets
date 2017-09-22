'use strict';

angular.module('huoyun.widget').directive('widgetsSideBarPanel', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'sidebar-panel/sidebar.panel.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);