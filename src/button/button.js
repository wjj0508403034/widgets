'use strict';

angular.module('huoyun.widget').directive('widgetsButton', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'button/button.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);