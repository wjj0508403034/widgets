'use strict';

angular.module('huoyun.widget').directive('widgetsNav', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'nav/nav.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);