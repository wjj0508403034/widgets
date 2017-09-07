'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupString', ["$log", "display", "widgetsHelper",
  function($log, displayProvider, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'form/formgroup/formgroup.string.html',
      link: function($scope, ele, attrs) {


      }
    }
  }
]);