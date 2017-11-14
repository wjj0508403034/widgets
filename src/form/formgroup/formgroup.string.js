'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupString', [
  function() {
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