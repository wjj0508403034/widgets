'use strict';

angular.module('huoyun.widget').directive('widgetsDropdown', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'input/dropdown/dropdown.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);