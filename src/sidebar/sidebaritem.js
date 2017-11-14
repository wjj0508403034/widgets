'use strict';

angular.module('huoyun.widget').directive('widgetsSideBarItem', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'sidebar/sidebaritem.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);