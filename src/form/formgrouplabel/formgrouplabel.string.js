'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupLabelString', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'form/formgrouplabel/formgrouplabel.string.html',
      link: function($scope, ele, attrs) {


      }
    }
  }
]);