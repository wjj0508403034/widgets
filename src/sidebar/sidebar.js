'use strict';

angular.module('huoyun.widget').directive('widgetsSideBar', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'sidebar/sidebar.html',
      link: function($scope, elem, attrs) {

      }
    }
  }
]);