'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupEmail', ["$log", "display", "widgetsHelper",
  function($log, displayProvider, widgetsHelper) {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'form/formgroup/formgroup.email.html',
      link: function($scope, ele, attrs) {


      }
    }
  }
]);