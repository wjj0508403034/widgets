'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupJson', ["$log", "display", "widgetsHelper",
  function($log, displayProvider, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'form/formgroup/formgroup.json.html',
      link: function($scope, ele, attrs) {


      }
    }
  }
]);