'use strict';

angular.module('huoyun.widget').directive('widgetsCheckBox', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'checkbox/checkbox.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);