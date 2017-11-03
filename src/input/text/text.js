'use strict';

angular.module('huoyun.widget').directive('widgetsTextBox', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'input/text/text.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);